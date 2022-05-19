import Script from "next/script";

/**
 * Adds Google Analytics to Webpage , if NEXT_PUBLIC_GOOGLE_ANALYTICS_ID is set
 */
export const GoogleAnalytics = (): JSX.Element => {
  if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
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
