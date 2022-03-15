import { FunctionComponent, ReactNode, useEffect } from "react";
import {
  Box,
  Grid,
  SwipeableDrawer,
  Theme,
  Toolbar,
  useMediaQuery
} from "@mui/material";
import { SplitPane } from "../splitPane/SplitPane";
import { useHideMenu } from "./HideMenu";
import { withBackButtonClose } from "../BackClosableModal";

type BaseLayoutProps = {
  menu: ReactNode;
};

const WebLayout: FunctionComponent<BaseLayoutProps> = ({ menu, children }) => {
  const hideMenu = useHideMenu();
  return (
    <SplitPane minSize={180} maxSize={500} hidePrimary={hideMenu.hide || !menu}>
      <Box>{menu}</Box>
      <Box>{children}</Box>
    </SplitPane>
  );
};

const SodaruSwipeableDrawer = withBackButtonClose(SwipeableDrawer);

const MobileLayout: FunctionComponent<BaseLayoutProps> = ({
  menu,
  children
}) => {
  const drawerWidth = "80vw";
  const hideMenu = useHideMenu();
  useEffect(() => {
    if (!hideMenu.hide) {
      hideMenu.toggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {menu ? (
        <SodaruSwipeableDrawer
          anchor="left"
          open={!hideMenu.hide}
          onClose={hideMenu.toggle}
          onOpen={hideMenu.toggle}
          variant="temporary"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box"
            }
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>{menu}</Box>
        </SodaruSwipeableDrawer>
      ) : (
        ""
      )}
      <Box
        sx={{
          overflow: "auto",
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: "100%"
        }}
      >
        {children}
      </Box>
    </>
  );
};

export type LayoutProps = {
  appBar?: ReactNode;
  menu?: ReactNode;
};

export const Layout: FunctionComponent<LayoutProps> = ({
  appBar,
  menu,
  children
}) => {
  const _menu = menu || "";
  const _appBar = appBar || "";
  const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));

  const BaseLayout = isMobile ? MobileLayout : WebLayout;

  return (
    <Grid container flexDirection={"column"} height={"100vh"}>
      <Grid
        item
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          "& .MuiAppBar-root": {
            position: "static"
          }
        }}
      >
        {_appBar}
      </Grid>
      <Grid item flexGrow={1} sx={{ position: "relative" }}>
        <BaseLayout menu={_menu}>{children}</BaseLayout>
      </Grid>
    </Grid>
  );
};
