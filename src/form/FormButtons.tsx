import {
  forwardRef,
  FunctionComponent,
  MouseEventHandler,
  useMemo
} from "react";
import { useFormContext } from "./Context";

export const withClearButton = <T extends { onClick?: MouseEventHandler }>(
  Button: FunctionComponent<T>
): FunctionComponent<T> => {
  const DecoratedButton = forwardRef<Element, T>(function ClearButton(
    props,
    ref
  ) {
    const formContext = useFormContext();

    if (!formContext) {
      throw new Error("ClearButton is rendered with out Form");
    }

    const onClick = useMemo(() => {
      return () => {
        formContext.clear();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Button {...(props as T)} onClick={onClick} ref={ref} />;
  });

  return DecoratedButton as FunctionComponent<T>;
};

export const withSubmitButton = <T extends { onClick?: MouseEventHandler }>(
  Button: FunctionComponent<T>
): FunctionComponent<T> => {
  const DecoratedButton = forwardRef<Element, T>(function ClearButton(
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

    return <Button {...(props as T)} onClick={onClick} ref={ref} />;
  });

  return DecoratedButton as FunctionComponent<T>;
};
