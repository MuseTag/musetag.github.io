# MuseTag

> A lightweight semantic annotation language for writers

## TL;DR

MuseTag is a lightweight semantic annotation language that allows writers to organize their creative work directly within their text. It offers a simple syntax to track characters, locations, plot elements and their relationships, without interrupting the writing flow. Compatible with standard text editors and Markdown, MuseTag naturally integrates into the creative process while providing a structured view of the work. The annotations remain optional and human-readable, enabling authors to focus on their content while maintaining clear organization when needed.

## Getting Started

For a comprehensive introduction, documentation and guides, please visit the **[MuseTag official website](https://musetag.github.io)**.

## Quick Example

```musetag
@@Jules(smiled) at @@Marie(25 years old) while she was reading.
```

In this example, "Jules" is annotated with a simple, unqualified note ("smiled") and "Marie" is annotated with an age ("25 years old")—both using the most basic MuseTag annotation syntax. Readers simply see:

> Jules at Marie while she was reading.

You can also attach notes to entities, either locally or globally:

```musetag
@@Marie(25 years old) smiled.      # Local note
@@Marie_(red hair)                 # Global note
@@Marie went to the market.        # "red hair" is shown for Marie here
@@Marie(30 years old) danced.      # "30 years old" overrides the global note here
```

You can also use more advanced forms, for example:

```musetag
@@Jules smiled at @@(Marie).age(25)her while she was reading.
```

Here, "Jules" is a visible entity and "Marie" is a hidden entity with a modifier (`age`) and a hidden parameter (`25`), while readers simply see:

> Jules smiled at her while she was reading.

## See It in Action

**Try MuseTag instantly** with our [interactive demo](https://musetag.github.io/30-demo.html)! Edit example text in real-time and see how MuseTag annotations work—no installation required.

## Key Features

- **Write naturally**: Add annotations without leaving your text editor
- **Track everything**: Characters, locations, events, and their relationships
- **Stay focused**: All your notes right where you need them
- **Keep control**: Your text remains plain text, readable anywhere
- **Build tools**: Structured annotations enable powerful analysis tools

## Documentation

- [Quick Start Guide](https://musetag.github.io/quickstart.html) - Start using MuseTag in 5 minutes
- [Complete Specifications](https://musetag.github.io/specifications.html) - For developers and advanced users

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
