/* eslint-disable */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE_BUNDLE === "true"
});
const images = { domains: ["about.gitlab.com"] };
if (process.env.NEXT_PUBLIC_DISABLE_SODARU_IMAGE_OPTIMIZATION === "true") {
  images.loader = "custom";
}

/**
 * @type import("@mui/material").ThemeOptions;
 */
const defaultThemeOptions = {
  palette: {
    primary: { main: "#004b89" },
    secondary: { main: "#ffb476" }
  },
  components: {
    MuiFormControl: {
      defaultProps: { variant: "outlined", size: "small", margin: "normal" }
    },
    MuiSwitch: {
      defaultProps: { size: "small" }
    },
    MuiRadio: {
      defaultProps: { size: "small" }
    },
    MuiCheckbox: {
      defaultProps: { size: "small" }
    }
  }
};

module.exports = withBundleAnalyzer({
  images: images,
  publicRuntimeConfig: {
    defaultThemeOptions: defaultThemeOptions
  }
});
