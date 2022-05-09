import { cloneDeep } from "lodash";
import { Component, PropsWithChildren } from "react";
import { FormContext, FormContextType } from "./FormContext";
import { JSONSchema7 } from "json-schema";
import { validate } from "@solib/json-validator";
import { DataValidationError } from "@solib/errors";
import { debugEvent } from "./debug";

export type FormFieldValidatorType = (
  name: string,
  value: unknown
) => Promise<void>;

export type FormProps<T extends Record<string, unknown>> = PropsWithChildren<{
  initialValues: T;
  initialErrors?: Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<void>;
  schemas?: Partial<Record<keyof T, JSONSchema7>>;
  validators?: Partial<Record<keyof T, FormFieldValidatorType>>;
}>;

const getDefaultValidator = (schema: JSONSchema7): FormFieldValidatorType => {
  return async (name, value) => {
    validate(schema, value);
  };
};

export class Form<T extends Record<string, unknown>> extends Component<
  FormProps<T>,
  FormContextType<T>
> {
  constructor(props: FormProps<T>) {
    super(props);

    this.onFieldBlur = this.onFieldBlur.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
    this._validateField = this._validateField.bind(this);
    this._validateWrapper = this._validateWrapper.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validate = this.validate.bind(this);

    this._getInitialState = this._getInitialState.bind(this);

    this.state = this._getInitialState();
  }

  private _getInitialState(): typeof this.state {
    return {
      values: cloneDeep(this.props.initialValues),
      errors: cloneDeep(this.props.initialErrors || {}),
      touched: {} as Record<keyof T, boolean>,
      isDirty: false,
      isSubmitting: false,
      isValid: true,
      onFieldBlur: this.onFieldBlur,
      onFieldChange: this.onFieldChange,
      submit: this.submit,
      reset: this.reset
    };
  }

  onFieldBlur(name: keyof T) {
    const touched = cloneDeep(this.state.touched);
    touched[name] = true;
    this.setState({ isDirty: true, touched });

    setTimeout(() => {
      // delay the validation
      this.validateField(name);
    }, 10);
  }

  onFieldChange(name: keyof T, value: T[keyof T]) {
    const values = cloneDeep(this.state.values);
    values[name] = value as T[keyof T];
    this.setState({ values });
  }

  private async _validateField(name: keyof T) {
    debugEvent("_validateField", "start " + name);
    const validator =
      this.props.validators && this.props.validators[name]
        ? this.props.validators[name]
        : this.props.schemas && this.props.schemas[name]
        ? getDefaultValidator(this.props.schemas[name])
        : undefined;

    if (validator) {
      let newErrors: Partial<Record<keyof T, string>>;
      try {
        await validator(name as string, this.state.values[name]);
        newErrors = { ...this.state.errors };
        delete newErrors[name];
      } catch (e) {
        let errorMessage: string = e.message;
        if (e instanceof DataValidationError) {
          errorMessage = e.violations
            .map(v => `${v.path} ${v.message}`.trim())
            .join("\n");
        }
        newErrors = { ...this.state.errors, [name]: errorMessage };
      }
      this.setState({ errors: newErrors });
    }
    debugEvent("_validateField", "end " + name);
  }

  private async _validateWrapper<T>(validator: () => Promise<T>): Promise<T> {
    debugEvent("_validateWrapper", "start");
    const result = await validator();
    const isValid = Object.keys(this.state.errors).length == 0;
    this.setState({ isValid });
    debugEvent("_validateWrapper", "end");
    return result;
  }

  async validateField(name: keyof T) {
    await this._validateWrapper(async () => {
      await this._validateField(name);
    });
  }

  async validate() {
    debugEvent("validate", "start");
    await this._validateWrapper(async () => {
      await Promise.allSettled(
        Object.keys(this.state.values).map(async name => {
          await this._validateField(name);
        })
      );
    });
    debugEvent("validate", "end");
  }

  reset() {
    this.setState(this._getInitialState());
  }

  submit() {
    setTimeout(() => {
      // delay the submit
      this.setState({ isSubmitting: true });
      this.validate()
        .then(() => {
          if (this.state.isValid) {
            return this.props.onSubmit(this.state.values);
          }
        })
        .finally(() => {
          this.setState({ isSubmitting: false });
        });
    }, 10);
  }

  render() {
    return (
      <FormContext.Provider value={this.state}>
        {this.props.children}
      </FormContext.Provider>
    );
  }
}
