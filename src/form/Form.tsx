import { cloneDeep } from "lodash";
import { Component } from "react";
import { FormContext, FormContextType } from "./Context";
import { JSONSchema7 } from "json-schema";
import { validate } from "@solib/json-validator";

export type FormFieldValidatorType = (
  name: string,
  value: unknown
) => Promise<void>;

export type FormProps<T extends Record<string, unknown>> = {
  initialValues: T;
  initialErrors?: Record<keyof T, string>;
  onSubmit: (values: T) => Promise<void>;
  schemas?: Record<keyof T, JSONSchema7>;
  validators?: Record<keyof T, FormFieldValidatorType>;
};

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
    this.clear = this.clear.bind(this);
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
      errors: cloneDeep(
        this.props.initialErrors || ({} as Record<keyof T, string>)
      ),
      touched: {} as Record<keyof T, boolean>,
      isDirty: false,
      isSubmitting: false,
      isValid: true,
      isValidating: false,
      onFieldBlur: this.onFieldBlur,
      onFieldChange: this.onFieldChange,
      submit: this.submit,
      clear: this.clear
    };
  }

  onFieldBlur(name: keyof T) {
    const touched = cloneDeep(this.state.touched);
    touched[name] = true;
    this.setState({ isDirty: true, touched });

    this.validateField(name);
  }

  onFieldChange(name: keyof T, value: unknown) {
    const values = cloneDeep(this.state.values);
    values[name] = value as T[keyof T];
    this.setState({ values });
  }

  private async _validateField(name: keyof T) {
    const validator =
      this.props.validators && this.props.validators[name]
        ? this.props.validators[name]
        : this.props.schemas && this.props.schemas[name]
        ? getDefaultValidator(this.props.schemas[name])
        : undefined;

    if (validator) {
      let newErrors: Record<keyof T, string>;
      try {
        await validator(name as string, this.state.values[name]);
        newErrors = { ...this.state.errors };
        delete newErrors[name];
      } catch (e) {
        newErrors = { ...this.state.errors, [name]: e.message as string };
      }
      this.setState({ errors: newErrors });
    }
  }

  private async _validateWrapper<T>(validator: () => Promise<T>): Promise<T> {
    this.setState({ isValidating: true });
    const result = await validator();
    const isValid = Object.keys(this.state.errors).length == 0;
    this.setState({ isValid, isValidating: false });
    return result;
  }

  async validateField(name: keyof T) {
    await this._validateWrapper(async () => {
      await this._validateField(name);
    });
  }

  async validate() {
    await this._validateWrapper(async () => {
      await Promise.allSettled(
        Object.keys(this.state.values).map(async name => {
          await this._validateField(name);
        })
      );
    });
  }

  clear() {
    this.setState(this._getInitialState());
  }

  submit() {
    this.validate().then(() => {
      if (this.state.isValid) {
        this.setState({ isSubmitting: true });
        this.props.onSubmit(this.state.values).finally(() => {
          this.setState({ isSubmitting: false });
        });
      }
    });
  }

  render() {
    return (
      <FormContext.Provider value={this.state}>
        {this.props.children}
      </FormContext.Provider>
    );
  }
}
