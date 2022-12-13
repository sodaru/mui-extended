import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const DemoLayoutDemo = demoPage(undefined, "demo-layout");

export default DemoLayoutDemo;

export const getStaticProps = getStaticPropsFactory(["demo-layout"]);
