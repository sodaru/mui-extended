import { DatePicker, DatePickerProps } from "@mui/lab";
import { forwardRef, Ref, useMemo } from "react";
import { FormFieldAttributes, withFormField } from "../../FormField";

const ControlledDatePicker = forwardRef(function DatePickerEnabledForFormField<
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
  }: DatePickerProps<TDate> & FormFieldAttributes,
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
    <DatePicker
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

export const FormDatePicker = withFormField(ControlledDatePicker);
