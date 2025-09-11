---
layout: post
title: "New in MuseTag: Hierarchical Relation Modifiers for All Your Worlds"
date: 2025-09-11 13:41:27 +0200
categories: features
tags: [modifier, hierarchy, relation, update, annotation]
author: MuseTag Team
---

We're thrilled to announce a major new feature for MuseTag: **hierarchical relation modifiers**!  
You can now express parent/child, part/whole, membership, containment, ancestry, and more—directly in your annotated text, with a syntax that's both powerful and intuitive.

## Why Hierarchical Modifiers?

Stories, worlds, and timelines are rarely flat. Whether you're writing a family saga, mapping a fantasy kingdom, tracking organizations, or structuring time and space, you need to express how things relate to each other.  
With the new hierarchical modifiers, you can now:

- Build family trees and genealogies
- Model spatial hierarchies (room/house/city/country)
- Track group membership and organizational charts
- Represent timelines and nested events
- Express any "is part of", "belongs to", or "contains" relationship

## The Canonical Syntax: `.ChildOf` and `.ParentOf`

The new core modifiers are:

- **`.ChildOf(entity)`**  
  Declares that the current entity is the child, member, or part of the specified entity.
- **`.ParentOf(entity)`**  
  Declares that the current entity is the parent, group, or container of the specified entity.

**Examples:**

```musetag
@@Paris.ChildOf(@@France)
@@France.ParentOf(@@Paris)
@@Alice.ChildOf(@@Marie)
@@Marie.ParentOf(@@Alice)
```

These two modifiers are strictly inverse and can be used interchangeably depending on which direction feels most natural in your narrative.

## Use the Alias That Fits Your Story

To make MuseTag as expressive and writer-friendly as possible, we've also introduced a suite of **alias modifiers**.  
All of the following are strictly equivalent to `.ChildOf` or `.ParentOf`—use whichever reads best in your context:

- `.PartOf` / `.HasPart`
- `.BelongsTo` / `.Includes`
- `.MemberOf` / `.GroupOf`
- `.ContainedIn` / `.ContainerOf`
- `.DescendantOf` / `.AncestorOf`

**All these forms are interchangeable!**

**Examples:**

```musetag
@@Paris.PartOf(@@France)
@@France.HasPart(@@Paris)
@@Alice.BelongsTo(@@Famille_Dupont)
@@Famille_Dupont.Includes(@@Alice)
@@Chambre.ContainedIn(@@Maison)
@@Maison.ContainerOf(@@Chambre)
@@Alice.DescendantOf(@@Marie)
@@Marie.AncestorOf(@@Alice)
```

## Practical Narrative Use Cases

- **Family Trees:**  
  `@@Arthur.ChildOf(@@Uther_Pendragon)`  
  `@@Uther_Pendragon.ParentOf(@@Arthur)`

- **Geography:**  
  `@@Bordeaux.PartOf(@@Nouvelle_Aquitaine)`  
  `@@Nouvelle_Aquitaine.HasPart(@@Bordeaux)`

- **Organizations:**  
  `@@Watson.MemberOf(@@Baker_Street_Irregulars)`  
  `@@Baker_Street_Irregulars.GroupOf(@@Watson)`

- **Temporal Structure:**  
  `@@2025.ContainedIn(@@21st_Century)`  
  `@@21st_Century.ContainerOf(@@2025)`

- **Any hierarchy you can imagine!**

## How Does This Help?

- **Visualization:** Future MuseTag tools will be able to generate trees, graphs, and timelines from your annotations.
- **Editor interfaces:** Thanks to these hierarchical relations, a MuseTag-aware editor could offer a visual tree/arborescence interface for navigating, editing, or reorganizing your entities and their relationships.
- **Clarity:** Your relationships are explicit, unambiguous, and machine-readable.
- **Flexibility:** Use the form that fits your prose—no need to break your writing flow.

## Try It Now!

You can start using these hierarchical modifiers in your MuseTag-annotated texts right away.  
Check out the updated [cheat sheet](/40-cheat-sheet.html) for a quick reference, and see the [specifications](/99-specifications.html) for all the details.

**Note:** These modifiers are now part of the official MuseTag specification and documentation.  
**However, they are not yet implemented in the interactive demo.**  
We’re eager to bring support for hierarchical relations to the demo and tools very soon—stay tuned!

As always, your feedback and ideas are welcome—join the conversation on [GitHub Discussions](https://github.com/MuseTag/musetag.github.io/discussions).

Happy worldbuilding, mapping, and storytelling with MuseTag!
