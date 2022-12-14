# Theme Options

---

MUI's default [`ThemeProvider`](https://mui.com/material-ui/customization/theming/#theme-provider) always expects complete `theme` object to override at any child level.

### With `ThemeOptionsProvider`

- set the only required `ThemeOptions` at each level in Component Tree
- change the themeOptions at runtime using the hook `useThemeOptions().setThemeOptions()`

Also Implements [`Responsive Font Sizes`](https://mui.com/material-ui/customization/typography/#responsive-font-sizes)

> ### At each level of `ThemeOptionsProvider`
>
> a new `theme` is created by deep merging ThemeOptions from 1. parentContext, 2. prop, 3. state

## Usage

- `ThemeOptionsProvider`

  ```typescript
  import { ThemeOptionsProvider } from "mui-extended";

  // wrap all child components
  const component = (
    <ThemeOptionsProvider themeOptions={themeOptions}>
      {children}
    </ThemeOptionsProvider>
  );
  ```

  #### Props :

  - **themeOptions**_(Optional)_ theme options to be overrided

- `useThemeOptions` to update the theme from inside the child components

  ```typescript
  import { useThemeOptions } from "mui-extended";
  import { ThemeOptions } from "@mui/material";

  // within the child component
  const { setThemeOptions } = useThemeOptions();

  const newThemeOptions: ThemeOptions = {
    palette: { primary: { main: "#0000ff" } }
  };
  setThemeOptions(newThemeOptions); // updates primary main color to "#0000ff"
  ```
