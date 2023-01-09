/* eslint-disable no-console */
import { DialogProps } from "@mui/material";
import { useState, ComponentType, useEffect } from "react";

type CloseNavigationProps = Omit<DialogProps, "onClose"> & {
  open: boolean;
  onClose: (event: Event, reason: string, selectedValue?: unknown) => void;
};

export const CloseNavigation = ({
  DialogComponent,
  props
}: {
  DialogComponent: ComponentType<CloseNavigationProps>;
  props: CloseNavigationProps;
}) => {
  const { open, onClose } = props;
  const [historyState, setHistoryState] = useState(null);
  //   const [back, setBack] = useState(null);

  const onBackClick = () => {
    console.log("pop called");
    if (open) {
      onClose(null, "back click");
    }
  };

  useEffect(() => {
    if (open) {
      console.log("useffet open");
      window.history.pushState("dialog called", "");
      setHistoryState(Math.random());
      window.onpopstate = onBackClick;
    } else {
      console.log("useffet close");
      if (historyState) {
        console.log("useffet close state set");
        window.onpopstate = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return <DialogComponent open={open} onClose={onClose} {...props} />;
};
