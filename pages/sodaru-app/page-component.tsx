import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";
import { MarkdownPreview } from "../../src/markdown";

const SodaruAppPageComponentDemo = demoPage(({ docs }) => {
  return <MarkdownPreview>{docs["sodaru-app/page-component"]}</MarkdownPreview>;
});

export default SodaruAppPageComponentDemo;

export const getStaticProps = getStaticPropsFactory([
  "sodaru-app/page-component"
]);
