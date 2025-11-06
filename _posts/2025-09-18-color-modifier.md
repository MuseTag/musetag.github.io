---
layout: post
title: "Bring Your Characters to Color: Introducing the .Color Modifier"
date: 2025-09-18 16:00:00 +0200
categories: features
tags: [modifier, color, visualization, annotation]
author: MuseTag Team
---

Color carries meaning. In a single glance it can separate protagonists from background players, mark recurring themes, or make a timeline immediately readable. Today we add a simple, practical tool to MuseTag's palette: the `.Color` standard modifier.

This is not an attempt to make your prose paint-by-numbers. It's a pragmatic hook for the many visualization and editing tools that help authors shape stories. `.Color` allows you to suggest a display color for an entity — so timelines, interaction graphs, editor highlights, and other visual helpers can adopt a coherent, author-driven palette.

## What `.Color` does

- `.Color` assigns a display color to an entity for graphical tools.  
- The modifier is global in scope: it is intended as a persistent visual attribute of the entity across the document.  
- The parameter is normally invisible (use parentheses). We accept colors in the standard CSS formats (hex `#RRGGBB` or `#RGB`, `rgb()`, `hsl()`, and standard CSS color names).

Simple examples:
```musetag
@@Holmes.Color(#ffcc00)             # Holmes will be rendered as a warm orange in visual views
@@(Holmes,Watson).Color(steelblue)  # convenience: assign the same color to both entities
@@.Color(#666666)                   # set a color for narration / null entity contexts
```

Note: we intentionally do not document a visible parameter for `.Color`. Color values are normally metadata for tools, not text for readers. If an author chooses to use a visible parameter, that is an unorthodox usage and will not be recommended in the docs.

## Why use `.Color`?

A few concrete ways tools can exploit the color attribute:

- Timelines: event bars or presence bands can use the entity color so a reader sees at once who is active when.
- Interaction graphs: nodes and edges colored by participant make relationship maps faster to scan.
- Editor highlights: occurrences of an entity can be accented with its color to help visual tracking across long texts.
- Filters and views: authors can toggle color-based layers (e.g., show all "blue" characters).
- Publishing exports: color hints can be propagated to diagrams or visual assets.

`.Color` is purely a hint — tools should still offer themes and accessibility checks (contrast, color-blind palettes) and may normalize or remap color tokens to an active project palette.

## Design choices you should know

- CSS color formats are accepted. This keeps the modifier flexible and compatible with most toolchains.
- The parameter is invisible by convention. Colors are metadata; they don't normally appear in the text output.
- `.Color` is a global attribute. It is expected to be declared for an entity once. If a document contains multiple `.Color` declarations for the same entity, tools should decide on a deterministic policy (e.g. last-seen or project-level overrides). In typical practice, authors set a color once per entity.
- Grouping is supported for convenience: `@@(A,B).Color(...)` behaves like setting the color for each entity separately.

## Small, but powerful

`.Color` is intentionally lightweight. It does one job: give visual tools a reliable hint about how to present entities. Because it's simple, many different visualizations and pipelines can adopt it without friction.

Here is a short, slightly more elaborate example showing colors used together with modifiers you already know:

```musetag
@@Holmes.Color(#ffcc00).Type(character)
@@Watson.Color(steelblue).Type(character)
@@221B_Baker_Street.Color(#cfaea6).Place

## Chapter 1 @@(Watson).Pov

@@(Holmes,Watson).Dialog[
--- Hello, Watson. @@(Holmes).Voice(intrigued)[--- The game is afoot.]
--- Indeed, Holmes. @@(Watson).Voice[--- Quite so.]
]
```

A timeline or graphing tool can now render Holmes in orange, Watson in blue, and 221B in the warm neutral tone supplied.

## Accessibility and good practice

Colors are visual affordances — they can improve clarity but can also introduce problems if misused. A few recommendations:

- Prefer high-contrast choices if you plan to highlight text.
- Use palette tokens (project-defined names) in larger projects so you can change themes centrally.
- Don't rely on color alone to convey critical information (also annotate or tag semantically).

## Where this fits in the MuseTag workflow

`.Color` belongs in the same family as other global modifiers that describe persistent entity attributes. It's metadata for tools; it shouldn't alter the narrative itself.

We'll update the interactive demo and companion tools to honor `.Color` in upcoming releases. Meanwhile, you can start using the modifier in your manuscripts today — tools that read the YAML spec or the quick reference can implement color-aware views easily.

## A small creative note

We tried to avoid prescriptive rules: your fiction isn't a chart. But imagine opening a complex timeline and, in a single glance, seeing each protagonist's arc in a color you've chosen — it can change how you edit and where you focus.

We'd love to see how you use `.Color`. Share palettes, interesting visualizations, or surprising workflows on our GitHub Discussions.

Happy coloring!