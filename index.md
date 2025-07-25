---
title: MuseTag
layout: page_with_toc
---
> A lightweight annotation language for writers

## TL;DR

MuseTag is a lightweight semantic annotation language that allows writers to organize their creative work directly within their text. It offers a simple syntax to track characters, locations, plot elements and their relationships, without interrupting the writing flow. Compatible with standard text editors and Markdown, MuseTag naturally integrates into the creative process while providing a structured view of the work. The annotations remain optional and human-readable, enabling authors to focus on their content while maintaining clear organization when needed.

If you are a writer, you might want to read the [Quick Start Guide](#quick-start-guide) first.

**MuseTag is in early development.**
While dedicated tools are coming soon, you can already use MuseTag in any text or Markdown editor.
Want to help shape the project or ask questions?
Join our community on [GitHub Discussions](https://github.com/MuseTag/musetag.github.io/discussions)!

## Why MuseTag?

The story below, in MuseTag!

```musetag
## Why @@MuseTag? @@(me).Pov

As a @@(me).HOBBY[writer], I found myself drowning in character sheets, timeline,
documents, and location descriptions scattered across multiple files and tools.

Every time I needed to check a detail about a character, a specific place, or
an event, I had to break my writing flow to search through my notes.
When and where did @@Jules and @@Isabelle meet for the first time?

I needed a way to keep track of all these elements right within my manuscript,
something that wouldn't force me to leave my text editor or interrupt my
creative process.

That's how @@(MuseTag).CONCEPT[the idea of a simple, inline annotation system]
was born - not as another writing tool, but as a natural extension of the
writing process itself.

As a @@(me).JOB[coder], I would now be able to write tools that could understand
my narrative elements, analyze my story structure, and help me visualize my
characters' relationships.
I could even generate character sheets, timelines, and world documentation
automatically from my text.

The possibilities are endless.
```

## What is MuseTag?

MuseTag is a simple yet powerful annotation language that helps writers organize their story elements directly within their text. No more switching between multiple documents or breaking your writing flow to check character details or plot points. With MuseTag, you write normally while adding semantic annotations that tools can understand.


### Key Features

- **Write naturally**: Add annotations without leaving your text editor
- **Track everything**: Characters, locations, events, and their relationships
- **Stay focused**: All your notes right where you need them
- **Keep control**: Your text remains plain text, readable anywhere
- **Build tools**: Structured annotations enable powerful analysis tools
- **Markdown compatible**: Works alongside standard Markdown format
- **Highly customizable**: Create your own modifiers and entity types



## How Does It Work?

For your first use of MuseTag, you only need to know about **local and global notes**:

### Local Notes

Attach information to an entity for one specific occurrence:

```musetag
@@Marie(25 years old) smiled at @@Paul(her friend).
```

> Marie smiled at Paul.

### Global Notes

Attach information to an entity for all its appearances using an underscore:

```musetag
@@Paul_(red hair) went to the market.
# Paul is a redhead throughout the whole story.
```

> Paul went to the market.

That's it! You can start using MuseTag right now with just these two concepts.

## Try It Now

**Ready to experiment?** Visit our [interactive demo](30-demo.html) to try MuseTag in your browser! Edit example text in real-time and see how annotations transform into clean, readable content.

## What's Next?

**Ready to dive deeper?** Start with the [Quick Start Guide](10-quickstart.html) - it takes only 5 minutes to learn the essential MuseTag features.

MuseTag opens up new possibilities for both writers and developers. Here's how you can take your next steps:

### For Writers

- **Use your favorite editor**: MuseTag is designed to work seamlessly with any plain text or Markdown editor—no special software required.
- **Stay tuned for tools**: While dedicated MuseTag tools are still in development, your annotations are future-proof and will be compatible with upcoming utilities for character sheets, timelines, and more.
- **Experiment in your workflow**: Try annotating a scene or chapter in your current project and experience how MuseTag helps you stay organized without breaking your writing flow.
- **Shape the future**: Share your needs and feedback—your input will help guide the development of MuseTag tools and features.

### For Developers

- **Read the specifications**: Dive into the [technical documentation](99-specifications.html) to understand MuseTag’s structure and syntax.
- **Build the first tools**: Be among the pioneers—create parsers, visualizations, or plugins to bring MuseTag’s potential to life.
- **Extend the language**: Propose new modifiers or entity types to address specific creative or analytical needs.
- **Join the community**: Contribute to open-source projects, share your work, and collaborate with others interested in narrative annotation.

**Ready to shape the future of creative writing?**
Start using MuseTag today—and help build the ecosystem that will empower writers everywhere!

## Join the Community

Have questions, ideas, or feedback?
Join the discussion on [GitHub Discussions](https://github.com/MuseTag/musetag.github.io/discussions) and help shape the future of MuseTag with us!
