import { Box, SwipeableDrawerProps, Tooltip, Typography } from "@mui/material";
import { NextConfig } from "next";
import getConfig from "next/config";
import { ComponentType, PropsWithChildren, ReactNode } from "react";
import {
  AppBarWithMenu,
  HideMenuProvider,
  Layout as muiExtLayout,
  SplitPaneProps,
  ThemeModeSwitch
} from "../src";
import {
  convertDemoPagesToTreeMenuProps,
  TreeMenuWithNextLinksSessionPersisted
} from "../src/demo-utils/demoLayout";

type PageLayoutProps = {
  appBar?: ReactNode | false;
  menu?: ReactNode | false;
  splitPaneProps?: Omit<SplitPaneProps, "children"> | false;
  swipeableDrawerProps?: SwipeableDrawerProps | false;
};

type CustomLayout = PropsWithChildren<{
  layout?: false | ComponentType;
  layoutProps: PageLayoutProps;
}>;

export const getAppBar = ({ hideMenuBtn }: { hideMenuBtn: boolean }) => {
  const nextConfig: NextConfig = getConfig();

  <AppBarWithMenu hideMenuBtn={hideMenuBtn}>
    <Box flexGrow={1}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {nextConfig.publicRuntimeConfig?.demo?.title || ""}
      </Typography>
    </Box>

    <Tooltip title="Source" arrow>
      <a
        href={nextConfig.publicRuntimeConfig?.demo?.repoUrl || ""}
        target="_blank"
        rel="noreferrer"
      >
        {/* <SodaruImage
          src="https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png"
          alt="Git Repo"
          width={54}
          height={54}
        /> */}
      </a>
    </Tooltip>
  </AppBarWithMenu>;
};

export const getMenu = ({ pages }: { pages?: string[] }) => {
  return (
    <span>
      <Box p={1}></Box>
      <TreeMenuWithNextLinksSessionPersisted
        {...convertDemoPagesToTreeMenuProps(pages)}
      />
      <Box display="flex" p={1} justifyContent="center" alignItems="center">
        <ThemeModeSwitch orientation="vertical" />
      </Box>
    </span>
  );
};

export const customLayout = (props: CustomLayout) => {
  let Layout = null;

  /**
   * TODO: implement pages
   */
  const _pages = [];
  const { appBar, menu, splitPaneProps, swipeableDrawerProps } =
    props.layoutProps as PageLayoutProps;

  if (props.layout === undefined) {
    Layout = muiExtLayout;
  } else if (typeof props.layout == "function") {
    Layout = props.layout;
  }

  const _menu =
    menu === false
      ? undefined
      : menu === undefined
      ? getMenu({ pages: _pages })
      : menu;
  const _appBar =
    appBar === false
      ? undefined
      : menu === undefined
      ? getAppBar({ hideMenuBtn: _menu ? false : true })
      : appBar;

  const _splitPaneProps =
    splitPaneProps === false
      ? undefined
      : splitPaneProps === undefined
      ? { minSize: 250 }
      : splitPaneProps;

  const _swipeableDrawerProps = swipeableDrawerProps
    ? swipeableDrawerProps
    : undefined;

  return (
    <HideMenuProvider>
      <Layout
        menu={_menu}
        appBar={_appBar}
        splitPaneProps={_splitPaneProps}
        swipeableDrawerProps={_swipeableDrawerProps}
      >
        {props.children}
      </Layout>
    </HideMenuProvider>
  );
};
