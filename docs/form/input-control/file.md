```YAML
title: FormFileInput
meta:
  description:
    A customizable react FileInput to be used with Form.
```

# FormFileInput

---

A `ControlledFileInput` is created to map `value` to `onChange` attribute of the file input. Rendered as a button to open the native file select dialog

Then `FormFileInput` is created as follows

```ts
const FormFileInput = withFormField(withFormInputControl(ControlledFileInput));
```

## Props

- All [_`FormInputControlProps`_](../input-control)
- `InputProps`
  - All [_`ButtonProps`_](https://mui.com/api/button/#props)
  - `accept` , `capture` , `multiple` - attributes of [_HTML file Input_](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)
  - `RenderFiles` - a FunctionComponent to render selected files. a DefaultRenderer is used , if omitted

## &nbsp;

_Refer [`Form`](../../form) for Usage_
