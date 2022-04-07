import { demoPage } from "../../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../../src/demo-utils/staticProps";

const FormSwitchDemo = demoPage(undefined, "form/input-control/switch");

export default FormSwitchDemo;

export const getStaticProps = getStaticPropsFactory([
  "form/input-control/switch"
]);
