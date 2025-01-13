import {
  DatePickerProps,
  DateTimePickerProps,
  PickerValidDate,
  TimePickerProps
} from "@mui/x-date-pickers";

import { ComponentType, forwardRef, useCallback } from "react";
import { debugRender } from "../../debug";
import { FormFieldAttributes } from "../../FormField";

export const withControlledDateTimePicker = <
  T extends PickerValidDate,
  TD extends DatePickerProps<T> | DateTimePickerProps<T> | TimePickerProps<T>
>(
  Picker: ComponentType<TD>
) => {
  const ControlledPicker = forwardRef<HTMLDivElement, TD & FormFieldAttributes>(
    function ControlledPicker(
      { onChange, onBlur, error, helperText, ...props },
      ref
    ) {
      debugRender(props.name);

      const _onChange = useCallback(
        (value: T) => {
          onChange(props.name, value);
        },
        [onChange, props.name]
      );

      const _onBlur = useCallback(() => {
        onBlur(props.name);
      }, [onBlur, props.name]);

      return (
        <>
          {/* @ts-expect-error Picker will be a valid type */}
          <Picker
            {...props}
            onChange={_onChange}
            _onBlur={_onBlur}
            ref={ref}
            slotProps={{ textField: { error, helperText } }}
          />
        </>
      );
    }
  );

  return ControlledPicker;
};
