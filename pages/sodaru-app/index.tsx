import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";
import { MarkdownPreview } from "../../src/markdown";

const SodaruAppDemo = demoPage(({ docs }) => {
  return <MarkdownPreview>{docs["sodaru-app/index"]}</MarkdownPreview>;
});

export default SodaruAppDemo;

export const getStaticProps = getStaticPropsFactory(["sodaru-app/index"]);
