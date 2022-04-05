import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const LayoutWithoutMenuAppBarDemo = demoPage(
  undefined,
  "layout/without-menu-appbar",
  true,
  true
);

export default LayoutWithoutMenuAppBarDemo;

export const getStaticProps = getStaticPropsFactory([
  "layout/without-menu-appbar"
]);
