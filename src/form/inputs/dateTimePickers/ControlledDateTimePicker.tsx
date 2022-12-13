import {
  DatePickerProps,
  DateTimePickerProps,
  TimePickerProps
} from "@mui/x-date-pickers";

import { FocusEvent, FunctionComponent, useMemo } from "react";
import { debugRender } from "../../debug";
import { FormFieldAttributes } from "../../FormField";

export const withControlledDateTimePicker = <
  T,
  TD extends
    | DatePickerProps<T, TD>
    | DateTimePickerProps<T, TD>
    | TimePickerProps<T, TD>
>(
  Picker: (props: T & TD) => JSX.Element
): FunctionComponent<T & TD & FormFieldAttributes> => {
  const DecoratedPicker: FunctionComponent<T & TD & FormFieldAttributes> = ({
    name,
    onChange,
    onBlur,
    error,
    helperText,
    renderInput,
    DialogProps = {},
    ...props
  }) => {
    debugRender(name);

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
      <Picker
        {...(props as T & TD)}
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
