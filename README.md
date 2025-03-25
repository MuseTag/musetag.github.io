# MarkScribe

> Annotation Language Specifications

MarkScribe is a semantic annotation language designed to enrich creative writing and narrative documentation processes. Its primary objective is to enable writers, researchers, and narratologists to capture, structure, and explore the underlying information of a text in an intuitive and flexible manner. By offering a standardized method of annotating entities, relationships, and contexts directly within the text, MarkScribe aims to transform writing from a linear process into a multidimensional narrative exploration. The language seeks to bridge the gap between literary creation and systematic analysis, providing a tool that is both human-readable and computationally exploitable.

## 0. WIP / TO DO

- [ ] More examples
- [ ] Quick start guide
- [ ] Sample parsor/validator
- [ ] Add CONTRIBUTING.md

## 1. Design Principles

1.1. **Human-Readability**: The annotation syntax must remain readable and intuitive for human writers.
1.2. **Markdown Compatibility**: Full compatibility with standard Markdown.
1.3. **Extensibility**: The system should allow for easy extension and custom annotation types.
1.4. **Contextual**: Annotations should capture context directly within the text.
1.5. **Non-Intrusive**: Annotations should enhance rather than disrupt the writing flow.
1.6. **Tooling-Friendly**: The syntax should be easily parsable by tools and software.

## 2. Core Syntax

### 2.1 Entity Annotations

All elements (characters, locations, dates, etc.) are annotated as entities using the `@@(entity_name)` syntax.

```
@@(Jules) References a character named Jules
@@(Montmartre) References a location
@@(2025-12-12) References a date
```

Tools may recognize certain entity formats (like dates) or entity types based on context or user configuration, but the syntax remains uniform.

### 2.2 Entity Reference with Content

To reference an entity and associate content with it:

```
@@(Jules)[This is content associated with Jules.]
```

### 2.3 Nested Annotations

Annotations can be nested for complex relationships:

```
@@(Jules)[He met @@(Isabelle)[Isabelle who was reading a book]]
```

### 2.4 Metadata Annotations

Document-level or section-level metadata:

```
## Chapter 1 @@(Jules.pov)
```

### 2.5 Entity Modifiers

Entities can be modified with additional attributes using dot notation:

```
@@(Jules.pov) Indicates Jules' point of view
```

#### 2.5.1 Cumulative Modifiers

Modifiers can be cumulated for more specific annotations:

```
@@(Jules.pov.unreliable.excited)
```

#### 2.5.2 Parameterized Modifiers

Modifiers can take parameters for enhanced precision:

```
@@(Scene.music(Rachmaninov).lighting(dim))
```

This flexible system allows writers to create rich, multi-layered annotations while maintaining readability.

#### 2.5.3 Common Modifier Categories

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

## 5. Implementation Guidelines

### 5.1 Parsing Strategy

Tools implementing MarkScribe should:
1. Identify all entity annotations in the document
2. Build a hierarchical graph of entities and relationships
3. Preserve the original text while enabling structured queries

### 5.2 Visualization

MarkScribe annotations can be visualized as:
- Interactive networks of entities and relationships
- Timelines of events
- Maps of locations
- Heat maps of thematic elements

### 5.3 Editor Integration

Text editors supporting MarkScribe should provide:
- Syntax highlighting for annotations
- Auto-completion for previously defined entities
- Quick navigation between related annotations
- Collapsible annotation content

## 6. Examples

See the `examples/` directory for demonstrations of MarkScribe in action.

## 7. License

MarkScribe specifications are released under the Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0). This means you are free to:

- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

This license ensures that all versions of MarkScribe specifications remain open while maintaining proper attribution.

## 8. Contributing

Contributions are welcome! Please see CONTRIBUTING.md for guidelines.
