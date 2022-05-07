import { Box, CssBaseline } from "@mui/material";
import { AppProps } from "next/app";
import Head from "next/head";
import { FunctionComponent } from "react";
import { ThemeOptionsProvider } from "./ThemeOptionsContext";
import { NextComponentType, NextConfig, NextPageContext } from "next";
import getConfig from "next/config";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// eslint-disable-next-line @typescript-eslint/ban-types
type EmptyObject = {};

export type SodaruPageComponentType<
  P = EmptyObject,
  LP = EmptyObject,
  IP = EmptyObject
> = NextComponentType<NextPageContext, IP, P> & {
  layout?: FunctionComponent<LP>;
  layoutProps?: (keyof LP)[];
  pageProps?: (keyof P)[];
};

const nextConfig: NextConfig = getConfig();

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
export const SodaruApp: FunctionComponent<
  AppProps & { Component: SodaruPageComponentType }
> = ({ Component, pageProps }) => {
  const Layout = Component.layout || Box;

  const layoutPropNames = Component.layoutProps || Object.keys(pageProps);
  const pagePropNames = Component.pageProps || Object.keys(pageProps);

  const layoutProps = Object.fromEntries(
    layoutPropNames.map(propName => [propName, pageProps[propName]])
  );

  const componentProps = Object.fromEntries(
    pagePropNames.map(propName => [propName, pageProps[propName]])
  );

  const defaultThemeOptions =
    nextConfig?.publicRuntimeConfig?.defaultThemeOptions || {};

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline enableColorScheme />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeOptionsProvider themeOptions={defaultThemeOptions}>
          <Layout {...layoutProps}>
            <Component {...componentProps} />
          </Layout>
        </ThemeOptionsProvider>
      </LocalizationProvider>
    </>
  );
};
