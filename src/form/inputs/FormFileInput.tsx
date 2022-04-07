import { Button, ButtonProps, Typography } from "@mui/material";
import {
  AllHTMLAttributes,
  ChangeEvent,
  createRef,
  FunctionComponent,
  useMemo
} from "react";
import { ControlledInputAttributes, withFormField } from "../FormField";
import { withFormInputControl } from "./FormInputControl";

const DefaultFileRenderer: FunctionComponent<{ files: File[] }> = ({
  files
}) => {
  return (
    <Typography variant="body2">{files.map(f => f.name).join(", ")}</Typography>
  );
};

const ControlledFileInput: FunctionComponent<
  ButtonProps &
    ControlledInputAttributes &
    Pick<
      AllHTMLAttributes<HTMLInputElement>,
      "accept" | "capture" | "multiple"
    > & {
      RenderFiles?: FunctionComponent<{ files: File[] }>;
    }
> = ({
  name,
  accept,
  capture,
  multiple,
  value,
  onChange,
  onBlur,
  children,
  RenderFiles,
  ...props
}) => {
  const _onChange = useMemo(() => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const _value = multiple
        ? Array.from(event.target.files)
        : event.target.files.item(0);
      onChange(event.target.name, _value);
    };
  }, [onChange, multiple]);

  const _onBlur = useMemo(() => {
    return () => {
      onBlur(name);
    };
  }, [onBlur, name]);

  const inputRef = createRef<HTMLInputElement>();

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const FileRendererComponent = RenderFiles || DefaultFileRenderer;

  return (
    <>
      <Button {...props} onBlur={_onBlur} onClick={onButtonClick}>
        {children}
      </Button>
      <FileRendererComponent
        files={
          (multiple ? value || [] : value ? [value] : []) as unknown as File[]
        }
      />
      <input
        type="file"
        style={{ display: "none" }}
        name={name}
        accept={accept}
        capture={capture}
        multiple={multiple}
        onChange={_onChange}
        ref={inputRef}
      />
    </>
  );
};

export const FormFileInput = withFormField(
  withFormInputControl(ControlledFileInput)
);
