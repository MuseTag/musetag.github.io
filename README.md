# MarkScribe Annotation Language @@.draft

> MarkScribe: Annotation Language for Writers

```markscribe
## Why @@MarkScribe? @@(me).pov

As a @@(me)[writer], I found myself drowning in character sheets, timeline documents,
and location descriptions scattered across multiple files and tools.
@@(problem)Every time I needed to check a detail about a character, a specific place, an event,
I had to break my writing flow to search through my notes.
When and where @@Jules and @@Isabelle met for the first time?

@@(solution)[I needed a way to keep track of all these elements right within my manuscript,
something that wouldn't force me to leave my text editor or interrupt my creative process].
That's how @@(MarkScribe)[the idea of a simple, inline annotation system] was born - not as another writing tool,
but as a _natural_ extension of the writing process itself.]

As a @@(me)[coder], I would now be able to write tools that could understand my narrative elements,
analyze my story structure, and help me visualize my characters' relationships.
I could even generate character sheets, timelines, and location maps automatically from my text.

The possibilities are endless.
```

---

**MarkScribe, a semantic annotation language for writers**, helps them to organize and structure their work through simple, intuitive annotations **within their texts**. By providing a lightweight way to track characters, locations, plot elements and their relationships, it supports the natural non-linear nature of creative writing while staying out of the way.

The annotations are designed to be human-readable and optional, allowing writers to focus on their content while maintaining a clear overview of their narrative elements when needed. As annotations are typed directly into the text, writers can add them without interrupting their typing flow or switching between menus and buttons.

Compatible with standard text editors and Markdown, MarkScribe aims to be **a practical tool that requires minimal learning and adapts to each writer's workflow**.

---

While primarily designed for creative writers, MarkScribe's simple yet powerful annotation system can benefit other fields as well. Literary scholars can use it to analyze texts and track themes, motifs, or character arcs. Game designers and screenwriters might find it useful for managing complex narratives and branching storylines. Even technical writers can leverage it to maintain consistency in documentation or track relationships between different system components.

However, these secondary use cases will never compromise **MarkScribe's core mission: providing writers with a natural, unobtrusive way to organize their creative work**.

---

This document is intended to developpers and tool creators who wish to implement MarkScribe support in their applications. If you are a writer interested in using MarkScribe, you should skip this to the [Quick Start Guide](QuickStart.md).

This document outlines the core syntax, design principles, and potential use cases for MarkScribe, as well as suggestions for processing, workflow, and enriched exports. While the language itself is simple, the possibilities it opens up for writing tools are vast. **By adopting MarkScribe, developers can empower writers to focus on their stories while providing them with the tools they need to bring their narratives to life**.

---

## Historical Context

The need for MarkScribe emerged from limitations in existing approaches to narrative organization and annotation:

- **Dedicated Writing Software** (Scrivener, yWriter, etc.): While powerful, these tools lock writers into specific applications and formats, making it difficult to switch tools or collaborate with others using different software.

- **External Documentation** (character sheets, plot outlines): Keeping separate documents forces writers to constantly switch context, breaking their creative flow. These documents also tend to become outdated as the story evolves.

- **Comments and Metadata** (Word, Google Docs): Built-in commenting systems are designed for collaboration and revision rather than narrative organization. They don't provide ways to track relationships between story elements.

---

### Previous Annotation Systems

- **XML/SGML**: While technically capable, their verbose syntax is intrusive and difficult to write naturally. They're better suited for formal documentation than creative writing.

- **Markdown Extensions**: While numerous, they focus on formatting, academic citations, or technical documentation. None address the specific needs of creative writers for tracking narrative elements and their relationships.

- **Custom Tagging Systems**: Usually tied to specific software or workflows, making them non-portable and limiting their adoption.

---

### Why MarkScribe?

MarkScribe addresses these limitations by:
- Staying within the text, where the writing happens
- Using a minimal, intuitive syntax that doesn't interrupt the writing flow
- Remaining independent of any specific software
- Supporting both simple use cases and complex analysis
- Allowing writers to annotate as much or as little as they want
- Enabling powerful tools while staying out of the way

This approach bridges the gap between the simplicity writers need and the power tools developers can provide.

---

## 1. Design Principles

1. **Human-Readability**: The annotation syntax must remain readable and intuitive for human writers
2. **Markdown Compatibility**: Full compatibility with standard Markdown
3. **Extensibility**: The system should allow for easy extension and custom annotation types
4. **Contextual**: Annotations should capture context directly within the text
5. **Non-Intrusive**: Annotations should enhance rather than disrupt the writing flow
6. **Tooling-Friendly**: The syntax should be easily parsable by tools and software

---

## 2. Core Syntax

At the heart of MarkScribe, there are **entities**. An entity can be any narrative element that you want to track, analyze, or reference throughout your text - characters, locations, objects, events, or even abstract concepts. By marking these elements as entities, you create a rich semantic layer that tools can use to:

- Build character profiles and relationship networks
- Generate timelines and event sequences
- Create location maps and movement tracking
- Analyze narrative patterns and themes
- Maintain consistency across your story

This semantic layer remains invisible to readers while providing powerful capabilities for writers and tools.

---

### 2.1 Entity Annotations

Entities are created using annotations that follow one of two basic syntaxes:

1. Visible entity: `@@Jules` - The entity name appears in the final text
2. Hidden entity: `@@(Jules)` - The entity is tracked but doesn't appear in the text

This dual syntax gives you the flexibility to:
- Reference characters directly in dialog or narration using visible entities
- Add semantic meaning to pronouns or implied references using hidden entities
- Track entities without affecting your prose's natural flow
- Create rich metadata without cluttering your text

---

For example:
```markscribe
@@Jules was walking in the street when he saw @@(Isabelle)_her_.
```

will output the final text for human readers (called simply _final text_ in the following, even if other documents may be generated using the annotations):

> Jules was walking in the street when he saw _her_.

---

Entities may be what ever you want, with the exception of temporal entities which follow specific rules (see §2.4.4.5):

```markscribe
@@Jules references a character named Jules.
@@Montmartre[, a district of Paris] references a place.
@@HMS_Macon references a rigid airship build and operated by the United States Navy.
```

Entity names:
- Can contain letters (including accented characters), digits (0-9) and underscores
- Can use Unicode letters from any language (é, à, ß, ñ, 漢, etc.)
- MUST NOT start with a digit, as this syntax is reserved for temporal entities (see §2.4.4.5)
- Have no minimum or maximum length
- Are case-sensitive

---

#### 2.1.1 Spaces in Entity Names

For visible entities, underscores in entity names are converted to spaces in the final text:
```markscribe
@@Jules_Durant walked down the street.
```
will output:
> Jules Durant walked down the street.

Multiple consecutive underscores in entity names are treated as a single space, following standard Markdown whitespace rules:
```markscribe
@@Jules_Durant      # "Jules Durant"
@@Jules__Durant     # "Jules Durant"
@@Jules___Durant    # "Jules Durant"
```

---

### 2.2 Entity Reference and Content Capture

The **content capture mechanism** is a core feature of MarkScribe. It allows fragments of text to be associated with entities, creating a rich semantic layer that tools can leverage to analyze, document, and visualize narrative elements.

When an entity is annotated in the text, the surrounding content is automatically captured and linked to that entity. This captured content can include descriptions, actions, dialogue, or any other relevant narrative element.

---

Tools using MarkScribe can then aggregate all the captured content associated with an entity to:

- **Document the entity**: For example, generate a character sheet by compiling descriptions and actions captured throughout the story.
- **Analyze relationships**: Captures can include references to other entities, enabling tools to study interactions and relationships between them in the narrative context.
- **Track evolution**: By analyzing captures in chronological or narrative order, it becomes possible to follow the development of characters, locations, or events over the course of the story.

---

For example:
```markscribe
@@Jules was walking down the street.
```
This simple line captures information about Jules's action that tools can analyze later.

---

Content can be captured in two ways:
- Implicitly through default capture rules (for natural writing flow)
- Explicitly using square brackets (for precise control)

---

#### 2.2.1 Default Content Capture

By default, MarkScribe automatically captures content around entities without requiring any special syntax. This allows for natural writing while still tracking narrative elements:

Content is automatically captured following these rules:

---

1. **Inside a sentence**: The entire sentence is captured
```markscribe
@@Jules was walking down the street.
-> Captures "Jules was walking down the street."
```

---

2. **At heading start**: Only the heading text is captured
```markscribe
## @@(Jules)At the market
-> Captures "## At the market"
```

---

Note: When multiple entities appear in the same scope without explicit brackets, each entity captures the same content:
```markscribe
@@Jules walked to @@Marie.
```
Both entities capture the whole sentence.

---

#### 2.2.2 Explicit Content Capture

While default capture is convenient for natural writing, there are times when you need precise control over what content is associated with an entity. This is where explicit content capture using square brackets `[...]` comes in:

```markscribe
@@Jules[only these words] are captured, not the whole sentence.
@@Jules[smiled warmly] as @@Marie[entered the room].
```

Explicit capture with brackets:
- Overrides the default capture rules
- Precisely defines what content is associated with each entity

---

Examples of explicit vs default capture:
```markscribe
# Default capture takes the whole sentence
@@Jules was happy today.                 -> Captures "Jules was happy today."

# Explicit capture takes only bracketed content
@@Jules[was happy] today.         -> Captures only "Jules was happy"

# Hidden entity with visible content
@@(Jules)[His heart raced].       -> Captures emotion without showing "Jules"
```

Note: Brackets MUST immediately follow the entity name (no space allowed):
```markscribe
@@Jules[correct capture]                      # Correct
@@Jules [incorrect, brackets show in output]  # Wrong
```

---

#### 2.2.3 Capture Priority

When multiple capture rules could apply, priority is:
1. Explicit brackets (highest priority)
2. Heading capture
3. Sentence capture (lowest priority)

---

#### 2.2.4 Space Handling with Brackets Content Capture

When an entity is followed by bracketed content, the space between the entity name and the content is handled according to these rules:

1. If the content begins with a punctuation mark (`,.;:!?`), no space is added:
```markscribe
@@Mary[, smiling,] continued her way.
```
> Mary, smiling, continued her way.

2. In all other cases, a space is automatically added:
```markscribe
@@Jules[took his car].
```
> Jules took his car.

---

This behavior ensures natural text flow while maintaining proper punctuation rules. Compare:
```markscribe
@@Mary[looked at] @@Jules[, thoughtful].
```
> Mary looked at Jules, thoughtful.

---

#### 2.2.5 Multi-line Content Capture

Content capture can span multiple lines, which is particularly useful for:
- Long descriptions
- Dialog
- Structured content
- Complex interactions between entities

---

Example of multi-line capture:
```markscribe
@@Jules[picked up the letter and read:
  "Dear Marie,
  I hope this finds you well..."
].

# Capturing dialog and internal thoughts
@@Jules[said, "I've been thinking
about what you told me yesterday.
It changes everything."] while @@(Marie)[felt
her heart skip a beat at his words].
```

---
### 2.3 Nested Annotations

Annotations can be nested within captured content, allowing you to track complex relationships and layered narrative elements:

```markscribe
@@(Jules)[He met @@Isabelle[who was reading a book]].
```

---

Nested annotations are useful for:
- Tracking interactions between entities
- Creating hierarchical relationships
- Maintaining context in complex scenes
- Linking related narrative elements

The content of a nested annotation belongs both to its direct entity and to any enclosing entities, allowing tools to analyze relationships at multiple levels.

---

### 2.4 Entity Modifiers

**Entity modifiers** are a powerful way to enrich entities with additional attributes, metadata, or contextual information. By using dot notation, modifiers allow writers to specify characteristics, states, or relationships directly within the text, without interrupting the writing flow.


```markscribe
@@Jules.Pov             # Simple modifier
```

---

Modifiers can serve multiple purposes, for example:
- **Add attributes**: Define traits or properties of an entity, such as `.happy`, `.injured`, or `.NAME(Durant)`.
- **Track states**: Indicate temporary or contextual states, such as `.angry` or `.tired`.
- **Provide metadata**: Attach structured information, such as `.age(42)` or `.OCCUPATION(detective)`.

---

Each modifier is directly linked to the entity it follows, creating a semantic layer that tools can use to:
- **Analyze entities**: Aggregate all modifiers associated with an entity to build a detailed profile.
- **Track changes**: Observe how an entity's attributes or states evolve over the course of the narrative.

---

#### 2.4.1 Types of Modifiers

MarkScribe supports three distinct categories of modifiers:

1. **local modifiers** (lowercase `.modifier`)
   - Represent temporary or contextual attributes
   - Must start with a lowercase letter
   - Example: `.happy`, `.injured`, `.angry`

---

2. **GLOBAL modifiers** (uppercase `.MODIFIER`)
   - Define permanent characteristics
   - Must contain only uppercase letters
   - Example: `.NAME`, `.OCCUPATION`, `.BIRTHPLACE`

---

3. **Standard modifiers** (Title-case or Namespaced, see §2.4.4 and §2.4.5)
   - Built-in modifiers (Title-case):
     - Reserved for core MarkScribe features
     - Must start with a capital letter, followed by lowercase letters
     - Examples: `.Character`, `.Place`, `.Type`
   - Application modifiers (Namespaced):
     - Allow applications to extend the modifier system
     - Use registered namespace prefix followed by any name
     - Examples: `Writer:plot`, `Analysis:theme`

---

#### 2.4.2 Modifier Parameters

Modifiers use parentheses `()` to accept parameters. Unlike content captured with brackets (which appears in the final text), parameters are used for meta-information and configuration that should not appear in the narrative:

```markscribe
# Parameters are meta-information
@@Jules.age(42)             # The number 42 won't appear in the text
```

The parameter content is passed as-is to the modifier implementation, which can parse it according to its own needs.

---

##### 2.4.2.1 Combining Modifiers
Modifiers can be combined freely (order does not affect semantic meaning):
```markscribe
@@Holmes.PROFESSION(detective).mood(worried)
@@Watson.BACKGROUND(military).injured.tired
```
and in any order:
```markscribe
@@Jules.Character.happy.NAME(Durant)  # Semantically equivalent to
@@Jules.happy.NAME(Durant).Character  # Semantically equivalent to
@@Jules.NAME(Durant).Character.happy
```

A parameter can be repeated if you like:
```
@@Jules.mood(sad).mood(embarassed) said something.
```

---



##### 2.4.2.2 Multi-line Parameters

Parameters can span multiple lines for better readability and organization:

```markscribe
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

---

#### 2.4.3 Visibility Rules

Modifiers never appear in the final text:
```markscribe
@@Jules.drunk[stumbled forward].
-> Jules stumbled forward.
```

#### 2.4.4 Standard Modifiers

Standard modifiers are documented in `namespaces/global.yaml` following the same format as application-specific modifiers (see 2.4.5.4). The specification below provides an overview of core standard modifiers, but the authoritative reference is the YAML file.

##### 2.4.4.1 Reserved Capitalization

Modifiers starting with a capital letter (and not entirely uppercase, see section 2.4.1) are reserved for standard MarkScribe features. Custom modifiers MUST start with a lowercase letter or be entirely uppercase.

##### 2.4.4.2 Core Standard Modifiers

- `.Type(type)`: Defines the entity type. Common types include: "character", "place", "time", "event", "object", "organization" or whatever.
  - `.Character`: Sugar for `.Type(character)`
  - `.Place`: Sugar for `.Type(place)`
  - `.Object`: Sugar for `.Type(object)`
  - `.Event`: Sugar for `.Type(event)`

- `.Status(status)`: Indicates the status of the associated section.
  - `.Draft`: Sugar for `.Status(draft)`
  - `.Final`: Sugar for `.Status(final)`

- `.Version(version)`: Specifies the version of the associated section.

- `.Pov`: Indicates that the narrative follows the point of view of the entity.

Example usage:
```markscribe
@@Jules.Character.Pov[looked at] @@Paris.Place.
@@.Draft
@@.Version(1.2)
```

Invalid usage (will be ignored and remains in the final text):
```markscribe
@@Jules.Custom
```

##### 2.4.4.3 Standard Modifier Scope

The scope of standard modifiers is determined by their semantic nature:

- **Type Modifiers** (`.Type`, `.Character`, `.Place`, etc.): Global by default as they define the fundamental nature of entities
- **Status Modifiers** (`.Draft`, `.Final`): Local by default as they describe temporary states
- **Point of View Modifiers** (`.Pov`): Local by default as they typically apply to specific scenes or chapters
- **Version Modifiers** (`.Version`): Global by default as they apply to whole document sections

##### 2.4.4.4 Overriding Standard Modifier Scope

The default scope of any standard modifier can be explicitly overridden using scope indicators:
- `.Modifier!` forces global scope
- `.Modifier?` forces local scope

Examples:
```markscribe
@@Jules.Character     # Global by default (type modifier)
@@Jules.Character?    # Forced local scope
@@Jules.Pov          # Local by default (POV modifier)
@@Jules.Pov!         # Forced global scope
```

When using scope overrides:
- The override applies only to the specific instance of the modifier
- The original semantic default remains unchanged for other uses
- Scope overrides must immediately follow the modifier name

#### 2.4.4.5 Temporal Entities

Temporal entities are a special type of entity that makes extensive use of standard modifiers to handle dates, times, and temporal relationships in your narrative. These entities are tightly integrated with the `.Type` modifier and its standard variants (`.Date`, `.Time`, `.DateTime`) to provide both implicit and explicit temporal typing.

While temporal entities have their own specific syntax formats (described below), they are recognized and processed through the standard modifier system. This integration allows for:
- Automatic type detection based on format (e.g., "2025-04-28" is recognized as a Date)
- Explicit typing when needed (e.g., `@@(2025-04-28).Type(Date)`)
- Consistent handling of temporal relationships and scopes
- Support for both standard and alternative calendar systems

A temporal entity can be either absolute (using standard calendar) or abstract (using relative time markers). In both cases, the temporal typing system ensures consistent processing and validation.

##### 2.4.4.5.1 Absolute Time

Absolute temporal entities use ISO 8601 format with space as datetime separator:

```markscribe
@@(2025-04-28).Type(Date)              # Date only
@@(14:30:00+01:00).Type(Time)          # Time only
@@(2025-04-28 14:30:00+01:00).Type(DateTime)  # Full date and time
```

Shortened forms are allowed:
```markscribe
@@(2025-04-28 14:30)     # Minutes precision
@@(2025-04)              # Month precision
@@(14:30)                # Time without timezone
```

The `.Type` modifier (`Date`, `Time`, or `DateTime`) is optional for temporal entities as they are automatically recognized by their format.

For dates before Common Era (BCE/BC), use the minus sign prefix following ISO 8601:
```markscribe
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
```markscribe
@@(2025-04-28 14:30:00+01:00)  # Space separator (preferred for readability)
@@(2025-04-28T14:30:00+01:00)  # ISO 8601 T separator
```

##### 2.4.4.5.2 Abstract Time

Abstract temporal entities use special format with '@' prefix followed by level indicators (Y for year, M for month, D for day):

```markscribe
@@(@Y1).Type(Date)              # Year 1
@@(@Y1-M3).Type(Date)           # Year 1, Month 3
@@(@Y1-M3-D12).Type(Date)       # Year 1, Month 3, Day 12
@@(@Y1-M3-D12 14:30).Type(DateTime)  # With time
```

Shortened forms focusing on specific units are allowed:
```markscribe
@@(@D42 08:15)    # Day 42 at 08:15
@@(@D42)          # Just Day 42
```

##### 2.4.4.5.3 Alternative Calendars

Alternative calendar systems can be specified using a suffix:
```markscribe
@@(3027-13-42/GST)           # Galactic Standard Time
```

Alternative calendar systems must follow standard numerical formatting:
- Years must use 4 or more digits
- Other units (months, days, hours, minutes, seconds) must use exactly 2 digits
- Month and day values can range from 01 to 99 to accommodate alternative calendars
- Time format remains HH:MM:SS with values from 00 to 99 for each unit

Examples:
```markscribe
@@(3027-13-42/GST)           # Valid: month=13, day=42
@@(12345-99-99 99:99:99/GST) # Valid: all units using maximum values (except year, which has no maximum or minimal value)
@@(99:99/GST)                # Valid
@@(99:99)                    # Invalid with standard time system
@@(027-13-42/GST)            # Invalid: year less than 4 digits
@@(3027-4-12/GST)            # Invalid: month needs 2 digits
```

The extended range (up to 99) for all units provides flexibility for alternative calendar systems while maintaining a consistent, parseable format.

Time zones in alternative calendars follow the same format as standard time (±HH:MM) but allow values up to 99:
```markscribe
@@(3027-13-42 14:30+23/GST)       # Valid: timezone offset of 23 hours
@@(3027-13-42 14:30+99:99/GST)    # Valid: maximum timezone offset
@@(3027-13-42 14:30+100:00/GST)   # Invalid: hours exceed 99
```

The extended range for timezone offsets (up to ±99:99) accommodates alternative calendar systems that might use different day lengths or time divisions while maintaining a consistent, parseable format.

##### 2.4.4.5.4 Temporal Scope

Temporal entities follow specific scope rules:

1. A temporal entity's scope extends until another temporal entity of the same or higher precision is encountered
2. Lower precision entities inherit context from higher precision entities in scope
3. Explicit scope using brackets overrides these rules

Example:
```markscribe
@@(2025)[
  @@(04-28)[Morning events...]
  @@(14:30)[Afternoon specific event...]
  @@(19:00)[Evening events...]
]
@@(2026-01-01)[New year events...]
```

These scope rules allow for natural chronological organization while maintaining precision when needed.

##### 2.4.4.5.5 Integration Examples

Temporal entities can be combined with other MarkScribe features for rich narrative control:

```markscribe
# Combining with characters and events
@@(1815-06-18).Type(Date)[On that fateful day,] @@Napoleon[faced his destiny at] @@Waterloo.Place.

# Using with nested annotations and modifiers
@@(1789-07-14)[The @@(Bastille).Type(Place)[fortress] fell as @@Paris.excited[erupted in revolution].

# Timeline organization with multiple entities
@@(@Y1)[In the first year,
  @@(@M3)[During the third month,] @@Jules.tired[struggled with] @@Writer_Block,
  but by @@(@M6)[summer] @@(Jules)[he] had @@.happy[finished the first draft].
]
```

These examples show how temporal entities work seamlessly with:
- Character entities and their modifiers
- Place entities and type annotations
- Nested entity references
- Local modifiers for narrative mood
- The null entity for contextual attributes

### 2.4.5 Application Specific Modifiers

Applications can define their own modifiers using namespaces.

#### 2.4.5.1 Namespace Definition

Application namespaces MUST:
- Consist of ASCII letters only (a-z, A-Z) and digits (0-9)
- End with a single colon (:)
- Be registered through the official registration process (see 2.4.5.4)
- MUST not be already registered
- Are case-insensitive (e.g., `Writer:` and `writer:` mean the same namespace)

Examples of valid namespaces:
- `App:`
- `Writer2:`

Invalid namespaces:
- `Pip-App:` (contains hyphen)
- `École:` (contains non-ASCII character)

#### 2.4.5.2 Modifier Syntax

Application-specific modifiers are formed by:
1. The registered namespace (including colon)
2. The modifier name (can use any capitalization)

Examples:
```markscribe
@@Jules.App:plot        # App application's plot modifier
@@Marie.Writer:character   # Writer's companion character modifier
```

#### 2.4.5.3 Scope Rules

Application-specific modifiers follow the same scope rules as standard modifiers:
- Their default scope is determined by their documented semantic nature
- Scope can be overridden using ! (global) and ? (local) modifiers

Example:
```markscribe
@@Jules.App:Plot        # Default scope (as documented by App)
@@Jules.App:Plot!       # Forced global scope
@@Jules.App:Plot?       # Forced local scope
```

Applications MUST document the default scope of their modifiers in their documentation.

#### 2.4.5.4 Modifier Documentation Format

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
        required: [true|false]
        description: Parameter description
        values: [value1, value2]  # Optional: enumeration of valid values
    examples:
      - code: "@@Entity.ApplicationName:modifierName"
        description: "Basic usage example"
    notes: |
      Additional implementation notes or warnings
```

This format is used by all modifiers documentation, including standard modifiers (see `namespaces/global.yaml`).

#### 2.4.5.5 Documentation Requirements

- All registered namespaces MUST provide documentation in this format
- All modifiers in the namespace MUST be documented
- Version numbers MUST follow semantic versioning
- Breaking changes MUST increment the major version number

#### 2.4.5.6 Namespace Registration Process

To avoid conflicts and maintain consistency across the ecosystem, application developers MUST register their namespaces. The registration process is currently being defined and will be detailed in a future version of the specification.

Until the registration process is formalized:
- Developers SHOULD document their namespace choices in their application documentation
- Developers SHOULD check existing applications to avoid namespace conflicts

Note that once the official registration process is established:
- Previously used unregistered namespaces will NOT be automatically grandfathered
- Applications may need to migrate to newly assigned namespaces
- The registration process will be designed to minimize disruption to existing applications

#### 2.4.5.7 Registration Fees and Contributions

The namespace registration process is and will always remain **free** for everyone. This ensures that the MarkScribe ecosystem stays open and accessible to all developers, from individual open-source contributors to large companies.

However, if you are registering a namespace for a commercial/proprietary application, we kindly encourage (but do not require) a financial contribution to support the MarkScribe project's development and maintenance. These contributions help us:

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

#### 2.4.6 Modifiers in Nested Annotations

When using modifiers with nested annotations, there are specific rules for how they apply:

1. **Local Scope**: Modifiers apply only to their directly associated entity, not to nested annotations:
```markscribe
@@Jules.happy[looked at @@Marie[who smiled]]  # Only Jules is happy
@@Scene.dark[@@Jules[walked] past @@Marie]    # Only the Scene is dark
```

2. **Null Entity Exception**: Modifiers on the null entity affect the entire captured content, including nested annotations:
```markscribe
@@.style.italic[This text and @@Jules[his words] are all italic]
@@.pov(Jules)[@@Marie[smiled] as @@(he)[he] entered]  # All from Jules' POV
```

3. **Cascading Effects**: While modifiers don't affect nested entities directly, tools can analyze the relationship between modifiers at different levels:
```markscribe
@@Scene.night[@@Jules.tired[met] @@Marie.worried[near the bridge]]
# Tools can understand this is a night scene with tired and worried characters
```


#### 2.4.7 Modifier vs Punctuation

To avoid ambiguity between modifiers and regular text, MarkScribe follows specific rules for handling dots in the text:

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
```markscribe
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

### 2.5 Null Entity

While entities typically represent narrative elements (characters, places, events), there are cases where you want to apply modifiers or capture content without creating an actual entity. This is where the null entity `@@.` comes in.

The null entity is a special construct that:
- Can take any type of modifier
- Never appears in the final text
- Doesn't create entity relationships
- Is purely used for meta-information and processing instructions

For example:
```markscribe
@@.special[This text is special] but no entity is created.
@@.draft(This section needs review)
@@.style.font[Text with custom font]
@@.skip[Content to be ignored in certain exports]
@@.metadata.author[John Smith]
```

The null entity is particularly useful for:
- Applying styling or formatting not supported by Markdown
- Adding processing directives
- Including editorial notes or status indicators
- Attaching metadata to sections of text
- Creating hidden document structure (see §2.7)

Because it doesn't create actual entity relationships, the null entity is perfect for adding meta-information that should influence processing but not narrative analysis:
```markscribe
@@.status(draft)                      # Document status
@@.style.highlight[Important text]    # Visual formatting
@@.editorial(Needs revision)          # Editorial notes
@@.Type(chapter)[                     # Document structure
  @@Jules[entered] as @@Marie[left]  # Normal entity tracking
]
```

### 2.6 Annotation Scope

MarkScribe annotations follow specific scope rules depending on their placement and modifiers.

#### 2.6.1 File-level Annotations

Annotations at the very beginning of a file (before any content) apply to the entire file:
```markscribe
@@.Author(John Doe)
@@.Version(1.0)
# First chapter
```

#### 2.6.2 Header Annotations

Apply to all content under that header until the next header of same or higher level:
```markscribe
@@.(# Chapter 1).Pov(Jules)
This text is from Jules' point of view.
## Scene 1
Still from Jules' point of view.
# Chapter 2
New chapter, POV reset.
```

#### 2.6.3 Paragraph Annotations

Apply only to the immediately following paragraph:
```markscribe
@@.(* Important theme)
This paragraph discusses the theme.

This paragraph is not affected by the previous annotation.
```

#### 2.6.4 Custom Scope

Using brackets to explicitly define annotation scope:
```markscribe
@@.flashback(@@2012-28-02)[
This content is a flashback,
spanning multiple paragraphs,
regardless of the document structure.
]

Normal narrative continues here.
```

Tools processing these annotations should respect these scope rules when analyzing or transforming the text.

### 2.7 Hidden Markdown Structures

MarkScribe allows embedding Markdown syntax that will be processed for analysis but won't appear in the final text. This is achieved through a special syntax using the null entity:

```markscribe
@@.(# Hidden Title)
Normal visible text continues here...
```

#### 2.7.1 Syntax

The syntax follows this pattern:
- Must use the null entity (`@@.`)
- Markdown syntax is enclosed in parentheses
- Can be used with any valid Markdown syntax

Examples:
```markscribe
@@.(# Act One)
@@.(## Scene 1)
The story begins...

@@.(* Important theme starting here)
She took his @@.(**)[trembling] hand.

@@.(> These words are significant)
Words that will appear normally.
```

#### 2.7.2 Processing

- These structures are processed as regular Markdown during analysis
- They contribute to document structure and metadata
- They are completely removed from the final text
- Tools should treat them as equivalent to their visible Markdown counterparts for analysis purposes

#### 2.7.3 Use Cases

- Invisible document structure
- Literary analysis markers
- Working notes and annotations
- Alternative organization schemes
- Hidden emphasis for analysis

Example of complex usage:
```markscribe
@@.(# Chapter 1).Status(draft)
@@.(## Opening Scene).Type(scene)[
    @@Jules.Character[walked through] @@Paris.Place.

    @@.(* Character introduction)
    His @@.(**)[determined] stride revealed his state of mind.
]
```

### 2.8 Interaction with Markdown

MarkScribe annotations are processed before Markdown formatting:

```markscribe
**@@Jules.happy**     # Becomes "**Jules**"
@@**Jules.happy**     # Remains "@@**Jules.happy**"
```

This ensures consistent behavior and allows Markdown formatting to be applied to the final text.

## 3. Use Cases

### 3.1 Creative Writing

- Character tracking and development
- Timeline management
- Location mapping
- Point of view indicators
- Theme and motif tracking

### 3.2 Literary Analysis

- Character relationship networks
- Narrative structure visualization
- Thematic mapping
- Linguistic pattern identification

### 3.3 Collaborative Writing

- Role assignment and management
- Version control for narrative elements
- Commenting and feedback integration

## 4. Processing and Workflow

### 4.1 Parser Types and Processing Chain

MarkScribe parsers can be categorized into two main types:

1. **Analysis Parsers**: These parsers read and interpret annotations to extract information, build entity graphs, analyze relationships, or generate derived content (character sheets, timelines, etc.). They represent the core use case of MarkScribe annotations.

2. **Production Parsers**: While not the primary focus of MarkScribe, these parsers can transform the text for specific outputs. Since they allow enriching the writing possibilities without interrupting the writing flow, they are a welcome extension of MarkScribe's capabilities.

A fundamental rule applies to ALL parsers: they MUST preserve ALL annotations intact in their output, even when transforming the text. This ensures that:
- Each parser can interpret any annotation according to its own rules
- Multiple interpretations of the same annotations remain possible throughout the chain
- Annotations remain available for subsequent parsers

The only exception to this rule is the Cleanup Parser, which is specifically designed to remove all annotations at the end of the processing chain to produce the final human-readable text.

### 4.2 Cleanup Parser

The Cleanup Parser is a special parser responsible for removing visible MarkScribe annotations from the text. It has specific characteristics that distinguish it from other parsers:

#### 4.2.1 Position in the Chain

The Cleanup Parser:
- Must be the last MarkScribe parser in any processing chain
- Can only be used once in a chain

#### 4.2.2 Operation Scope

The Cleanup Parser:
- Resolves visible entity names (e.g., converting @@Jules_Durant to "Jules Durant")
- Removes all visible MarkScribe annotations
- When an annotation is removed during the cleanup process, if its removal leaves an empty line in the output, that empty line should also be removed automatically to ensures that no unnecessary blank lines are present in the final document.

### 4.3 Error Handling

MarkScribe follows a permissive approach to error handling:

1. **Invalid Syntax**: Any text that cannot be interpreted as valid MarkScribe syntax is treated as regular content and left unchanged:
```markscribe
@@[Invalid syntax] remains "@@[Invalid syntax]"
@Jules (missing @) remains "@Jules"
```

2. **Partial Annotations**: Incomplete annotations (unclosed bracket or parenthesis)  preserved as-is:
```markscribe
@@Jules[unclosed bracket becomes "Jules[unclosed bracket"
```
3. **Unknown Modifiers**: While there are no "invalid" modifiers syntactically, modifiers that are neither standard nor from a registered application namespace are simply removed during cleanup:
```markscribe
@@Jules.unknownModifier[text] becomes "Jules text"
```

This approach ensures that:
- Writing flow is never interrupted
- Content is never lost
- Manual correction remains possible
- Valid annotations are still processed even in presence of invalid ones

## 5. Implementation Guidelines and Best Practices

### 5.1 Parser Implementation

#### 5.1.1 Parser Design

- Keep parsers single-purpose and composable
- Ensure parsers are stateless when possible
- Implement clear error handling and reporting
- Support streaming processing for large documents

#### 5.1.2 Entity Handling

- Store entity references in a case-sensitive manner
- Maintain bi-directional entity relationships
- Index all entity occurrences with their context, including file name and line number

#### 5.1.3 Error Recovery

- Continue processing after non-critical errors
- Maintain document integrity during partial failures
- Provide clear error context for debugging
- Support graceful degradation of features

### 5.2 Tool Creation Guidelines

When creating tools that support MarkScribe, consider these key aspects:

#### 5.2.1 User Interface Design

- Keep the annotation process as natural as typing
- Avoid forcing users to use dialog boxes or menus for basic annotations
- Provide visual feedback without being intrusive
- Consider offering both keyboard shortcuts and mouse interactions

#### 5.2.2 Entity Management

- Provide easy ways to browse and search existing entities
- Allow quick entity reuse without breaking the writing flow
- Consider auto-completion for entity names
- Enable easy entity renaming with proper refactoring

#### 5.2.3 Real-time Features

- Implement incremental parsing for large documents
- Consider background analysis for complex operations
- Provide immediate visual feedback for annotations

## 6. Examples

See the `examples/` directory for demonstrations of MarkScribe in action.

## 7. Future Considerations

### 7.1 Thinking about _MarkScribe Query Language_

A dedicated query language could enable powerful search and analysis capabilities. It could look like this:

```msql
// Find all scenes where Jules and Isabelle interact
SELECT scenes WHERE @Jules AND @Isabelle

// Find all angry characters in Paris
SELECT entities.Character WHERE mood(angry) AND in(@Paris)

// List all events in chronological order
SELECT entities.Event ORDER BY time

// Complex narrative analysis
SELECT scenes
WHERE @Jules.pov
AND mood(tense)
AND EXISTS(entities.Character WHERE mood(angry))
```

Potential features:
- Entity type filtering
- Modifier-based queries
- Relationship analysis
- Temporal queries
- Nested queries
- Aggregation functions

### 7.2 Location and Distance Handling

The specification could be extended to handle locations and distances in a standardized way. This would require careful consideration of:
- Different coordinate systems (terrestrial, planetary, galactic)
- Various units of measurement
- Relative positions
- Fictional mapping systems
- Integration with existing location standards

While these could currently be managed through application-specific modifiers, a standardized approach could benefit:
- Map generation
- Journey tracking
- Spatial relationship analysis
- Cross-application compatibility

### 7.3 Namespace Registration Process

The namespace registration process (see §2.4.5.6) should be formalized through:
1. A GitHub-based registration system using Pull Requests
2. An automated validation process checking:
   - Namespace uniqueness
   - Documentation completeness
   - Format compliance
3. A public registry maintaining:
   - Currently registered namespaces
   - Historical allocations
   - Deprecation notices

This would provide:
- Transparent namespace allocation
- Community review of new registrations
- Automatic conflict detection
- Clear documentation requirements
- Version tracking

## 8. Glossary

- **Entity**: Any narrative element (character, place, object, etc.) that can be referenced and tracked through annotations.

- **Entity Reference**: A specific mention of an entity in the text, either visible (`@@Jules`) or hidden (`@@(Jules)`).

- **Modifier**: An attribute or characteristic applied to an entity using dot notation (`.modifier`).
  - **Lowercase modifier**: Temporary or contextual attribute (`.happy`, `.injured`)
  - **UPPERCASE modifier**: Permanent characteristic (`.NAME`, `.OCCUPATION`)
  - **Standard modifier**: Reserved MarkScribe feature with Title-case (`.Character`, `.Place`)

- **Null Entity**: Special entity (`@@.`) used to apply modifiers or annotations without creating an actual entity reference.

- **Content**: Text associated with an entity using square brackets (`@@Jules[text]`).

- **Hidden Markdown**: Markdown syntax enclosed in parentheses after a null entity that won't appear in the final text (`@@.(# Title)`).

- **Entity Graph**: A representation of all entities and their relationships extracted from the annotations.

- **Parser**: A tool that processes MarkScribe annotations for analysis or output generation.
  - **Analysis Parser**: Extracts information from annotations
  - **Production Parser**: Transforms text while preserving annotations
  - **Cleanup Parser**: Removes visible annotations for final output

- **Final Text**: The text as it appears to readers after all visible annotations have been removed.

## 9. License

MarkScribe specifications are released under the Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0). This means you are free to:

- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

This license ensures that all versions of MarkScribe specifications remain open while maintaining proper attribution.

## 10. Contributing

Contributions are welcome! Please see CONTRIBUTING.md for guidelines.
