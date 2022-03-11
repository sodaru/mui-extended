import { Box, SxProps } from "@mui/material";
import { FunctionComponent, MouseEventHandler, TouchEventHandler } from "react";

export type ResizerProps = {
  onClick: MouseEventHandler;
  onDoubleClick: MouseEventHandler;
  onMouseDown: MouseEventHandler;
  onTouchStart: TouchEventHandler;
  onTouchEnd: TouchEventHandler;
  size: number;
  sx: SxProps;
  split: "vertical" | "horizontal";
};

export const Resizer: FunctionComponent<ResizerProps> = ({
  size,
  split,
  sx,
  onClick,
  onDoubleClick,
  onMouseDown,
  onTouchStart,
  onTouchEnd
}) => {
  const sxProps: SxProps =
    split == "vertical"
      ? {
          cursor: "col-resize",
          borderLeft: "3px solid rgba(255, 255, 255, 0)",
          borderRight: "3px solid rgba(255, 255, 255, 0)"
        }
      : {
          cursor: "row-resize",
          borderTop: "3px solid rgba(255, 255, 255, 0)",
          borderBottom: "3px solid rgba(255, 255, 255, 0)"
        };

  return (
    <Box
      role="presentation"
      sx={{
        backgroundColor: "divider",
        backgroundClip: "padding-box",
        width: size,
        "&:hover": {
          borderColor: "rgba(212, 212, 212, 0.2)"
        },
        ...sxProps,
        ...sx
      }}
      onMouseDown={event => onMouseDown(event)}
      onTouchStart={event => {
        event.preventDefault();
        onTouchStart(event);
      }}
      onTouchEnd={event => {
        event.preventDefault();
        onTouchEnd(event);
      }}
      onClick={event => {
        if (onClick) {
          event.preventDefault();
          onClick(event);
        }
      }}
      onDoubleClick={event => {
        if (onDoubleClick) {
          event.preventDefault();
          onDoubleClick(event);
        }
      }}
    />
  );
};
