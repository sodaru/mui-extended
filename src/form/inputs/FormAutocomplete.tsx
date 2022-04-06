import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteValue
} from "@mui/material";
import { forwardRef, Ref, RefAttributes, SyntheticEvent, useMemo } from "react";
import {
  ControlledInputAttributes,
  FormFieldAttributes,
  withFormField
} from "../FormField";

export const AutocompleteEnabledForFormField = forwardRef(
  function AutocompleteEnabledForFormField<
    T,
    Multiple extends boolean,
    DisableClearable extends boolean,
    FreeSolo extends boolean
  >(
    {
      name,
      onChange,
      onBlur,
      error,
      helperText,
      renderInput,
      ...props
    }: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
      FormFieldAttributes,
    ref: Ref<HTMLDivElement>
  ) {
    const _onChange = useMemo(
      () =>
        (
          event: SyntheticEvent<Element, Event>,
          value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
        ) => {
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
      <Autocomplete
        {...props}
        renderInput={params => {
          return renderInput({
            ...params,
            error,
            helperText
          } as AutocompleteRenderInputParams);
        }}
        onChange={_onChange}
        onBlur={_onBlur}
        ref={ref}
      />
    );
  }
);

export const FormAutocomplete = withFormField(
  AutocompleteEnabledForFormField
) as <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  props: Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    keyof ControlledInputAttributes
  > &
    Pick<ControlledInputAttributes, "name"> &
    RefAttributes<HTMLDivElement>
) => JSX.Element;
