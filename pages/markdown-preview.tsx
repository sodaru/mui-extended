import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const MarkdownPreviewDemo = demoPage(undefined, "markdown-preview");

export default MarkdownPreviewDemo;

export const getStaticProps = getStaticPropsFactory(["markdown-preview"]);
