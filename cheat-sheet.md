---
title: Cheat Sheet
nav_order: 1
---

A quick reference guide for the MarkPlot semantic annotation language.

## Table of Contents
- [Basic Syntax](#basic-syntax)
- [Entity Annotations](#entity-annotations)
- [Entity Content](#entity-content)
- [Modifiers](#modifiers)
- [Temporal Annotations](#temporal-annotations)
- [Relationships](#relationships)
- [Document Structure](#document-structure)
- [Common Patterns](#common-patterns)

## Basic Syntax

| Syntax | Description | Example | Output for Readers |
|--------|-------------|---------|-------------------|
| `@@Entity` | Simple entity annotation | `@@Sherlock walked in.` | Sherlock walked in. |
| `@@Entity[content]` | Entity with visible content | `@@Holmes[The detective] smiled.` | The detective smiled. |
| `@@(Entity)[content]` | Entity with content capture | `@@(Baker_Street)[221B Baker Street, London]` | 221B Baker Street, London |
| `@@Entity.modifier` | Entity with modifier | `@@Holmes.ANGRY stared.` | Holmes stared. |
| `@@Entity.modifier(param)` | Modifier with parameters | `@@Scene.mood(tense)` | Scene |
| `@@.modifier` | Document-level modifier | `# My Story @@.Genre(mystery)` | # My Story |

## Entity Annotations

```
@@CharacterName      # Simple mention of a character
@@Location_Name      # Locations typically use underscores
@@CONCEPT            # Concepts/themes often use ALL CAPS
@@(Entity)           # Parentheses for entity reference without rendering its name
```

## Entity Content

```
@@Entity[visible text]            # Text shown to reader, associated with entity
@@(Entity)[descriptive content]   # Capture content into entity's definition
@@Entity[visible @@Nested[text]]  # Nested annotations create relationships
```

## Modifiers

```
@@Character.STATE             # Character's state (uppercase = standard modifier)
@@Character.ANGRY             # Emotional state
@@Character.POV               # Point of view indicator
@@Location.WEATHER(rainy)     # Modifier with parameter
@@Character.custom_modifier   # Custom modifier (lowercase)
@@.Genre(fantasy)             # Document-level modifier
```

### Common Standard Modifiers

| Modifier | Purpose | Example |
|----------|---------|---------|
| `.POV` | Point of view | `## Chapter 1 @@(Watson).POV` |
| `.FIRST`, `.LAST` | First/last appearance | `@@Character.FIRST entered.` |
| `.Genre` | Genre categorization | `# Story @@.Genre(mystery)` |
| `.WHY`, `.HOW`, `.WHAT` | Narrative purpose | `@@(MarkPlot).WHY[explanation]` |
| `.Entity` | Entity definition | `@@(Character).Entity` |

## Temporal Annotations

```
@@(1891-05-04)                 # Absolute date
@@(1881-03-04)                 # YYYY-MM-DD format
@@(Day 1)                      # Abstract time
@@(Chapter 3)                  # Narrative time
```

## Relationships

```
@@(Holmes)[He observed @@(Adler)[Ms. Adler was clearly nervous]].

# Creates relationship: Holmes observes Adler
```

## Document Structure

```
# Book Title @@.Genre(mystery)

## Chapter 1 @@(Watson).POV

@@(London)
@@(1891-05-04)

@@Holmes examined the evidence while @@Watson took notes.
```

## Common Patterns

### Character Introduction
```
@@(Holmes)[Sherlock Holmes, a consulting detective with remarkable deductive abilities]
```

### Scene Setting
```
@@(London)
@@(1881-03-04)
```

### Dialogue Attribution
```
"@@(Holmes)[You have been in Afghanistan, I perceive]," were his first words to me.
```

### Character Relationship
```
@@(Holmes)[He observed @@(Irene)[Ms. Adler was clearly nervous]].
```

### Point of View
```
## Chapter 1 @@(Watson).Pov

I had not seen @@Holmes for several days...
```

### Document Metadata
```
# A Study in Annotation @@.Genre(mystery)
```

Remember that MarkPlot annotations are invisible to your readers but help you organize your narrative and can be processed by MarkPlot-aware tools.
