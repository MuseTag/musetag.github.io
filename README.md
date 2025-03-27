# MarkScribe Specifications @@.draft

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
- [ ] Advice for tool creators
- [ ] Glossary

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

#### Spaces in Entity Names

For visible entities, underscores in entity names are converted to spaces in the final text:
```markscribe
@@Jules_Durant walked down the street.
```
will output:
> Jules Durant walked down the street.


#### Escaping Special Characters

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

#### Null Entity

The null entity `@@.` is a special entity that allows applying modifiers to a context without creating entity relationships. It is never displayed in the final text. This is particularly useful for applying styling, metadata, or processing instructions without creating unnecessary entity references:

```markscribe
@@.special[This text is special] but no entity is created.
@@.draft[This section needs review]
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

#### Space Handling with Entity Content

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

### 2.4 Metadata Annotations

Document-level or section-level metadata:

```markscribe
## Chapter 1 @@(Jules.pov)
```

### 2.5 Entity Modifiers

Entities can be modified with additional attributes using dot notation:

```markscribe
@@(Jules.pov) Indicates Jules' point of view
```

#### 2.5.1 Cumulative Modifiers

Modifiers can be cumulated for more specific annotations:

```markscribe
@@(Jules.pov.unreliable.excited)
```

#### 2.5.2 Parameterized Modifiers

Modifiers can take parameters for enhanced precision:

```markscribe
@@(Scene.music(Rachmaninov).lighting(dim))
```

This flexible system allows writers to create rich, multi-layered annotations while maintaining readability.

#### 2.5.3 Modifiers on visible entities

Modifiers can be applied to visible entities as well, but will not be displayed in the final text:

```markscribe
@@Jules.drunk talks badly to @@Isabelle.in_love.
```
will output:
> Jules talks badly to Isabelle.

#### 2.5.4 Common Modifier Categories

- **Narrative**: `.pov`, `.narrator`, `.voice`
- **Atmospheric**: `.mood(...)`, `.tone(...)`, `.music(...)`
- **Structural**: `.draft`, `.revision(...)`, `.status(...)`
- **Stylistic**: `.style(...)`, `.pace(...)`, `.language(...)`
- **Relational**: `.perspective`, `.memory`, `.expectation`

Tools may recognize these common modifiers or allow users to define custom ones.

## 3. Entity Graph

While not part of the language specification itself, one of the key strengths of MarkScribe is enabling tools to build a comprehensive entity graph, where:

- Each entity has its own "index card" of information
- Relationships between entities are tracked
- All text references to each entity are collected
- Custom attributes can be attached to entities

This graph representation allows for powerful analysis, navigation, and visualization capabilities in compatible tools.

## 4. Use Cases

### 4.1 Creative Writing

- Character tracking and development
- Timeline management
- Location mapping
- Point of view indicators
- Theme and motif tracking

### 4.2 Literary Analysis

- Character relationship networks
- Narrative structure visualization
- Thematic mapping
- Linguistic pattern identification

### 4.3 Collaborative Writing

- Role assignment and management
- Version control for narrative elements
- Commenting and feedback integration

### 5.2 Enriched Exports

Tools supporting MarkScribe can generate enriched formats. While HTML examples are provided below for illustration, equivalent transformations can be implemented for any output format including LaTeX, PDF, DOCX, ePub, and others.

#### 5.2.1 HTML with Hidden Annotations
```html
<!--\@\@(Jules)[-->Jules took her hand<!--]-->
```

#### 5.2.2 HTML with Semantic Classes
```html
<span class="entity character" data-entity="Jules">Jules</span> took her hand.
```

#### 5.2.3 Other Output Formats

Equivalent transformations for other formats might include:

- **LaTeX**: `\character{Jules}{Jules took her hand}`
- **ODT**: Using custom fields or content controls
- **PDF**: Embedding metadata in the document structure
- **Custom formats**: Any specialized output required by specific tools

Each implementation may leverage the format-specific features while preserving the semantic structure defined in MarkScribe.

### 6.3 Visual Distinctions During Editing

Editors supporting MarkScribe should consider:

- Using distinct colors for different entity types
- Applying subtle underlining or highlighting
- Displaying icons in margins to indicate annotation presence
- Providing hover information for annotated entities
- Supporting folding/unfolding of annotation content

## 7. Processing and Workflow

### 7.1 Bidirectional Processing

MarkScribe supports a bidirectional workflow where:

- Annotations can be added to existing text
- Text with annotations can be processed for reading
- Modifications to the processed text can be reintegrated with annotations preserved

### 7.2 Selective Export

Tools may support selective export options:

- Retain only specific types of annotations
- Filter content based on entity relationships
- Generate specialized exports (character sheets, location maps, timelines)
- Create query-based exports (e.g., "all scenes with Jules")

### 7.3 Annotation Layers

Advanced implementations may support annotation layers:

- Editorial annotations vs. structural annotations
- Draft-specific annotations
- Collaborative annotations from different contributors
- Public vs. private annotations

### 7.4 Parser Types and Processing Chain

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

### 7.5 Validator Parser

The Validator Parser is a special analysis parser that checks MarkScribe syntax validity. Typically used at the start of a processing chain, it has specific characteristics:

#### 7.5.1 Non-Blocking Operation

By default, the Validator Parser operates in non-blocking mode, which is essential for:
- Real-time IDE integration
- Handling incomplete annotations during writing
- Allowing partial processing of valid sections

A blocking mode can be enabled via configuration when strict validation is required (e.g., for final publication workflows).

#### 7.5.2 Error Reporting

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

#### 7.5.3 Validation Scope

The Validator Parser checks for:
- Syntax validity (proper use of @@, [], (), etc.)
- Nesting correctness
- Entity name validity
- Modifier syntax
- Escaped character correctness
- Common error patterns

#### 7.5.4 Implementation Guidelines

When implementing the Validator Parser:
- Provide both streaming and complete document validation
- Allow configuration of validation strictness
- Support error filtering and severity levels
- Enable integration with IDE error reporting systems
- Consider performance implications for real-time validation

### 7.6 Cleanup Parser

The Cleanup Parser is a special parser responsible for removing visible MarkScribe annotations from the text while preserving hidden ones. It has specific characteristics that distinguish it from other parsers:

#### 7.6.1 Position in the Chain

The Cleanup Parser:
- Must be the last parser in any processing chain
- Can only be used once in a chain
- Cannot be followed by other parsers (as it produces final human-readable text)

#### 7.6.2 Operation Scope

The Cleanup Parser:
- Removes all visible MarkScribe annotations
- Preserves hidden annotations (those properly escaped in comments)
- Resolves visible entity names (e.g., converting @@Jules_Durant to "Jules Durant")
- Preserves all other formatting (Markdown, HTML, etc.)

#### 7.6.3 Examples

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

#### 7.6.4 Implementation Guidelines

When implementing the Cleanup Parser:
- Ensure it cannot be confused by escaped annotations in comments
- Maintain precise whitespace handling
- Preserve all non-MarkScribe formatting
- Consider providing options for handling specific cases (e.g., preservation of certain visible annotations)

## 8. Implementation Guidelines and Best Practices

### 8.1 Parser Implementation

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

### 8.2 Tool Creation Guidelines

When creating tools that support MarkScribe, consider these key aspects:

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

## 9. Examples

See the `examples/` directory for demonstrations of MarkScribe in action.

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
