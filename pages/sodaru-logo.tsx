import { List, ListItem } from "@mui/material";
import { SodaruLogo, SodaruPageComponentType } from "../src";
import { getDemoLayout } from "../src/demo-utils/demoLayout";
import { listDemoPages } from "../src/demo-utils/listDemoPages";

const SodaruLogoDemo: SodaruPageComponentType = () => {
  return (
    <List>
      <ListItem>
        Default
        <SodaruLogo />
      </ListItem>
      <ListItem>
        Custom Dimention
        <SodaruLogo width={200} height={200} />
      </ListItem>
    </List>
  );
};

SodaruLogoDemo.layout = getDemoLayout();

export default SodaruLogoDemo;

export async function getStaticProps() {
  const pages = await listDemoPages();
  return { props: { pages } };
}
