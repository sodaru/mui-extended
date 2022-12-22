```YAML
title: FormRadioGroup
meta:
  description:
    A react RadioGroup to be used with Form.
```

# FormRadioGroup

---

A `ControlledRadioGroup` is created to map `value` to that of selected `Radio` component

Then `FormRadioGroup` is created as follows

```ts
const FormRadioGroup = withFormField(
  withFormInputControl(ControlledRadioGroup)
);
```

## Props

- All [_`FormInputControlProps`_](../input-control)
- `InputProps`

  - All [_RadioGroupProps_](https://mui.com/api/radio-group/#props)

#### Note

[_Radio_](https://mui.com/components/radio-buttons/) is not altered. Can be used as child of FormRadioGroup along with [_FormControlLabel_](https://mui.com/api/form-control-label/)

## &nbsp;

_Refer [`Form`](../../form) for Usage_
