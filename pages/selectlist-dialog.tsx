/* eslint-disable no-console */
import {
  SelectListDialog,
  SelectListDialogProps
} from "../src/SelectListDialog";
import { useState, ChangeEvent } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getStaticPropsFactory } from "../demoUtils/staticProps";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const SelectListDialogDemo = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, SetSelectedValue] = useState<string>("");

  const onSelect = () => {
    setOpen(false);
  };

  const onClose: SelectListDialogProps["onClose"] = (
    event,
    reason,
    selectedValue
  ) => {
    console.log("close reason " + reason);
    if (selectedValue) {
      SetSelectedValue(selectedValue as string);
    }
    setOpen(false);
  };

  const onOpenModal = () => {
    console.log("open modal called");
    setOpen(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      SetSelectedValue(selectedValue + event.target.name);
    } else {
      SetSelectedValue(selectedValue.replace(event.target.name, ""));
    }
  };

  const slectListProps: SelectListDialogProps = {
    onSubmit: onSelect,
    onClose: onClose,
    open: open,
    View: () => {
      return (
        <Box>
          <FormControlLabel
            control={<Checkbox onChange={handleChange} name="Item1" />}
            label="Item1"
          />
          <FormControlLabel control={<Checkbox name="Item2" />} label="Item2" />
          <FormControlLabel control={<Checkbox name="Item3" />} label="Item3" />
        </Box>
      );
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
      <SelectListDialog {...slectListProps} />
    </>
  );
};

export default SelectListDialogDemo;

export const getStaticProps = getStaticPropsFactory("selectlist-dialog");
