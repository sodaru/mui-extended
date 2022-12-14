import {
  forwardRef,
  FunctionComponent,
  JSXElementConstructor,
  PropsWithChildren,
  ReactEventHandler,
  useEffect
} from "react";

export type CloseOnNavigationProps = {
  open: boolean;
  onClose: ReactEventHandler;
};

type MuiExtReplaceableHistoryState = {
  type: "MuiExt-replaceable-state";
  callback: (replaced: boolean) => void;
};

class MuiExtReplaceableHistory {
  private static instanse: MuiExtReplaceableHistory;
  private stateStack: (MuiExtReplaceableHistoryState | unknown)[] = [];

  private constructor() {
    if (typeof window !== "undefined") {
      this.register();
    }
  }

  public static getInstanse() {
    if (!this.instanse) {
      this.instanse = new MuiExtReplaceableHistory();
    }
    return this.instanse;
  }

  getTopState(): MuiExtReplaceableHistoryState | unknown {
    return this.stateStack[this.stateStack.length - 1];
  }

  private register() {
    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(
      window.history
    );

    const cleanDataForOriginalAction = (data: unknown) => {
      const _data = data as MuiExtReplaceableHistoryState;
      if (_data?.type == "MuiExt-replaceable-state") {
        return { type: "MuiExt-replaceable-state" };
      }
      return _data;
    };

    const replaceState = (
      data: unknown,
      unused: string,
      url?: string | URL
    ) => {
      const state = this.stateStack.pop() as MuiExtReplaceableHistoryState;
      if (state?.type == "MuiExt-replaceable-state") {
        state.callback(true);
      }
      this.stateStack.push(data);
      originalReplaceState(cleanDataForOriginalAction(data), unused, url);
    };

    const pushState = (data: unknown, unused: string, url?: string | URL) => {
      const topState = this.getTopState() as MuiExtReplaceableHistoryState;
      if (topState?.type == "MuiExt-replaceable-state") {
        replaceState(data, unused, url);
      } else {
        this.stateStack.push(data);
        originalPushState(cleanDataForOriginalAction(data), unused, url);
      }
    };

    window.history.pushState = pushState.bind(this);
    window.history.replaceState = replaceState.bind(this);

    window.addEventListener("popstate", () => {
      const state = this.stateStack.pop() as MuiExtReplaceableHistoryState;
      if (state?.type == "MuiExt-replaceable-state") {
        state.callback(false);
      }
    });
  }

  public pushState(callback: (replaced: boolean) => void) {
    window.history.pushState(
      {
        type: "MuiExt-replaceable-state",
        callback
      } as MuiExtReplaceableHistoryState,
      null
    );
  }

  public back() {
    const state = this.getTopState() as MuiExtReplaceableHistoryState;
    if (state?.type == "MuiExt-replaceable-state") {
      window.history.back();
    }
  }
}

export const withCloseOnNavigation = <
  T extends PropsWithChildren<CloseOnNavigationProps>
>(
  Modal: FunctionComponent<T> | JSXElementConstructor<T>
): FunctionComponent<T> => {
  const ImprovedModal = forwardRef<HTMLDivElement, T>(
    function ModalWithNavigationClose({ children, ...props }, ref) {
      useEffect(() => {
        const history = MuiExtReplaceableHistory.getInstanse();
        if (props.open) {
          history.pushState(() => {
            props.onClose(null);
          });
        } else {
          history.back();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.open]);

      return (
        <Modal {...(props as T)} ref={ref}>
          {children}
        </Modal>
      );
    }
  );

  return ImprovedModal as FunctionComponent<T>;
};
