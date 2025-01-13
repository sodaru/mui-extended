import {
  FormControlLabel,
  FormControlLabelProps,
  Switch,
  SwitchProps
} from "@mui/material";
import { ChangeEvent, FocusEvent, FunctionComponent, useMemo } from "react";
import { ControlledInputAttributes, withFormField } from "../FormField";
import { withFormInputControl } from "./FormInputControl";

const ControlledSwitch: FunctionComponent<
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
    return (event: FocusEvent<HTMLButtonElement>) => {
      onBlur(event.target.name);
    };
  }, [onBlur]);

  const control = (
    <Switch
      {...props}
      name={name}
      checked={value as boolean}
      onChange={_onChange}
      onBlur={_onBlur}
    />
  );

  return <FormControlLabel control={control} {...formControlLabelProps} />;
};

export const FormSwitch = withFormField(withFormInputControl(ControlledSwitch));
