import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormGroup,
  FormGroupProps,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
  Switch,
  SwitchProps,
  TextField,
  TextFieldProps
} from "@mui/material";
import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  FunctionComponent,
  ReactNode,
  useMemo
} from "react";
import {
  ControlledInputAttributes,
  FormFieldAttributes,
  withFormField
} from "./FormField";

export const ControlledTextField = forwardRef<
  HTMLDivElement,
  TextFieldProps & ControlledInputAttributes
>(function ControlledTextField({ onChange, onBlur, ...props }, ref) {
  const _onChange = useMemo(
    () => (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      onChange(event.target.name, event.target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const _onBlur = useMemo(
    () => (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      onBlur(event.target.name);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <TextField {...props} onChange={_onChange} onBlur={_onBlur} ref={ref} />
  );
});

export const FormTextField = withFormField(ControlledTextField);

export type FormInputAttributes = {
  label?: ReactNode;
  labelProps?: FormLabelProps;
  helperTextProps?: FormHelperTextProps;
  groupProps?: FormGroupProps;
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
        label,
        labelProps,
        helperTextProps,
        groupProps,

        // FormFieldProps
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

        ...props
      },
      ref
    ) {
      return (
        <FormControl
          {...props}
          variant="standard"
          error={error}
          disabled={disabled}
          ref={ref}
        >
          <FormLabel {...labelProps}>{label}</FormLabel>
          <FormGroup {...groupProps}>
            <ControlledInput
              {...(InputProps as T)}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </FormGroup>
          <FormHelperText {...helperTextProps}>{helperText}</FormHelperText>
        </FormControl>
      );
    }
  );
};

export const ControlledSwitch: FunctionComponent<
  SwitchProps &
    ControlledInputAttributes & {
      formControlLabelProps: Omit<FormControlLabelProps, "control">;
    }
> = ({ name, value, onChange, onBlur, formControlLabelProps, ...props }) => {
  const _onChange = useMemo(() => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.name, event.target.checked);
    };
  }, [onChange]);

  const _onBlur = useMemo(() => {
    return (event: FocusEvent<HTMLInputElement>) => {
      onBlur(event.target.name);
    };
  }, [onBlur]);

  return (
    <FormControlLabel
      control={
        <Switch
          {...props}
          name={name}
          checked={value as boolean}
          onChange={_onChange}
          onBlur={_onBlur}
        />
      }
      {...formControlLabelProps}
    />
  );
};

export const FormSwitch = withFormField(withFormInputControl(ControlledSwitch));
