---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: Home
---
> A lightweight annotation language for writers

## TL;DR

MarkPlot is a lightweight semantic annotation language that allows writers to organize their creative work directly within their text. It offers a simple syntax to track characters, locations, plot elements and their relationships, without interrupting the writing flow. Compatible with standard text editors and Markdown, MarkPlot naturally integrates into the creative process while providing a structured view of the work. The annotations remain optional and human-readable, enabling authors to focus on their content while maintaining clear organization when needed.

If you are a writer, you might want to read the [Quick start](quickstart.html) first.

## Why MarkPlot ?

The story below, in MarkPlot !

```markplot
## Why @@MarkPlot? @@(me).Pov

As a @@(me).HOBBY[writer], I found myself drowning in character sheets, timeline
documents, and location descriptions scattered across multiple files and tools.

Every time I needed to check a detail about a character, a specific place, an event, I had to break my writing flow to search through my notes.
When and where did @@Jules and @@Isabelle meet for the first time?

I needed a way to keep track of all these elements right within my manuscript, something that wouldn't force me to leave my text editor or interrupt my creative process.

That's how @@(MarkPlot).CONCEPT[the idea of a simple, inline annotation system] was born - not as another writing tool, but as a natural extension of the writing process itself.

As a @@(me).JOB[coder], I would now be able to write tools that could understand my narrative elements, analyze my story structure, and help me visualize my characters' relationships.
I could even generate character sheets, timelines, and location maps automatically from my text.

The possibilities are endless.
```

## What is MarkPlot?

MarkPlot is a simple yet powerful annotation language that helps writers organize their story elements directly within their text. No more switching between multiple documents or breaking your writing flow to check character details or plot points. With MarkPlot, you write normally while adding semantic annotations that tools can understand.

```markplot
@@Jules smiled at @@Marie.age(25) reading.
```

## Key Features

- **Write naturally**: Add annotations without leaving your text editor
- **Track everything**: Characters, locations, events, and their relationships
- **Stay focused**: All your notes right where you need them
- **Keep control**: Your text remains plain text, readable anywhere
- **Build tools**: Structured annotations enable powerful analysis tools
- **Markdown compatible**: Works alongside standard Markdown format
- **Highly customizable**: Create your own modifiers and entity types

## Getting Started

- [Quick Start Guide](quickstart.html) - Start using MarkPlot in 5 minutes
- [Examples in Specifications](specifications.html#examples) - See MarkPlot in real-world scenarios

## How Does It Work?

MarkPlot uses a simple syntax based on `@@` symbols to annotate entities in your text:

**Visible entities:**
```markplot
@@Holmes walked into the room.
```

By default, entities are characters. But it can be whatever you want, using the standard modifier `Type`:
```markplot
@@Arthur hold on @@Excalibur.Type(Object).
```


**Invisible entities with visible parameters:**
```markplot
@@(Character).PROFESSION[detective] investigated the case.
```

**Invisible entities with invisible metadata:**
```markplot
@@(Character).age(35) was experienced.
```

These annotations are processed to:
1. Track all mentions of characters, places, and other entities
2. Capture relationships between entities
3. Build timelines and event sequences
4. Maintain consistency across your narrative
5. Generate reports, character sheets, and visualizations

Yet readers of your final text will only see the content without annotations.

## For Writers

- Integrate seamlessly with your existing writing workflow
- Use any text editor that supports plain text
- Add as many or as few annotations as you want
- Generate character sheets and timelines automatically
- Maintain consistency across long narratives

## For Developers

Building tools for MarkPlot? Check out the [Specifications](specifications.html)!

- Implement parsers for various programming languages
- Build visualization tools for narrative analysis
- Create writing aids using the semantic information
- Extend the system with custom modifiers
- Contribute to the open-source ecosystem
