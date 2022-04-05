import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const Index = demoPage(undefined, "home");

export default Index;

export const getStaticProps = getStaticPropsFactory(["home"]);
