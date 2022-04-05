import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const SodaruAppDemo = demoPage(undefined, "sodaru-app/index");

export default SodaruAppDemo;

export const getStaticProps = getStaticPropsFactory(["sodaru-app/index"]);
