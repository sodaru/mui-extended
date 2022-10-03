import {
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import { CodeComponentContextProvider, MarkdownPreview } from "../../src";
import { demoPage, DemoPageProps } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const MarkdownPreviewDemoComponent: FunctionComponent<DemoPageProps> = ({
  docs
}) => {
  const docLines = docs["markdown/preview"].split("\n");
  const [codeMaxHeight, setCodeMaxHeight] = useState<string | undefined>();
  const [codeCopy, setCodeCopy] = useState<boolean | undefined>();
  return (
    <>
      <Typography variant="subtitle2">
        Original Markdown Source of the this reference{" "}
      </Typography>
      <Stack>
        <TextField
          value={codeMaxHeight}
          onChange={e => {
            setCodeMaxHeight(e.target.value);
          }}
          label="Code Max Height"
        />
        <FormControlLabel
          control={
            <Switch
              checked={codeCopy}
              onChange={e => {
                setCodeCopy(e.target.checked);
              }}
            />
          }
          label="Enable Code Copy"
        />
      </Stack>
      <CodeComponentContextProvider
        value={{ maxHeight: codeMaxHeight, enableCopy: codeCopy }}
      >
        <MarkdownPreview>
          {"```\n" + docLines.map(l => "    " + l).join("\n") + "\n```"}
        </MarkdownPreview>
      </CodeComponentContextProvider>
    </>
  );
};

const MarkdownPreviewDemo = demoPage(
  MarkdownPreviewDemoComponent,
  "markdown/preview"
);

export default MarkdownPreviewDemo;

export const getStaticProps = getStaticPropsFactory(["markdown/preview"]);
