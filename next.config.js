/* eslint-disable */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false
});
const images = {};
if (process.env.NEXT_PUBLIC_DISABLE_SODARU_IMAGE_OPTIMIZATION === "true") {
  images.loader = "custom";
}
module.exports = withBundleAnalyzer({
  images: images
});
