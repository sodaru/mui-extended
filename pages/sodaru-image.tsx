import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { MarkdownPreview } from "../src/markdown";

const SodaruImageDemo = demoPage(({ docs }) => {
  return <MarkdownPreview>{docs["sodaru-image"]}</MarkdownPreview>;
});

export default SodaruImageDemo;

export const getStaticProps = getStaticPropsFactory(["sodaru-image"]);
