import { ComponentType } from "react";
import { useMobile } from "./utils/useMobile";

export type ResponsiveDialogProps = {
  fullScreen?: boolean;
};

export const withResponsiveDialog = <T extends ResponsiveDialogProps>(
  DialogComponent: ComponentType<T>
): ComponentType<T> => {
  return function ResponsiveComponent(props: T) {
    const isMobile = useMobile();
    return <DialogComponent fullScreen={isMobile} {...props} />;
  };
};
