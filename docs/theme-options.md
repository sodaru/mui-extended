# Theme Options

---

Uses React context to update the global [MUI theme](https://mui.com/customization/theming/)

MUI `theme` created using [`createTheme`](https://mui.com/customization/theming/#createtheme-options-args-theme) is passsed as prop to [`ThemeProvider`](https://mui.com/customization/theming/#theme-provider)

Also Implements [`Responsive Font Sizes`](https://mui.com/material-ui/customization/typography/#responsive-font-sizes)

`ThemeOptions` provides a way to update the outer theme deep inside a child component using context

## Usage

- `ThemeOptionsProvider` must be used to wrap all child components

  ```typescript
  import { ThemeOptionsProvider } from "@solib/ui-components";

  // wrap all child components
  const rootComponent = (
    <ThemeOptionsProvider defaultThemeOptions={themeOptions}>
      {children}
    </ThemeOptionsProvider>
  );
  ```

  #### Props :

  - **defaultThemeOptions**_(Optional)_ theme options to be overrided

- `useThemeOptions` to update the theme from inside the child components

  ```typescript
  import { useThemeOptions } from "@solib/ui-components";
  import { ThemeOptions } from "@mui/material";

  // within the child component
  const setTheme = useThemeOptions();

  const newTheme: ThemeOptions = { palette: { primary: { main: "#0000ff" } } };
  setTheme(newTheme); // updates primary main color to "#0000ff"
  ```

_[`SodaruApp`](./sodaru-app) wraps All pages of nextJs in `ThemeOptionsProvider`_
