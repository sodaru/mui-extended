import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { MarkdownPreview } from "../src/markdown";
import { Typography, Box } from "@mui/material";
import { SplitPane } from "../src";

const SplitPaneDemo = demoPage(({ docs }) => {
  return (
    <>
      <MarkdownPreview>{docs["split-pane"]}</MarkdownPreview>
      <hr />
      <Typography variant="h5">Demo</Typography>
      <Typography variant="h6">
        Horizonal Split with second child as primary pane
      </Typography>
      <Box position="relative" height="500px">
        <SplitPane split="horizontal" primary="second">
          <Box
            sx={{
              backgroundColor: "grey.A100",
              width: "100%",
              height: "100%"
            }}
          >
            Pane 1
          </Box>
          <Box
            sx={{
              backgroundColor: "grey.A100",
              width: "100%",
              height: "100%"
            }}
          >
            Pane 2
          </Box>
        </SplitPane>
      </Box>
    </>
  );
});

export default SplitPaneDemo;

export const getStaticProps = getStaticPropsFactory(["split-pane"]);
