import { RadioGroup, RadioGroupProps } from "@mui/material";
import { ChangeEvent, FunctionComponent, useMemo } from "react";
import { ControlledInputAttributes, withFormField } from "../FormField";
import { withFormInputControl } from "./FormInputControl";

export const ControlledRadioGroup: FunctionComponent<
  RadioGroupProps & ControlledInputAttributes
> = ({ name, value, onChange, onBlur, children, ...props }) => {
  const _onChange = useMemo(() => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(name, event.target.value);
    };
  }, [onChange, name]);

  const _onBlur = useMemo(() => {
    return () => {
      onBlur(name);
    };
  }, [onBlur, name]);

  return (
    <RadioGroup
      {...props}
      name={name}
      value={value}
      onChange={_onChange}
      onBlur={_onBlur}
    >
      {children}
    </RadioGroup>
  );
};

export const FormRadioGroup = withFormField(
  withFormInputControl(ControlledRadioGroup)
);
