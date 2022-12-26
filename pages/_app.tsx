import { Box, Container, CssBaseline, Paper, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { NextConfig } from "next";
import getConfig from "next/config";
import Head from "next/head";
import { GoogleAnalytics, MarkdownPreview, ThemeOptionsProvider } from "../src";
import { DemoLayout } from "../demoUtils/demoLayout";
import Footer from "../demoUtils/footer";
import { Meta } from "../demoUtils/Meta";
import { AppProps } from "next/app";
import { StaticProps } from "../demoUtils/staticProps";

const MuiExtendedDemoApp = ({
  Component,
  pageProps
}: AppProps<StaticProps>) => {
  const nextConfig: NextConfig = getConfig();

  const defaultThemeOptions =
    nextConfig?.publicRuntimeConfig?.defaultThemeOptions || {};

  const pages = pageProps.pages || [];
  const meta = pageProps.doc?.meta;
  const docContent = pageProps.doc?.content || "";
  const title = pageProps.doc?.title || "";

  return (
    <>
      <GoogleAnalytics />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Meta meta={meta} />
      <CssBaseline enableColorScheme />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeOptionsProvider themeOptions={defaultThemeOptions}>
          <DemoLayout pages={pages}>
            <Container maxWidth="lg">
              <Box minHeight="90vh">
                <Typography sx={{ marginTop: "16px" }} variant="h4">
                  {title}
                </Typography>
                <hr />
                <MarkdownPreview>{docContent}</MarkdownPreview>
                {Component["noDemo"] === undefined ? (
                  <Paper variant="outlined">
                    <Box p={2}>
                      <Typography variant="h5">Demo</Typography>
                      <Component {...pageProps} />
                    </Box>
                  </Paper>
                ) : null}
              </Box>
              <Footer />
            </Container>
          </DemoLayout>
        </ThemeOptionsProvider>
      </LocalizationProvider>
    </>
  );
};

export default MuiExtendedDemoApp;
