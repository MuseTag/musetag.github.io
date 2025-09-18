---
title: Quick Start
layout: page_with_toc
---

## Welcome to MuseTag!

MuseTag is a semantic annotation language that extends Markdown to help you keep track of characters, places, events, and relationships in your creative writing. Let's dive in!

**Want to try before you learn?** Check out our [interactive demo](30-demo.html) where you can experiment with MuseTag annotations in real-time!

## Where to start?

MuseTag is not a standalone tool. As the project is in early development, there are currently no dedicated tools available yet—but your annotated text will be compatible with future utilities as they are released. You can already use MuseTag in any plain text or Markdown editor.

Want to help shape the project, ask questions, or get updates?
Join our community on [GitHub Discussions](https://github.com/MuseTag/musetag.github.io/discussions)!

If you are also a coder, you may want to implement MuseTag in an existing tool or create a new one. In this case, please have a look at [the complete specifications](specifications.html).

## What is Markdown?

Markdown is a lightweight markup language that you probably already know. It uses simple symbols to format text:

```markdown
# Heading
**Bold text**
*Italic text*
[Link](https://example.com)
```

If you're new to Markdown, you can check out the [Markdown Guide](https://www.markdownguide.org/basic-syntax/) for the basics. But this is not a requirement to start using MuseTag right now.

## The 5-Minute MuseTag Basics

### Mark an Entity—Just Once!

In MuseTag, you only need to use the `@@` marker the **first time** an entity appears in your text. This is called the **entity declaration**.

After that, every time you use the same name (the _canonical name_), MuseTag will recognize it as a reference to the same entity—no need to repeat the `@@` marker.

For example:

```musetag
@@Alice entered the room.
Alice smiled at Bob.
Bob greeted Alice.
```

All occurrences of “Alice” are now tracked as the same entity, even if you don’t use `@@` again.

If you want to refer to the entity using a different name, synonym, or pronoun, use the hidden entity marker:

```musetag
@@(Alice)She looked at @@(Bob)him.
```

**Result for reader:**
> She looked at him.

#### Use Aliases for Alternative Names

You can also define alternative names (aliases) for an entity using the `.Alias` standard modifier. When you define an alias, any occurrence of that alias in your text—even without the `@@` marker—will be recognized as a reference to the canonical entity.

For example:

```musetag
@@(Sherlock_Holmes).Alias[Holmes] looked at @@(John_Watson).Alias[Watson].
Holmes and Watson were famous detectives.
```

Here, both "Holmes" and "Watson" will be recognized as references to their respective entities everywhere in the text, even in the second sentence where the `@@` marker is not used.

You can define multiple aliases for the same entity; all are cumulative.

**What is an entity?**
An entity is a meaningful element in your story—like a character, place, or object—that is described, referred to repeatedly, and helps structure the narrative.

### Entity hierarchy

You can indicate the importance of an entity by using more `@` signs in its declaration:

- `@@Holmes` — main entity (e.g. main character)
- `@@@Lestrade` — secondary entity
- `@@@@a_kid` — minor entity

The more `@` signs you use, the less important the entity is considered.
This helps tools and editors highlight or de-emphasize entities according to their narrative role.

**Note:**
Once you declare an entity as secondary (`@@@`) or minor (`@@@@`), it keeps that status everywhere in the text—even if you reference it later with fewer `@`.

### Types of entities

So, by default, entities are characters. How to mark some entitiesother things ? Use _modifiers_.

For example, mark a place:

```musetag
@@London.Place was foggy yesterday.
```

or an object:

```musetag
@@Arthur hold @@Excalibur.Object.
```

or en event:

```musetag
@@Christmas.Event was the day after.
```

or, if you need nothing we did not think about:

```musetag
The @@Spirit.Type(idea) was @@Hegel.
```

Those modifiers are removed for the readers :

> London was foggy yesterday.
> Arthur hold Excalibur.
> Christmas was the day after.
> The Spirit was Hegel.

But those modifiers helps MuseTag tools to classify your entities and make your documentation clearer. You just to have use those once: when MuseTag learnt that London is a place, you don't have to tell it twice.

This is only a special and powerful use of modifiers. You will learn more about them below.

### Annotate Entities

You may annotate an entity at any time easily:

### Annotate Multiple Entities at Once (Grouping Syntax)

You can apply the same modifier(s) to several entities at once by listing them, separated by commas, inside the parentheses of a hidden entity declaration. This is a **syntactic convenience**: the modifier(s) are applied to each entity individually.

For example:

```musetag
@@(Claire,Antoine).age(26)
```

This is strictly equivalent to writing:

```musetag
@@Claire.age(26)
@@Antoine.age(26)
```

Grouping does not create a persistent group or relationship between the entities; it simply allows you to factorize your annotations for clarity and brevity.

```musetag
@@Entity(parameter)
```

For example:

```musetag
@@Anne(25 years old) smiled at @@Paul(friend).
```

**Result for readers:**
> Anne smiled at Paul.

**Behind the scenes:**
MuseTag-enabled tools will attach "25 years old" to Anne and "friend" to Paul as information you can see on their entity cards.

#### Local and Global Notes

You can attach a note to an entity for just one occurrence (local note), or for all its appearances (global note):

```musetag
@@Marie(25 years old) smiled.      # Local note
@@Marie_(red hair)                 # Global note
```

- Use `@@Entity(note)` for a local note (applies only at this point in the text).
- Use `@@Entity_(note)` for a global note (applies everywhere the entity appears, unless a local note is present).

**Note:**
Global modifiers (like `.GNote`, `.DESCRIPTION`, etc.) are cumulative: each occurrence adds information to the entity, rather than replacing previous values.

### Add Visible Details with Modifier Parameters

Want to show additional information about an entity in the text? Use square brackets:

### Mark Dialogues with the `.Dialog` Modifier

You can explicitly mark a passage as a dialogue using the standard `.Dialog` modifier. The parameter is the dialogue text itself, usually provided as a visible parameter in square brackets (`[]`). When used with entity grouping, all listed entities are considered participants in the dialogue.

```musetag
@@(Sherlock,Watson).Dialog[
--- What do you think about it, dear friend?
--- I do not know what to think.
]
```

This marks both Sherlock and Watson as participants in the dialogue.

```musetag
The @@(Watson).PROFESSION[Doctor] assisted with the investigation.
```

**Result for readers:**
> The Doctor assisted with the investigation.

**Behind the scenes:**
The information is stored in Watson's entity card:

```musetag
# Watson
- Type: Character
- Profession: Doctor
- Appearances: Chapter 1
```

### Modifier Case: Context, Permanent, and Standard Modifiers

Modifier case matters in MuseTag:

- **Lowercase modifiers** (e.g. `.mood`, `.age`) are for context-specific or temporary information.
- **UPPERCASE modifiers** (e.g. `.BRAVE`, `.MAGICAL`) are for permanent attributes of an entity, defined by you.
- **Capitalized modifiers** (e.g. `.Type`, `.Status`, `.Event`, `.Place`, `.Pov`, `.Object`, `.Todo`, `.Version`, `.Draft`, `.Final`, `.Geo`) are standard modifiers defined by MuseTag or its tools. You can also create your own modifiers, but remember that case is always significant.

For example:

```musetag
@@Arthur.BRAVE.tired entered the room with @@Excalibur.Object.MAGICAL.
```

In this example, Arthur is always brave (`.BRAVE`, permanent) but only tired in this context (`.tired`, temporary). Excalibur is always magical (`.MAGICAL`, permanent) and is explicitly marked as an object using the standard modifier `.Object`.

There are also advanced modifiers, such as `.Geo(latitude, longitude)`, which can be used by editors to associate a place with its geographic coordinates for map visualization.

### Store Hidden Metadata

Use parentheses to store information that doesn't appear in the text:

```musetag
The @@(Watson).age(35).PROFESSION[military doctor] served in Afghanistan.
```

**Result for readers:**
> The military doctor served in Afghanistan.

**Behind the scenes:**
```musetag
# Watson
- Type: Character
- Age: 35
- Profession: military doctor
- Appearances: Chapter 1
```

### Track Timeline and Events

Dates are special entities that help you manage your story's timeline:

```musetag
@@(1891-05-04) It was a foggy London morning when @@Lestrade arrived with news.
```

**Result for readers:**
> It was a foggy London morning when Lestrade arrived with news.

**Behind the scenes:**
MuseTag-enabled tools can generate chronological timelines:

```musetag
# Timeline
- 1891-05-04: Lestrade arrives with news (Chapter 2)
- 1891-05-05: The investigation begins (Chapter 3)
```

### Indicate Point of View

Use modifiers to show whose perspective a scene is from:

```musetag
## Chapter 1 @@(Watson).Pov

I had not seen @@Holmes for several days...
```

**Result for readers:**
> ## Chapter 1
>
> I had not seen Holmes for several days...

**Behind the scenes:**
MuseTag-enabled tools track narrative structure:

```musetag
# Narrative Structure
- Chapter 1: Watson's POV
```


## An fairly complete Example

```musetag
# A Study in Annotation @@.GENRE(mystery)

## Chapter 1 @@(Watson).Pov

@@(London) @@(1881-03-04)

I had just returned from @@Afghanistan when I met a
@@(Holmes).PROFESSION[consulting detective] through a mutual acquaintance.
He was looking for someone to share his lodgings
at a @@(221B_Baker_Street).Place[comfortable apartment].

"You have been in @@Afghanistan.Place, I perceive," were his first words to me,
leaving me quite astonished at his insight.
```

**Result for readers:**
> # A Study in Annotation
>
> ## Chapter 1
>
> I had just returned from Afghanistan when I met a consulting detective through a mutual acquaintance. He was looking for someone to share his lodgings at a comfortable apartment.
>
> "You have been in Afghanistan, I perceive," were his first words to me, leaving me quite astonished at his insight.

**Behind the scenes:**
MuseTag-enabled tools would generate:
- Entity cards for Watson, Holmes, London, Afghanistan, and 221B Baker Street
- A timeline entry for March 4, 1881
- Genre categorization for the document
- POV tracking for chapters

## What's Next?

- **Combine with Markdown**: Use all standard Markdown features alongside MuseTag annotations.
- **Explore Modifiers**: Try `.mood()`, `.Status(draft)`, or create your own.
- **Build Your World**: Create a consistent set of characters, places, and events.
- **Structure Your Narrative**: Use annotations to track plot arcs and themes.
- **Stay tuned for tools**: While dedicated MuseTag tools are still in development, your annotations are future-proof and will be compatible with upcoming editors and visualization utilities.
- **Join the community**: Share your feedback, ideas, or questions on [GitHub Discussions](https://github.com/MuseTag/musetag.github.io/discussions)!
- **Future-proof**: Any text you annotate with MuseTag today will remain compatible with future tools and workflows.

## Tips

- Develop a consistent annotation style for your project.
- Use annotations sparingly at first—you can always add more later.
- Consider creating a simple legend of your most-used annotations.
- Remember that MuseTag annotations can be completely hidden from your final reader.
- Use visible parameters `[]` when you want the information to appear in your text.
- Use invisible parameters `()` when you want to store metadata only.
- You can combine multiple modifiers of different types on the same entity.
- The default entity type is character, but you can specify others with `.Type(...)`.
- The distinction between lowercase, UPPERCASE, and Capitalized modifiers helps you organize context, permanent, and standard information.

Ready to organize your narrative world?

**Practice what you've learned** in our [interactive demo](30-demo.html) or start annotating your own work right away!

Happy writing with MuseTag!
