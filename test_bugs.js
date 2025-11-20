
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
    //    - REMOVED as it was interfering with @@(Hidden).Modifier[Visible]
    //    - Pass 4 should handle removal of hidden entities without visible params
    // const hiddenAnnotationRegex = /@@\([^)]+\)(?!\[[^\]]*\])/gu;
    // text = text.replace(hiddenAnnotationRegex, "");

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
                // Add space if visibleParamsOutput doesn't start with punctuation
                // Punctuation chars that shouldn't have preceding space: . , : ; ? ! )
                if (visibleParamsOutput.length > 0 && !/^[.,:;?!)]/.test(visibleParamsOutput)) {
                    separator = " ";
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

    // STEP 1: Parse all @@ annotations
    const annotationRegex =
        /(@{2,4})(?:([\p{L}\p{N}_]+)|\(([^)]+)\))((?:\.[\w:!?]+(?:(?:\(([^)]*)\)|\[[^\]]*\]))?)*)/gu;

    let match;
    while ((match = annotationRegex.exec(rawText)) !== null) {
        const rawName = match[2] || match[3];
        const entityName = rawName.replace(/_/g, " ");
        const modifiersString = match[4] || "";

        if (!entities.has(entityName)) {
            entities.set(entityName, {
                name: entityName,
                occurrences: []
            });
        }

        const entityData = entities.get(entityName);
        const currentOccurrence = {
            position: match.index,
            localInfo: [],
        };

        // Parse modifiers
        const modifierRegex = /\.([\w:!?]+)(?:(?:\(([^)]*)\)|\[([^\]]*)\]))?/g;
        let modMatch;
        while ((modMatch = modifierRegex.exec(modifiersString)) !== null) {
            const modName = modMatch[1];
            const modValue =
                modMatch[2] !== undefined
                    ? modMatch[2]
                    : modMatch[3] !== undefined
                        ? modMatch[3]
                        : null;

            currentOccurrence.localInfo.push({ name: modName, value: modValue });
        }
        entityData.occurrences.push(currentOccurrence);
    }

    return { cleanText, entities };
}

// Test Cases
console.log("--- Test Case 1: No automatic separator ---");
const text1 = "@@Sherlock.Dialog[: Hello]";
const result1 = parseMuseTag(text1);
console.log(`Input: ${text1}`);
console.log(`Output: ${result1.cleanText}`);
console.log(`Expected: Sherlock: Hello`);
if (result1.cleanText === "Sherlock: Hello") console.log("PASS"); else console.log("FAIL");

console.log("\n--- Test Case 2: Hidden entity with Dialog ---");
const text2 = "@@(Sherlock).Dialog[Hello].";
const result2 = parseMuseTag(text2);
console.log(`Input: ${text2}`);
console.log(`Output: ${result2.cleanText}`);
console.log(`Expected: Hello.`);
if (result2.cleanText === "Hello.") console.log("PASS"); else console.log("FAIL");

console.log("Entities found:");
result2.entities.forEach((e, name) => {
    console.log(`Entity: ${name}`);
    console.log("Occurrences:", JSON.stringify(e.occurrences));
});

console.log("\n--- Test Case 3: Hidden entity removal ---");
const text3 = "This is @@(Hidden).";
const result3 = parseMuseTag(text3);
console.log(`Input: ${text3}`);
console.log(`Output: ${result3.cleanText}`);
console.log(`Expected: This is .`);
if (result3.cleanText === "This is .") console.log("PASS"); else console.log("FAIL");
console.log("\n--- Test Case 4: Spacing with text ---");
const text4 = "@@Sherlock.Dialog[Elementary]";
const result4 = parseMuseTag(text4);
console.log(`Input: ${text4}`);
console.log(`Output: ${result4.cleanText}`);
console.log(`Expected: Sherlock Elementary`);
if (result4.cleanText === "Sherlock Elementary") console.log("PASS"); else console.log("FAIL");

console.log("\n--- Test Case 5: Spacing with punctuation ---");
const text5 = "@@Sherlock.Dialog[: Elementary]";
const result5 = parseMuseTag(text5);
console.log(`Input: ${text5}`);
console.log(`Output: ${result5.cleanText}`);
console.log(`Expected: Sherlock: Elementary`);
if (result5.cleanText === "Sherlock: Elementary") console.log("PASS"); else console.log("FAIL");
