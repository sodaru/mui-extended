import { createContext, useContext } from "react";

export type FormContextType<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  values: T;
  touched: Record<keyof T, boolean>;
  errors: Record<keyof T, string>;
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  isValidating: boolean;
  onFieldChange: (name: keyof T, value: T[keyof T]) => void;
  onFieldBlur: (name: keyof T) => void;
  submit: () => void;
  clear: () => void;
};

export const FormContext = createContext<FormContextType>(null);

export const useFormContext = <
  T extends Record<string, unknown> = Record<string, unknown>
>() => {
  return useContext(FormContext) as FormContextType<T>;
};
