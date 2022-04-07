import {
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  Typography,
  TextField,
  Autocomplete,
  Box,
  Stack
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
  FormCheckbox,
  FormAutocomplete,
  FormFileInput,
  FormDatePicker,
  FormTimePicker,
  FormDateTimePicker
} from "../../src";
import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

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
              autocomplete: [{ key: "blr", value: "Bengaluru" }],
              datePicker: new Date().toISOString(),
              timePicker: new Date().toISOString(),
              datetimePicker: new Date().toISOString()
            }}
            validators={{
              text: validator,
              select: validator,
              textarea: validator,
              file: validator,
              switch: validator,
              radioGroup: validator,
              checkboxGroup: validator,
              autocomplete: validator,
              datePicker: validator,
              timePicker: validator,
              datetimePicker: validator
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
            <Stack spacing={3} alignItems="flex-start">
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
                  "autocomplete",
                  "datePicker",
                  "timePicker",
                  "datetimePicker"
                ]}
                componentsProps={{ paper: { elevation: 4 } }}
                ChipProps={{ size: "small" }}
                sx={{ width: "100%" }}
              />

              <FormTextField name="text" label="Text" />

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

              <FormTextField
                name="textarea"
                label="Text Area"
                multiline
                minRows={3}
              />

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

              <FormSwitch
                name="switch"
                InputProps={{
                  formControlLabelProps: {
                    label: "Switch"
                  }
                }}
              />

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

              <FormCheckboxGroup
                name="checkboxGroup"
                label="Checkbox Group"
                InputProps={{ row: true }}
              >
                <FormControlLabel
                  label="Bengaluru"
                  control={<FormCheckbox value="blr" />}
                />
                <FormControlLabel
                  label="Mumbai"
                  control={<FormCheckbox value="mum" />}
                />
                <FormControlLabel
                  label="Chennai"
                  control={<FormCheckbox value="chn" />}
                />
              </FormCheckboxGroup>

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
                sx={{ width: "100%" }}
              />

              <FormDatePicker
                name="datePicker"
                label="Date Picker"
                renderInput={params => <TextField {...params} />}
              />

              <FormTimePicker
                name="timePicker"
                label="Time Picker"
                renderInput={params => <TextField {...params} />}
              />

              <FormDateTimePicker
                name="datetimePicker"
                label="DateTime Picker"
                renderInput={params => <TextField {...params} />}
              />

              <Box>
                <ResetButton color="secondary">Reset</ResetButton>
                <SubmitButton>Submit</SubmitButton>
              </Box>
            </Stack>
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

const FormDemo = demoPage(<FormDemoComponent />, "form/index");

export default FormDemo;

export const getStaticProps = getStaticPropsFactory(["form/index"]);
