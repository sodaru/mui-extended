import { TimePicker, TimePickerProps } from "@mui/lab";
import { forwardRef, Ref, useMemo } from "react";
import { FormFieldAttributes, withFormField } from "../../FormField";

const ControlledTimePicker = forwardRef(function TimePickerEnabledForFormField<
  TDate = unknown
>(
  {
    name,
    onChange,
    onBlur,
    error,
    helperText,
    renderInput,
    ...props
  }: TimePickerProps<TDate> & FormFieldAttributes,
  ref: Ref<HTMLDivElement>
) {
  const _onChange = useMemo(
    () => (value: TDate) => {
      onChange(name, value);
    },
    [onChange, name]
  );

  const _onBlur = useMemo(
    () => () => {
      onBlur(name);
    },
    [onBlur, name]
  );

  return (
    <TimePicker
      {...props}
      renderInput={params => {
        return renderInput({
          ...params,
          error,
          helperText,
          onBlur: _onBlur
        });
      }}
      onChange={_onChange}
      ref={ref}
    />
  );
});

export const FormTimePicker = withFormField(ControlledTimePicker);
