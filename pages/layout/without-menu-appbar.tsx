import { MarkdownPreview } from "../../src";
import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const LayoutWithoutMenuAppBarDemo = demoPage(
  ({ docs }) => {
    return (
      <MarkdownPreview>{docs["layout/without-menu-appbar"]}</MarkdownPreview>
    );
  },
  true,
  true
);

export default LayoutWithoutMenuAppBarDemo;

export const getStaticProps = getStaticPropsFactory([
  "layout/without-menu-appbar"
]);
