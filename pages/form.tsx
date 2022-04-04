import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { MarkdownPreview } from "../src/markdown";
import { Form, withFormField, withClearButton, withSubmitButton } from "../src";
import {
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Switch
} from "@mui/material";
import { useState } from "react";

const FormTextField = withFormField(TextField);

const ClearButton = withClearButton(Button);
const SubmitButton = withSubmitButton(Button);

const FormDemo = demoPage(({ docs }) => {
  const [values, setValues] = useState<Record<string, unknown>>({});
  return (
    <>
      <MarkdownPreview>{docs["form"]}</MarkdownPreview>
      <hr />
      <Typography variant="h5">Demo</Typography>

      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Form</Typography>
          <Form
            initialValues={{
              text: "",
              select: "v1",
              textarea: "",
              switch: "on"
            }}
            onSubmit={async values => {
              setValues(values);
            }}
          >
            <FormTextField name="text" label="Text" margin="normal" />
            <br />
            <FormTextField name="select" label="Select" margin="normal" select>
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
            <FormTextField
              name="switch"
              InputProps={{ components: { Root: Switch } }}
              InputLabelProps={{ shrink: true }}
              label="Switch"
              margin="normal"
              variant="standard"
              helperText="this is error"
              error
            />
            <br />
            <ClearButton color="secondary">Clear</ClearButton>
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
});

export default FormDemo;

export const getStaticProps = getStaticPropsFactory(["form"]);
