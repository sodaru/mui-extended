import { Button, MenuItem, TextField } from "@mui/material";
import React, { ChangeEventHandler, useContext, useState } from "react";
import { ComposedLayout } from ".";
import { SodaruPageComponentType } from "../src/SodaruApp";
import { soTextField } from "../src/SodaruTextFieldStyle";
import { SodaruThemeContext } from "../src/SodaruTheme";

const SodaruTextField = soTextField(TextField);

const TextFieldDemo: SodaruPageComponentType = () => {
  const setTheme = useContext(SodaruThemeContext);

  const [color, setColor] = useState("#004b89");
  const [variant, setVariant] = useState<"standard" | "outlined" | "filled">(
    "outlined"
  );

  const setPrimaryColor: ChangeEventHandler<HTMLInputElement> = event => {
    setColor(event.target.value);
  };

  const setVariantValue: ChangeEventHandler<HTMLInputElement> = event => {
    setVariant(event.target.value as "standard" | "outlined" | "filled");
  };

  const applyTheme = () => {
    setTheme({ palette: { primary: { main: color } }, textfield: { variant } });
  };
  return (
    <>
      <SodaruTextField onChange={setPrimaryColor}></SodaruTextField>
      <SodaruTextField onChange={setVariantValue} select value={variant}>
        <MenuItem value="standard">standard</MenuItem>
        <MenuItem value="outlined">outlined</MenuItem>
        <MenuItem value="filled">filled</MenuItem>
      </SodaruTextField>

      <Button color="primary" onClick={applyTheme}>
        Apply
      </Button>
    </>
  );
};

TextFieldDemo.layout = ComposedLayout;

export default TextFieldDemo;
