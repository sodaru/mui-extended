import { Box, Typography } from "@mui/material";
import {
  convertDemoPagesToTreeMenuProps,
  demoPage
} from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { TreeMenuWithNextLinks } from "../src/TreeMenuWithNextLinks";

const Index = demoPage(
  ({ pages, docs }) => {
    return (
      <Box>
        <Typography variant="h3">Welcome</Typography>
        <Typography variant="h4">
          This is a showcase of Common UI Components
        </Typography>
        <Typography variant="body1">
          This page does not have a Layout
        </Typography>
        <Typography variant="body2">
          All Demo Pages include a Layout with Menu
        </Typography>
        <Typography variant="body2">{docs["sample"]}</Typography>

        <Box width={200}>
          <TreeMenuWithNextLinks {...convertDemoPagesToTreeMenuProps(pages)} />
        </Box>
      </Box>
    );
  },
  false,
  false,
  true
);

export default Index;

export const getStaticProps = getStaticPropsFactory(["sample"]);
