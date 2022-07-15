import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const SodaruAppBarDemo = demoPage(undefined, "layout/sodaru-appbar");

export default SodaruAppBarDemo;

export const getStaticProps = getStaticPropsFactory(["layout/sodaru-appbar"]);
