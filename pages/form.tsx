import {
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  Typography,
  TextField,
  Autocomplete
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import {
  Form,
  FormRadioGroup,
  FormSwitch,
  FormTextField,
  MarkdownPreview,
  withResetButton,
  withSubmitButton,
  FormCheckboxGroup,
  CheckboxWithGroup,
  FormAutocomplete,
  FormFileInput
} from "../src";
import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const ResetButton = withResetButton(Button);
const SubmitButton = withSubmitButton(Button);

const FormDemoComponent: FunctionComponent = () => {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const validator = async (name: string, value: unknown) => {
    if (invalidFields.includes(name)) {
      throw new Error(`${JSON.stringify(value)} in ${name} is Invalid`);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Form</Typography>
          <Form
            initialValues={{
              text: "",
              select: "blr",
              textarea: "",
              file: [],
              switch: true,
              radioGroup: "blr",
              checkboxGroup: ["blr"],
              autocomplete: [{ key: "blr", value: "Bengaluru" }]
            }}
            validators={{
              text: validator,
              select: validator,
              textarea: validator,
              file: validator,
              switch: validator,
              radioGroup: validator,
              checkboxGroup: validator,
              autocomplete: validator
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
            <Autocomplete
              renderInput={params => (
                <TextField
                  {...params}
                  label="Invalid Fields"
                  placeholder="Select Fields to mark them invalid"
                  helperText="This is not a FormAutocomplete"
                />
              )}
              multiple
              value={invalidFields}
              onChange={(event, values) => setInvalidFields(values)}
              options={[
                "text",
                "select",
                "textarea",
                "file",
                "switch",
                "radioGroup",
                "checkboxGroup",
                "autocomplete"
              ]}
              componentsProps={{ paper: { elevation: 4 } }}
              ChipProps={{ size: "small" }}
            />

            <FormTextField name="text" label="Text" />
            <br />
            <FormTextField
              name="select"
              label="Select"
              select
              sx={{ width: 210 }}
            >
              <MenuItem value="blr">Bengaluru</MenuItem>
              <MenuItem value="mum">Mumbai</MenuItem>
              <MenuItem value="chn">Chennai</MenuItem>
            </FormTextField>
            <br />
            <FormTextField
              name="textarea"
              label="Text Area"
              multiline
              minRows={3}
            />
            <br />
            <FormFileInput
              name="file"
              label="File"
              InputProps={{
                multiple: true,
                accept: "image/*",
                variant: "outlined",
                size: "small"
              }}
            >
              Choose Images
            </FormFileInput>
            <br />
            <FormSwitch
              name="switch"
              InputProps={{
                formControlLabelProps: {
                  label: "Switch"
                }
              }}
            />
            <br />
            <FormRadioGroup name="radioGroup" label="Radio Group">
              <FormControlLabel
                value="blr"
                label="Bengaluru"
                control={<Radio />}
              />
              <FormControlLabel
                value="mum"
                label="Mumbai"
                control={<Radio />}
              />
              <FormControlLabel
                value="chn"
                label="Chennai"
                control={<Radio />}
              />
            </FormRadioGroup>
            <br />

            <FormCheckboxGroup
              name="checkboxGroup"
              label="Checkbox Group"
              InputProps={{ row: true }}
            >
              <FormControlLabel
                label="Bengaluru"
                control={<CheckboxWithGroup value="blr" />}
              />
              <FormControlLabel
                label="Mumbai"
                control={<CheckboxWithGroup value="mum" />}
              />
              <FormControlLabel
                label="Chennai"
                control={<CheckboxWithGroup value="chn" />}
              />
            </FormCheckboxGroup>
            <br />

            <FormAutocomplete
              name="autocomplete"
              renderInput={params => (
                <TextField
                  {...params}
                  label="Auto Complete"
                  placeholder="Select a city by typing in ...."
                />
              )}
              multiple
              freeSolo
              options={[
                { key: "blr", value: "Bengaluru" },
                { key: "mum", value: "Mumbai" },
                { key: "chn", value: "Chennai" }
              ]}
              getOptionLabel={o => o.value}
              componentsProps={{ paper: { elevation: 4 } }}
              ChipProps={{ size: "small" }}
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
