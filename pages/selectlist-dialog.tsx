/* eslint-disable no-console */
import {
  SelectListDialog,
  SelectListDialogProps
} from "../src/SelectListDialog";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getStaticPropsFactory } from "../demoUtils/staticProps";

const SelectListDialogDemo = () => {
  const [open, setOpen] = useState(false);
  console.log("SelectListDialogDemo");
  const onSelect = value => {
    console.log("on select called");
    console.log(value);
    setOpen(false);
  };

  const onclose = () => {
    console.log("on close called");
    setOpen(false);
  };

  const onOpenModal = () => {
    console.log("open modal called");
    setOpen(true);
  };

  const slectListProps: SelectListDialogProps = {
    onSelect: onSelect,
    onClose: onclose,
    open: open,
    View: () => {
      return <Typography>Content goes here!!!</Typography>;
    },
    viewProps: {
      /**
       * TODO: verify onSlect at SelectListDialogProps and ViewPropsType
       */
      onSelect: onSelect
    }
  };

  return (
    <>
      <Button onClick={onOpenModal}>Open Modal</Button>
      <SelectListDialog {...slectListProps} />
    </>
  );
};

export default SelectListDialogDemo;

export const getStaticProps = getStaticPropsFactory("selectlist-dialog");
