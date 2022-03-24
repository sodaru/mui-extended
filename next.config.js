/* eslint-disable */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false
});
const images = { domains: ["about.gitlab.com"] };
if (process.env.NEXT_PUBLIC_DISABLE_SODARU_IMAGE_OPTIMIZATION === "true") {
  images.loader = "custom";
}
module.exports = withBundleAnalyzer({
  images: images,
  publicRuntimeConfig: {
    defaultThemeOptions: {
      palette: {
        primary: { main: "#004b89" },
        secondary: { main: "#ffb476" }
      },
      components: {
        MuiTextField: {
          defaultProps: { size: "small" }
        }
      }
    }
  }
});
