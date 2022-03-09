import { Box, CssBaseline } from "@mui/material";
import { AppProps } from "next/app";
import Head from "next/head";
import { FunctionComponent } from "react";
import { SodaruTheme } from "./SodaruTheme";
import { NextComponentType } from "next";

export type SodaruPageComponentType = NextComponentType & {
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
 */
export const SodaruApp: FunctionComponent<AppProps> = ({
  Component,
  pageProps
}) => {
  //@ts-expect-error Component may have layout property
  const Layout = (Component.layout as FunctionComponent) || Box;
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
