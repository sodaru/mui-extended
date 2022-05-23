# Sodaru App

---

NextJs [`Custom App`](https://nextjs.org/docs/advanced-features/custom-app) for Sodaru Applications

## Usage

```typescript
// pages/_app.tsx
export { SodaruApp as default } from "@solib/ui-components";
```

## Features

- Embedded support for [Google Analytics](./google-analytics)
- Configures [Responsive Meta Tag](https://mui.com/getting-started/usage/#responsive-meta-tag)
- Adds [CSSBaseline](https://mui.com/getting-started/usage/#cssbaseline)
- Adds [DateFns Adaptor](https://mui.com/components/pickers/#setup) for Date/Time Pickers
- Wraps the Page Component with [`ThemeOptionsProvider`](./theme-options)
  - defaultThemeOptions are read from nextJs [publicRuntimeConfig](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration)  
     `next.config.js` in this demo is
    ```js
    module.exports = {
      publicRuntimeConfig: {
        defaultThemeOptions: {
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
        }
      }
    };
    ```
- Improved [`Page Component`](../sodaru-app/page-component)
