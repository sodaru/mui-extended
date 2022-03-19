import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { MarkdownPreview } from "../src/markdown";

const Index = demoPage(({ docs }) => {
  return <MarkdownPreview>{docs["home"]}</MarkdownPreview>;
});

export default Index;

export const getStaticProps = getStaticPropsFactory(["home"]);
