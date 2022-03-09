import { Box, SxProps } from "@mui/material";
import { FunctionComponent, Ref } from "react";

export type PaneProps = {
  size?: number;
  split?: "vertical" | "horizontal";
  sx?: SxProps;
  eleRef?: Ref<HTMLDivElement>;
};

export const Pane: FunctionComponent<PaneProps> = ({
  size,
  split,
  sx,
  eleRef,
  children
}) => {
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
    <Box ref={eleRef} sx={finalSx}>
      {children}
    </Box>
  );
};
