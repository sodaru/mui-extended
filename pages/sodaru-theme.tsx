import {
  Button,
  List,
  ListItem,
  MenuItem,
  TextField,
  useTheme
} from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import { ComposedLayout } from "./index";
import { useSodaruTheme, SodaruPageComponentType, soTextField } from "../src";

const SodaruTextField = soTextField(TextField);

const TextFieldDemo: SodaruPageComponentType = () => {
  const setTheme = useSodaruTheme();
  const theme = useTheme();

  const [color, setColor] = useState(theme.palette.primary.main);
  const [variant, setVariant] = useState<"standard" | "outlined" | "filled">(
    theme.textfield.variant
  );
  const [size, setSize] = useState<"small" | "medium">(theme.textfield.size);

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
      textfield: { variant, size }
    });
  };
  return (
    <List>
      <ListItem>
        <SodaruTextField
          onChange={setPrimaryColor}
          label="Primary Color"
          placeholder="#004b89"
          InputLabelProps={{ shrink: true }}
          value={color}
        ></SodaruTextField>
      </ListItem>
      <ListItem>
        <SodaruTextField
          onChange={setVariantValue}
          label="TextField Variant"
          select
          value={variant}
          sx={{ width: "200px" }}
        >
          <MenuItem value="standard">standard</MenuItem>
          <MenuItem value="outlined">outlined</MenuItem>
          <MenuItem value="filled">filled</MenuItem>
        </SodaruTextField>
      </ListItem>
      <ListItem>
        <SodaruTextField
          onChange={setSizeValue}
          label="TextField Size"
          select
          value={size}
          sx={{ width: "200px" }}
        >
          <MenuItem value="small">small</MenuItem>
          <MenuItem value="medium">medium</MenuItem>
        </SodaruTextField>
      </ListItem>
      <ListItem>
        <Button color="primary" onClick={applyTheme}>
          Apply
        </Button>
      </ListItem>
    </List>
  );
};

TextFieldDemo.layout = ComposedLayout;

export default TextFieldDemo;
