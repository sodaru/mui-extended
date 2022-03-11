import { Box, SxProps } from "@mui/material";
import { forwardRef, PropsWithChildren } from "react";

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

    const finalSx = Object.assign({}, style, sx || {});

    return (
      <Box ref={ref} sx={finalSx}>
        {children}
      </Box>
    );
  }
);
