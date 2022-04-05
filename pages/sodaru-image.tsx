import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const SodaruImageDemo = demoPage(undefined, "sodaru-image");

export default SodaruImageDemo;

export const getStaticProps = getStaticPropsFactory(["sodaru-image"]);
