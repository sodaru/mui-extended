import { Typography } from "@mui/material";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";
import { demoPage } from "../../src/demo-utils/demoLayout";

const Index = demoPage(() => {
  return <Typography variant="h4">Test</Typography>;
});

export default Index;

export const getStaticProps = getStaticPropsFactory();
