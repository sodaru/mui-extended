import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const LayoutWithoutMenuAppBarDemo = demoPage(
  undefined,
  "layout/without-menu-appbar",
  "Sodaru UI Components",
  "https://gitlab.com/sodaru/solib/ui-components",
  true,
  true
);

export default LayoutWithoutMenuAppBarDemo;

export const getStaticProps = getStaticPropsFactory([
  "layout/without-menu-appbar"
]);
