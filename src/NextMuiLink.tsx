import { FC, forwardRef } from "react";
import Link, { LinkProps } from "next/link";
import { Link as MuiLink } from "@mui/material";

export const NextLinkForMui = forwardRef<HTMLAnchorElement, LinkProps>(
  function NextLink(props, ref) {
    return <Link ref={ref} {...props} />;
  }
);

export const MuiLinkWithNext: FC<LinkProps> = props => {
  return <MuiLink {...props} component={NextLinkForMui} underline="none" />;
};
