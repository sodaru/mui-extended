import { Box, Paper, Typography } from "@mui/material";
import {
  convertDemoPagesToTreeMenuProps,
  demoPage
} from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";
import { MarkdownPreview } from "../src/markdown";
import { TreeMenuWithNextLinks } from "../src/TreeMenuWithNextLinks";

const TreeMenuWithNextLinksDemo = demoPage(({ pages, docs }) => {
  return (
    <>
      <MarkdownPreview>{docs["treemenu-with-nextlinks"]}</MarkdownPreview>{" "}
      <hr />
      <Typography variant="h5">Demo</Typography>
      <Box maxWidth={250}>
        <Paper elevation={4}>
          <TreeMenuWithNextLinks {...convertDemoPagesToTreeMenuProps(pages)} />
        </Paper>
      </Box>
    </>
  );
});

export default TreeMenuWithNextLinksDemo;

export const getStaticProps = getStaticPropsFactory([
  "treemenu-with-nextlinks"
]);
