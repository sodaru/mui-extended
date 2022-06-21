import { Box, Paper, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { ResizableBox } from "../src/ResizableBox";
import { AspectRatioContainer } from "../src/AspectRatioContainer";
import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const ResizableBoxDemoComponent: FunctionComponent = () => {
  const [size, setSize] = useState([100, 50]);

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <ResizableBox
        width="100%"
        maxWidth={800}
        onResize={(width, height) => {
          setSize([width, height]);
        }}
      >
        <AspectRatioContainer ratio={[16, 9]}>
          <Paper
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
            elevation={4}
          >
            <Typography variant="h4">
              {size[0]} X {size[1]}
            </Typography>
          </Paper>
        </AspectRatioContainer>
      </ResizableBox>
    </Box>
  );
};

const ResizableBoxDemo = demoPage(
  <ResizableBoxDemoComponent />,
  "resizable-box"
);

export default ResizableBoxDemo;

export const getStaticProps = getStaticPropsFactory(["resizable-box"]);
