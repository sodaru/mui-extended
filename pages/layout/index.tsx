import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";
import { demoPage } from "../../src/demo-utils/demoLayout";

const LayoutDemo = demoPage(undefined, "layout/index");

export default LayoutDemo;

export const getStaticProps = getStaticPropsFactory(["layout/index"]);
