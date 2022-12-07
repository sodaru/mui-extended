import { SwipeableDrawerProps } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

import {
  AppBarWithMenu,
  Layout as LayoutComponent,
  LayoutProps,
  SplitPaneProps
} from "../src";

const myApp = ({ Component, pageProps }) => {
  return WithLayoutParse({ Component, pageProps });
};

const WithLayoutParse = ({ Component, pageProps }) => {
  let Layout = null;
  const hideMenuBtn = null;
  const pages = null;
  const { appBar, menu, splitPaneProps, swipeableDrawerProps } =
    Component.layoutProps as PageLayoutProps;
  const layoutProps: LayoutProps = {
    appBar: <AppBarWithMenu />
  };

  return (
    <>
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default myApp;
