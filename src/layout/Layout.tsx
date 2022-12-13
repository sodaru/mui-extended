import {
  Box,
  BoxProps,
  Grid,
  Paper,
  PaperProps,
  SwipeableDrawer,
  SwipeableDrawerProps,
  Theme,
  Toolbar
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import {
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  useEffect
} from "react";
import { SplitPane, SplitPaneProps } from "../splitPane/SplitPane";
import { withCloseOnNavigation } from "../utils";
import { useMobile } from "../utils/useMobile";
import { useHideMenu } from "./HideMenu";

type BaseLayoutProps = PropsWithChildren<{
  menu: ReactNode;
}>;

const MenuBox: FunctionComponent<PaperProps> = ({ children, ...props }) => {
  return (
    <Paper
      {...props}
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: (theme: Theme) =>
          theme.palette.mode == "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800]
      }}
      square
      variant="outlined"
    >
      {children}
    </Paper>
  );
};

const ContentBox: FunctionComponent<BoxProps> = ({ children, ...props }) => {
  return (
    <Box p={1} {...props}>
      {children}
    </Box>
  );
};

const WebLayout: FunctionComponent<
  BaseLayoutProps & { splitPaneProps?: Omit<SplitPaneProps, "children"> }
> = ({ menu, splitPaneProps, children }) => {
  const hideMenu = useHideMenu();
  return (
    <SplitPane
      minSize={180}
      maxSize={500}
      hidePrimary={hideMenu.hide || !menu}
      {...splitPaneProps}
    >
      <MenuBox>{menu}</MenuBox>
      <ContentBox>{children}</ContentBox>
    </SplitPane>
  );
};

const MuiExtSwipeableDrawer = withCloseOnNavigation(SwipeableDrawer);

const MobileLayout: FunctionComponent<
  BaseLayoutProps & { swipeableDrawerProps?: SwipeableDrawerProps }
> = ({ menu, swipeableDrawerProps, children }) => {
  const drawerWidth = "80vw";
  const hideMenu = useHideMenu();
  useEffect(() => {
    if (!hideMenu.hide) {
      hideMenu.toggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sx = deepmerge(swipeableDrawerProps?.sx || {}, {
    width: drawerWidth,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      width: drawerWidth,
      boxSizing: "border-box"
    }
  });

  return (
    <>
      {menu ? (
        <MuiExtSwipeableDrawer
          anchor="left"
          open={!hideMenu.hide}
          onClose={hideMenu.toggle}
          onOpen={hideMenu.toggle}
          variant="temporary"
          {...swipeableDrawerProps}
          sx={sx}
        >
          <MenuBox>
            <Toolbar />
            {menu}
          </MenuBox>
        </MuiExtSwipeableDrawer>
      ) : (
        ""
      )}
      <ContentBox
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
      </ContentBox>
    </>
  );
};

export type LayoutProps = PropsWithChildren<{
  appBar?: ReactNode;
  menu?: ReactNode;
  splitPaneProps?: Omit<SplitPaneProps, "children">;
  swipeableDrawerProps?: SwipeableDrawerProps;
}>;

export const Layout: FunctionComponent<LayoutProps> = ({
  appBar,
  menu,
  splitPaneProps,
  swipeableDrawerProps,
  children
}) => {
  const _menu = menu || "";
  const _appBar = appBar || "";
  const isMobile = useMobile();

  const BaseLayout = isMobile ? MobileLayout : WebLayout;
  const baseLayoutProps = isMobile
    ? { swipeableDrawerProps }
    : { splitPaneProps };

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
        <BaseLayout menu={_menu} {...baseLayoutProps}>
          {children}
        </BaseLayout>
      </Grid>
    </Grid>
  );
};
