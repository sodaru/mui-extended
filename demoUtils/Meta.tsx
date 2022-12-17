import { FunctionComponent } from "react";
import Head from "next/head";
import { DocMeta } from "./staticProps";
import { useRouter } from "next/router";

export const Meta: FunctionComponent<{ meta?: DocMeta }> = ({ meta }) => {
  const router = useRouter();
  if (!meta) {
    return <></>;
  }
  const {
    title,
    meta: { description, ...metaTags }
  } = meta;

  const domain = process.env.NEXT_PUBLIC_HOST_DOMAIN;
  const url = `https://${domain}${router.asPath}`;
  const featuredImageUrl = `https://${domain}/featured-image.jpg`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={url} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={featuredImageUrl} />

      <meta property="twitter:domain" content={domain} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:src" content={featuredImageUrl} />

      {Object.keys(metaTags || {}).map((name, i) => (
        <meta key={i} name={name} content={metaTags[name]} />
      ))}
      {meta?.structuredData ? (
        <script type="application/ld+json">
          {JSON.stringify(meta.structuredData)}
        </script>
      ) : null}
    </Head>
  );
};
