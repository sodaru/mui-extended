import { demoPage } from "../../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../../src/demo-utils/staticProps";

const FormInputControlDemo = demoPage(undefined, "form/input-control/index");

export default FormInputControlDemo;

export const getStaticProps = getStaticPropsFactory([
  "form/input-control/index"
]);
