import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const FormTextFieldDemo = demoPage(undefined, "form/textfield");

export default FormTextFieldDemo;

export const getStaticProps = getStaticPropsFactory(["form/textfield"]);
