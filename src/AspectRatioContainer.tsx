import { Box } from "@mui/material";
import { BoxProps } from "@mui/system";
import { forwardRef } from "react";

export type AspectRatioContainerProps = BoxProps & {
  ratio: [number, number];
};

export const AspectRatioContainer = forwardRef<
  HTMLDivElement,
  AspectRatioContainerProps
>(function AspectRatioContainer({ ratio, children, ...props }, ref) {
  const paddingTop = (ratio[1] / ratio[0]) * 100 + "%";
  return (
    <Box {...props} ref={ref}>
      <Box sx={{ position: "relative", width: "100%", paddingTop }}>
        <Box
          sx={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
});
