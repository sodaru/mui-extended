/* eslint-disable no-console */
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MouseEventHandler, useState } from "react";
import { DemoAppBar } from "../../demoUtils/demoAppBar";
import { getStaticPropsFactory } from "../../demoUtils/staticProps";
import { HideMenuProvider, Layout } from "../../src";

const Menu = ({
  onHandleClick
}: {
  onHandleClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={onHandleClick}>
        <ListItemText primary="Page 1" />
      </ListItemButton>
      <ListItemButton onClick={onHandleClick}>
        <ListItemText primary="Page 2" />
      </ListItemButton>
      <ListItemButton onClick={onHandleClick}>
        <ListItemText primary="Page 3" />
      </ListItemButton>
    </List>
  );
};

const Demo = () => {
  return (
    <HideMenuProvider>
      <LayoutDemo />
    </HideMenuProvider>
  );
};

const LayoutDemo = () => {
  const [content, setContent] = useState("Page 1");
  const [withAppBar, setWithAppBar] = useState(true);
  const [withMenu, setWithMenu] = useState(true);
  //   const hide = useHideMenu();
  const handleClick: MouseEventHandler<HTMLDivElement> = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setContent((event.target as HTMLElement).innerText);
  };

  const handleAppBarClick: MouseEventHandler<HTMLButtonElement> = () => {
    setWithAppBar(!withAppBar);
  };

  const handleMenuClick: MouseEventHandler<HTMLButtonElement> = () => {
    setWithMenu(!withMenu);
  };

  return (
    <Paper component={Stack} direction="column" justifyContent="center">
      <Stack direction="row" spacing={2} margin="15px 100px">
        {/* <Button variant="contained" onClick={() => hide.toggle()}>
          Toogle Menu
        </Button> */}
        <Button variant="contained" onClick={handleMenuClick}>
          {withMenu ? "Without Menu" : "With Menu"}
        </Button>
        <Button variant="contained" onClick={handleAppBarClick}>
          {withAppBar ? "Without AppBar" : "With AppBar"}
        </Button>
      </Stack>

      <Box>
        <Layout
          menu={withMenu ? <Menu onHandleClick={handleClick} /> : ""}
          appBar={withAppBar ? <DemoAppBar hideMenuBtn={!withMenu} /> : ""}
          splitPaneProps={{ minSize: 200 }}
        >
          <Typography variant="h1">{content}</Typography>
        </Layout>
      </Box>
    </Paper>
  );
};

export default Demo;

export const getStaticProps = getStaticPropsFactory("layout/index");
