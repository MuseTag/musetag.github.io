---
layout: post
title: "Meet .Icon: Visual Identity for Your Entities"
date: 2025-11-13 13:53:27 +0100
categories: features
tags: [modifier, icon, visualization, annotation]
author: MuseTag Team
---

tl;dr
=====
`.Icon` is a new standard MuseTag modifier that lets you attach a small visual emblem to an entity. It accepts either an image URL (preferred: SVG/PNG) or up to three UTF characters (emoji/glyphs). Icons are metadata for GUI tools—normally invisible in the rendered text. If no icon is available, tools should fall back to the entity's initials; the icon background should pick up the entity's `.Color` when set (or a deterministic/random color otherwise).

Why this matters
----------------
When working on long projects, visual cues speed up cognition. A consistent icon for a character, a place, or a recurring object makes timelines, graphs, and editor views instantly scannable. `.Icon` is intentionally small and pragmatic: it does one job—give GUI tools a reliable hint about which visual marker to use for a given entity.

Quick concept
-------------
- Modifier name: `.Icon`
- Scope: global (persistent visual attribute)
- Parameter: single, normally invisible, either
  - a URL to an image file (relative or absolute), or
  - 1–3 UTF characters (emoji or glyphs)
- No visible label/alt provided by MuseTag (tools decide accessibility handling)
- Fallback: entity initials
- Background color: use `.Color` when present; otherwise deterministic or random

Examples
--------
Image URL:
```musetag.github.io/_posts/2025-11-13-icon-modifier.md#L1-6
@@Holmes.Icon(icons/magnifier.svg)
```

Emoji / UTF glyph:
```musetag.github.io/_posts/2025-11-13-icon-modifier.md#L1-6
@@Watson.Icon(🦸)
```

Group convenience:
```musetag.github.io/_posts/2025-11-13-icon-modifier.md#L1-6
@@(Holmes,Watson).Icon(icons/duo.png)
```

Practical notes for tool implementers
------------------------------------
- Icon source is a hint. Tools should try to load the provided image and, if it fails, display the entity's initials.
- Prefer SVG/PNG for images (vector/transparent backgrounds make for better UI results).
- If the entity has a `.Color` value, use it behind the icon; otherwise, choose a deterministic or pseudo-random color so displays remain stable between sessions.
- MuseTag intentionally does not mandate alt text or labels for icons. Accessibility is a responsibility of GUI implementers and publishers.
- Icon tokens (e.g., `fa:search`) are not supported in the spec—use direct image files or UTF characters.
- Data URLs are allowed in practice but are not documented as a recommended pattern (implementers should be mindful of size/security implications).

Design decisions and rationale
------------------------------
- Minimal scope: `.Icon` is a tiny, focused hint—no overloading with labels, tokens, or complex formats. That keeps authoring simple and tooling flexible.
- Invisible-by-default parameter: icons are metadata, not prose. Authors usually don't want an icon string visible in the final manuscript.
- UTF glyph allowance (1–3 chars) gives quick, lightweight iconography without external assets—handy for fast drafts or portable manuscripts.
- Fallback to initials ensures that even without images, GUIs can show compact, human-meaningful markers.
- Background color cooperation with `.Color` provides harmonious visuals when both are present.

Best practices for authors
--------------------------
- Set icons once per entity, near the entity declaration, for clarity:
  ```musetag.github.io/_posts/2025-11-13-icon-modifier.md#L1-6
  @@Holmes.Icon(icons/magnifier.svg)
  @@Watson.Icon(🦸)
  ```
- Prefer project-local image paths to avoid broken external references.
- Use UTF glyphs for quick drafts or when you want a portable, dependency-free icon.
- Remember `.Icon` is a visualization aid. Keep narrative intent and semantics in modifiers like `.Type`, `.Voice`, `.Dialog`, etc.

A short creative note
---------------------
Icons can change how you edit. With a few coherent symbols across a long draft, patterns jump out: who speaks most, which places recur, which objects are central. `.Icon` gives tools the small, low-friction lever to make that happen.

Happy iconing—small badges, big clarity.
