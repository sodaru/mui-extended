# Form

---

Form is a controller for input fields

## Usage

- use `Form` to wrap inputs within it
- use `FormTextField`, `FormSwitch` components , these components are enabled to work with in the form
- use `withResetButton` and `withSubmitButton` helpers to add clear and submit buttons

  ```typescript
  import {
    Form,
    FormProps,
    FormTextField,
    FormSwitch,
    withSubmitButton
  } from "@solib/ui-components";
  import { TextField, Button } from "@mui/material";

  const formProps: FormProps;
  const ResetButton = withResetButton(Button);
  const SubmitButton = withSubmitButton(Button);

  const form = (
    <Form {...formProps}>
      <FormTextField name="username" />
      <FormSwitch
        name="remember"
        InputProps={{
          formControlLabelProps: {
            label: "Remember Me",
            labelPlacement: "end"
          }
        }}
      />
      <ResetButton>Reset</ResetButton>
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
  ```

## Features

- Pure Control of form inputs
  - layout and stying is out of scope
- Support for **nested** forms
- Field validation using `JSON Schema` or supplied validators
- state of the field , like `error`, `disabled`, `focused` are controlled by using [`FormControl`](https://mui.com/api/form-control/) component

## Components Architecture

- `Form`  
   Initializes _FormContext_

- `FormContext`  
   Holds the 4 types of data

  - `value`s of all _Form Inputs_ within this Form
  - errors `state` of all _Form Inputs_ within this Form
  - collective `state` of the Form
  - triggers to `update`, `validate`, `submit` the Form

- `withFormField`  
   HOC to map `state` and `value` of _Form Inputs_ to that from _FormContext_

- **Form Inputs**  
  There are 2 types of Form Inputs

  - `TextField`  
     By default `TextField` provides props to manage `state` and `value`. A [Controlled TextField](https://mui.com/components/text-fields/#uncontrolled-vs-controlled) is wrapped with `withFormField` to produce `FormTextField`

  - `Switch`, `RadioButton`, `Checkbox`, or **Any Custom Input**  
    These Inputs does not have `state` and `value` props by default
    - A [`ControlledComponent`](https://mui.com/components/checkboxes/#controlled) is created using these components to have `value` props.
    - This `ControlledComponent` is wrapped with `withFormInputControl` to create a _Form Input_ with `state` props
    - These _Form Input_ s are wrapped with `withFormField` to produce `Form Fields`. example `FormSwitch`, `FormRadioButtons`, `FormCheckBoxes`
