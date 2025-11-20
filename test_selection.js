
const entities = new Map();
entities.set("Sherlock", {
    name: "Sherlock",
    aliases: ["Holmes"],
    occurrences: []
});

const contextText = "Holmes looked at the evidence.";
const entitiesInContext = new Set();

// Current logic (simplified) - only looks for explicit @@ tags
const entityRegex = /@@(?:([\p{L}\p{N}_]+)|\(([\p{L}\p{N}_]+)\))/gu;
let match;
while ((match = entityRegex.exec(contextText)) !== null) {
    const entityName = (match[1] || match[2]).replace(/_/g, " ");
    entitiesInContext.add(entityName);
}

console.log("Entities found (current logic):", [...entitiesInContext]);

// New logic - looks for names and aliases
const newEntitiesInContext = new Set();

// 1. Add explicit annotations (keep existing logic)
// Reset regex
entityRegex.lastIndex = 0;
while ((match = entityRegex.exec(contextText)) !== null) {
    const entityName = (match[1] || match[2]).replace(/_/g, " ");
    newEntitiesInContext.add(entityName);
}

// 2. Add implicit references (names and aliases)
entities.forEach((entity, name) => {
    const candidates = [name, ...(entity.aliases || [])];
    candidates.forEach(candidate => {
        // Escape special regex chars
        const escaped = candidate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`\\b${escaped}\\b`, 'u');
        if (regex.test(contextText)) {
            newEntitiesInContext.add(name);
        }
    });
});

console.log("Entities found (new logic):", [...newEntitiesInContext]);
