import {
  Button,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Typography
} from "@mui/material";
import { ComponentType, useState } from "react";
import { ResponsiveDialog } from "./ResponsiveDialog";

export type ViewPropsType = {
  selectedValue?: unknown;
  onSelect: (value: unknown) => void;
} & Record<string, unknown>;

export type SelectListDialogProps = DialogProps & {
  title?: string;
  cancelLabel?: string;
  submitLabel?: string;
  onClose: DialogProps["onClose"];
  onSelect: (value: unknown) => void;
  View: ComponentType<ViewPropsType>;
  viewProps: ViewPropsType;
  closeIcon?: string;
};
export const SelectListDialog = ({
  open,
  onClose,
  View,
  viewProps,
  onSelect,
  ...props
}: SelectListDialogProps) => {
  const title = props.title ?? "Slect";
  const cancelLabel = props.cancelLabel ?? "Cancel";
  const submitLabel = props.submitLabel ?? "Submit";
  const [value, SetValue] = useState(viewProps.selectedValue ?? null);
  const onItemSelect = (value: unknown) => {
    SetValue(value);
  };

  const onSubmit = e => {
    onSelect(value);
    onClose(e, "backdropClick");
  };

  const onCancel = e => {
    onClose(e, "backdropClick");
  };

  return (
    <ResponsiveDialog open={open} onClose={onClose} {...props}>
      <DialogTitle>
        <Typography>{title}</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <View onSelect={onItemSelect} {...viewProps}></View>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelLabel}</Button>
        <Button autoFocus onClick={onSubmit}>
          {submitLabel}
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  );
};
