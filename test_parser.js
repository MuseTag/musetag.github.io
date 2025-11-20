
// Mocking the necessary parts from app.js to test the parser

function getCleanText(rawText) {
    if (!rawText) return "";

    let text = rawText;

    // 1. First pass: Remove hidden structure annotations like @@.(# Title) specifically
    text = text.replace(/@@\.\([^)]*\)/g, "");

    // 2. Second pass: Remove null entity patterns without visible parameters
    //    - @@. (bare null entity)
    //    - @@.modifier(hidden) patterns
    text = text.replace(/@@\.(?:[\w:!?]+(?:\([^)]*\))?)?(?!\[)/g, "");

    // 3. Third pass: Remove other hidden annotations without visible parameters
    //    - @@(...) without any visible parameters, like @@(Jules) or @@(1957-06-14)
    const hiddenAnnotationRegex = /@@\([^)]+\)(?!\[[^\]]*\])/gu;
    text = text.replace(hiddenAnnotationRegex, "");

    // 4. Fourth pass: Process annotations that are meant to be visible.
    const visibleAnnotationRegex =
        /@@(?:([\p{L}\p{N}_]+)|\(([^)]+)\)|(\.))((?:\.[\w:!?]+(?:(?:\([^)]*\)|\[[^\]]*\]))?)*)/gu;

    text = text.replace(
        visibleAnnotationRegex,
        (fullMatch, visibleName, hiddenContent, isNullDot, modifiersStr) => {
            // Extract content from visible parameters `[...]` only.
            const visibleParamRegex = /\[([^\]]*)\]/g;
            let visibleParamsOutput = "";
            let match;
            while ((match = visibleParamRegex.exec(modifiersStr)) !== null) {
                visibleParamsOutput += match[1];
            }

            // If it's a visible entity, output its name + visible params.
            if (visibleName) {
                let separator = "";
                // Check if modifiers contain .Dialog or .Voice
                if (/\.(?:Dialog|Voice)\b/.test(modifiersStr)) {
                    separator = ": ";
                }
                return visibleName.replace(/_/g, " ") + separator + visibleParamsOutput;
            }

            // If it's a hidden entity or null entity with visible parameters, output only the visible parameters.
            if ((hiddenContent || isNullDot) && visibleParamsOutput.length > 0) {
                return visibleParamsOutput;
            }

            // This case should ideally not be reached, as fully hidden ones should be gone.
            // But as a fallback, return empty.
            return "";
        },
    );

    // 5. Final cleanup: Remove any remaining modifier syntax that wasn't part of a match,
    //    e.g. .modifier or .modifier(hidden) that was left over due to partial replacement
    text = text.replace(/\.[\w:!?]+(?:\([^)]*\))?/g, "");

    return text;
}

function parseMuseTag(rawText) {
    const cleanText = getCleanText(rawText);
    const entities = new Map();
    const documentOutline = [];
    const declaredEntities = new Map(); // Track canonical names of declared entities

    // Find hidden markdown headers like @@.(# Title) - they should appear in TOC but not in preview
    const hiddenHeaderRegex = /@@\.\((#+)\s*([^)]*)\)/g;
    let headerMatch;
    while ((headerMatch = hiddenHeaderRegex.exec(rawText)) !== null) {
        documentOutline.push({
            level: headerMatch[1].length,
            text: headerMatch[2].trim(),
            position: headerMatch.index,
        });
    }

    // Find visible markdown headers like # Title
    const visibleHeaderRegex = /^(#+)\s+(.*)$/gm;
    while ((headerMatch = visibleHeaderRegex.exec(rawText)) !== null) {
        // Clean header text from any hidden entity annotations
        let cleanHeaderText = headerMatch[2].trim();

        // Remove hidden entities from header text
        cleanHeaderText = cleanHeaderText.replace(/@@\([^)]+\)/g, "");
        cleanHeaderText = cleanHeaderText.replace(
            /@@\.(?:[\w:!?]+(?:\([^)]*\))?)?(?!\[)/g,
            "",
        );

        // Process visible entities in headers
        cleanHeaderText = cleanHeaderText.replace(
            /@@([\p{L}\p{N}_]+)((?:\.[\w:!?]+(?:(?:\([^)]*\)|\[[^\]]*\]))?)*)/gu,
            (match, entityName, modifiers) => {
                // Extract visible parameters only
                const visibleParams = modifiers.match(/\[([^\]]*)\]/g) || [];
                return (
                    entityName.replace(/_/g, " ") +
                    visibleParams.join("").replace(/[\[\]]/g, "")
                );
            },
        );

        documentOutline.push({
            level: headerMatch[1].length,
            text: cleanHeaderText,
            position: headerMatch.index,
        });
    }

    // Sort the combined outline by position in the text
    documentOutline.sort((a, b) => a.position - b.position);

    // STEP 1: Parse all @@ annotations to build declared entities list
    const annotationRegex =
        /(@{2,4})(?:([\p{L}\p{N}_]+)|\(([^)]+)\))((?:\.[\w:!?]+(?:(?:\(([^)]*)\)|\[[^\]]*\]))?)*)/gu;

    let match;
    while ((match = annotationRegex.exec(rawText)) !== null) {
        const hierarchyMarkers = match[1]; // @@, @@@, or @@@@
        const hierarchyLevel = hierarchyMarkers.length - 1; // 1=main, 2=secondary, 3=minor
        const rawName = match[2] || match[3];
        const isHidden = !!match[3];
        const entityName = rawName.replace(/_/g, " ");
        const modifiersString = match[4] || "";

        let parsedAbsoluteDate = null;
        let isTemporal = isHidden && /^[0-9@-]/.test(rawName);

        if (isTemporal) {
            const dateToParse = rawName.replace(" ", "T");
            const tempDate = new Date(dateToParse);
            if (!isNaN(tempDate.getTime())) {
                parsedAbsoluteDate = tempDate;
            }
        }

        // Track this as a declared entity (both canonical name and underscore version)
        declaredEntities.set(entityName, rawName);
        if (rawName.includes("_")) {
            declaredEntities.set(rawName, rawName); // Also track underscore version
        }

        if (!entities.has(entityName)) {
            entities.set(entityName, {
                name: entityName,
                type: isTemporal ? "temporal" : "character",
                hierarchyLevel: hierarchyLevel, // 1=main, 2=secondary, 3=minor
                globalInfo: new Map(),
                occurrences: [],
                manuallyExpanded: false,
                contextuallyExpanded: false,
                parsedAbsoluteDate: parsedAbsoluteDate,
            });
        } else {
            // Update hierarchy level - hierarchy markers are persistent
            // Once an entity is marked as secondary (2) or minor (3), it stays that way
            const existingEntity = entities.get(entityName);
            if (hierarchyLevel > existingEntity.hierarchyLevel) {
                existingEntity.hierarchyLevel = hierarchyLevel;
            }
        }

        const entityData = entities.get(entityName);
        const currentOccurrence = {
            position: match.index,
            localInfo: [],
        };

        // Parse modifiers
        const modifierRegex = /\.([\w:!?]+)(?:(?:\(([^)]*)\)|\[([^\]]*)\]))?/g;
        const typeModifiers = ["Character", "Place", "Event", "Object"];
        let modMatch;
        while ((modMatch = modifierRegex.exec(modifiersString)) !== null) {
            const modName = modMatch[1];
            const modValue =
                modMatch[2] !== undefined
                    ? modMatch[2]
                    : modMatch[3] !== undefined
                        ? modMatch[3]
                        : null;

            // Handle standard type modifiers
            if (typeModifiers.includes(modName) && !isTemporal) {
                entityData.type = modName.toLowerCase();
            }

            // Handle custom .Type(value) modifier
            if (modName === "Type" && modValue && !isTemporal) {
                entityData.type = modValue.toLowerCase();
            }

            if (
                (modName.toUpperCase() === modName &&
                    modName.toLowerCase() !== modName) ||
                (typeModifiers.includes(modName) && !isTemporal)
            ) {
                // Global modifiers are now cumulative - store all occurrences
                if (entityData.globalInfo.has(modName)) {
                    const existing = entityData.globalInfo.get(modName);
                    existing.occurrences.push({
                        value: modValue,
                        position: match.index,
                    });
                } else {
                    entityData.globalInfo.set(modName, {
                        occurrences: [
                            {
                                value: modValue,
                                position: match.index,
                            },
                        ],
                    });
                }
            } else {
                currentOccurrence.localInfo.push({ name: modName, value: modValue });
            }
        }
        entityData.occurrences.push(currentOccurrence);
    }

    // STEP 2: Find all canonical name occurrences in the text
    // Reset regex index for second pass
    annotationRegex.lastIndex = 0;

    // Create a list of positions where @@ annotations exist to avoid double-counting
    const annotationPositions = new Set();
    while ((match = annotationRegex.exec(rawText)) !== null) {
        // Mark the range of this annotation as occupied
        const start = match.index;
        const end = match.index + match[0].length;
        for (let i = start; i < end; i++) {
            annotationPositions.add(i);
        }
    }

    // Now look for canonical names in the text
    for (const [canonicalName, rawName] of declaredEntities) {
        // Skip temporal entities as they shouldn't be found as bare names
        if (entities.get(canonicalName)?.type === "temporal") {
            continue;
        }

        // Create regex to find this canonical name
        // We need to escape special regex characters and handle both space and underscore versions
        const escapedName = canonicalName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const escapedRawName = rawName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        // Look for word boundaries around the name to avoid partial matches
        const nameRegex = new RegExp(
            `\\b(?:${escapedName}|${escapedRawName})\\b`,
            "g",
        );

        let nameMatch;
        while ((nameMatch = nameRegex.exec(rawText)) !== null) {
            const startPos = nameMatch.index;
            const endPos = startPos + nameMatch[0].length;

            // Check if this occurrence is already covered by an @@ annotation
            let isAlreadyAnnotated = false;
            for (let i = startPos; i < endPos; i++) {
                if (annotationPositions.has(i)) {
                    isAlreadyAnnotated = true;
                    break;
                }
            }

            // If not already annotated, add it as an occurrence
            if (!isAlreadyAnnotated) {
                const entityData = entities.get(canonicalName);
                if (entityData) {
                    entityData.occurrences.push({
                        position: startPos,
                        localInfo: [],
                        isImplicit: true, // Mark as implicit reference
                    });
                }
            }
        }
    }

    // Sort occurrences by position for each entity
    for (const entityData of entities.values()) {
        entityData.occurrences.sort((a, b) => a.position - b.position);
    }

    return { cleanText, entities, documentOutline };
}

// Test Case
const testText = "@@Sherlock.Dialog[Elementary, my dear Watson.]";
const result = parseMuseTag(testText);

console.log("Clean Text:", result.cleanText);
console.log("Entities:");
result.entities.forEach((entity, name) => {
    console.log(`Entity: ${name}`);
    console.log(`Type: ${entity.type}`);
    console.log("Occurrences:");
    entity.occurrences.forEach(occ => {
        console.log(`  Position: ${occ.position}`);
        console.log("  Local Info:", JSON.stringify(occ.localInfo));
    });
});
