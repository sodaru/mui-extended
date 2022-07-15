import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const LayoutWithoutMenuDemo = demoPage(undefined, "layout/without-menu", true);

export default LayoutWithoutMenuDemo;

export const getStaticProps = getStaticPropsFactory(["layout/without-menu"]);
