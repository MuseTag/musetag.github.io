---
title: Quick Start
nav_order: 0
---

## Welcome to MarkPlot!

MarkPlot is a semantic annotation language that extends Markdown to help you keep track of characters, places, events, and relationships in your creative writing. Let's dive in!

## What is Markdown?

Markdown is a lightweight markup language that you probably already know. It uses simple symbols to format text:

```markdown
# Heading
**Bold text**
*Italic text*
[Link](https://example.com)
```

If you're new to Markdown, you can check out the [Markdown Guide](https://www.markdownguide.org/basic-syntax/) for the basics. But this is not a requirement to start using MarkPlot right now.

## The 5-Minute MarkPlot Basics

### 1. Annotate Entities (Characters, Places, Moments or whatever)

```markplot
@@Sherlock examined the crime scene at @@Baker_Street.
```

**Result for readers:**
> Sherlock examined the crime scene at Baker Street.

**Behind the scenes:**
MarkPlot-enabled tools can automatically generate entity cards:

```markplot
# @@(Sherlock).Entity
- Appearances: Chapter 1, Chapter 3
- Related to: Watson, Lestrade
```

### 2. Add Details to Your Annotations

Want to capture more information about a character? Use square brackets:

```markplot
@@(Watson)[John H. Watson, M.D., a military doctor who served in Afghanistan],
assisted with the investigation.
```

**Result for readers:**
> John H. Watson, M.D., a military doctor who served in Afghanistan, assisted with the investigation.

**Behind the scenes:**
The description is stored in Watson's entity card:

```markplot
# @@(Watson).Entity
- Description: John H. Watson, M.D., a military doctor who served in Afghanistan
- Appearances: Chapter 1
```

### 3. Track Timeline and Events

Dates are special entities that help you manage your story's timeline:

```markplot
@@(1891-05-04)
It was a foggy London morning when @@Lestrade arrived with news.
```

**Result for readers:**
> It was a foggy London morning when Lestrade arrived with news.

**Behind the scenes:**
MarkPlot-enabled tools can generate chronological timelines:

```markplot
# Timeline
- 1891-05-04: Lestrade arrives with news (Chapter 2)
- 1891-05-05: The investigation begins (Chapter 3)
```

### 4. Indicate Point of View

Use modifiers to show whose perspective a scene is from:

```markplot
## Chapter 1 @@(Watson).Pov

I had not seen @@Holmes for several days...
```

**Result for readers:**
> ## Chapter 1
>
> I had not seen Holmes for several days...

**Behind the scenes:**
MarkPlot-enabled tools track narrative structure:

```markplot
# Narrative Structure
- Chapter 1: Watson's POV
```

### 5. Create Relationships

Nested annotations show relationships between entities:

```markplot
@@(Holmes)[He observed @@(Irene)[Ms. Adler was clearly nervous]].
```

**Result for readers:**
> He observed Ms. Adler was clearly nervous.

**Behind the scenes:**
This builds a relationship graph:

```markplot
# @@(Holmes).entity
- Relationships:
  - Observes: Irene Adler
```

## A Complete Example

```markplot
# A Study in Annotation @@.Genre(mystery)

## Chapter 1 @@(Watson).Pov

@@(London)
@@(1881-03-04)

I had just returned from @@Afghanistan when I met @@(Holmes)[Sherlock Holmes, a
consulting detective with remarkable deductive abilities] through a mutual
acquaintance.
He was looking for someone to share his lodgings at @@(221B Baker Street)[A
comfortable apartment in central London].

"@@(Holmes)[You have been in Afghanistan, I perceive],"
were his first words to me, leaving me quite astonished at his insight.
```

**Result for readers:**
> # A Study in Annotation
>
> ## Chapter 1
>
> I had just returned from Afghanistan when I met Sherlock Holmes, a consulting detective with remarkable deductive abilities, through a mutual acquaintance. He was looking for someone to share his lodgings at a comfortable apartment in central London.
>
> "You have been in Afghanistan, I perceive," were his first words to me, leaving me quite astonished at his insight.

**Behind the scenes:**
MarkPlot-enabled tools would generate:
- Entity cards for Watson, Holmes, London, Afghanistan, and 221B Baker Street
- A timeline entry for March 4, 1881
- Genre categorization for the document
- POV tracking for chapters

## What's Next?

- **Combine with Markdown**: Use all standard Markdown features alongside MarkPlot annotations
- **Explore Modifiers**: Try `.mood()`, `.Status()`, or create your own
- **Build Your World**: Create a consistent set of characters, places, and events
- **Structure Your Narrative**: Use annotations to track plot arcs and themes
- **Use Tools**: Check out compatible editors and visualization tools

## Tips

- Develop a consistent annotation style for your project
- Use annotations sparingly at first—you can always add more later
- Consider creating a simple legend of your most-used annotations
- Remember that MarkPlot annotations are hidden from your final reader

Ready to organize your narrative world? Happy writing with MarkPlot!
