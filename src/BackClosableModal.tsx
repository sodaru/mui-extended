import {
  forwardRef,
  FunctionComponent,
  JSXElementConstructor,
  ReactEventHandler
} from "react";
import { useHashRouter, useNonInitialEffect } from "./utils";

type ModalPropsForBackButtonClose = {
  open: boolean;
  onClose: ReactEventHandler;
};

export const withBackButtonClose = <T extends ModalPropsForBackButtonClose>(
  Modal: FunctionComponent<T> | JSXElementConstructor<T>
): FunctionComponent<T> => {
  const ImprovedModal = forwardRef<HTMLDivElement, T>(
    function ModalWithBackButtonClose({ children, ...props }, ref) {
      const [hash, setHash] = useHashRouter<string>("");

      useNonInitialEffect(() => {
        if (props.open) {
          if (hash != "open") {
            setHash("open");
          }
        } else {
          if (hash != "") {
            setHash("");
          }
        }
      }, [props.open]);

      useNonInitialEffect(() => {
        if (hash == "") {
          if (props.open) {
            props.onClose(null);
          }
        } else if (hash == "open") {
          if (!props.open) {
            setHash("");
          }
        }
      }, [hash]);

      return (
        <Modal {...(props as T)} ref={ref}>
          {children}
        </Modal>
      );
    }
  );
  return ImprovedModal as FunctionComponent<T>;
};