import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { MarkdownPreview } from "../src/markdown";

const WebStorageDemo = demoPage(({ docs }) => {
  return <MarkdownPreview>{docs["web-storage"]}</MarkdownPreview>;
});

export default WebStorageDemo;

export const getStaticProps = getStaticPropsFactory(["web-storage"]);
