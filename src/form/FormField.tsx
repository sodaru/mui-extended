import {
  forwardRef,
  FunctionComponent,
  ReactNode,
  RefAttributes,
  useMemo
} from "react";
import { useFormContext } from "./Context";

export type ControlledInputAttributes = {
  name: string;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
  onBlur: (name: string) => void;
};

export type FormFieldAttributes = ControlledInputAttributes & {
  error?: boolean;
  disabled?: boolean;
  helperText?: ReactNode;
};

export type FormFieldProps<T extends FormFieldAttributes> = Omit<
  T,
  keyof ControlledInputAttributes
> &
  Pick<ControlledInputAttributes, "name"> &
  Partial<Omit<ControlledInputAttributes, "name" | "value">> &
  RefAttributes<HTMLDivElement>;

export const withFormField = <T extends FormFieldAttributes>(
  FormFieldComponent: FunctionComponent<T>
): FunctionComponent<FormFieldProps<T>> => {
  const DecoratedFormField = forwardRef<
    HTMLTextAreaElement | HTMLInputElement,
    T
  >(function FormField({ children, ...props }, ref) {
    const formContext = useFormContext();

    if (!formContext) {
      throw new Error("FormField is rendered with out Form");
    }

    const name = props.name;

    const value = formContext.values[name];

    const onChange = useMemo(
      () => (name: string, value: unknown) => {
        formContext.onFieldChange(name, value);
        if (props.onChange) {
          props.onChange(name, value);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.onChange]
    );

    const onBlur = useMemo(
      () => (name: string) => {
        formContext.onFieldBlur(name);
        if (props.onBlur) {
          props.onBlur(name);
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
  return DecoratedFormField as FunctionComponent<FormFieldProps<T>>;
};
