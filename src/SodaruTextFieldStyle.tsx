import { TextFieldProps, useTheme } from "@mui/material";
import { forwardRef, FunctionComponent, PropsWithChildren } from "react";

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

export const withSizeAndVariantFromTheme = <
  T extends {
    variant?: TextFieldProps["variant"];
    size?: TextFieldProps["size"];
  }
>(
  TextField: FunctionComponent<T>
): FunctionComponent<T> => {
  const SoTextField = forwardRef<HTMLInputElement, PropsWithChildren<T>>(
    function TextFieldWithSizeAndVariantFromTheme({ children, ...props }, ref) {
      const theme = useTheme();
      return (
        <TextField
          size={theme.textfield.size}
          variant={theme.textfield.variant}
          {...(props as T)}
          ref={ref}
        >
          {children}
        </TextField>
      );
    }
  );
  return SoTextField as FunctionComponent<T>;
};
