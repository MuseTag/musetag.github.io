---
layout: post
title: "New in MuseTag: The .Voice Modifier for Speech, Thought, and Expression"
date: 2025-09-18 14:30:00 +0200
categories: features
tags: [modifier, voice, annotation, update, tts]
author: MuseTag Team
---

We're excited to introduce a powerful new standard modifier in MuseTag: **`.Voice`**!
This addition lets you annotate any passage as spoken, thought, or narrated by an entity—with optional expression or context—making your markup richer, more expressive, and ready for advanced analysis or audio applications.

## Why a `.Voice` Modifier?

Not all speech is dialogue, and not all thoughts are spoken aloud. Whether you're writing fiction, scripts, comics, or interactive stories, it's often useful to:

- Explicitly mark who is speaking, thinking, or narrating a passage
- Indicate the tone, expression, or context of the utterance (e.g. "whispering", "thought", "intrigued")
- Enable future tools (like TTS engines) or actors recording audiobooks or dramatic readings to use different voices, intonations, or effects
- Extract, analyze, or visualize all speech and thought acts in your text

## How Does It Work?

The `.Voice` modifier can be used after any entity (or group of entities) and takes up to two parameters:

- **Visible parameter** (in square brackets `[]`): the text that is spoken, thought, or narrated
- **Hidden parameter** (in parentheses `()`): optional expression, intonation, or context (e.g. "intrigued", "thought", "whispering")

**Examples:**

```musetag
@@(Holmes).Voice(intrigued)[What is happening here?]
@@(Watson).Voice(thought)[He seems troubled...]
@@(Crowd).Voice(shouting)[Down with the tyrant!]
```

- The first marks Holmes's line as spoken with an "intrigued" expression.
- The second marks Watson's thought (not spoken aloud).
- The third marks a crowd's shouted exclamation.

You can use `.Voice` for any utterance—spoken, thought, or narrated—by any entity.

## Use Cases

- **Fiction and scripts:** Attribute every line, thought, or aside to the right character, with expressive nuance.
- **Audiobooks and TTS:** Let future tools or actors use different voices, intonations, or effects for each entity and expression.
- **Analysis:** Extract all speech acts, thoughts, or narrative interventions for study or visualization.
- **Accessibility:** Make your stories more accessible by enabling richer, more accurate audio renderings.

## Syntax Recap

- Use `.Voice[spoken or thought text]` after an entity (or group).
- Optionally, add a hidden parameter in parentheses for expression/context.
- Both parameters can be combined: `.Voice(expression)[text]`

**Examples:**

```musetag
@@Alice.Voice(whispering)[Don't tell anyone.]
@@Bob.Voice(thought)[I hope she didn't notice.]
```

## Combining `.Voice` and `.Dialog`

You can combine `.Voice` and `.Dialog` to structure complex exchanges.  
For example, use `.Dialog` to mark a whole dialogue block, and `.Voice` to attribute each line or intervention:

```musetag
@@.Dialog[
@@(Holmes).Voice[--- What is happening here?]
@@(Watson).Voice[--- I wonder...]
]
```

Here, `.Dialog` marks the passage as a dialogue, and each `.Voice` annotation specifies who speaks (and optionally, how).  
This approach is ideal for scripts, fiction, or any narrative where you want to clarify both the structure of the exchange and the speaker of each line.

## Try It Now!

The `.Voice` modifier is now part of the official MuseTag specification and is documented in the [Quick Start Guide](/10-quickstart.html), [Cheat Sheet](/40-cheat-sheet.html), and [Specifications](/99-specifications.html).

> **Note:** Support for `.Voice` in the interactive demo and tools is coming soon!

As always, your feedback is welcome—let us know how you use `.Voice`, or what features you'd like to see next, on our [GitHub Discussions](https://github.com/MuseTag/musetag.github.io/discussions).

Happy writing—and happy voicing!

---
