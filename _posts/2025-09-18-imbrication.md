---
layout: post
title: "MuseTag: Imbrication of Modifiers and Entities—How Deep Can You Go?"
date: 2025-09-18 15:00:00 +0200
categories: features
tags: [syntax, imbrication, annotation, hierarchy, dialog, voice]
author: MuseTag Team
---

MuseTag is designed to be both expressive and flexible, letting you annotate your stories with as much nuance and structure as you need. One of the most powerful features of MuseTag is the **imbrication** (nesting) of entities and modifiers—allowing you to represent complex relationships, dialogues, and narrative structures in a natural way.

## What Is Parameter Imbrication?

Parameter imbrication means that the parameters of a modifier (the content inside parentheses or brackets) can themselves contain other MuseTag annotations: entities, modifiers, even other nested structures. There is **no artificial limit** to how deep you can go—MuseTag is designed to follow your narrative logic, not to restrict it.

This is especially useful for:

- **Hierarchical relationships** (family trees, organizational charts, spatial containment)
- **Dialogues and voices** (who says what, with what expression, inside a conversation)
- **Editorial or meta-annotations** (comments, suggestions, etc. inside other annotations)

## How Does It Work?

MuseTag processes your text **successively**: each modifier only cares about its own parameter, extracts what it needs (often the first entity), and then the global analysis continues inside the parameter, treating it as regular MuseTag text. There is no need for deep recursive parsing—just a natural, step-by-step walk through your markup.

### Hierarchical Example

Suppose you want to represent a family hierarchy:

```musetag
@@Mummy.ParentOf(@@Mom.ParentOf(@@Jane.age(25)))
```

- The process for `ParentOf` on `@@Mummy` extracts `@@Mom` from its parameter, then the analysis continues on `@@Mom.ParentOf(@@Jane.age(25))`.
- The process for `ParentOf` on `@@Mom` extracts `@@Jane`, then the analysis continues on `@@Jane.age(25)`.
- The process for `age` on `@@Jane` extracts `25`.

Each step is simple, and you can nest as deeply as your story requires.

### Dialogues and Voices

Imbrication shines in narrative structures like dialogues, where you want to mark both the overall exchange and each speaker's intervention:

```musetag
@@.Dialog[
  @@(Holmes).Voice(intrigued)[--- What is happening here?]
  @@(Watson).Voice(thought)[--- I wonder...]
  @@(Lestrade).Voice[--- Gentlemen, any progress? @@(Holmes).Comment[interrupting](Lestrade cuts in abruptly)]
]
```

- `.Dialog` marks the whole block as a dialogue.
- Each `.Voice` marks a line as spoken (or thought) by a character, with optional expression.
- You can even add a `.Comment` inside a line, to annotate an interruption or editorial note.

### Why Allow Deep Imbrication?

- **Expressiveness:** You can model any narrative or structural complexity your story needs.
- **Clarity:** Your markup mirrors your story's logic—dialogues within dialogues, thoughts within speech, comments within actions.
- **Tooling:** Future MuseTag tools can extract, analyze, or visualize these structures, whether for family trees, dialogue maps, or editorial workflows.

### Is There a Limit?

**No!** MuseTag does not impose any limit on the depth or complexity of imbrication. The only constraint is the validity of your syntax—and your own sense of clarity. If your markup becomes hard to read, you can always break it up or add comments for yourself.

### Practical Tips

- Use imbrication to clarify, not to confuse. Deeply nested structures are powerful, but readability matters.
- For editorial or meta-annotations, imbrication lets you attach comments or suggestions exactly where they're needed.
- For TTS or audiobook production, imbrication allows you to specify not just who speaks, but how, and in what context.

## Try It Yourself!

Imbrication is now fully documented in the [MuseTag specifications](/99-specifications.html), [Quick Start Guide](/10-quickstart.html), and [Cheat Sheet](/40-cheat-sheet.html).  
Experiment with hierarchical, dialogic, and editorial structures—MuseTag is ready for your most ambitious narrative architectures!

As always, your feedback is welcome—share your creative uses of imbrication or your questions on [GitHub Discussions](https://github.com/MuseTag/musetag.github.io/discussions).

Happy annotating—no matter how deep you go!

---