# MarkScribe Annotation Language @@.draft

> MarkScribe: Annotation Language for Writers

```markscribe
## Why @@MarkScribe? @@(me.pov)

As a @@(me)[writer], I found myself drowning in character sheets, timeline documents, and location descriptions scattered across multiple files and tools. @@(problem)[Every time I needed to check a detail about a character, a specific place, an event, I had to break my writing flow to search through my notes]. When and where @@Jules and @@Isabelle met for the first time?

@@(solution)[I needed a way to keep track of all these elements right within my manuscript, something that wouldn't force me to leave my text editor or interrupt my creative process]. That's how @@(MarkScribe)[the idea of a simple, inline annotation system] was born - not as another writing tool, but as a _natural_ extension of the writing process itself.]

As a @@(me)[coder], I would now be able to write tools that could understand my narrative elements, analyze my story structure, and help me visualize my characters' relationships. I could even generate character sheets, timelines, and location maps automatically from my text. The possibilities are endless.
```

MarkScribe is a semantic annotation language that helps writers organize and structure their work through simple, intuitive annotations within their texts. By providing a lightweight way to track characters, locations, plot elements and their relationships, it supports the natural non-linear nature of creative writing while staying out of the way. The annotations are designed to be human-readable and optional, allowing writers to focus on their content while maintaining a clear overview of their narrative elements when needed. As annotations are typed directly into the text, writers can add them without interrupting their typing flow or switching between menus and buttons. Compatible with standard text editors and Markdown, MarkScribe aims to be a practical tool that requires minimal learning and adapts to each writer's workflow.

While primarily designed for creative writers, MarkScribe's simple yet powerful annotation system can benefit other fields as well. Literary scholars can use it to analyze texts and track themes, motifs, or character arcs. Game designers and screenwriters might find it useful for managing complex narratives and branching storylines. Even technical writers can leverage it to maintain consistency in documentation or track relationships between different system components. However, these secondary use cases will never compromise MarkScribe's core mission: providing writers with a natural, unobtrusive way to organize their creative work.

This document is intended to developpers and tool creators who wish to implement MarkScribe support in their applications. If you are a writer interested in using MarkScribe, you should skip this to the [Quick Start Guide](QuickStart.md).

This document outlines the core syntax, design principles, and potential use cases for MarkScribe, as well as suggestions for processing, workflow, and enriched exports. While the language itself is simple, the possibilities it opens up for writing tools are vast. By adopting MarkScribe, developers can empower writers to focus on their stories while providing them with the tools they need to bring their narratives to life.

## Historical Context

The need for MarkScribe emerged from limitations in existing approaches to narrative organization and annotation:

### Traditional Solutions

- **Dedicated Writing Software** (Scrivener, yWriter, etc.): While powerful, these tools lock writers into specific applications and formats, making it difficult to switch tools or collaborate with others using different software.

- **External Documentation** (character sheets, plot outlines): Keeping separate documents forces writers to constantly switch context, breaking their creative flow. These documents also tend to become outdated as the story evolves.

- **Comments and Metadata** (Word, Google Docs): Built-in commenting systems are designed for collaboration and revision rather than narrative organization. They don't provide ways to track relationships between story elements.

### Previous Annotation Systems

- **XML/SGML**: While technically capable, their verbose syntax is intrusive and difficult to write naturally. They're better suited for formal documentation than creative writing.

- **Markdown Extensions**: While numerous, they focus on formatting, academic citations, or technical documentation. None address the specific needs of creative writers for tracking narrative elements and their relationships.

- **Custom Tagging Systems**: Usually tied to specific software or workflows, making them non-portable and limiting their adoption.

### Why MarkScribe?

MarkScribe addresses these limitations by:
- Staying within the text, where the writing happens
- Using a minimal, intuitive syntax that doesn't interrupt the writing flow
- Remaining independent of any specific software
- Supporting both simple use cases and complex analysis
- Allowing writers to annotate as much or as little as they want
- Enabling powerful tools while staying out of the way

This approach bridges the gap between the simplicity writers need and the power tools developers can provide.

## 0. WIP / TO DO

- [ ] More examples
- [ ] Quick start guide for writers
- [ ] Add CONTRIBUTING.md


## 1. Design Principles

1. **Human-Readability**: The annotation syntax must remain readable and intuitive for human writers.
2. **Markdown Compatibility**: Full compatibility with standard Markdown.
3. **Extensibility**: The system should allow for easy extension and custom annotation types.
4. **Contextual**: Annotations should capture context directly within the text.
5. **Non-Intrusive**: Annotations should enhance rather than disrupt the writing flow.
6. **Tooling-Friendly**: The syntax should be easily parsable by tools and software.

## 2. Core Syntax

### 2.1 Entity Annotations

All elements (characters, locations, dates, etc.) are annotated as entities using one of two syntaxes :

1. Visible entity: `@@Jules`,
2. Hidden entity: `@@(Jules)`.

The difference is that the first will appears in the final text and not the second :
```markscribe
@@Jules was walking in the street when he saw @@(Isabelle)_her_.
```

will output the final _unformatted_ text for human readers (called simply _final text_ in the following, even if other documents may be generated using the annotations or if the final human intended document is not unformatted text):

> Jules was walking in the street when he saw _her_.

Entities may be what ever you want :

```markscribe
@@Jules references a character named Jules.
@@Montmartre[, a district of Paris] references a place.
@@(2025-12-12) references a date.
@@HMS_Macon references a rigid airship build and operated by the United States Navy.
```

Tools may recognize certain entity formats (like dates) or entity types based on context or user configuration, but the syntax remains uniform.

#### 2.1.1 Spaces in Entity Names

For visible entities, underscores in entity names are converted to spaces in the final text:
```markscribe
@@Jules_Durant walked down the street.
```
will output:
> Jules Durant walked down the street.


#### 2.1.2 Escaping Special Characters

To use characters that might be interpreted by MarkScribe (@@) or Markdown (*_[]() etc.) in entity names, escape them with a backslash:
```markscribe
@@(Jules\[Smith\]) worked at @@Company\@Home.
```

will output:

> Jules[Smith] worked at Company@Home.

The backslash itself can be escaped with another backslash if needed:
```markscribe
@@Path\\to\\file represents the entity "Path\to\file"
```

#### 2.1.3 Null Entity

The null entity `@@.` is a special entity that allows applying modifiers to a context without creating entity relationships. It is never displayed in the final text. This is particularly useful for applying styling, metadata, or processing instructions without creating unnecessary entity references:

```markscribe
@@.special[This text is special] but no entity is created.
@@.draft(This section needs review)
```

The null entity can take modifiers like any other entity but:
- It doesn't appear in the entity graph
- It doesn't create relationships with other entities
- It's purely used for applying contextual attributes or processing instructions
- It's always hidden in the final output

Use cases may be:
- Advanced HTML Styling instructions unsupported by Markdown: `@@.style.font[...]`
- Processing directives: `@@.skip[...]`
- Status indicators: `@@.draft[...]`
- Metadata annotations: `@@.metadata.author[...]`

### 2.2 Entity Reference with Content

To reference an entity and associate content with it:

```markscribe
@@(Jules)[This is content associated with Jules.]
```

#### 2.2.1 Space Handling with Entity Content

When an entity is followed by bracketed content, the space between the entity name and the content is handled according to these rules:

1. If the content begins with a punctuation mark (,.;:!?), no space is added:
```markscribe
@@Mary[, smiling,] continued her way.
-> Mary, smiling, continued her way.
```

2. In all other cases, a space is automatically added:
```markscribe
@@Jules[took his car].
-> Jules took his car.
```

This behavior ensures natural text flow while maintaining proper punctuation rules. Compare:
```markscribe
@@Mary[looked at] @@Jules[, thoughtful].
-> Mary looked at Jules, thoughtful.
```

### 2.3 Nested Annotations

Annotations can be nested for complex relationships:

```markscribe
@@(Jules)[He met @@(Isabelle)[Isabelle who was reading a book]]
```

### 2.4 Entity Modifiers

Entity modifiers allow you to add attributes and metadata to entities using dot notation. These modifiers can be temporary states, permanent traits, or standard features.

```markscribe
@@Jules.pov             # Simple modifier
@@Marie.happy.excited   # Multiple modifiers
@@.music(jazz)     # Parameterized modifier
```

#### 2.4.1 Types of Modifiers

MarkScribe supports three distinct categories of modifiers:

1. **Lowercase modifiers** (.modifier)
   - Represent temporary or contextual attributes
   - Example: `.happy`, `.injured`, `.angry`

2. **UPPERCASE modifiers** (.MODIFIER)
   - Define permanent characteristics
   - Example: `.NAME`, `.OCCUPATION`, `.BIRTHPLACE`

3. **Standard modifiers** (Title-case, see §2.6)
   - Reserved for MarkScribe features
   - Example: `.Character`, `.Place`, `.Pov`

---

#### 2.4.2 Modifier Syntax

##### 2.4.2.1 Parameters
Modifiers can take parameters for additional precision:
```markscribe
@@Jules.age(42)
@@Scene.music(Rachmaninov).lighting(dim)
```

##### 2.4.2.2 Combining Modifiers
Modifiers can be combined freely:
```markscribe
@@Holmes.PROFESSION(detective).mood(worried)
@@Watson.BACKGROUND(military).injured.tired
```

---

#### 2.4.3 Visibility Rules

Modifiers never appear in the final text:
```markscribe
@@Jules.drunk[stumbled forward].
-> Jules stumbled forward.
```

#### 2.4.4 Standard Modifiers

##### 2.4.4.1 Reserved Capitalization

Modifiers starting with a capital letter (and not entirely uppercase, see section 2.5.1) are reserved for standard MarkScribe features. Tools MUST treat any non-standard Title-case modifier as an error. Custom modifiers MUST start with a lowercase letter or be entirely uppercase.

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

Invalid usage (will trigger parser errors):
```markscribe
@@Jules.Custom # Error: Custom is capitalized but not standard
@@Marie.Undefined # Error: Undefined is not a standard modifier
```

#### 2.4.5 Modifier vs Punctuation

To avoid ambiguity between modifiers and punctuation, a dot is considered a modifier separator if and only if:
1. It immediately follows an entity name or another modifier
2. It is immediately followed by an ASCII letter (a-z or A-Z)

In all other cases (followed by a number, accented character, punctuation, space, or end of text), it is treated as punctuation and preserved in the final text.

Examples:
```markscribe
@@Jules.happy(smiled)        # .happy is a modifier (followed by ASCII letter)
@@Jules.42(looked tired)     # .42 is not a modifier (followed by number)
@@Jules.été[was hot]         # .été is not a modifier (followed by accented letter)
@@Jules.[was surprised]      # . is punctuation (followed by bracket)
@@Jules...and then          # ... are punctuation marks
```

This rule ensures consistent and unambiguous parsing while maintaining natural punctuation in the text.

### 2.5 Annotation Scope

MarkScribe annotations follow specific scope rules depending on their placement and modifiers.

#### 2.5.1 File-level Annotations

Annotations at the very beginning of a file (before any content) apply to the entire file:
```markscribe
@@.Author(John Doe)
@@.Version(1.0)
# First chapter
```

#### 2.5.2. Header Annotations

Apply to all content under that header until the next header of same or higher level:
```markscribe
@@.(# Chapter 1).Pov(Jules)
This text is from Jules' point of view.
## Scene 1
Still from Jules' point of view.
# Chapter 2
New chapter, POV reset.
```

#### 2.5.3. Paragraph Annotations

Apply only to the immediately following paragraph:
```markscribe
@@.(* Important theme)
This paragraph discusses the theme.

This paragraph is not affected by the previous annotation.
```

#### 2.5.4. Custom Scope

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

### 2.6 Hidden Markdown Structures

MarkScribe allows embedding Markdown syntax that will be processed for analysis but won't appear in the final text. This is achieved through a special syntax using the null entity:

```markscribe
@@.(# Hidden Title)
Normal visible text continues here...
```

#### 2.6.1 Syntax

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

#### 2.6.2 Processing

- These structures are processed as regular Markdown during analysis
- They contribute to document structure and metadata
- They are completely removed from the final text
- Tools should treat them as equivalent to their visible Markdown counterparts for analysis purposes

#### 2.6.3 Use Cases

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

## 4. Implementation features

### 4.1 Enriched Exports

Tools supporting MarkScribe can generate enriched formats. While HTML examples are provided below for illustration, equivalent transformations can be implemented for any output format including LaTeX, PDF, DOCX, ePub, and others.

#### 4.2.1 HTML with Hidden Annotations
```html
<!--\@\@(Jules)[-->Jules took her hand<!--]-->
```

#### 4.2.2 HTML with Semantic Classes
```html
<span class="entity character" data-entity="Jules">Jules</span> took her hand.
```

#### 4.2.3 Other Output Formats

Equivalent transformations for other formats might include:

- **LaTeX**: `\character{Jules}{Jules took her hand}`
- **ODT**: Using custom fields or content controls
- **PDF**: Embedding metadata in the document structure
- **Custom formats**: Any specialized output required by specific tools

Each implementation may leverage the format-specific features while preserving the semantic structure defined in MarkScribe.

### 4.2 Visual Distinctions During Editing

Editors supporting MarkScribe should consider:

- Using distinct colors for different entity types
- Applying subtle underlining or highlighting
- Displaying icons in margins to indicate annotation presence
- Providing hover information for annotated entities
- Supporting folding/unfolding of annotation content

## 5. Processing and Workflow

### 5.1 Bidirectional Processing

MarkScribe supports a bidirectional workflow where:

- Annotations can be added to existing text
- Text with annotations can be processed for reading
- Modifications to the processed text can be reintegrated with annotations preserved

### 5.2 Selective Export

Tools may support selective export options:

- Retain only specific types of annotations
- Filter content based on entity relationships
- Generate specialized exports (character sheets, location maps, timelines)
- Create query-based exports (e.g., "all scenes with Jules")

### 5.3 Annotation Layers

Advanced implementations may support annotation layers:

- Editorial annotations vs. structural annotations
- Draft-specific annotations
- Collaborative annotations from different contributors
- Public vs. private annotations

### 5.4 Parser Types and Processing Chain

In ANY case, _parsers_ MUST NOT alter the original documents. They should only generate NEW documents.

MarkScribe parsers can be categorized into two main types:

1. **Analysis Parsers**: These parsers read and interpret annotations to extract information, build entity graphs, analyze relationships, or generate derived content (character sheets, timelines, etc.). They focus on building structured representations of the annotated information.

2. **Production Parsers**: These parsers transform the text for specific outputs while preserving all annotations. Each parser operates independently, producing its own transformations while ensuring annotations remain available for subsequent parsers.

Considering this example:

```markscribe
@@.special[A special text] and the following.
```

Example of simple processing chain:

1. First, a validating parser checks the syntax and structure of the annotations (see Validator Parser below).

2. A parser hiding annotations in HTML comments (with escaped MarkScribe characters):
```html
<!--\@\@.special[-->@@.special[A special text]<!--]--> and the following.
```

3. A specialized parser interpreting .special for sans-serif styling:
```html
<!--\@\@.special[--><span style='font-family: sans-serif'>@@.special[A special text]</span><!--]--> and the following.
```

4. Finally, a cleanup parser (see Cleanup Parser below) removes all annotations, but obfuscated ones, which it cannot see:
```html
<!--\@\@.special[--><span style='font-family: sans-serif'>A special text</span><!--]--> and the following.
```

This approach ensures that:
- Each parser can interpret annotations without affecting their availability for subsequent parsers
- Annotations are hidden in comments with escaped characters for preservation
- The final cleanup only removes visible annotations
- The complete annotation information remains available in the final output
- Multiple interpretations of the same annotations are possible throughout the chain

### 5.5 Validator Parser

The Validator Parser is a special analysis parser that checks MarkScribe syntax validity. Typically used at the start of a processing chain, it has specific characteristics:

#### 5.5.1 Non-Blocking Operation

By default, the Validator Parser operates in non-blocking mode, which is essential for:
- Real-time IDE integration
- Handling incomplete annotations during writing
- Allowing partial processing of valid sections

A blocking mode can be enabled via configuration when strict validation is required (e.g., for final publication workflows).

#### 5.5.2 Error Reporting

The Validator Parser:
- Reports errors through a dedicated error channel
- Provides detailed error information:
  - Error location (line, column)
  - Error type (syntax, nesting, etc.)
  - Context of the error
  - Suggested fixes when applicable
- Can optionally generate warning levels:
  ```markscribe
  ERROR: Unterminated entity annotation at line 42: @@(Jules
  WARNING: Possible typo in entity name at line 43: @@Jules vs @@Jules
  ```

#### 5.5.3 Validation Scope

The Validator Parser checks for:
- Syntax validity (proper use of @@, [], (), etc.)
- Nesting correctness
- Entity name validity
- Modifier syntax
- Escaped character correctness
- Common error patterns

#### 5.5.4 Implementation Guidelines

When implementing the Validator Parser:
- Provide both streaming and complete document validation
- Allow configuration of validation strictness
- Support error filtering and severity levels
- Enable integration with IDE error reporting systems
- Consider performance implications for real-time validation

### 5.6 Cleanup Parser

The Cleanup Parser is a special parser responsible for removing visible MarkScribe annotations from the text while preserving hidden ones. It has specific characteristics that distinguish it from other parsers:

#### 5.6.1 Position in the Chain

The Cleanup Parser:
- Must be the last parser in any processing chain
- Can only be used once in a chain
- Cannot be followed by other parsers (as it produces final human-readable text)

#### 5.6.2 Operation Scope

The Cleanup Parser:
- Removes all visible MarkScribe annotations
- Preserves hidden annotations (those properly escaped in comments)
- Resolves visible entity names (e.g., converting @@Jules_Durant to "Jules Durant")
- Preserves all other formatting (Markdown, HTML, etc.)

#### 5.6.3 Examples

Given this input:
```html
@@Jules_Durant.drunk[, clearly inebriated,] talked to <!--\@\@.context[-->@@Marie<!--]-->.
```

The Cleanup Parser produces:
```html
Jules Durant, clearly inebriated, talked to <!--\@\@.context[-->Marie<!--]-->.
```

Note that:
- The visible entity "@@Jules_Durant" is converted to "Jules Durant"
- The modifier ".drunk" is removed
- The content in brackets is preserved
- The hidden annotation remains intact and escaped
- The visible entity "@@Marie" is simplified to "Marie"

#### 5.6.4 Implementation Guidelines

When implementing the Cleanup Parser:
- Ensure it cannot be confused by escaped annotations in comments
- Maintain precise whitespace handling
- Preserve all non-MarkScribe formatting
- Consider providing options for handling specific cases (e.g., preservation of certain visible annotations)

## 6. Implementation Guidelines and Best Practices

### 6.1 Parser Implementation

#### 6.1.1 Parser Design

- Keep parsers single-purpose and composable
- Ensure parsers are stateless when possible
- Implement clear error handling and reporting
- Support streaming processing for large documents

#### 6.1.2 Entity Handling

- Store entity references in a case-sensitive manner
- Maintain bi-directional entity relationships
- Index all entity occurrences with their context, including file name and line number

#### 6.1.3 Error Recovery

- Continue processing after non-critical errors
- Maintain document integrity during partial failures
- Provide clear error context for debugging
- Support graceful degradation of features

### 6.2 Tool Creation Guidelines

When creating tools that support MarkScribe, consider these key aspects:

#### 6.2.1 User Interface Design

- Keep the annotation process as natural as typing
- Avoid forcing users to use dialog boxes or menus for basic annotations
- Provide visual feedback without being intrusive
- Consider offering both keyboard shortcuts and mouse interactions

#### 6.2.2 Entity Management

- Provide easy ways to browse and search existing entities
- Allow quick entity reuse without breaking the writing flow
- Consider auto-completion for entity names
- Enable easy entity renaming with proper refactoring

#### 6.2.3 Real-time Features

- Implement incremental parsing for large documents
- Consider background analysis for complex operations
- Provide immediate visual feedback for annotations

## 7. Examples

See the `examples/` directory for demonstrations of MarkScribe in action.

## 8. Future Considerations

### 8.1 Thinking about _MarkScribe Query Language_

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

## 9. Glossary

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
  - **Validator Parser**: Checks syntax validity
  - **Cleanup Parser**: Removes visible annotations for final output

- **Final Text**: The text as it appears to readers after all visible annotations have been removed.

## 10. License

MarkScribe specifications are released under the Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0). This means you are free to:

- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

This license ensures that all versions of MarkScribe specifications remain open while maintaining proper attribution.

## 11. Contributing

Contributions are welcome! Please see CONTRIBUTING.md for guidelines.
