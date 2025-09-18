---
layout: post
title: "New in MuseTag: Grouping Entities for Faster, Clearer Annotation"
date: 2025-09-18 14:07:24 +0200
categories: features
tags: [syntax, grouping, annotation, update]
author: MuseTag Team
---

We're excited to announce a new feature in MuseTag that makes annotating your stories even faster and more expressive: **entity grouping syntax**!  
You can now apply the same modifier(s) to several entities at once, with a single, concise annotation.

## Why Group Entities?

When writing fiction, scripts, or any structured narrative, it's common to want to assign the same attribute or note to several characters, places, or objects.  
Previously, you had to repeat the annotation for each entity:

```musetag
@@Claire.age(26)
@@Antoine.age(26)
```

With the new grouping syntax, you can factorize your annotation:

```musetag
@@(Claire,Antoine).age(26)
```

This is **strictly equivalent** to the two separate annotations above.  
Grouping is a **syntactic convenience**—it does not create a persistent group or relationship between the entities. It simply lets you apply the same modifier(s) to each entity in the list, making your markup cleaner and your intent clearer.

## How Does It Work?

- List the entities you want to annotate, separated by commas, inside the parentheses of a hidden entity declaration.
- Apply any modifier(s) as usual after the group.

**Example:**

```musetag
@@(Sherlock,Watson).friends.Dialog[
--- Wath do you think about it, dear friend ?
--- Not so much.
]
```

This marks both Sherlock and Watson as participants in the dialogue.

You can use grouping with any modifier:

```musetag
@@(Paris,Lyon,Marseille).Type(place)
@@(Alice,Bob).friends
```

## Use Cases

- **Dialogues:** Quickly indicate all participants in a conversation.
- **Shared attributes:** Assign the same age, role, or status to several characters.
- **Batch tagging:** Mark multiple places, objects, or events with the same type or note.
- **Cleaner markup:** Reduce repetition and make your annotations easier to read and maintain.

## What Grouping Does *Not* Do

- It does **not** create a logical or persistent group—it's just a shortcut for applying the same annotation to each entity.
- It does **not** support nested groups (no `@@((Alice,Bob),Claire)`).
- Mixing visible and hidden entities in a group is allowed by syntax, but rarely useful.

## Try It Now!

Entity grouping is now part of the official MuseTag syntax and is documented in the [Quick Start Guide](/10-quickstart.html), [Cheat Sheet](/40-cheat-sheet.html), and [Specifications](/99-specifications.html).

As always, your feedback is welcome! Let us know how you use grouping, or what features you'd like to see next, on our [GitHub Discussions](https://github.com/MuseTag/musetag.github.io/discussions).

Happy annotating—faster and clearer than ever!

---