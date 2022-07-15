import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const SodaruAppBarDemo = demoPage(
  undefined,
  "layout/sodaru-appbar",
  "Sodaru UI Components : AppBar child Content"
);

export default SodaruAppBarDemo;

export const getStaticProps = getStaticPropsFactory(["layout/sodaru-appbar"]);
