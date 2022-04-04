import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { MarkdownPreview } from "../src/markdown";
import {
  Form,
  withFormField,
  withResetButton,
  withSubmitButton,
  SwitchField
} from "../src";
import { TextField, Button, Typography, Grid, MenuItem } from "@mui/material";
import { FunctionComponent, useState } from "react";

const FormTextField = withFormField(TextField);
const FormSwitchField = withFormField(SwitchField);

const ResetButton = withResetButton(Button);
const SubmitButton = withSubmitButton(Button);

const FormDemoComponent: FunctionComponent = () => {
  const [values, setValues] = useState<Record<string, unknown>>({});
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Form</Typography>
          <Form
            initialValues={{
              text: "",
              select: "v1",
              textarea: "",
              switch: true
            }}
            onSubmit={values => {
              return new Promise<void>(resolve => {
                setTimeout(() => {
                  setValues(values);
                  resolve();
                }, 1000);
              });
            }}
          >
            <FormTextField name="text" label="Text" margin="normal" />
            <br />
            <FormTextField
              name="select"
              label="Select"
              margin="normal"
              select
              sx={{ width: 210 }}
            >
              <MenuItem value="v1">Value 1</MenuItem>
              <MenuItem value="v2">Value 2</MenuItem>
              <MenuItem value="v3">Value 3</MenuItem>
            </FormTextField>
            <br />
            <FormTextField
              name="textarea"
              label="Text Area"
              margin="normal"
              multiline
              minRows={3}
            />
            <br />
            <FormSwitchField
              name="switch"
              label="Switch"
              controlLabelProps={{ label: "Enabled", labelPlacement: "start" }}
              margin="normal"
            />
            <br />
            <ResetButton color="secondary">Reset</ResetButton>
            <SubmitButton>Submit</SubmitButton>
          </Form>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Submitted Values</Typography>
          <MarkdownPreview>
            {"```json\n" + JSON.stringify(values, null, 2) + "\n```"}
          </MarkdownPreview>
        </Grid>
      </Grid>
    </>
  );
};

const FormDemo = demoPage(({ docs }) => {
  return (
    <>
      <MarkdownPreview>{docs["form"]}</MarkdownPreview>
      <hr />
      <Typography variant="h5">Demo</Typography>
      <FormDemoComponent />
    </>
  );
});

export default FormDemo;

export const getStaticProps = getStaticPropsFactory(["form"]);
