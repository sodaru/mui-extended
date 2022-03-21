import { MarkdownPreview } from "../../src";
import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const LayoutWithoutMenuDemo = demoPage(({ docs }) => {
  return <MarkdownPreview>{docs["layout/without-menu"]}</MarkdownPreview>;
}, true);

export default LayoutWithoutMenuDemo;

export const getStaticProps = getStaticPropsFactory(["layout/without-menu"]);
