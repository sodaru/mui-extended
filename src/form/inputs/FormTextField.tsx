import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, FocusEvent, forwardRef, useMemo } from "react";
import { ControlledInputAttributes, withFormField } from "../FormField";

const ControlledTextField = forwardRef<
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
