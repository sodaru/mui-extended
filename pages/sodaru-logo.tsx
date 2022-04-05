import { Divider, List, ListItem } from "@mui/material";
import { FunctionComponent } from "react";
import { SodaruLogo } from "../src";
import { demoPage } from "../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../src/demo-utils/staticProps";

const SodaruLogoDemoComponent: FunctionComponent = () => {
  return (
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
  );
};

const SodaruLogoDemo = demoPage(<SodaruLogoDemoComponent />, "sodaru-logo");

export default SodaruLogoDemo;

export const getStaticProps = getStaticPropsFactory(["sodaru-logo"]);
