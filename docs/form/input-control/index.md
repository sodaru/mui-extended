# FormInputControl

---

Some Controls from `material-ui` does not include _error_ or _helperText_ props

`withFormInputControl` HOC wraps control component with in [_`FormControl`_](https://mui.com/api/form-control/)

## Props

- All [_`FormControlProps`_](https://mui.com/api/form-control/#props)
- `labelProps` - [_`FormLabelProps`_](https://mui.com/api/form-label/#props)
- `helperTextProps` - [_`FormHelperTextProps`_](https://mui.com/api/form-helper-text/#props)
- All Props required by `withFormField` HOC
- `InputProps` - All props of original Input Component, excluding `withFormField` props

Any Custom Input can be wrapped with this HOC to create a Field enabled to use with `withFormField`
