import { demoPage } from "../../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../../src/demo-utils/staticProps";

const FormDateTimePickerDemo = demoPage(
  undefined,
  "form/date-time-pickers/date-time-picker"
);

export default FormDateTimePickerDemo;

export const getStaticProps = getStaticPropsFactory([
  "form/date-time-pickers/date-time-picker"
]);
