import { isEqual, isEqualWith } from "lodash";
import {
  forwardRef,
  FunctionComponent,
  memo,
  MouseEventHandler,
  useMemo
} from "react";
import { debugPropChanges, debugRender } from "./debug";
import { useFormContext } from "./FormContext";

export const withResetButton = <T extends { onClick?: MouseEventHandler }>(
  Button: FunctionComponent<T>
): FunctionComponent<T> => {
  const ButtonWrapper: typeof Button = props => {
    debugRender("resetButton");
    return <Button {...props} />;
  };
  const PureButton = memo(ButtonWrapper, (prevProps, nextProps) => {
    debugPropChanges(prevProps, nextProps);
    return isEqual(prevProps, nextProps);
  });
  const DecoratedButton = forwardRef<Element, T>(function ResetButton(
    props,
    ref
  ) {
    const formContext = useFormContext();

    if (!formContext) {
      throw new Error("ResetButton is rendered with out Form");
    }

    const onClick = useMemo(() => {
      return () => {
        formContext.reset();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <PureButton {...(props as T)} onClick={onClick} ref={ref} />;
  });

  return DecoratedButton as FunctionComponent<T>;
};

export const withSubmitButton = <
  T extends { onClick?: MouseEventHandler; disabled?: boolean }
>(
  Button: FunctionComponent<T>
): FunctionComponent<T> => {
  const ButtonWrapper: typeof Button = props => {
    debugRender("submitButton");
    return <Button {...props} />;
  };
  const PureButton = memo(ButtonWrapper, (prevProps, nextProps) => {
    debugPropChanges(prevProps, nextProps);
    return isEqualWith(prevProps, nextProps, (value, other, propName) => {
      if (propName == "onClick") {
        return true;
      }
    });
  });
  const DecoratedButton = forwardRef<Element, T>(function SubmitButton(
    props,
    ref
  ) {
    const formContext = useFormContext();

    if (!formContext) {
      throw new Error("SubmitButton is rendered with out Form");
    }

    const onClick = useMemo(() => {
      return () => {
        formContext.submit();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <PureButton
        {...(props as T)}
        onClick={onClick}
        disabled={
          !formContext.isDirty ||
          !formContext.isValid ||
          formContext.isSubmitting
        }
        ref={ref}
      />
    );
  });

  return DecoratedButton as FunctionComponent<T>;
};
