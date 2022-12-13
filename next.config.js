/* eslint-disable */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE_BUNDLE === "true"
});
const images = { domains: ["about.gitlab.com"] };
if (process.env.NEXT_PUBLIC_DISABLE_MUIEXT_IMAGE_OPTIMIZATION === "true") {
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
      defaultProps: { size: "small", margin: "normal" }
    },
    MuiSwitch: {
      defaultProps: { size: "small" }
    },
    MuiRadio: {
      defaultProps: { size: "small" }
    },
    MuiCheckbox: {
      defaultProps: { size: "small" }
    },
    MuiButton: {
      defaultProps: { size: "small" }
    },
    MuiIconButton: {
      defaultProps: { size: "small" }
    },
    MuiSvgIcon: {
      defaultProps: { fontSize: "small" }
    }
  }
};

module.exports = withBundleAnalyzer({
  images: images,
  publicRuntimeConfig: {
    defaultThemeOptions: defaultThemeOptions,
    demo: {
      title: "Sodaru UI Components",
      repoUrl: "https://gitlab.com/sodaru/solib/ui-components"
    }
  }
});
