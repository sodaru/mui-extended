import { Button, Grid, MenuItem, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import {
  Form,
  FormSwitch,
  FormTextField,
  MarkdownPreview,
  withResetButton,
  withSubmitButton
} from "../src";
import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

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
            <FormTextField name="text" label="Text" />
            <br />
            <FormTextField
              name="select"
              label="Select"
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
              multiline
              minRows={3}
            />
            <br />
            <FormSwitch
              name="switch"
              label="Switch"
              InputProps={{
                formControlLabelProps: {
                  label: "Enabled",
                  labelPlacement: "start"
                }
              }}
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

const FormDemo = demoPage(<FormDemoComponent />, "form");

export default FormDemo;

export const getStaticProps = getStaticPropsFactory(["form"]);
