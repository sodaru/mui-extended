import { CssBaseline } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { NextConfig } from "next";
import getConfig from "next/config";
import Head from "next/head";
import { GoogleAnalytics, ThemeOptionsProvider } from "../src";
import { CustomLayout } from "../utils/customLayout";

const myApp = ({ Component, pageProps }) => {
  return WithLayoutParse({ Component, pageProps });
};

const WithLayoutParse = ({ Component, pageProps }) => {
  const nextConfig: NextConfig = getConfig();

  const defaultThemeOptions =
    nextConfig?.publicRuntimeConfig?.defaultThemeOptions || {};

  return (
    <>
      <GoogleAnalytics />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline enableColorScheme />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeOptionsProvider themeOptions={defaultThemeOptions}>
          <CustomLayout
            layout={Component.layout}
            layoutProps={Component.layoutProps}
          >
            <Component {...pageProps} />
          </CustomLayout>
        </ThemeOptionsProvider>
      </LocalizationProvider>
    </>
  );
};

export default myApp;
