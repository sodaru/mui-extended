# MarkdownEditor

---

## Usage

```typescript
import { MarkdownEditor, MarkdownEditorProps } from "@solib/ui-components";

const props: MarkdownEditorProps;

const markdownEditor = <MarkdownEditor {...props} />;
```

### Props

- All props of [`TextareaAutosize`](https://mui.com/components/textarea-autosize/)
- `inlinePreview` - boolean , if true preview is displayed below the write section
- `menu`- string[][] - customized menu order
- `menuButtons` - FunctionComponents to render Menu Buttons
- `menuActions` - functions to add custom logic to buttons
  - each action for a given menu is of type
    ```typescript
    export type MarkdownEditorMenuButtonAction = (
      name: string,
      content: string,
      selectionStart: number,
      selectionEnd: number
    ) => { content: string; selectionStart: number; selectionEnd: number };
    ```

## Features

- Wrapped around [`TextareaAutosize`](https://mui.com/components/textarea-autosize/)
- `menu` can be customized by

  - changing the order and grouping of menu buttons
  - overriding or adding new additional buttons
  - overriding or adding neew additional actions

  **Note**
  If used as InputComponent for `TextField` , add bellow props to TextField

  ```typescript
     const props = {
       InputLabelProps:{{ shrink: true }},
       fullWidth : true
     }
  ```
