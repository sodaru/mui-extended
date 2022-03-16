import { Box, Typography } from "@mui/material";
import { SimpleMenuWithNextLinks, SodaruPageComponentType } from "../src";
import { listDemoPages } from "../src/demo-utils/listDemoPages";

const Index: SodaruPageComponentType<{ pages: string[] }> = ({ pages }) => {
  return (
    <Box>
      <Typography variant="h3">Welcome</Typography>
      <Typography variant="h4">
        This is a showcase of Common UI Components
      </Typography>
      <Typography variant="body1">This page does not have a Layout</Typography>
      <Typography variant="body2">
        All Demo Pages include a Layout with Menu
      </Typography>
      <Box width={200}>{<SimpleMenuWithNextLinks pages={pages} />}</Box>
    </Box>
  );
};

export default Index;

export async function getStaticProps() {
  const pages = await listDemoPages();
  return { props: { pages } };
}
