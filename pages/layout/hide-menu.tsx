/* eslint-disable no-console */
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DemoAppBar } from "../../demoUtils/demoAppBar";
import { getStaticPropsFactory } from "../../demoUtils/staticProps";
import { HideMenuProvider, Layout, useHideMenu } from "../../src";

const Menu = () => {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton>
        <ListItemText primary="Page 1" />
      </ListItemButton>
    </List>
  );
};

const HideMenuDemoComponent = () => {
  return (
    <HideMenuProvider>
      <HideMenu />
    </HideMenuProvider>
  );
};

const HideMenu = () => {
  const hide = useHideMenu();

  return (
    <Paper component={Stack} direction="column" justifyContent="center">
      <Stack direction="row" spacing={2} margin="15px 100px">
        <Button variant="contained" onClick={() => hide.toggle()}>
          Toogle Menu
        </Button>
      </Stack>

      <Box>
        <Layout
          menu={<Menu />}
          appBar={<DemoAppBar />}
          splitPaneProps={{ minSize: 200 }}
        >
          <Typography variant="h1">Page 1</Typography>
        </Layout>
      </Box>
    </Paper>
  );
};

export default HideMenuDemoComponent;

export const getStaticProps = getStaticPropsFactory("layout/hide-menu");
