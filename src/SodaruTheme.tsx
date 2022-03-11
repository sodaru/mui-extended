import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState
} from "react";
import { deepmerge } from "@mui/utils";

type SodaruThemeContextType = (theme: ThemeOptions) => void;

const SodaruThemeContext = createContext<SodaruThemeContextType>(() => {
  // don't do anything
});

export const useSodaruTheme = () => {
  return useContext(SodaruThemeContext);
};

export const SodaruTheme: FunctionComponent = ({ children }) => {
  const [themeOptions, setThemeOptions] = useState<ThemeOptions>({});

  const theme = useMemo(() => {
    return createTheme(
      deepmerge(
        {
          palette: {
            primary: { main: "#004b89" },
            secondary: { main: "#ffb476" }
          },
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
