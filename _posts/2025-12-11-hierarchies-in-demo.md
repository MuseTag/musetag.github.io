---
layout: post
title: "New: Hierarchical Relations Supported in the MuseTag Demo"
date: 2025-12-11 12:00:00 +0100
categories: features
tags: [hierarchy, modifier, demo, relation]
author: MuseTag Team
---

We just deployed hierarchical relation support in the MuseTag demo.

What’s included
- Parsing and recognition of hierarchical modifiers: `ChildOf`, `ParentOf` and their sugar forms (for example `PartOf`, `HasPart`, `BelongsTo`, `Includes`, …). Sugar forms are normalized to two canonical directions: `childOf` and `parentOf`.
- Explicit relation storage: each entity now keeps `parents` and `children` lists; relation entries may record the character position where the relation was declared so the UI can navigate back to it.
- A new "Hierarchy" panel in the demo UI (right column, under the Document Outline) shows a collapsible tree of entities involved in hierarchical relations.
- Navigation: clicking a tree node attempts to jump to the most relevant place in the editor — preferably the relation declaration location, otherwise the entity’s first occurrence.
- Visual consistency: the tree uses a small SVG chevron that animates when nodes open or close; entities with a configured color use that color in the tree to help visual identification.

Example
```/dev/null/example.md#L1-2
@@Alice.ChildOf(@@Marie)
```

Behavior and limitations to know
- Target resolution: a modifier parameter may contain an explicit annotation (e.g. `.ChildOf(@@Other)`). If the target appears without annotation (e.g. `.ChildOf(Other)`), the parser attempts to resolve `Other` to an entity declared elsewhere. If the target does not yet exist, a placeholder entity is created so the relation can be attached immediately.
- Semantic normalization: sugar forms are normalized to `childOf` / `parentOf`. Any further semantic distinctions (part/container/member, etc.) remain application-level concerns and should be expressed via types or additional modifiers where needed.

What you’ll see in the demo
- A "Hierarchy" panel that lists only entities involved in at least one hierarchical relation.
- Collapsible nodes with an animated SVG chevron.
- Clicking a node jumps to the relation declaration if known, otherwise to the entity’s first occurrence.
- Entity color (if set via `.Color(...)` or similar) is applied to the name in the tree to ease identification.

Why this helps
- Quickly visualize structural relationships in your text (families, nested places, object compositions, organizational hierarchies).
- Jump directly to the textual location where a relationship is declared — useful for authoring and reviewing annotations.
- Prototype relational models and verify annotation behavior without leaving the editor.

How to test
1. Open the Demo page.
2. Paste or type a short example with annotations like the ones above.
3. Open the Hierarchy panel (right column) — the tree updates automatically.
4. Expand a node and click its name to verify the editor jump.

Feedback welcome
If you encounter edge cases (multiple declarations in a single grouped annotation, need for composite targets, alternative display preferences), please open an issue in the repository or reply here. We’ll iterate based on real-world feedback.

— The MuseTag Team
