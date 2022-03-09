import { TextFieldProps, useTheme } from "@mui/material";
import { FunctionComponent } from "react";

declare module "@mui/material/styles" {
  interface Theme {
    textfield: {
      variant: TextFieldProps["variant"];
      size: TextFieldProps["size"];
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    textfield?: {
      variant?: TextFieldProps["variant"];
      size?: TextFieldProps["size"];
    };
  }
}

export const soTextField = <
  T extends {
    variant?: TextFieldProps["variant"];
    size?: TextFieldProps["size"];
  }
>(
  TextField: FunctionComponent<T>
): FunctionComponent<T> => {
  const SoTextField: FunctionComponent<T> = props => {
    const theme = useTheme();
    return (
      <TextField
        size={theme.textfield.size}
        variant={theme.textfield.variant}
        {...props}
      >
        {props.children}
      </TextField>
    );
  };
  return SoTextField;
};
