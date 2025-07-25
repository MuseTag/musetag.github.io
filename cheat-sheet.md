---
title: Cheat Sheet
nav_order: 1
---

A quick reference guide for the MarkPlot semantic annotation language.

## Table of Contents
- [Basic Syntax](#basic-syntax)
- [Entity Annotations](#entity-annotations)
- [Modifier Parameters](#modifier-parameters)
- [Temporal Annotations](#temporal-annotations)
- [Relationships](#relationships)
- [Document Structure](#document-structure)
- [Common Patterns](#common-patterns)

## Basic Syntax

| Syntax | Description | Example | Output for Readers |
|--------|-------------|---------|-------------------|
| `@@Entity` | Visible entity | `@@Sherlock walked in.` | Sherlock walked in. |
| `@@(Entity)` | Invisible entity | `@@(Holmes) walked in.` | walked in. |
| `@@Entity.modifier` | Entity with modifier | `@@Holmes.angry stared.` | Holmes stared. |
| `@@Entity.modifier(param)` | Invisible parameter | `@@Scene.mood(tense) unfolded.` | Scene unfolded. |
| `@@Entity.MODIFIER[param]` | Visible parameter | `@@(Holmes).PROFESSION[detective] arrived.` | detective arrived. |
| `@@.modifier` | Document-level modifier | `# My Story @@.Genre(mystery)` | # My Story |

## Entity Annotations

### Visible Entities
```markplot
@@CharacterName      # Character name appears in text
@@Location_Name      # Location name appears in text
@@CONCEPT            # Concept name appears in text
```

### Invisible Entities
```markplot
@@(CharacterName)    # Entity tracked but name doesn't appear
@@(Location_Name)    # Location tracked but name doesn't appear
@@(CONCEPT)          # Concept tracked but name doesn't appear
```

### Content Capture
All entities capture the complete sentence where they appear:
```markplot
@@Jules was walking down the street.
# Jules captures: "was walking down the street"

@@(Marie) sat on the terrace of a cafe.
# Marie captures: "sat on the terrace of a cafe"
```

## Modifier Parameters

### Invisible Parameters (Metadata)
```markplot
@@Character.age(35)           # Age stored as metadata, not shown
@@Character.mood(angry)       # Mood tracked invisibly
@@.status(draft)              # Document status hidden
@@Scene.weather(rainy)        # Weather metadata
```

### Visible Parameters (Appear in Text)
```markplot
@@(Character).PROFESSION[detective]    # Shows "detective" in text
@@(Character).STATUS[nervous]          # Shows "nervous" in text
@@(Location).TYPE[comfortable apartment] # Shows description in text
@@.GENRE[mystery]                      # Shows "mystery" in text
```

### Combining Parameters
```markplot
@@(Holmes).age(35).PROFESSION[consulting detective] investigated.
# Output: "consulting detective investigated"
# Metadata: Holmes is 35 years old, profession is consulting detective
```

## Temporal Annotations

```markplot
@@(1891-05-04)                 # Absolute date (invisible)
@@(1881-03-04)                 # YYYY-MM-DD format
@@(Day_1)                      # Abstract time
@@(Chapter_3)                  # Narrative time
```

## Relationships

Entities appearing in the same sentence create relationships:
```markplot
@@Holmes observed that @@(Adler).STATUS[nervous] was clearly distressed.
# Creates relationship: Holmes observes Adler in this context
```

## Document Structure

```markplot
# Book Title @@.GENRE[mystery]

## Chapter 1 @@(Watson).Pov

@@(London) @@(1891-05-04)
@@Holmes examined the evidence while @@Watson took notes.
```

## Common Patterns

### Character Introduction
```markplot
@@(Holmes).PROFESSION[consulting detective] entered the room.
# Output: "consulting detective entered the room"
```

### Scene Setting
```markplot
@@(London) @@(1881-03-04) It was a foggy morning.
# Output: "It was a foggy morning"
# Metadata: Scene set in London on 1881-03-04
```

### Character Description
```markplot
@@(Watson).age(35).PROFESSION[military doctor] served in Afghanistan.
# Output: "military doctor served in Afghanistan"  
# Metadata: Watson is 35, profession is military doctor
```

### Point of View
```markplot
## Chapter 1 @@(Watson).Pov

I had not seen @@Holmes for several days.
# Chapter is from Watson's POV, Holmes appears visibly
```

### Document Metadata
```markplot
# A Study in Annotation @@.GENRE[mystery] @@.status(draft)
# Output: "# A Study in Annotation mystery"
# Metadata: Genre is mystery, status is draft
```

### Dialogue and Actions
```markplot
"You have been in Afghanistan, I perceive," @@(Holmes).manner(confidently) said to @@Watson.
# Output: "You have been in Afghanistan, I perceive," said to Watson.
# Metadata: Holmes spoke confidently
```

### Mixed Visibility
```markplot
@@Jules met @@(Marie).STATUS[reading] at the @@library.
# Output: "Jules met reading at the library"
# Tracks: Jules (visible), Marie (invisible with visible status), library (visible)
```

## Tips

- **Use invisible entities** `@@(Entity)` when you want to track without showing the name
- **Use visible parameters** `[param]` when you want description to appear in text
- **Use invisible parameters** `(param)` for metadata that shouldn't appear
- **Combine both** for rich annotation: `@@(Character).age(35).STATUS[tired]`
- **Keep it simple** - start with basic annotations and add complexity as needed

Remember that MarkPlot annotations help you organize your narrative and can be processed by MarkPlot-aware tools, while keeping your text readable for regular readers.