import { demoPage } from "../../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../../src/demo-utils/staticProps";

const FormRadioGroupDemo = demoPage(
  undefined,
  "form/input-control/radio-group"
);

export default FormRadioGroupDemo;

export const getStaticProps = getStaticPropsFactory([
  "form/input-control/radio-group"
]);
