import { Box, Container, CssBaseline, Paper, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { NextConfig } from "next";
import getConfig from "next/config";
import Head from "next/head";
import { GoogleAnalytics, MarkdownPreview, ThemeOptionsProvider } from "../src";
import { DemoLayout } from "../demoUtils/demoLayout";

const MuiExtendedDemoApp = ({ Component, pageProps }) => {
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
          <DemoLayout pages={pageProps.pages || []}>
            <Container maxWidth="lg">
              <MarkdownPreview>{pageProps.doc || ""}</MarkdownPreview>
              {Component.noDemo === undefined ? (
                <Paper variant="outlined">
                  <Box p={2}>
                    <Typography variant="h5">Demo</Typography>
                    <Component {...pageProps} />
                  </Box>
                </Paper>
              ) : null}
            </Container>
          </DemoLayout>
        </ThemeOptionsProvider>
      </LocalizationProvider>
    </>
  );
};

export default MuiExtendedDemoApp;
