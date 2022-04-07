import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const FormAutocompleteDemo = demoPage(undefined, "form/autocomplete");

export default FormAutocompleteDemo;

export const getStaticProps = getStaticPropsFactory(["form/autocomplete"]);
