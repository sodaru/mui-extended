/* eslint-disable no-console */
import { AppBar, FormGroup, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { memo, MouseEventHandler, useEffect, useState } from "react";
import { getStaticPropsFactory } from "../../demoUtils/staticProps";
import { HideMenuProvider, Layout, useHideMenu } from "../../src";
import { useMobile } from "../../src/utils/useMobile";

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

const SampleAppBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Box flexGrow={1}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AppBar
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const Demo = () => {
  return (
    <HideMenuProvider>
      <LayoutDemo />
    </HideMenuProvider>
  );
};

const LayoutDemo = memo(function LayoutDemo() {
  const [content, setContent] = useState("Page 1");
  const [withAppBar, setWithAppBar] = useState(false);
  const [withMenu, setWithMenu] = useState(false);
  const hideMenu = useHideMenu();

  const isMobile = useMobile();
  useEffect(() => {
    const hide = () => {
      hideMenu.toggle();
    };
    hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick: MouseEventHandler<HTMLDivElement> = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setContent((event.target as HTMLElement).innerText);
    if (isMobile && !hideMenu.hide) {
      hideMenu.toggle();
    }
  };

  const toggleAppBarClick: MouseEventHandler<HTMLButtonElement> = () => {
    setWithAppBar(!withAppBar);
  };

  const toggleMenuClick: MouseEventHandler<HTMLButtonElement> = () => {
    setWithMenu(!withMenu);
    if (!withMenu && hideMenu.hide) {
      hideMenu.toggle();
    }
  };

  return (
    <Paper component={Stack} direction="column" justifyContent="center">
      <Typography variant="caption" display="block" gutterBottom>
        Layout will be displayed as overlay in mobiles and it closes on click of
        any item. To open again uncheck and check With Menu.
      </Typography>
      <Stack direction="row" spacing={2}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onClick={toggleMenuClick} />}
            label="With Menu"
          ></FormControlLabel>
          <FormControlLabel
            control={<Checkbox onClick={toggleAppBarClick} />}
            label="With AppBar"
          ></FormControlLabel>
        </FormGroup>
      </Stack>

      <Box>
        <Layout
          menu={withMenu ? <Menu onHandleClick={handleClick} /> : ""}
          appBar={withAppBar ? <SampleAppBar /> : ""}
          splitPaneProps={{ minSize: 200 }}
        >
          <Typography variant="h1">{content}</Typography>
        </Layout>
      </Box>
    </Paper>
  );
});

export default Demo;

export const getStaticProps = getStaticPropsFactory("layout/index");
