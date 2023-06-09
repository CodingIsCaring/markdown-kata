# MarkDown Kata

Here the attendees will be able to put all the concepts in action and check how to work with TDD, TPP, Unit tests, Integration tests, Mock and Software Design.

## The Problem

The goal is to implement a command line tool that takes a markdown file and returns another markdown file, applying certain transformations to the text.

`link2footnote(nameOfOriginFile, nameOfDestinationFile) -> fileInMarkDown.md`

The first transformation is to turn links into footnotes. The syntax of a link is this:

**Origin data:** `[visible text link](url)`

The syntax of a footnote is the following:

**Result data:** 

```markdown
visible text link [^1]

[^1]: url
```

The goal is to make conversions like the following:

## Example

### Original:

```markdown
[this book](https://codigosostenible.com) and some other text and some [other](https://www.twitch.tv/codingiscaring) text line.
```

### Result:
```markdown

this book [^1] and some other text and some other [^2] text line.

[^1]: https://codigosostenible.com
[^2]: https://www.twitch.tv/codingiscaring
```

There are multiple edge cases to consider: multiple links per line, several links sharing the same url...
