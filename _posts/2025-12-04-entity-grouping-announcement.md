---
layout: post
title: "Entity grouping: annotate several entities at once (demo implemented)"
date: 2025-12-04 10:00:00 +0100
categories: features
tags: [syntax, grouping, demo, update]
author: MuseTag Team
---

A short, friendly update: entity grouping — announced on 2025-09-18 — is now actually implemented in the interactive demo. The parser now recognises grouped hidden declarations and applies the same modifier(s) to each listed entity. There is no UI change: this is a parsing/inspection improvement only.

## What's new

- The demo parser recognises grouped hidden declarations like `@@(A,B,C).Modifier(...)` and treats them as if each entity had been individually annotated.
- Grouping is strictly syntactic sugar: it does not create a new "group" entity, nor does it imply any structural relationship between members.

## Core syntax

Grouping relies on the hidden-entity parentheses and commas as separators. The only supported, documented form for grouping is:

- Hidden grouping using parentheses: `@@(Name1,Name2,Name3).Modifier(...)`

Key points:
- Parentheses `(...)` delimit the group.
- Commas `,` separate the entity names inside the parentheses.
- Modifiers that follow are applied to each listed entity as if the annotation were duplicated for every member.
- Nested groups (`@@((A,B),C)`) are not supported.

## Examples

Inline example (short):
`@@(Claire,Antoine).age(26)`

This is equivalent to writing the annotations separately:

```musetag
@@Claire.age(26)
@@Antoine.age(26)
```

Block examples (copy/paste into the demo):

```musetag
@@(Paris,Lyon,Marseille).Type(place)
```

```musetag
@@(Sherlock,Watson).Dialog[
--- What do you think about it?
--- I am not certain, my friend.
]
```

## Try it in the demo

[Open the interactive demo](/30-demo.html), paste a grouped example, and watch cards and timeline pick up the resulting entities and modifiers.

[Learn more in the original feature announcement](/_posts/2025-09-18-entity-grouping.md). For the full syntax and technical details, [see the specifications](/99-specifications.html).

## Feedback

We'd love to hear how grouping fits into your workflow. If you try it, please share examples, edge-cases or ideas on [GitHub Discussions](https://github.com/MuseTag/musetag.github.io/discussions).

Thanks for trying the demo — slightly faster, and a little neater.
