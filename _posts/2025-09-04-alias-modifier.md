---
layout: post
title: "Introducing the .Alias Modifier: Flexible Alternative Names for Your Entities"
date: 2025-09-04 14:06:00 +0200
categories: features
tags: [modifier, alias, update, annotation]
author: MuseTag Team
---

We're excited to announce a brand new feature in the MuseTag language: the **`.Alias` standard modifier**! This addition makes it easier than ever to refer to your characters, places, and other entities using alternative names—without losing the power of semantic annotation.

## Why an Alias Modifier?

In stories, it's common for the same character or place to be called by different names: nicknames, titles, abbreviations, or even code names. Until now, MuseTag tracked entities by their canonical name (the one you declare with `@@`). But what if you want "Holmes" and "Sherlock Holmes" to always be recognized as the same person, even if you only use `@@` once?

That's where `.Alias` comes in!

## How Does It Work?

With the `.Alias` modifier, you can define one or more alternative names for any entity. Once an alias is set, **any occurrence of that alias in your text—even without the `@@` marker—will be recognized as a reference to the canonical entity**.

### Example

```musetag
@@(Sherlock_Holmes).Alias[Holmes] looked at @@(John_Watson).Alias[Watson].
Holmes and Watson were famous detectives.
```

In this example:
- The first line declares two entities and assigns them aliases.
- In the second line, "Holmes" and "Watson" are used without `@@`, but MuseTag will still recognize them as references to `Sherlock_Holmes` and `John_Watson`.

You can define as many aliases as you need for each entity. All aliases are cumulative and active throughout your text.

## What Can You Do With Aliases?

- **Write more naturally**: Use nicknames, abbreviations, or titles without worrying about breaking your entity tracking.
- **Disambiguate**: Avoid confusion when multiple entities might share similar names.
- **Enhance analysis**: Future MuseTag tools will be able to generate richer character maps, relationship graphs, and timelines—even when you use varied names.

## Not Yet in the Demo

> **Note:** The `.Alias` modifier is now part of the official MuseTag specification and documentation, but it is **not yet supported in the interactive demo**. We're working on updating the demo to fully support aliases—stay tuned for updates!

## Try It in Your Own Writing

You can start using `.Alias` right away in your own annotated texts. The syntax is simple and powerful:

```musetag
@@(Entity).Alias[AlternativeName]
```

As always, your feedback is welcome! Let us know how you use aliases, or what features you'd like to see next, on our [GitHub Discussions](https://github.com/MuseTag/musetag.github.io/discussions).

Happy writing—and happy aliasing!
