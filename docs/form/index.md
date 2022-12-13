# Form

---

Form is a controller for input fields

## Usage

- use `Form` to wrap inputs within it
- use `FormTextField`, `FormSwitch` components , these components are enabled to work with in the form
- use `withResetButton` and `withSubmitButton` helpers to add reset and submit buttons

  ```typescript
  import {
    Form,
    FormProps,
    FormTextField,
    FormSwitch,
    withSubmitButton
  } from "mui-extended";
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

## Components Architecture

### Form

Initializes and manages _FormContext_  
 **Props**

- `initialValues`_(**Required**)_ Initial values of inputs indexed with input name
- `initialErrors`_(Optional)_ Initial error messages of inputs indexed with input name
- `onSubmit`_(Optional)_ callback to invoke when form is submitted. must return a Promise
- `schemas`_(Optional)_ JSONSchema7 objects indexed with input names.
- `validators`_(Optional)_ validation functions for each input. type = `(name: string, value: unknown) => Promise<void>`

  - validator is used if present , otherwise default validator is used if schema is found. If there is no schema or validator for a field, then validation is skipped for the field

### FormContext

use `useFormContext` to access the context within the form

value contains

- `values` - contains values for all inputs;
- `touched` - map of input name to boolean , if true - input is touched
- `errors` - map of input name to error message
- `isDirty` - true if atleast one field is touched after the Form is mounted
- `isValid` - true if all fields are valid
- `isSubmitting` - true if form is submitting
- `onFieldChange` - function to change the field value. type = `(name: string, value: unknown) => void`
- `onFieldBlur` - function to indicate a field is blurred, helps to start the validation. type = `(name: string) => void`
- `submit`: function to submit the form. validation for all fields is run before submitting;
- `reset`: function to reset the form to initial state;

### withFormField

Following props of any Input component are used to control Input with in the Form.

- `name` - set the name of the input
- `value` - set the value from context to input
- `onChange` - set the value from input to context. to invoke `onFieldChange` on context
- `onBlur` - to invoke `onFieldBlur` on context
- `label` - to set the label of the input, generated from _name_ if not provided
- `error` - set the state of the input to error
- `helperText` - set the error message in the helperText of the input
- `disabled` - disable the input when form is validating ot submitting

`withFormField` HOC wraps any Input Component to map the above props to FormContext

### Form Inputs

The default Input components provided by `material-ui` does not have all props matching the props required by `withFormField`

Specific wrapper components are created for each Input from `material-ui` to match the props

All Wrapper Components are described [here](../form/)
