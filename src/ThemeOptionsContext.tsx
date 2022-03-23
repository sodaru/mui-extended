import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState
} from "react";
import { deepmerge } from "@mui/utils";

export type ThemeOptionsContextType = (theme: ThemeOptions) => void;

const ThemeOptionsContext = createContext<ThemeOptionsContextType>(() => {
  // don't do anything
});

export const useThemeOptions = () => {
  return useContext(ThemeOptionsContext);
};

export type ThemeOptionsProviderProps = {
  defaultThemeOptions?: ThemeOptions;
};

export const ThemeOptionsProvider: FunctionComponent<
  ThemeOptionsProviderProps
> = ({ children, defaultThemeOptions }) => {
  const [themeOptions, setThemeOptions] = useState<ThemeOptions>({});

  const theme = useMemo(() => {
    return createTheme(deepmerge(defaultThemeOptions || {}, themeOptions));
  }, [themeOptions, defaultThemeOptions]);

  const setTheme = useMemo(
    () => (themeOptions: ThemeOptions) => {
      setThemeOptions(themeOptions);
    },
    []
  );

  return (
    <ThemeOptionsContext.Provider value={setTheme}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeOptionsContext.Provider>
  );
};
