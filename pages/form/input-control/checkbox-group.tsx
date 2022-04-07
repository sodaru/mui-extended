import { demoPage } from "../../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../../src/demo-utils/staticProps";

const FormCheckboxGroupDemo = demoPage(
  undefined,
  "form/input-control/checkbox-group"
);

export default FormCheckboxGroupDemo;

export const getStaticProps = getStaticPropsFactory([
  "form/input-control/checkbox-group"
]);
