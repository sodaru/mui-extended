import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const TreeMenuWithNextLinksDemo = demoPage(
  undefined,
  "treemenu-with-nextlinks"
);

export default TreeMenuWithNextLinksDemo;

export const getStaticProps = getStaticPropsFactory([
  "treemenu-with-nextlinks"
]);
