import { Dialog, DialogProps } from "@mui/material";
import { FunctionComponent } from "react";
import { withCloseOnNavigation } from "./utils";
import { useMobile } from "./utils/useMobile";

export type ResponsiveDialogProps = DialogProps & {
  onClose: DialogProps["onClose"];
};

const CloseOnNavigateDialog = withCloseOnNavigation(
  Dialog
) as FunctionComponent<DialogProps>;

export const ResponsiveDialog: FunctionComponent<ResponsiveDialogProps> = ({
  children,
  ...props
}) => {
  const isMobile = useMobile();
  return (
    <CloseOnNavigateDialog fullScreen={isMobile} {...props}>
      {children}
    </CloseOnNavigateDialog>
  );
};
