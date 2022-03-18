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
  const styles: SxProps =
    split == "vertical"
      ? {
          cursor: "col-resize",
          borderLeft: "3px solid rgba(255, 255, 255, 0)",
          borderRight: "3px solid rgba(255, 255, 255, 0)",
          marginLeft: "-3px",
          marginRight: "-3px"
        }
      : {
          cursor: "row-resize",
          borderTop: "3px solid rgba(255, 255, 255, 0)",
          borderBottom: "3px solid rgba(255, 255, 255, 0)",
          marginTop: "-3px",
          marginBottom: "-3px"
        };

  return (
    <Box
      role="presentation"
      sx={{
        backgroundColor: "divider",
        backgroundClip: "padding-box",
        width: size,
        zIndex: 1000,
        "&:hover": {
          backgroundColor: "primary.light"
        },
        ...styles,
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
