import { MarkdownPreview } from "../../src";
import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const SodaruAppBarDemo = demoPage(
  ({ docs }) => {
    return <MarkdownPreview>{docs["layout/sodaru-appbar"]}</MarkdownPreview>;
  },
  false,
  false,
  false,
  "Sodaru UI Components : AppBar child Content"
);

export default SodaruAppBarDemo;

export const getStaticProps = getStaticPropsFactory(["layout/sodaru-appbar"]);
