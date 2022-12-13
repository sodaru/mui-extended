import { CssBaseline } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { NextConfig } from "next";
import getConfig from "next/config";
import Head from "next/head";
import { GoogleAnalytics, MarkdownPreview, ThemeOptionsProvider } from "../src";
import { DemoLayout } from "../demoUtils/demoLayout";

const MyApp = ({ Component, pageProps }) => {
  return WithLayoutParse({ Component, pageProps });
};

const WithLayoutParse = ({ Component, pageProps }) => {
  const nextConfig: NextConfig = getConfig();
  const pageName = Object.keys(pageProps.docs)[0];

  pageProps.docs[pageName];
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
          <DemoLayout pages={pageProps.pages}>
            <div>
              <div>
                <MarkdownPreview>{pageProps.docs[pageName]}</MarkdownPreview>
              </div>
              <div>
                <h2>Demo</h2>
                <div>{Component && <Component {...pageProps} />}</div>
              </div>
            </div>
          </DemoLayout>
        </ThemeOptionsProvider>
      </LocalizationProvider>
    </>
  );
};

export default MyApp;
