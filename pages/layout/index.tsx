import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";
import { demoPage } from "../../demoUtils/demoPage";

export default demoPage(undefined);

export const getStaticProps = getStaticPropsFactory(["layout/index"]);
