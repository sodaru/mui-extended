import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { demoPage } from "../utils/demoPage";

export default demoPage(undefined);

export const getStaticProps = getStaticPropsFactory(["home"]);
