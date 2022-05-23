# Markdown Preview

---

## Usage

```typescript
import { MarkdownPreview } from "@solib/ui-components";

// load the markdown content
const markdownContent: string;

const markdownView = <MarkdownPreview>{markdownContent}</MarkdownPreview>;
```

Following Document demo the different markdown features supported by `MarkdownPreview` Component

---

## Features

### 1. Headers

- # h1 Heading

- ## h2 Heading

- ### h3 Heading

- #### h4 Heading

- ##### h5 Heading

- ###### h6 Heading

- Paragraph

### 2. Horizontal Rules

use `---`

### 3. Special Chars

- &copy; &amp;

### 4. Emphasis

- **This is bold text**

- _This is italic text_

- ~~Strikethrough~~

### 5. Blockquotes

> Blockquotes can also be nested...
>
> > ...by using additional greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.

### 6. Lists

#### Unordered

- Create a list by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    - Ac tristique libero volutpat at
    * Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Very easy!

#### Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

4. You can use sequential numbers...
5. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar

#### Todos

- [x] Task 1
- [x] Task 2
- [ ] Task 3

### 7. Code

- Inline `code`

- Indented code

      // Some comments
      line 1 of code
      line 2 of code
      line 3 of code

- Block code "fences"

  ```
  Sample text here...
  ```

- Syntax highlighting

  ```js
  var foo = function (bar) {
    return bar++;
  };

  console.log(foo(5));
  ```

### 8. Tables

- Normal
  | Option | Description |
  | ------ | ------------------------------------------------------------------------- |
  | data | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext | extension to be used for dest files. |

- Right aligned columns

  | Option |                                                               Description |
  | -----: | ------------------------------------------------------------------------: |
  |   data | path to data files to supply the data that will be passed into templates. |
  | engine |    engine to be used for processing templates. Handlebars is the default. |
  |    ext |                                      extension to be used for dest files. |

### 9. Links

- [link text](https://sodaru.com)

- [link with title](https://sodaru.com "title text!")

- Autoconverted link https://sodaru.com/platform

- Links are wrapped with `next/link` to utilise next routing for relative links . [Go back to home](./)
- Links use Mui's `Link` Component for styling

### 10. Images

Use query parameters syntax in title field to provide more attributes to img tag `![minion](https://octodex.github.com/images/minion.png `**`"?width=200"`**`)`

- ![minion](https://octodex.github.com/images/minion.png "?width=200")
- ![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "With Title and width?width=200")

- Like links, Images also have a footnote style syntax

  ![Alt text][id]

  With a reference later in the document defining the URL location:

  [id]: https://octodex.github.com/images/dojocat.jpg "The Dojocat?width=200"

### 11. Footnotes

- Footnote 1 link[^first].

- Footnote 2 link[^second].

- Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.
