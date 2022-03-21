import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";
import { demoPage } from "../../src/demo-utils/demoLayout";
import { MarkdownPreview } from "../../src";

const LayoutDemo = demoPage(({ docs }) => {
  return <MarkdownPreview>{docs["layout/index"]}</MarkdownPreview>;
});

export default LayoutDemo;

export const getStaticProps = getStaticPropsFactory(["layout/index"]);
