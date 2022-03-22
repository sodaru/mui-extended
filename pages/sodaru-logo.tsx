import { Divider, List, ListItem, Typography } from "@mui/material";
import { MarkdownPreview, SodaruLogo } from "../src";
import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const SodaruLogoDemo = demoPage(({ docs }) => {
  return (
    <>
      <MarkdownPreview>{docs["sodaru-logo"]}</MarkdownPreview>
      <hr />
      <Typography variant="h5">Demo</Typography>
      <List>
        <ListItem>Default</ListItem>
        <ListItem>
          <SodaruLogo />
        </ListItem>
        <Divider />
        <ListItem>Custom Dimention</ListItem>
        <ListItem>
          <SodaruLogo width={200} height={200} />
        </ListItem>
      </List>
    </>
  );
});

export default SodaruLogoDemo;

export const getStaticProps = getStaticPropsFactory(["sodaru-logo"]);
