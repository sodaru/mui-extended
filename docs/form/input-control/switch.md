```YAML
title: FormSwitch
meta:
  description:
    A react Switch to be used with Form.
```

# FormSwitch

---

A `ControlledSwitch` is created to map `value` to `checked` attribute of the switch component

Then `FormSwitch` is created as follows

```ts
const FormSwitch = withFormField(withFormInputControl(ControlledSwitch));
```

## Props

- All [_`FormInputControlProps`_](../input-control)
- `InputProps`
  - All [_`SwitchProps`_](https://mui.com/api/switch/#props)
  - `formControlLabelProps` - All [_FormControlLabelProps_](https://mui.com/api/form-control-label/#props)

## &nbsp;

_Refer [`Form`](../../form) for Usage_
