---
layout: post
title: "Demo Update: Bringing Voices and Aliases to Life"
date: 2025-11-20 13:30:00 +0100
categories: updates
tags: [demo, dialog, alias, features]
author: MuseTag Team
---

We've just pushed a significant update to the [MuseTag interactive demo](/30-demo.html), bringing two powerful features to life: **Dialogues** and **Aliases**.

## 💬 Dialog Support

The `.Dialog` modifier is now fully supported in the demo! This feature allows you to mark passages as spoken dialogue, making your narrative structure even clearer.

In the demo, when you use:
```musetag
@@Sherlock.Dialog[Elementary, my dear Watson.]
```

It will now be rendered with a clear visual distinction:
> **Sherlock:** Elementary, my dear Watson.

And in the entity panel, you'll see a dedicated dialogue icon (💬) next to these occurrences, making it easy to scan through a character's spoken lines.

## 🎭 Alias Support

We've also added support for the `.Alias` modifier. This is a game-changer for natural writing flow. You can now define alternative names for your entities, and the demo will automatically recognize them in the text.

```musetag
@@Sherlock.Alias(Holmes)
```

Once defined, any mention of "Holmes" in your text will be automatically detected as a reference to Sherlock. No need to spam `@@` tags everywhere!

Plus, we've improved the selection logic: clicking on an alias in the text (like "Holmes") will now automatically open the corresponding entity card (Sherlock), just as you'd expect.

## Try it out!

Head over to the [demo page](/30-demo.html) and give these new features a spin. We're excited to see how they help you organize your creative writing!
