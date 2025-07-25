## Best Practices @.draft

### Entity Naming

- Use consistent, meaningful names for entities
  ```markscribe
  # Good
  @@John_Smith
  @@Paris_Apartment
  @@Battle_of_Waterloo

  # Avoid
  @@js
  @@loc1
  @@event2
  ```

### Annotation Scope

- Keep annotations focused and specific
  ```markscribe
  # Good
  @@John.angry[slammed his fist on the table]

  # Avoid
  @@John[went to the kitchen and made coffee and then sat down and read the newspaper and finally...]
  ```

- Use nested annotations for complex relationships
  ```markscribe

  @@(Paris)[@@John[spoke to] @@Mary about @@Tom].
  ```

### Modifiers Usage

- Use modifiers sparingly and consistently
  ```markscribe
  # Good
  @@John.angry.drunk

  # Avoid
  @@John.very.really.extremely.angry
  ```

- Keep modifier chains readable
  ```markscribe
  # Good
  @@Scene.lighting(dim).music(jazz)

  # Avoid
  @@Scene.l(d).m(j)
  ```

### Document Organization

- Consider using section-level annotations for major structural elements
  ```markscribe
  # Chapter 1 @@.pov(John).timeline(Day1).location(Paris)
  ```

- Group related annotations when possible
  ```markscribe
  @@Scene[@@John and @@Mary[discussed their plans]] rather than
  @@John discussed plans with @@Mary
  ```

### Performance Considerations

- Avoid over-annotation
  ```markscribe
  # Good
  @@John went to @@Paris.

  # Excessive
  @@(action)[@@John @@(movement)[went to] @@Paris]
  ```

- Use null entities (@@.) for styling/metadata rather than creating unnecessary entities
  ```markscribe
  # Good
  @@.style.italic[emphasized text]

  # Avoid
  @@emphasis[emphasized text]
  ```

### Maintainability

- Document custom modifiers and special entities
  ```markscribe
  # At the start of your document
  @@.meta(
    Custom modifiers:
    .flashback - Indicates a memory sequence
    .unreliable - Marks unreliable narrator sections
  )
  ```

- Keep a consistent annotation style throughout the document

### Collaboration

- Use clear, self-documenting entity names when sharing documents
- Consider adding comments for complex annotation patterns
- Maintain a shared entity naming convention within teams
