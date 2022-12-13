import { Button, List, ListItem, MenuItem, useTheme } from "@mui/material";
import {
  Form,
  FormTextField,
  useThemeOptions,
  withResetButton,
  withSubmitButton
} from "../src";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const ApplyThemeButton = withSubmitButton(Button);
const ResetThemeButton = withResetButton(Button);

const ThemeOptionsDemoComponent = () => {
  const { setThemeOptions } = useThemeOptions();
  const theme = useTheme();

  return (
    <Form
      initialValues={{
        primary: theme.palette.primary.main,
        variant:
          theme.components?.MuiTextField?.defaultProps?.variant || "outlined",
        size: theme.components?.MuiFormControl?.defaultProps?.size || "medium",
        mode: theme.palette.mode || "light"
      }}
      onSubmit={async values => {
        setThemeOptions({
          palette: { primary: { main: values.primary }, mode: values.mode },
          components: {
            MuiTextField: { defaultProps: { variant: values.variant } },
            MuiFormControl: { defaultProps: { size: values.size } }
          }
        });
      }}
    >
      <List>
        <ListItem>
          <FormTextField
            name="mode"
            label="Mode"
            select
            sx={{ width: "200px" }}
            helperText="pallete.mode"
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </FormTextField>
        </ListItem>

        <ListItem>
          <FormTextField
            name="primary"
            label="Primary Color"
            placeholder="#004b89"
            helperText="palette.primary.main"
          />
        </ListItem>
        <ListItem>
          <FormTextField
            name="variant"
            label="TextField Variant"
            select
            sx={{ width: "200px" }}
            helperText="components.MuiTextField.defaultProps.variant"
          >
            <MenuItem value="standard">standard</MenuItem>
            <MenuItem value="outlined">outlined</MenuItem>
            <MenuItem value="filled">filled</MenuItem>
          </FormTextField>
        </ListItem>
        <ListItem>
          <FormTextField
            name="size"
            label="FormControl Size"
            select
            sx={{ width: "200px" }}
            helperText="components.MuiFormControl.defaultProps.size"
          >
            <MenuItem value="small">small</MenuItem>
            <MenuItem value="medium">medium</MenuItem>
          </FormTextField>
        </ListItem>
        <ListItem>
          <ResetThemeButton color="secondary">Reset</ResetThemeButton>
          <ApplyThemeButton color="primary" variant="outlined">
            Apply
          </ApplyThemeButton>
        </ListItem>
      </List>
    </Form>
  );
};

export default ThemeOptionsDemoComponent;

export const getStaticProps = getStaticPropsFactory(["theme-options"]);
