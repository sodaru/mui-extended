import { Box, Paper, TextField } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { AspectRatioContainer } from "../src/AspectRatioContainer";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const AspectRatioContainerDemoComponent: FunctionComponent = () => {
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(9);
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <AspectRatioContainer ratio={[width, height]} width="100%" maxWidth={800}>
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
          <TextField
            value={width}
            type="number"
            onChange={event => {
              setWidth(event.target.value as unknown as number);
            }}
            label="width"
          />

          <TextField
            value={height}
            type="number"
            onChange={event => {
              setHeight(event.target.value as unknown as number);
            }}
            label="height"
          />
        </Paper>
      </AspectRatioContainer>
    </Box>
  );
};

export default AspectRatioContainerDemoComponent;

export const getStaticProps = getStaticPropsFactory(["aspect-ratio-container"]);
