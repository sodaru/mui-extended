import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { MarkdownPreview } from "../../src";
import { demoPage, DemoPageProps } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const MarkdownPreviewDemoComponent: FunctionComponent<DemoPageProps> = ({
  docs
}) => {
  const docLines = docs["markdown/preview"].split("\n");
  return (
    <>
      <Typography variant="subtitle2">
        Original Markdown Source of the this reference{" "}
      </Typography>
      <MarkdownPreview>
        {"```\n" + docLines.map(l => "    " + l).join("\n") + "\n```"}
      </MarkdownPreview>
    </>
  );
};

const MarkdownPreviewDemo = demoPage(
  MarkdownPreviewDemoComponent,
  "markdown/preview"
);

export default MarkdownPreviewDemo;

export const getStaticProps = getStaticPropsFactory(["markdown/preview"]);
