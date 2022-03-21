import { Button, Typography } from "@mui/material";
import { MarkdownPreview, useHideMenu } from "../../src";
import { demoPage } from "../../src/demo-utils/demoLayout";
import { getStaticPropsFactory } from "../../src/demo-utils/staticProps";

const HideMenuDemo = demoPage(({ docs }) => {
  const hideMenu = useHideMenu();
  return (
    <>
      <MarkdownPreview>{docs["layout/hide-menu"]}</MarkdownPreview>
      <hr />
      <Typography variant="h5">Demo</Typography>
      <Typography variant="subtitle2">
        <strong>Status : </strong> {hideMenu.hide ? "hidden" : "visible"}
      </Typography>
      <Button onClick={hideMenu.toggle}>Toggle Menu</Button>
    </>
  );
});

export default HideMenuDemo;

export const getStaticProps = getStaticPropsFactory(["layout/hide-menu"]);
