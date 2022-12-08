import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { MarkdownPreview } from "../../src";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

export type DemoPageProps = {
  docs: Record<string, string>;
  pages: string[];
};

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

export default MarkdownPreviewDemoComponent;

export const getStaticProps = getStaticPropsFactory(["markdown/preview"]);
