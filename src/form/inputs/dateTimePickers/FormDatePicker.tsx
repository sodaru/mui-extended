import { DatePicker } from "@mui/x-date-pickers";
import { withFormField } from "../../FormField";
import { withControlledDateTimePicker } from "./ControlledDateTimePicker";

export const FormDatePicker = withFormField(
  withControlledDateTimePicker(DatePicker)
);
