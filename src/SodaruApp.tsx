import { Box, CssBaseline } from "@mui/material";
import { AppProps } from "next/app";
import Head from "next/head";
import { FunctionComponent } from "react";
import { SodaruTheme } from "./SodaruTheme";
import { NextComponentType, NextPageContext } from "next";

// eslint-disable-next-line @typescript-eslint/ban-types
export type SodaruPageComponentType<P = {}, IP = {}> = NextComponentType<
  NextPageContext,
  IP,
  P
> & {
  layout?: FunctionComponent;
};

/**
 * export this as default component from _app.ts
 *
 * optionally import roboto font in _app.ts
 * ```
 * import "@fontsource/roboto/300.css";
 * import "@fontsource/roboto/400.css";
 * import "@fontsource/roboto/500.css";
 * import "@fontsource/roboto/700.css";
 * ```
 *
 * page components in SodaruApp may contain a layout property to have same layout between pages. type `SodaruPageComponentType` comes handy
 *
 */
export const SodaruApp: FunctionComponent<AppProps> = ({
  Component,
  pageProps
}) => {
  const Layout = (Component as SodaruPageComponentType).layout || Box;
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline enableColorScheme />
      <SodaruTheme>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SodaruTheme>
    </>
  );
};
