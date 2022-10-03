import { Box, SxProps } from "@mui/material";
import { createRef, forwardRef, PropsWithChildren, useEffect } from "react";

export type PaneProps = {
  size?: number;
  split?: "vertical" | "horizontal";
  sx?: SxProps;
};

export const Pane = forwardRef<HTMLDivElement, PropsWithChildren<PaneProps>>(
  function Pane({ size, split, sx, children }, ref) {
    const style: SxProps = {
      flex: 1,
      position: "relative",
      outline: "none",
      overflow: "auto"
    };

    if (size !== undefined) {
      if (split === "vertical") {
        style.width = size;
      } else {
        style.height = size;
        style.display = "flex";
      }
      style.flex = "none";
    }

    const finalSx = { ...style, ...sx };

    const thisRef = createRef<HTMLDivElement>();

    useEffect(() => {
      if (ref) {
        if (typeof ref == "function") {
          ref(thisRef.current);
        } else {
          ref.current = thisRef.current;
        }
      }
    }, [thisRef, ref]);

    useEffect(() => {
      thisRef.current.scroll({ top: 0, left: 0 });
    }, [thisRef, children]);

    return (
      <Box ref={thisRef} sx={finalSx}>
        {children}
      </Box>
    );
  }
);
