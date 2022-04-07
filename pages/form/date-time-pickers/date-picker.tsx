import { demoPage } from "../../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../../src/demo-utils/staticProps";

const FormDatePickerDemo = demoPage(
  undefined,
  "form/date-time-pickers/date-picker"
);

export default FormDatePickerDemo;

export const getStaticProps = getStaticPropsFactory([
  "form/date-time-pickers/date-picker"
]);
