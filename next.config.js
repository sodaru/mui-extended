/* eslint-disable */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE_BUNDLE === "true"
});

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
  publicRuntimeConfig: {
    defaultThemeOptions: defaultThemeOptions,
    demo: {
      title: "MUI Extended UI Components",
      repoUrl: "https://github.com/sodaru/mui-extended"
    }
  },
  basePath: "mui-extended"
});
