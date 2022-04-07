import { demoPage } from "../../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../../src/demo-utils/staticProps";

const FormFileInputDemo = demoPage(undefined, "form/input-control/file");

export default FormFileInputDemo;

export const getStaticProps = getStaticPropsFactory([
  "form/input-control/file"
]);
