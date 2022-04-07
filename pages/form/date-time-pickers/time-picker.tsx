import { demoPage } from "../../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../../src/demo-utils/staticProps";

const FormTimePickerDemo = demoPage(
  undefined,
  "form/date-time-pickers/time-picker"
);

export default FormTimePickerDemo;

export const getStaticProps = getStaticPropsFactory([
  "form/date-time-pickers/time-picker"
]);
