import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import { createContext, FunctionComponent, useMemo, useState } from "react";
import { deepmerge } from "@mui/utils";

export type SodaruThemeContextType = (theme: ThemeOptions) => void;

export const SodaruThemeContext = createContext<SodaruThemeContextType>(() => {
  // don't do anything
});

export const SodaruTheme: FunctionComponent = ({ children }) => {
  const [themeOptions, setThemeOptions] = useState<ThemeOptions>({});

  const theme = useMemo(() => {
    return createTheme(
      deepmerge(
        {
          palette: { primary: { main: "#004b89" } },
          textfield: { variant: "outlined", size: "small" }
        },
        themeOptions
      )
    );
  }, [themeOptions]);
  const setTheme = useMemo(
    () => (themeOptions: ThemeOptions) => {
      setThemeOptions(themeOptions);
    },
    []
  );

  return (
    <SodaruThemeContext.Provider value={setTheme}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SodaruThemeContext.Provider>
  );
};
