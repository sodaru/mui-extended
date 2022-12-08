import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { Typography, Box } from "@mui/material";
import { SplitPane } from "../src";
import { FunctionComponent } from "react";

const SplitPaneDemoComponent: FunctionComponent = () => {
  return (
    <>
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
};

export default SplitPaneDemoComponent;

export const getStaticProps = getStaticPropsFactory(["split-pane"]);
