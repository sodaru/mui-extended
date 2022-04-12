import {
  DatePickerProps,
  DateTimePickerProps,
  TimePickerProps
} from "@mui/x-date-pickers";
import { FocusEvent, FunctionComponent, useMemo } from "react";
import { FormFieldAttributes } from "../../FormField";

export const withControlledDateTimePicker = <
  T extends DatePickerProps | DateTimePickerProps | TimePickerProps
>(
  Picker: (props: T) => JSX.Element
): FunctionComponent<T & FormFieldAttributes> => {
  const DecoratedPicker: FunctionComponent<T & FormFieldAttributes> = ({
    name,
    onChange,
    onBlur,
    error,
    helperText,
    renderInput,
    DialogProps = {},
    ...props
  }) => {
    const _onChange = useMemo(
      () => value => {
        onChange(name, value);
      },
      [onChange, name]
    );

    const dialogId = DialogProps.id || "form-date-picker-dialog";

    const _DialogProps = { id: dialogId, ...DialogProps };

    const _onBlur = useMemo(
      () => (event: FocusEvent<HTMLInputElement>) => {
        let propagate = true;
        if (event.relatedTarget) {
          let relatedTarget = event.relatedTarget;
          while (relatedTarget.tagName != "BODY") {
            if (relatedTarget.id == dialogId) {
              propagate = false;
              break;
            }
            relatedTarget = relatedTarget.parentElement;
          }
        }

        if (propagate) {
          onBlur(name);
        }
      },
      [onBlur, name, dialogId]
    );

    return (
      // @ts-expect-error type error for props and T
      <Picker
        {...(props as T)}
        renderInput={params => {
          return renderInput({
            ...params,
            error,
            helperText,
            onBlur: _onBlur
          });
        }}
        onChange={_onChange}
        DialogProps={_DialogProps}
      />
    );
  };

  return DecoratedPicker;
};
