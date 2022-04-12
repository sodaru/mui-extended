import { Theme, useMediaQuery } from "@mui/material";

export const useMobile = () => {
  return useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));
};
