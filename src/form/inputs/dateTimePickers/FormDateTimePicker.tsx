import { DateTimePicker } from "@mui/x-date-pickers";
import { withFormField } from "../../FormField";
import { withControlledDateTimePicker } from "./ControlledDateTimePicker";

export const FormDateTimePicker = withFormField(
  withControlledDateTimePicker(DateTimePicker)
);
