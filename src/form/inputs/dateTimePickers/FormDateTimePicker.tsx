import { DateTimePicker, DateTimePickerProps } from "@mui/lab";
import { forwardRef, Ref, useMemo } from "react";
import { FormFieldAttributes, withFormField } from "../../FormField";

const ControlledDateTimePicker = forwardRef(
  function DateTimePickerEnabledForFormField<TDate = unknown>(
    {
      name,
      onChange,
      onBlur,
      error,
      helperText,
      renderInput,
      ...props
    }: DateTimePickerProps<TDate> & FormFieldAttributes,
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
      <DateTimePicker
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
  }
);

export const FormDateTimePicker = withFormField(ControlledDateTimePicker);
