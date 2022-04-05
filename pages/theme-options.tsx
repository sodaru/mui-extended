import {
  Button,
  List,
  ListItem,
  MenuItem,
  TextField,
  useTheme
} from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import { useThemeOptions } from "../src";
import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const ThemeOptionsDemoComponent = () => {
  const setTheme = useThemeOptions();
  const theme = useTheme();

  const [color, setColor] = useState(theme.palette.primary.main);
  const [variant, setVariant] = useState<"standard" | "outlined" | "filled">(
    theme.components?.MuiFormControl?.defaultProps?.variant
  );
  const [size, setSize] = useState<"small" | "medium">(
    theme.components?.MuiFormControl?.defaultProps?.size
  );

  const setPrimaryColor: ChangeEventHandler<HTMLInputElement> = event => {
    setColor(event.target.value);
  };

  const setVariantValue: ChangeEventHandler<HTMLInputElement> = event => {
    setVariant(event.target.value as "standard" | "outlined" | "filled");
  };

  const setSizeValue: ChangeEventHandler<HTMLInputElement> = event => {
    setSize(event.target.value as "small" | "medium");
  };

  const applyTheme = () => {
    setTheme({
      palette: { primary: { main: color } },
      components: { MuiTextField: { defaultProps: { variant, size } } }
    });
  };
  return (
    <>
      <List>
        <ListItem>
          <TextField
            onChange={setPrimaryColor}
            label="Primary Color"
            placeholder="#004b89"
            InputLabelProps={{ shrink: true }}
            value={color}
            helperText="palette.primary.main"
          ></TextField>
        </ListItem>
        <ListItem>
          <TextField
            onChange={setVariantValue}
            label="FormControl Variant"
            select
            value={variant}
            sx={{ width: "200px" }}
            helperText="components.MuiFormControl.defaultProps.variant"
          >
            <MenuItem value="standard">standard</MenuItem>
            <MenuItem value="outlined">outlined</MenuItem>
            <MenuItem value="filled">filled</MenuItem>
          </TextField>
        </ListItem>
        <ListItem>
          <TextField
            onChange={setSizeValue}
            label="FormControl Size"
            select
            value={size}
            sx={{ width: "200px" }}
            helperText="components.MuiFormControl.defaultProps.size"
          >
            <MenuItem value="small">small</MenuItem>
            <MenuItem value="medium">medium</MenuItem>
          </TextField>
        </ListItem>
        <ListItem>
          <Button color="primary" onClick={applyTheme}>
            Apply
          </Button>
        </ListItem>
      </List>
    </>
  );
};

const ThemeOptionsDemo = demoPage(
  <ThemeOptionsDemoComponent />,
  "theme-options"
);

export default ThemeOptionsDemo;

export const getStaticProps = getStaticPropsFactory(["theme-options"]);
