import { isEqualWith } from "lodash";
import {
  forwardRef,
  FunctionComponent,
  memo,
  ReactNode,
  RefAttributes,
  useMemo
} from "react";
import { debugPropChanges } from "./debug";
import { useFormContext } from "./FormContext";

export type ControlledInputAttributes = {
  name: string;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
  onBlur: (name: string) => void;
};

export type FormFieldAttributes = ControlledInputAttributes & {
  error?: boolean;
  helperText?: ReactNode;
  disabled?: boolean;
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
  const PureFormFieldComponent = memo(
    FormFieldComponent,
    (prevProps, nextProps) => {
      debugPropChanges(prevProps, nextProps);
      return isEqualWith(prevProps, nextProps, (value, other, propName) => {
        if (propName == "onChange" || propName == "onBlur") {
          return true;
        }
      });
    }
  );

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

    const disabled = props.disabled || formContext.isSubmitting;

    const helperText = error || props.helperText;

    return (
      <PureFormFieldComponent
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
      </PureFormFieldComponent>
    );
  });
  return DecoratedFormField as FunctionComponent<FormFieldProps<T>>;
};
