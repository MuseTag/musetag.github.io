---
title: Specifications
layout: page_with_toc
---

This document presents the complete technical specifications of the MuseTag language, detailing its syntax, features, and implementation principles. These specifications are intended for developers wishing to create tools compatible with MuseTag, as well as for writers seeking to fully understand the language's capabilities for managing characters, plots, timelines, and other narrative elements. The current status of these specifications is preliminary (draft) and subject to evolution.

## Core Syntax
### Entities
At the heart of MuseTag, there are **entities**.

To declare an entity, use the `@@` marker before its canonical name the first time it appears in the text:

```musetag
@@Alice
```

After this declaration, every occurrence of “Alice” (the canonical name) in the text—before or after the declaration—is considered a reference to the same entity.
You do **not** need to repeat the `@@` marker for subsequent uses.

**Canonical names and underscores**

The canonical name of an entity may contain underscores (`_`) to represent spaces between words. For example:

```musetag
@@Sherlock_Holmes
```

declares the entity “Sherlock Holmes”.
After this declaration, every occurrence of “Sherlock Holmes” (with a space) or `Sherlock_Holmes` (with an underscore) in the text is recognized as a reference to the same entity.

If you refer to the entity using a different name, synonym, or pronoun, use the hidden entity marker:

```musetag
@@(Alice)She smiled.
```

#### Invisible Entities

MuseTag supports "invisible entities"—entities that are never shown in the final text, regardless of how they are referenced (even by their canonical name without `@@`).
Invisible entities are declared by applying the standard `.Hidden` modifier to the entity. Once an entity is marked as `.Hidden`, all its occurrences (including canonical name references) are omitted from the final output.
This is useful for annotating contributors, beta-readers, or other meta-narrative actors who should not appear in the story itself.

Example:
```musetag
@@JDS.Hidden.name(John Doe Smith)
The child@@JDS.Fix[x](s) walk@@JDS.Fix[](ed) to school.
```
Here, `JDS` is an invisible entity (e.g., a beta-reader or author), and all references to `JDS` are hidden in the final text.

**Persistence:**
Once `.Hidden` is applied to an entity, it is invisible everywhere in the text, regardless of subsequent usage or modifier application.

#### Entity hierarchy

You can specify the narrative importance of an entity by the number of `@` signs used in its declaration:

- `@@Entity` — main entity (default)
- `@@@Entity` — secondary entity
- `@@@@Entity` — minor entity

The more `@` signs, the less important the entity is considered.
This hierarchy is optional and only affects how tools may display or prioritize entities; it does not change the core semantics of the text.

**Hierarchy persistence:**
The hierarchy level is global: once an entity is declared as secondary or minor, it keeps that status everywhere in the text, even if referenced with fewer `@`.

**Definition:**
An entity is a meaningful element in your story—like a character, place, or object—that is described, referred to repeatedly, and helps structure the narrative.

MuseTag supports two types of entity annotations:

**Visible entities** use the syntax `@@EntityName`:
```musetag
@@Jules looked at @@Mary.
```
> Jules looked at Mary.

The entity names appear in the final text output (hereinafter called _final text_) and provide semantic tracking.

**Hidden entities** wrap the entity name with parentheses `@@(EntityName)`:
```musetag
@@(Gandalf)The wizard raised his hands.
```
> The wizard raised his hands.

Hidden entities are tracked for semantic analysis but do not appear in the final text. This is useful for referencing an entity when it appears in a way other than its name, or when you want to track entities without cluttering the narrative text.

An entity can be any narrative element that you want to track, analyze, or reference throughout your text - characters, locations, objects, events... By marking these elements as entities, you create a rich semantic layer that tools can use for many purposes, for example:
- Build character profiles and relationship networks
- Generate timelines and event sequences
- Maintain consistency across your story

Entity names:
- Can contain letters (including Unicode letters from any language), digits (0-9) and underscores
- Are case-sensitive
- MUST NOT start with a digit, as this syntax is reserved for temporal entities (see §2.3.4.5)
- MUST NOT contain spaces, use underscores instead (which are replaced by spaces in the final text)
```musetag
@@HMS_Macon references a rigid airship build and operated by the United States Navy.
```
> HMS Macon references a rigid airship build and operated by the United States Navy.

Once a canonical entity name is defined, it can be used in the whole text (before and after) _without_ the entity mark, as long as it is identitical, except for the underscore:

```musetag
@@Sherlock_Holmes looked at @@Watson.
[...]
Watson talked to Sherklock Holmes.
```

It this example, the first sentence define two entities: `Sherlock_Holmes` and `Watson`. Those entities are automatically referenced in the second sentence.

### Entity and Content Capture
Content capture is a core mechanism in MuseTag that associates entities with the context where they appear. **Entities always capture the complete sentence in which they appear.**

```musetag
@@Jules was walking down the street. @@Mary was sitting on the terrace of a cafe. @@(Jules)@@(Mary) Then they saw each other.
```

In this example:
- The first sentence is associated with Jules
- The second sentence is associated with Mary
- The third sentence is associated with both Jules and Mary

This simple, consistent rule ensures predictable behavior while maintaining the semantic connections between entities and their narrative context.

### Entity Grouping Syntax

MuseTag allows you to annotate multiple entities at once using a grouping syntax: list several entity names, separated by commas, inside the parentheses of a hidden entity declaration.

```musetag
@@(Claire,Antoine).age(26)
```

This is a **syntactic convenience**: it is strictly equivalent to writing the same annotation for each entity individually. The modifier(s) following the group are applied to each entity in the group as if they were annotated separately.

For example, the above is equivalent to:

```musetag
@@Claire.age(26)
@@Antoine.age(26)
```

Grouping does not create a persistent group or relationship between the entities; it simply allows you to factorize your annotations for clarity and brevity. There is no support for nested groups, and mixing visible and hidden entities in a group is allowed by syntax but not generally useful.

### Entity Modifiers
Entity modifiers allow you to add attributes and metadata to entities using dot notation. These modifiers can be temporary states, permanent traits, or standard features.
```musetag
@@Jules.Pov             # Simple modifier
```

#### Types of Modifiers
MuseTag supports three distinct categories of modifiers:
1. **local modifiers** (lowercase `.modifier`)
   - Must start with a lowercase letter
   - Represent temporary or contextual attributes
   - Example: `.happy`, `.injured`, `.angry`

2. **GLOBAL modifiers** (uppercase `.MODIFIER`)
   - Must contain only uppercase letters
   - Define permanent characteristics
   - Example: `.NAME`, `.OCCUPATION`, `.BIRTHPLACE`

3. **Standard modifiers** (Title-case or Namespaced, see §2.3.4 and §2.3.5)
   - Built-in modifiers (Title-case):
     - Must start with a capital letter, followed by lowercase letters
     - Reserved for core MuseTag features
     - Examples: `.Character`, `.Place`, `.Type`
   - Application modifiers (Namespaced):
     - Use registered namespace prefix followed by any name
     - Allow applications to extend the modifier system
     - Examples: `Writer:plot`, `Analysis:theme`

#### Modifier Parameters
Modifiers can accept parameters using two different syntaxes:

**Hidden parameters** use parentheses `()` for meta-information that should not appear in the final text:
```musetag
@@Jules.age(42) walked down the street.           # age metadata stored but hidden
@@.status(draft)                                  # document status hidden
```
> Jules walked down the street.

**Visible parameters** use square brackets `[]` for content that should appear in the final text:
```musetag
@@(Jules).PROFESSION[detective] investigated the case.
```
> detective investigated the case.

**Combined parameters:**
A modifier can accept both a visible parameter (`[]`) and a hidden parameter (`()`) at the same time.
This enables advanced editorial and collaborative features, such as proposing corrections, suggestions, or comments, where the visible parameter is the text to be shown and the hidden parameter is the meta-information (e.g., correction, suggestion, or comment).

Example:
```musetag
The child@@JDS.Fix[x](s) walk@@JDS.Fix[](ed) to school.
Sherlock JDS.Suggest[put his foot in it](was clumsy).
Sherlock JDS.Comment[put his foot in it](awkward phrasing).
```
- `.Fix[x](s)`: Proposes to replace `x` by `s` (correction).
- `.Fix[](ed)`: Proposes to add `ed`.
- `.Suggest[...](...)`: Suggests a reformulation.
- `.Comment[...](...)`: Adds an editorial comment.

The parameter content is passed as-is to the modifier implementation, which can parse it according to its own needs.

##### Combining Modifiers
Modifiers can be combined freely (order does not affect semantic meaning):
```musetag
@@Holmes.PROFESSION(detective).mood(worried)
@@Watson.BACKGROUND(military).injured.tired
```
and in any order:
```musetag
@@Jules.Character.happy.NAME(Durant)  # Semantically equivalent to
@@Jules.happy.NAME(Durant).Character  # Semantically equivalent to
@@Jules.NAME(Durant).Character.happy
```

A parameter can be repeated if you like:
```
@@Jules.mood(sad).mood(embarassed) said something.
```

##### Null Modifiers (Unqualified Annotations)

MuseTag allows annotating an entity with a parameter without specifying a modifier. This is called the **null modifiers**. There are two forms:

- **Local null modifier** (applies only at the specific occurrence):
  ```musetag
  @@Entity(parameter)
  ```
  This is a shortcut for `@@Entity.Note(parameter)`, where `.Note` is the standard modifier for a local note.

- **Global null modifier** (applies everywhere the entity appears, unless overridden locally):
  ```musetag
  @@Entity_(parameter)
  ```
  This is a shortcut for `@@Entity.Gnote(parameter)`, where `.Gnote` is the standard modifier for a global note and the underscore after the entity name indicates global scope.

The null modifier is designed for quick, unqualified annotations—information that is relevant in the moment but does not fit a specific, structured modifier. The global form is useful for defining recurring or default information about an entity, while the local form is for context-specific notes.

**Examples:**
```musetag
@@Anne_(red hair)                   # Equivalent to @@Anne.Gnote(red hair)
@@Anne(25 years old) smiled.        # Equivalent to @@Anne.Note(25 years old)
```
In these examples, "red hair" is attached to Anne globally but "25 years old" only at the time where it appears.

Unqualified annotations are less exploitable by automated tools or structured exports. For maximum semantic clarity and tool support, prefer explicit modifiers when possible.

##### Multi-line Parameters
Parameters can span multiple lines for better readability and organization:
```musetag
@@Jules.BACKGROUND(
  Born in Paris, 1985
  Education:
  - Sciences Po (2003-2006)
  - Stanford Law School (2006-2009)
  Career: International lawyer
)
```
Key points:
- Opening parenthesis must immediatly follow the modifier
- Content can span multiple lines

#### Visibility Rules
Modifiers themselves never appear in the final text, but their parameters may:
- **Modifiers**: Always hidden (`.drunk`, `.PROFESSION`, etc.)
- **Hidden parameters** `()`: Never appear in final text
- **Visible parameters** `[]`: Always appear in final text
- **Invisible entities** (`.Hidden`): All occurrences of the entity are hidden, including canonical name references, regardless of context or modifier usage.
- **Combined parameters**: When both a visible and a hidden parameter are present, the visible parameter is shown in the final text, and the hidden parameter is omitted.

```musetag
@@Jules.drunk.age(35) stumbled forward.
```
> Jules stumbled forward.

```musetag
@@(Jules).PROFESSION[detective] investigated carefully.
```
> detective investigated carefully.

```musetag
The child@@JDS.Fix[x](s) walk@@JDS.Fix[](ed) to school.
```
> The childx walk to school.

#### Standard Modifiers
Standard modifiers are documented in `namespaces/global.yaml` following the same format as application-specific modifiers (see §2.3.5.4). The specification below provides an overview of core standard modifiers, but the authoritative reference is the YAML file.

##### Reserved Capitalization
Modifiers starting with a capital letter (and not entirely uppercase, see §2.3.1) are reserved for standard MuseTag features. Custom modifiers MUST start with a lowercase letter or be entirely uppercase.

##### Core Standard Modifiers
- `.Type(type)`: Defines the entity type. Common types include: "character", "place", "event", "object", or may be whatever you want.
  - `.Character`: Sugar for `.Type(character)`
  - `.Place`: Sugar for `.Type(place)`
  - `.Event`: Sugar for `.Type(event)`
  - `.Object`: Sugar for `.Type(object)`
- `.Note(content)`: Attaches a local note to an entity (shortcut: `@@Entity(content)`)
- `.Gnote(content)`: Attaches a global note to an entity (shortcut: `@@Entity_(content)`)
- `.Alias(alias)`: Defines an alternative name (alias) for an entity. When the alias appears in the text, even without the `@@` marker, it is recognized as a reference to the canonical entity. Multiple aliases can be defined for the same entity; all are cumulative.
  - Example: `@@(Sherlock_Holmes).Alias[Holmes] looked at @@(John_Watson).Alias[Watson]. Holmes and Watson were famous detectives.`
  - Here, both "Holmes" and "Watson" will be recognized as references to their respective entities everywhere in the text, even without the `@@` marker.
- `.ChildOf(entity)`: Declares that the current entity is the direct child (descendant, member, part) of the specified entity. This establishes a hierarchical (tree-like) relationship, usable for family, spatial, temporal, organizational, or other structures.
  - Example: `@@Alice.ChildOf(@@Marie)` (Alice is the child of Marie; Marie is the parent of Alice)
  - Example: `@@Paris.ChildOf(@@France)` (Paris is part of France)
- `.ParentOf(entity)`: Declares that the current entity is the direct parent (ascendant, container, group) of the specified entity. This is logically equivalent to the inverse `.ChildOf` relation.
  - Example: `@@Marie.ParentOf(@@Alice)` (Marie is the parent of Alice)
  - Example: `@@France.ParentOf(@@Paris)` (France contains Paris)
- **Standard sugars for `.ChildOf` and `.ParentOf`** (all strictly equivalent, use whichever is most natural in context):
  - `.PartOf(entity)` / `.HasPart(entity)`
  - `.BelongsTo(entity)` / `.Includes(entity)`
  - `.MemberOf(entity)` / `.GroupOf(entity)`
  - `.ContainedIn(entity)` / `.ContainerOf(entity)`
  - `.DescendantOf(entity)` / `.AncestorOf(entity)`
  - `.OwnedBy(entity)` / `.OwnerOf(entity)`
  - All these sugars are interchangeable and establish the same hierarchical link.
  - Example: `@@Alice.ChildOf(@@Marie)` ≡ `@@Alice.PartOf(@@Marie)` ≡ `@@Marie.ParentOf(@@Alice)` ≡ `@@Marie.HasPart(@@Alice)`
- `.Dialog(dialogue)`: Marks a passage as a dialogue involving the annotated entity or entities. The parameter is the dialogue text itself, usually provided as a visible parameter in square brackets (`[]`). When used with entity grouping, all listed entities are considered participants in the dialogue.
  - Example: `@@Sherlock.Dialog[What do you think, my friend?]`
  - Example (grouped): `@@(Sherlock,Watson).Dialog[
--- What do you think about it, dear friend?
--- I do not know what to think.
]`
- `.Geo(latitude, longitude)`: Associates geographic coordinates with an entity (usually a place). Example: `@@Paris.Geo(48.8566, 2.3522)`
 - This modifier is primarily intended for use by editors or tools, not for manual entry.
- `.Status(status)`: Indicates the status of the associated section.
  - `.Draft`: Sugar for `.Status(draft)`
  - `.Final`: Sugar for `.Status(final)`
- `.Todo(What is to do)`: indicates something to do.
- `.Version(version)`: Specifies the version of the associated section.
- `.Pov`: Indicates that the narrative follows the point of view of the entity.
- `.Hidden`: Marks an entity as invisible. All occurrences of the entity (including canonical name references) are omitted from the final text. Used for meta-entities such as authors, beta-readers, or editorial actors.
  - Example: `@@JDS.Hidden.name(John Doe Smith)`
- `.Fix`: Proposes a simple correction (spelling, grammar, typo). The original text is in brackets `[]`, the correction in parentheses `()`.
- `.Suggest`: Suggests a reformulation or alternative phrasing. The suggested replacement is in parentheses, the original in brackets.
- `.Comment`: Adds an editorial comment. The commented text is in brackets, the comment itself in parentheses (always hidden).
- `.Voice(expression)[text]`: Marks a passage as spoken or thought by the annotated entity, with optional expression/context. The visible parameter (in square brackets) is the spoken or thought text; the hidden parameter (in parentheses) can indicate expression, intonation, or context (e.g. "intrigued", "thought", "whispering"). Useful for identifying speech, thoughts, or interior monologue, and for TTS (text-to-speech) or to guide actors recording audiobooks or dramatic readings, as well as for analysis.
  - Example: `@@(Holmes).Voice(intrigued)[What is happening here?]`

- `.Color(color)`: Assigns a display color to the entity for graphical tools and visualizations (timelines, interaction graphs, highlights). The parameter is the color value and is normally provided as an invisible parameter (parentheses). Accepted formats follow standard CSS color definitions (hex `#RRGGBB` / `#RGB`, `rgb()`, `rgba()`, `hsl()`, CSS color names, etc.). This modifier is global in scope and is intended to be used by tooling rather than rendered in text.
  - Parameters:
    - `color` (string): Color value in a CSS-acceptable format. By convention this parameter is invisible (use parentheses) because it is not meant to appear in the final reader output.
  - Examples:
    - `@@Holmes.Color(#ffcc00)` — assigns Holmes the color `#ffcc00` for visualizations.
    - `@@(Holmes,Watson).Color(steelblue)` — assigns the CSS color `steelblue` to both Holmes and Watson.
  - Notes:
    - `.Color` is primarily a visualization hint for tools (timeline bars, node colors, highlights). Implementations should normalise and validate color values and may convert palette tokens to concrete colors according to project/theme settings.
    - Invalid or unrecognised color specifications may be ignored or reported as a warning by tools.
    - By convention `.Color` behaves as a single, global display attribute for an entity; it is expected to be set at most once per entity in typical use (subsequent declarations may override depending on tool policy).

**Note:**  
You can also use `.Voice` with the null entity (`@@.`) to indicate a vocal effect or expression for narration or any passage not attributed to a specific entity.  
Example:
```musetag
@@.Voice(whispering)[The night was silent.]
```

---

### Parameter imbrication and successive analysis

Modifier parameters in MuseTag are themselves MuseTag text: they can contain other entities, modifiers, or annotations, with no limit on imbrication imposed by the language.  
MuseTag analysis does not require deep recursive processing: each process (tool, extension, etc.) only handles the modifier it is responsible for, extracts what it needs from the parameter (often the first entity), and then the global analysis continues on the rest of the text, including inside parameters.

**Hierarchical example:**
```musetag
@@Mummy.ParentOf(@@Mom.ParentOf(@@Jane.age(25)))
```
- The `ParentOf` process on `@@Mummy` extracts `@@Mom` from its parameter, then the global analysis continues on `@@Mom.ParentOf(@@Jane.age(25))`.
- The `ParentOf` process on `@@Mom` extracts `@@Jane`, then the global analysis continues on `@@Jane.age(25)`.
- The `age` process on `@@Jane` extracts `25`.

**Dialog/voice example:**
```musetag
@@.Dialog[
  @@(Holmes).Voice(intrigued)[--- What is happening here?]
  @@(Watson).Voice(thought)[--- I wonder...]
  @@(Lestrade).Voice[--- Gentlemen, any progress? @@(Holmes).Comment[interrupting](Lestrade cuts in abruptly)]
]
```
- The global analysis detects the `.Dialog` modifier and treats its parameter (the dialogue block) as MuseTag text, continuing analysis on each line.
- Each `.Voice` is then processed, and any nested modifiers (such as `.Comment` inside a line) are also detected as the global analysis passes through.

**Recommendation:**  
The author is free to nest as much as desired, especially in multiline structures. Readability is the author's responsibility: MuseTag imposes no restriction on the depth or complexity of imbrication, as long as the syntax is valid.

**Global modifier aggregation:**
By default, global modifiers are cumulative: each occurrence adds information to the entity, rather than replacing previous values.
Only modifiers explicitly defined as unique (such as `.Status` or `.Version`) replace previous values.

Example usage:
```musetag
@@Jules.Character.Pov[looked at] @@Paris.Place.
@@.Draft
@@.Version(1.2)
```

Invalid usage (will be ignored and remains in the final text):
```musetag
@@Jules.Custom
```

##### Standard Modifier Scope
The scope of standard modifiers is determined by their semantic nature:
- **Type Modifiers** (`.Type`, `.Character`, `.Place`, etc.): Global by default as they define the fundamental nature of entities

- **Status Modifiers** (`.Draft`, `.Final`): Local by default as they describe temporary states

- **Point of View Modifiers** (`.Pov`): Local by default as they typically apply to specific scenes or chapters

- **Version Modifiers** (`.Version`): Global by default as they apply to whole document sections

##### Overriding Standard Modifier Scope
The default scope of any standard modifier can be explicitly overridden using scope indicators:
- `.Modifier!` forces global scope
- `.Modifier?` forces local scope
Examples:
```musetag
@@Jules.Character     # Global by default (type modifier)
@@Jules.Character?    # Forced local scope
@@Jules.Pov          # Local by default (POV modifier)
@@Jules.Pov!         # Forced global scope
```
When using scope overrides:
- The override applies only to the specific instance of the modifier
- The original semantic default remains unchanged for other uses
- Scope overrides must immediately follow the modifier name
#### Temporal Entities
Temporal entities are a special type of entity that makes extensive use of standard modifiers to handle dates, times, and temporal relationships in your narrative. These entities are tightly integrated with the `.Type` modifier and its standard variants (`.Date`, `.Time`, `.DateTime`) to provide both implicit and explicit temporal typing.

While temporal entities have their own specific syntax formats (described below), they are recognized and processed through the standard modifier system. This integration allows for:
- Automatic type detection based on format (e.g., "2025-04-28" is recognized as a Date)
- Explicit typing when needed (e.g., `@@(2025-04-28).Type(Date)`)
- Consistent handling of temporal relationships and scopes
- Support for both standard and alternative calendar systems

A temporal entity can be either absolute (using standard calendar) or abstract (using relative time markers). In both cases, the temporal typing system ensures consistent processing and validation.
##### Absolute Time
Absolute temporal entities use ISO 8601 format with space as datetime separator:
```musetag
@@(2025-04-28).Type(Date)              # Date only
@@(14:30:00+01:00).Type(Time)          # Time only
@@(2025-04-28 14:30:00+01:00).Type(DateTime)  # Full date and time
```

Shortened forms are allowed:
```musetag
@@(2025-04-28 14:30)     # Minutes precision
@@(2025-04)              # Month precision
@@(14:30)                # Time without timezone
```

The `.Type` modifier (`Date`, `Time`, or `DateTime`) is optional for temporal entities as they are automatically recognized by their format.

For dates before Common Era (BCE/BC), use the minus sign prefix following ISO 8601:
```musetag
@@(-0044-03-15)              # Ides of March, 44 BCE
@@(-0753-04-21)              # Founding of Rome
@@(-12000-01-01/GST)         # Event in alternative calendar BCE
```

Note:
- The year 1 BCE is represented as year 0000
- The year 2 BCE is represented as year -0001
- Years before 1 BCE must include leading zeros to maintain at least 4 digits
- The minus sign is only used for years, never for other units
- Time components remain unchanged regardless of era

Both space and 'T' separator are accepted for full ISO 8601 compatibility:
```musetag
@@(2025-04-28 14:30:00+01:00)  # Space separator (preferred for readability)
@@(2025-04-28T14:30:00+01:00)  # ISO 8601 T separator
```

##### Abstract Time
Abstract temporal entities use special format with '@' prefix followed by level indicators (Y for year, M for month, D for day):
```musetag
@@(@Y1).Type(Date)              # Year 1
@@(@Y1-M3).Type(Date)           # Year 1, Month 3
@@(@Y1-M3-D12).Type(Date)       # Year 1, Month 3, Day 12
@@(@Y1-M3-D12 14:30).Type(DateTime)  # With time
```

Shortened forms focusing on specific units are allowed:
```musetag
@@(@D42 08:15)    # Day 42 at 08:15
@@(@D42)          # Just Day 42
```

##### Alternative Calendars
Alternative calendar systems can be specified using a suffix:
```musetag
@@(3027-13-42/GST)           # Galactic Standard Time
```
Alternative calendar systems must follow standard numerical formatting:
- Years must use 4 or more digits
- Other units (months, days, hours, minutes, seconds) must use exactly 2 digits
- Month and day values can range from 01 to 99 to accommodate alternative calendars
- Time format remains HH:MM:SS with values from 00 to 99 for each unit

Examples:
```musetag
@@(3027-13-42/GST)           # Valid: month=13, day=42
@@(12345-99-99 99:99:99/GST) # Valid: all units using maximum values (except year, which has no maximum or minimal value)
@@(99:99/GST)                # Valid
@@(99:99)                    # Invalid with standard time system
@@(027-13-42/GST)            # Invalid: year less than 4 digits
@@(3027-4-12/GST)            # Invalid: month needs 2 digits
```

The extended range (up to 99) for all units provides flexibility for alternative calendar systems while maintaining a consistent, parseable format.
Time zones in alternative calendars follow the same format as standard time (±HH:MM) but allow values up to 99:
```musetag
@@(3027-13-42 14:30+23/GST)       # Valid: timezone offset of 23 hours
@@(3027-13-42 14:30+99:99/GST)    # Valid: maximum timezone offset
@@(3027-13-42 14:30+100:00/GST)   # Invalid: hours exceed 99
```

The extended range for timezone offsets (up to ±99:99) accommodates alternative calendar systems that might use different day lengths or time divisions while maintaining a consistent, parseable format.

##### Temporal Scope
Temporal entities follow specific scope rules:
1. A temporal entity's scope extends until another temporal entity of the same or higher precision is encountered
2. Lower precision entities inherit context from higher precision entities in scope
3. Explicit scope using brackets overrides these rules

Example:
```musetag
@@(2025) The year started with great ambitions.
@@(04-28) Morning events unfolded rapidly.
@@(14:30) Afternoon brought a specific event.
@@(19:00) Evening events concluded the day.
@@(2026-01-01) New year events marked a fresh beginning.
```
These scope rules allow for natural chronological organization while maintaining precision when needed.
##### Integration Examples
Temporal entities can be combined with other MuseTag features for rich narrative control:
```musetag
# Combining with characters and events
@@(1815-06-18).Type(Date) @@(Napoleon).DESCRIPTION[destiny] faced his ultimate test at @@Waterloo.Place.
# Using with nested annotations and modifiers
@@(1789-07-14) The @@(Bastille).Type(Place) fell as @@Paris.excited erupted in revolution.
# Timeline organization with multiple entities
@@(@Y1) In the first year, @@(@M3) during the third month, @@Jules.tired struggled with @@Writer_Block, but by @@(@M6) summer @@(Jules) had @@.STATUS[finished the first draft].
```
These examples show how temporal entities work seamlessly with:
- Character entities and their modifiers
- Place entities and type annotations
- Nested entity references
- Local modifiers for narrative mood
- The null entity for contextual attributes
### Application Specific Modifiers
Applications can define their own modifiers using namespaces.
#### Namespace Definition
Application namespaces MUST:
- Consist of ASCII letters only (a-z, A-Z) and digits (0-9)
- End with a single colon (:)
- Be registered through the official registration process (see $2.3.5.4)
- MUST not be already registered
- Are case-insensitive (e.g., `Writer:` and `writer:` mean the same namespace)
Examples of valid namespaces:
- `App:`
- `Writer2:`
Invalid namespaces:
- `Pip-App:` (contains hyphen)
- `École:` (contains non-ASCII character)
#### Modifier Syntax
Application-specific modifiers are formed by:
1. The registered namespace (including colon)
2. The modifier name (can use any capitalization)
Examples:
```musetag
@@Jules.App:plot        # App application's plot modifier
@@Marie.Writer:character   # Writer's companion character modifier
```
#### Scope Rules
Application-specific modifiers follow the same scope rules as standard modifiers:
- Their default scope is determined by their documented semantic nature
- Scope can be overridden using ! (global) and ? (local) modifiers
Example:
```musetag
@@Jules.App:Plot        # Default scope (as documented by App)
@@Jules.App:Plot!       # Forced global scope
@@Jules.App:Plot?       # Forced local scope
```
Applications MUST document the default scope of their modifiers in their documentation.
#### Modifier Documentation Format
Applications MUST document their modifiers using this standardized format:
```yaml
namespace: ApplicationNamespace
version: 1.0.0
status: [registered|draft]  # Status of this namespace registration
liveat: "https://example.com/live-documentation-url"  # URL to latest development version
application:
  name: "Application Full Name"
  url: "https://application.example.com"
publisher:
  name: "Publisher Name"
  url: "https://publisher.example.com"
maintainer:
  name: "Maintainer Name"
  contact: "maintainer@example.com"
documentation: "https://docs.example.com/modifiers"  # Stable documentation URL
modifiers:
  - name: modifierName
    description: Brief description of the modifier's purpose
    scope: [global|local]  # Default scope
    parameters:
      - name: paramName
        type: [string|number|date|...]
        description: Parameter description
        values: [value1, value2]  # Optional: enumeration of valid values
    examples:
      - code: "@@Entity.ApplicationName:modifierName"
        description: "Basic usage example"
    notes: |
      Additional implementation notes or warnings
```
This format is used by all modifiers documentation, including standard modifiers (see `namespaces/global.yaml`).
#### Documentation Requirements
- All registered namespaces MUST provide documentation in this format
- All modifiers in the namespace MUST be documented
- Version numbers MUST follow semantic versioning
- Breaking changes MUST increment the major version number
#### Namespace Registration Process
To avoid conflicts and maintain consistency across the ecosystem, application developers MUST register their namespaces. The registration process is currently being defined and will be detailed in a future version of the specification.
Until the registration process is formalized:
- Developers SHOULD document their namespace choices in their application documentation
- Developers SHOULD check existing applications to avoid namespace conflicts
Note that once the official registration process is established:
- Previously used unregistered namespaces will NOT be automatically grandfathered
- Applications may need to migrate to newly assigned namespaces
- The registration process will be designed to minimize disruption to existing applications
#### Registration Fees and Contributions
The namespace registration process is and will always remain **free** for everyone. This ensures that the MuseTag ecosystem stays open and accessible to all developers, from individual open-source contributors to large companies.
However, if you are registering a namespace for a commercial/proprietary application, we kindly encourage (but do not require) a financial contribution to support the MuseTag project's development and maintenance. These contributions help us:
- Maintain the registration infrastructure
- Improve the specification
- Develop reference implementations
- Create better documentation
- Support the community
Suggested contribution levels:
- Small businesses (annual revenue under 100,000 USD): 25-100 USD
- Medium businesses (annual revenue 100,000-1 million USD): 100-500 USD
- Large businesses (annual revenue over 1 million USD): 500+ USD
All contributions are voluntary and have no impact on the registration process or timeline. The namespace registration will be processed with the same attention and priority regardless of whether a contribution is made.
Contributing companies will be acknowledged (unless they prefer to remain anonymous) in our [SUPPORTERS.md](SUPPORTERS.md) file.
#### Modifiers in Nested Annotations
When using modifiers with nested annotations, there are specific rules for how they apply:
1. **Local Scope**: Modifiers apply only to their directly associated entity, not to nested annotations:
```musetag
@@Jules.happy looked at @@(Marie).EXPRESSION[smiling].  # Only Jules is happy
@@(Scene).dark @@Jules walked past @@Marie.    # Only the Scene is dark
```
2. **Null Entity Exception**: Modifiers on the null entity affect the entire captured content, including nested annotations:
```musetag
@@.STYLE[This text] and @@(Jules).SPEECH[his words] are emphasized.
@@.pov(Jules) @@(Marie).EXPRESSION[smiled] as @@(Jules) entered.  # All from Jules' POV
```
3. **Cascading Effects**: While modifiers don't affect nested entities directly, tools can analyze the relationship between modifiers at different levels:
```musetag
@@Scene.night[@@Jules.tired[met] @@Marie.worried[near the bridge]]
# Tools can understand this is a night scene with tired and worried characters
```

#### Modifier vs Punctuation
To avoid ambiguity between modifiers and regular text, MuseTag follows specific rules for handling dots in the text:
1. **Modifier Identification**:
   A dot is considered a modifier separator if and only if:
   - It immediately follows an entity name or another modifier
   - It is immediately followed by an ASCII letter (a-z or A-Z)
2. **Punctuation Treatment**:
   A dot is treated as regular punctuation when:
   - Followed by a number (e.g., ".42")
   - Followed by an accented character (e.g., ".été")
   - Followed by punctuation or spaces
   - At the end of text
   - Part of sequences like ellipsis ("...")
Examples:
```musetag
# Valid modifiers
@@Jules.happy(smiled)        # .happy is a modifier
@@Jules.tired.sad           # Both .tired and .sad are modifiers
# Treated as punctuation
@@Jules.42(looked tired)     # .42 is regular text
@@Jules.été[was hot]         # .été is regular text
@@Jules.[was surprised]      # . is punctuation
@@Jules...and then          # ... is ellipsis punctuation
@@Jules.                    # . is sentence-ending punctuation
```
This permissive approach ensures that:
- Common punctuation patterns work naturally
- Typing mistakes don't break the text
- No complex error handling is needed
- Writers can use normal punctuation freely
### Null Entity
While entities typically represent narrative elements (characters, places, events), there are cases where you want to apply modifiers or capture content without creating an actual entity. This is where the null entity `@@.` comes in.
The null entity is a special construct that:
- Can take any type of modifier
- Never appears in the final text
- Doesn't create entity relationships
- Is purely used for meta-information and processing instructions
For example:
```musetag
@@.HIGHLIGHT[This text is special] but no entity is created.
@@.draft(This section needs review)
@@.STYLE[Text with custom font] appears in output
@@.skip(Content to be ignored in certain exports)
@@.metadata.author(John Smith)
```
The null entity is particularly useful for:
- Applying styling or formatting not supported by Markdown
- Adding processing directives
- Including editorial notes or status indicators
- Attaching metadata to sections of text
- Creating hidden document structure (see §2.7)
Because it doesn't create actual entity relationships, the null entity is perfect for adding meta-information that should influence processing but not narrative analysis:
```musetag
@@.Status(draft)                      # Document status (hidden)
@@.HIGHLIGHT[Important text]          # Visual formatting (visible)
@@.editorial(Needs revision)          # Editorial notes (hidden)
@@.type(chapter)                      # Document structure (hidden)
```
### Annotation Scope
MuseTag annotations follow specific scope rules depending on their placement and modifiers.
#### File-level Annotations
Annotations at the very beginning of a file (before any content) apply to the entire file:
```musetag
@@.Author(John Doe)
@@.Version(1.0)
# First chapter
```
#### Header Annotations
Apply to all content under that header until the next header of same or higher level:
```musetag
@@.(# Chapter 1).Pov(Jules)
This text is from Jules' point of view.
## Scene 1
Still from Jules' point of view.
# Chapter 2
New chapter, POV reset.
```
#### Paragraph Annotations
Apply only to the immediately following paragraph:
```musetag
@@.(* Important theme)
This paragraph discusses the theme.
This paragraph is not affected by the previous annotation.
```
#### Custom Scope
Annotations apply to the sentence in which they appear:
```musetag
@@.flashback(2012-28-02) This content is a flashback to that specific date.
Normal narrative continues here without the flashback annotation.
```
Tools processing these annotations should respect these scope rules when analyzing or transforming the text.
### Hidden Markdown Structures
Combining the null entity and null local modifiers allows MuseTag to embed Markdown syntax that will be processed for analysis but won't appear in the final text:
```musetag
@@.(# Hidden Title) This sentence has a hidden structural marker.
Normal visible text continues here...
```
#### Syntax
The syntax follows this pattern:
- Must use the null entity (`@@.`)
- Markdown syntax is enclosed in parentheses (hidden parameters)
- Can be used with any valid Markdown syntax
- Applies to the sentence containing the annotation
Examples:
```musetag
@@.(# Act One) The story begins here with a hidden act marker.
@@.(## Scene 1) This sentence starts a new scene invisibly.
```
#### Processing
- These structures are processed as regular Markdown during analysis
- They contribute to document structure and metadata
- They are completely removed from the final text
- Tools should treat them as equivalent to their visible Markdown counterparts for analysis purposes
- Each annotation applies only to its containing sentence

### Interaction with Markdown
MuseTag annotations are processed before Markdown formatting:
```musetag
**@@Jules.happy**     # Becomes "**Jules**"
@@**Jules.happy**     # Remains "@@**Jules.happy**"
```
This ensures consistent behavior and allows Markdown formatting to be applied to the final text.
## Processing and Workflow
### Parser Types and Processing Chain
MuseTag parsers can be categorized into two main types:
1. **Analysis Parsers**: These parsers read and interpret annotations to extract information, build entity graphs, analyze relationships, or generate derived content (character sheets, timelines, etc.). They represent the core use case of MuseTag annotations.
2. **Production Parsers**: While not the primary focus of MuseTag, these parsers can transform the text for specific outputs. Since they allow enriching the writing possibilities without interrupting the writing flow, they are a welcome extension of MuseTag's capabilities.
A fundamental rule applies to ALL parsers: they MUST preserve ALL annotations intact in their output, even when transforming the text. This ensures that:
- Each parser can interpret any annotation according to its own rules
- Multiple interpretations of the same annotations remain possible throughout the chain
- Annotations remain available for subsequent parsers
The only exception to this rule is the Cleanup Parser, which is specifically designed to remove all annotations at the end of the processing chain to produce the final human-readable text.
### Cleanup Parser
The Cleanup Parser is a special parser responsible for removing visible MuseTag annotations from the text. It has specific characteristics that distinguish it from other parsers:
#### Position in the Chain
The Cleanup Parser:
- Must be the last MuseTag parser in any processing chain
- Can only be used once in a chain
#### Operation Scope
The Cleanup Parser:
- Resolves visible entity names (e.g., converting @@Jules_Durant to "Jules Durant")
- Removes all visible MuseTag annotations
- When an annotation is removed during the cleanup process, if its removal leaves an empty line in the output, that empty line should also be removed automatically to ensures that no unnecessary blank lines are present in the final document.
### Error Handling
MuseTag follows a permissive approach to error handling:
1. **Invalid Syntax**: Any text that cannot be interpreted as valid MuseTag syntax is treated as regular content and left unchanged:
```musetag
@@[Invalid syntax] remains "@@[Invalid syntax]"
@Jules (missing @) remains "@Jules"
```
2. **Partial Annotations**: Incomplete annotations (unclosed bracket or parenthesis)  preserved as-is:
```musetag
@@Jules[unclosed bracket becomes "Jules[unclosed bracket"
```
3. **Unknown Modifiers**: While there are no "invalid" modifiers syntactically, modifiers that are neither standard nor from a registered application namespace are simply removed during cleanup:
```musetag
@@Jules.unknownModifier[text] becomes "Jules text"
```
This approach ensures that:
- Writing flow is never interrupted
- Content is never lost
- Manual correction remains possible
- Valid annotations are still processed even in presence of invalid ones
## Implementation Guidelines and Best Practices
### Parser Implementation
#### Parser Design
- Keep parsers single-purpose and composable
- Ensure parsers are stateless when possible
- Implement clear error handling and reporting
- Support streaming processing for large documents
#### Entity Handling
- Store entity references in a case-sensitive manner
- Maintain bi-directional entity relationships
- Index all entity occurrences with their context, including file name and line number
#### Error Recovery
- Continue processing after non-critical errors
- Maintain document integrity during partial failures
- Provide clear error context for debugging
- Support graceful degradation of features
### Tool Creation Guidelines
When creating tools that support MuseTag, consider these key aspects:
#### User Interface Design
- Keep the annotation process as natural as typing
- Avoid forcing users to use dialog boxes or menus for basic annotations
- Provide visual feedback without being intrusive
- Consider offering both keyboard shortcuts and mouse interactions
#### Entity Management
- Provide easy ways to browse and search existing entities
- Allow quick entity reuse without breaking the writing flow
- Consider auto-completion for entity names
- Enable easy entity renaming with proper refactoring
#### Real-time Features
- Implement incremental parsing for large documents
- Consider background analysis for complex operations
- Provide immediate visual feedback for annotations
## Examples
This section provides practical examples of MuseTag in action, demonstrating how the annotation language can be used in real-world writing scenarios.
### Basic Character Annotations
```musetag
@@Jules entered the café and spotted @@(Marie).STATUS[reading] by the window.
@@Jules.happy approached her table.
```
> Jules entered the café and spotted reading by the window. Jules approached her table.
In this example:
- Two character entities (Jules and Marie) are defined
- Jules is visible in the text, Marie is hidden
- A visible parameter (.STATUS[reading]) provides narrative content
- A temporary state modifier (.happy) is applied to Jules as metadata
### Rich Narrative Structure
```musetag
# The Meeting @@.STATUS[Draft] @@.Version(0.2)
## Scene 1 @@(Paris).Place @@(1923-04-15)
@@(Jules).Pov waited nervously at @@Café_Lumière.Place, @@(Jules).ACTIVITY[drumming his fingers] on the @@manuscript.Object in front of @@(Jules).
@@(Editor).Character.mood(critical) took a long look at @@(Jules).POSSESSIVE[his] work, @@(Editor).EXPRESSION[giving nothing away].
```
This more complex example demonstrates:
- Document-level modifiers with visible parameters (.STATUS[Draft])
- Header-scoped annotations (Place and Date)
- Point of view indicators (Jules.Pov)
- Character and object typing
- hidden entity references with visible parameters
- Metadata storage with hidden parameters
### Timeline and Events
```musetag
@@(1942-06-04) The @@Allied_Forces prepared for @@D_Day.Event.
@@(1942-06-05) @@(Eisenhower).TITLE[The Supreme Commander] postponed the operation by 24 hours due to @@bad_weather.
@@(1942-06-06 06:30) @@(Allied_Forces).DESCRIPTION[The first wave] landed on @@Normandy.Place.
```
This historical example shows how MuseTag can track complex timelines with:
- Absolute dates with different precision
- Events with temporal context
- hidden entity references with visible descriptive parameters
- Mixed visible and hidden entities for narrative control
### Relationships and Dialog
```musetag
@@Jules.Character asked, "What do you think of my story?"
@@Marie.Character.mood(thoughtful) considered her response. "I think the protagonist needs more development," @@(Marie).MANNER[she said finally].
@@Jules.mood(disappointed) nodded slowly. @@(Jules).THOUGHT[He knew she was right].
```
This dialog example demonstrates:
- Character attribution with visible entities in narrative
- Mood tracking as hidden metadata
- hidden entities with visible parameters for narrative elements
- Clean dialog without cluttered annotations
- Mixed visible and hidden entity references
