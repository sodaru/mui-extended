import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps
} from "@mui/material";
import { forwardRef, FunctionComponent } from "react";
import { debugRender } from "../debug";
import { ControlledInputAttributes, FormFieldAttributes } from "../FormField";

export type FormInputAttributes = {
  labelProps?: FormLabelProps;
  helperTextProps?: FormHelperTextProps;
};

export type FormInputControlProps<T extends ControlledInputAttributes> =
  FormControlProps &
    FormInputAttributes &
    FormFieldAttributes & {
      InputProps?: Omit<T, keyof ControlledInputAttributes>;
    };

export const withFormInputControl = <T extends ControlledInputAttributes>(
  ControlledInput: FunctionComponent<T>
) => {
  return forwardRef<HTMLDivElement, FormInputControlProps<T>>(
    function FormInputControl(
      {
        // FormControlAttributes
        labelProps,
        helperTextProps,

        // FormFieldProps
        label,
        error,
        disabled,
        helperText,

        // ControlledInputProps
        name,
        value,
        onChange,
        onBlur,

        // input props
        InputProps,

        children,

        ...props
      },
      ref
    ) {
      debugRender(name);

      return (
        <FormControl
          {...props}
          variant="standard"
          error={error}
          disabled={disabled}
          ref={ref}
        >
          <FormLabel {...labelProps}>{label}</FormLabel>
          <ControlledInput
            {...(InputProps as T)}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
          >
            {children}
          </ControlledInput>
          <FormHelperText {...helperTextProps}>{helperText}</FormHelperText>
        </FormControl>
      );
    }
  );
};
