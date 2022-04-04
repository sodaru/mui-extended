import { isString } from "lodash";
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  FocusEventHandler,
  forwardRef,
  FunctionComponent,
  ReactNode,
  useMemo
} from "react";
import { useFormContext } from "./Context";

export type FormFieldProps = {
  name?: string;
  error?: boolean;
  disabled?: boolean;
  helperText?: ReactNode;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  value?: unknown;
};

export const withFormField = <T extends FormFieldProps>(
  FormFieldComponent: FunctionComponent<T>
): FunctionComponent<T & { name: string }> => {
  const DecoratedFormField = forwardRef<
    HTMLTextAreaElement | HTMLInputElement,
    T
  >(function FormField({ children, ...props }, ref) {
    const formContext = useFormContext();

    if (!formContext) {
      throw new Error("FormField is rendered with out Form");
    }

    const name = props.name;

    const value = useMemo(() => {
      const v = formContext.values[name];
      return isString(v) ? v : JSON.stringify(v);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formContext.values[name]]);

    const onChange = useMemo(
      () => (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let value = event.target.value;
        try {
          value = JSON.parse(value);
        } catch (e) {
          // don't do anything
        }
        formContext.onFieldChange(event.target.name, value);
        if (props.onChange) {
          props.onChange(event);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.onChange]
    );

    const onBlur = useMemo(
      () => (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        formContext.onFieldBlur(event.target.name);
        if (props.onBlur) {
          props.onBlur(event);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.onBlur]
    );

    const error = formContext.errors[name];

    const disabled =
      props.disabled || formContext.isSubmitting || formContext.isValidating;

    const helperText = error || props.helperText;

    return (
      <FormFieldComponent
        {...(props as T)}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        disabled={disabled}
        helperText={error || helperText}
        ref={ref}
      >
        {children}
      </FormFieldComponent>
    );
  });
  return DecoratedFormField as FunctionComponent<T & { name: string }>;
};
