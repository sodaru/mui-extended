/* eslint-disable no-console */
import {
  SelectListDialog,
  SelectListDialogProps
} from "../src/SelectListDialog";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getStaticPropsFactory } from "../demoUtils/staticProps";
import Box from "@mui/material/Box";
import { CloseNavigation } from "../src/utils/CloseNavigation";

const SelectListDialogDemo = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, SetSelectedValue] = useState(null);

  const onSelect = () => {
    setOpen(false);
  };

  const onClose: SelectListDialogProps["onClose"] = (
    event,
    reason,
    selectedValue
  ) => {
    event;
    console.log("close reason " + reason);
    if (selectedValue) SetSelectedValue(selectedValue);
    setOpen(false);
  };

  const onOpenModal = () => {
    console.log("open modal called");
    setOpen(true);
  };

  const slectListProps: SelectListDialogProps = {
    onSubmit: onSelect,
    onClose: onClose,
    open: open,
    View: () => {
      return <Typography>Content goes here!!!</Typography>;
    },
    viewProps: {
      onSelect: onSelect,
      selectedValue: selectedValue
    }
  };

  return (
    <>
      <Button onClick={onOpenModal}>Open Modal</Button>
      <Box display={"flex"}>
        <Typography>Selected Value :</Typography> {selectedValue ?? ""}
      </Box>
      <CloseNavigation
        DialogComponent={SelectListDialog}
        props={slectListProps}
      />
    </>
  );
};

export default SelectListDialogDemo;

export const getStaticProps = getStaticPropsFactory("selectlist-dialog");
