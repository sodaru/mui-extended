import { List, ListItem } from "@mui/material";
import { SodaruLogo } from "../src";
import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const SodaruLogoDemo = demoPage(() => {
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
});

export default SodaruLogoDemo;

export const getStaticProps = getStaticPropsFactory();
