# Form

---

Form is a controller for input fields

## Usage

- use `Form` to wrap inputs within it
- use `withFormField` to enable an input to use with `Form`
- use `withResetButton` and `withSubmitButton` helpers to add clear and submit buttons
- use `useFormContext` to get the form context with in the form

  ```typescript
  import {
    Form,
    FormProps,
    withFormField,
    withResetButton,
    withSubmitButton
  } from "@solib/ui-components";
  import { TextField, Button } from "@mui/material";

  const formProps: FormProps;
  const FormTextField = withFormField(TextField);
  const ResetButton = withResetButton(Button);
  const SubmitButton = withSubmitButton(Button);

  const form = (
    <Form {...formProps}>
      <FormTextField name="username" />
      <ResetButton>Clear</ResetButton>
      <SubmitButton>Clear</SubmitButton>
    </Form>
  );
  ```

## Features

- Pure Control of form inputs
  - layout and stying is out of scope
- Support for **nested** forms
- Field validation using `JSON Schema` or supplied validators
