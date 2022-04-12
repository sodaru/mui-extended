import { TimePicker } from "@mui/x-date-pickers";
import { withFormField } from "../../FormField";
import { withControlledDateTimePicker } from "./ControlledDateTimePicker";

export const FormTimePicker = withFormField(
  withControlledDateTimePicker(TimePicker)
);
