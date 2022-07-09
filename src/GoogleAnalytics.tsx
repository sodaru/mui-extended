import Script from "next/script";
import { useStateWithLocalStorage } from "./utils";

/**
 * Adds Google Analytics to Webpage , if NEXT_PUBLIC_GOOGLE_ANALYTICS_ID is set
 */
export const GoogleAnalytics = (): JSX.Element => {
  // eslint-disable-next-line
  const [cookiePreference, setCookiePreference, checked] =
    useStateWithLocalStorage("cookie-preference", { performance: true });
  if (
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID &&
    checked &&
    cookiePreference.performance
  ) {
    return (
      <>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        />

        <Script strategy="lazyOnload" id="GoogleAnalytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
            page_path: window.location.pathname,
            });
        `}
        </Script>
      </>
    );
  }
  return <></>;
};
