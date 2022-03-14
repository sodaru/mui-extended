import { List, ListItem } from "@mui/material";
import { getComposedLayout } from ".";
import { SodaruLogo, SodaruPageComponentType } from "../src";

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

SodaruLogoDemo.layout = getComposedLayout();

export default SodaruLogoDemo;
