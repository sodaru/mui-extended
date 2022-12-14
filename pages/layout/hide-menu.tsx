import { Button, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useHideMenu } from "../../src";
import { getStaticPropsFactory } from "../../demoUtils/staticProps";

const HideMenuDemoComponent: FunctionComponent = () => {
  const hideMenu = useHideMenu();
  return (
    <>
      <Typography variant="subtitle2">
        <strong>Status : </strong> {hideMenu.hide ? "hidden" : "visible"}
      </Typography>
      <Button onClick={hideMenu.toggle}>Toggle Menu</Button>
    </>
  );
};

export default HideMenuDemoComponent;

export const getStaticProps = getStaticPropsFactory("layout/hide-menu");
