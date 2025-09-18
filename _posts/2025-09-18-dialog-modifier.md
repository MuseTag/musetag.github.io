---
layout: post
title: "New in MuseTag: The .Dialog Modifier for Effortless Dialogue Annotation"
date: 2025-09-18 14:15:00 +0200
categories: features
tags: [modifier, dialog, annotation, update]
author: MuseTag Team
---

We're delighted to introduce a new standard modifier in MuseTag: **`.Dialog`**!
This addition makes it easier than ever to annotate dialogues in your stories, scripts, or any narrative text—while keeping your markup clean, expressive, and future-proof.

## Why a `.Dialog` Modifier?

Dialogues are at the heart of many stories. Whether you're writing fiction, theater, comics, or screenplays, it's crucial to clearly indicate which passages are spoken exchanges and who is involved.
With the new `.Dialog` modifier, you can:

- Explicitly mark dialogue passages in your text
- Easily indicate all participants in a conversation (even with entity grouping)
- Enable future tools to extract, analyze, and visualize dialogues and interactions

## How Does It Work?

Simply use the `.Dialog` modifier after a group and provide the dialogue text as a parameter—usually in square brackets for visible text.

**Basic example:**

```musetag
@@(Sherlock,Watson).Dialog[
--- What do you think about it, dear friend?
--- I do not know what to think.
]
```
Here, both Sherlock and Watson are marked as participants in the dialogue.
Grouping allows you to annotate multi-character exchanges in a single, concise annotation.

## Use Cases

- **Fiction and scripts:** Clearly attribute lines and exchanges to characters
- **Comics and theater:** Mark who is present in a scene or conversation
- **Analysis:** Enable tools to extract all dialogues, count lines per character, or visualize interaction networks
- **Cleaner markup:** Reduce ambiguity and make your intent explicit for both readers and future MuseTag tools

## Syntax Recap

- Use `.Dialog[dialogue text]` after a group of entities
- The parameter is the dialogue itself (usually visible, in square brackets)
- With grouping, all listed entities are considered participants

## Try It Now!

The `.Dialog` modifier is now part of the official MuseTag specification and is documented in the [Quick Start Guide](/10-quickstart.html), [Cheat Sheet](/40-cheat-sheet.html), and [Specifications](/99-specifications.html).

> **Note:** Support for `.Dialog` in the interactive demo and tools is coming soon!

As always, your feedback is welcome—let us know how you use `.Dialog`, or what features you'd like to see next, on our [GitHub Discussions](https://github.com/MuseTag/musetag.github.io/discussions).

Happy writing—and happy dialoguing!

---
