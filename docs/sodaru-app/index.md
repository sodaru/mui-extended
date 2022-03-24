# Sodaru App

---

NextJs [`Custom App`](https://nextjs.org/docs/advanced-features/custom-app) for Sodaru Applications

## Usage

```typescript
// pages/_app.tsx
export { SodaruApp as default } from "../src/SodaruApp";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
```

## Features

- `Roboto` or any Font must be included by the consumer of `SodaruApp` in their `_app.tsx` page
  - Reason: https://nextjs.org/docs/messages/css-npm
- Configures [Responsive Meta Tag](https://mui.com/getting-started/usage/#responsive-meta-tag)
- Adds [CSSBaseline](https://mui.com/getting-started/usage/#cssbaseline)
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
            MuiTextField: {
              defaultProps: { size: "small" }
            }
          }
        }
      }
    };
    ```
- Improved [`Page Component`](../sodaru-app/page-component)
