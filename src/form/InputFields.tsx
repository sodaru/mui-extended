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
  SwitchProps
} from "@mui/material";
import {
  ChangeEvent,
  forwardRef,
  FunctionComponent,
  ReactNode,
  useMemo
} from "react";
import { FormFieldProps } from "./FormField";

export type SwitchFieldProps = FormFieldProps &
  FormControlProps & {
    label?: ReactNode;
    labelProps?: FormLabelProps;
    controlLabelProps?: Omit<FormControlLabelProps, "control">;
    helperTextProps?: FormHelperTextProps;
    groupProps?: FormGroupProps;
    switchProps?: SwitchProps;
  };

export const SwitchField: FunctionComponent<SwitchFieldProps> = forwardRef<
  HTMLInputElement,
  SwitchFieldProps
>(function SwitchControll(
  {
    name,
    error,
    label,
    labelProps,
    controlLabelProps,
    helperTextProps,
    helperText,
    groupProps,
    switchProps,
    onBlur,
    onChange,
    value,
    disabled,
    ...props
  },
  ref
) {
  const _onChange = useMemo(() => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      event.target.value = event.target.checked + "";
      onChange(event);
    };
  }, [onChange]);

  return (
    <FormControl
      {...props}
      variant="standard"
      error={error}
      disabled={disabled}
      onBlur={onBlur}
    >
      <FormLabel {...labelProps}>{label}</FormLabel>
      <FormGroup {...groupProps}>
        <FormControlLabel
          control={
            <Switch
              {...switchProps}
              name={name}
              checked={value == "true"}
              onChange={_onChange}
              ref={ref}
            />
          }
          {...controlLabelProps}
        />
      </FormGroup>
      <FormHelperText {...helperTextProps}>{helperText}</FormHelperText>
    </FormControl>
  );
});
