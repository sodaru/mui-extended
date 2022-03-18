import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { MarkdownPreview } from "../src/markdown";

const MarkdownPreviewDemo = demoPage(({ docs }) => {
  return <MarkdownPreview>{docs["markdown-preview"]}</MarkdownPreview>;
});

export default MarkdownPreviewDemo;

export const getStaticProps = getStaticPropsFactory(["markdown-preview"]);
