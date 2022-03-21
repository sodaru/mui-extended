import { useRouter } from "next/router";
import {
  forwardRef,
  FunctionComponent,
  JSXElementConstructor,
  ReactEventHandler,
  useEffect,
  useState
} from "react";
import { useNonInitialEffect } from ".";

const useHashRouter = <T extends string | number | boolean>(
  initialHash?: T
): [T, (hash: T) => void] => {
  const [hash, setHash] = useState<T>(initialHash);

  const router = useRouter();

  const updateRoute = (_hash: T) => {
    if (!_hash) {
      router.back();
    } else {
      const url = new URL(window.location.href);
      url.hash = "#" + _hash;
      router.push(url);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    setHash(url.hash.substring(1) as T);
  }, [router.asPath]);

  return [hash, updateRoute];
};

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
