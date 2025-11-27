---
layout: post
title: "Demo Update: Seeing in Color"
date: 2025-11-27 15:55:00 +0100
categories: updates
tags: [demo, color, visualization, features]
author: MuseTag Team
---

Following our recent updates for Dialogues and Aliases, we're excited to announce that the [MuseTag interactive demo](/30-demo.html) now fully supports the `.Color` modifier!

## 🎨 Bringing Entities to Life

The `.Color` modifier allows you to assign a specific display color to your entities. This is more than just a cosmetic tweak—it's a powerful tool for visual organization.

In the demo, you can now write:
```musetag
@@Sherlock.Color(#ffcc00)
@@Watson.Color(steelblue)
```

### What changes?

1.  **Entity Cards**: The entity cards in the side panel will now feature a colored border and header matching your assigned color, making it easier to distinguish between characters at a glance.
2.  **Text Highlights**: Occurrences of the entity in the text preview are now highlighted with their specific color. This creates an immediate visual map of who is present in your scene.

## Visualizing the Narrative

With `.Color` and `.Dialog` all working together, the demo now provides a rich, multi-layered view of your text. You can see who is speaking, identify entities by their icons, and track their presence through color-coded highlights.

Head over to the [demo page](/30-demo.html) to try it out and start coloring your story!
