# FormCheckboxGroup

A `ControlledCheckboxGroup` is created to map `value` to that of `CheckboxGroup` component

Then `FormCheckboxGroup` is created as follows

```ts
const FormCheckboxGroup = withFormField(
  withFormInputControl(ControlledCheckboxGroup)
);
```

## Props

- All [_`FormInputControlProps`_](../input-control)
- `InputProps`

  - All [`CheckboxGroupProps`](#)

#### Note

Unlike `RadioGroup` , material-ui does not provide a similar `CheckboxGroup`. Hence a new component `CheckboxGroup` is created as described below

## CheckboxGroup

First a `CheckboxGroup` is created with following features

- created from [_FormGroup_](https://mui.com/api/form-group/)
- contains values of type `string[]` to hold the values of selected checkboxes
- child `Checkbox`es can read and update the state by using `useCheckboxGroup` context
- no indeterminate state of checkbox is allowed

## FormCheckbox

Original [_Checkbox_](https://mui.com/components/checkboxes/) is wraped to use `useCheckboxGroup` to update its `checked` state to `CheckboxGroup`

#### Note

must use `FormCheckbox` instead of [_Checkbox_](https://mui.com/components/checkboxes/) within `FormCheckboxGroup`

## &nbsp;

_Refer [`Form`](../../form) for Usage_
