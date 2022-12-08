import { demoPage } from "../../utils/demoPage";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

export default demoPage(undefined);

export const getStaticProps = getStaticPropsFactory(["layout/without-menu"]);
