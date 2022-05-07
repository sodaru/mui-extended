import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
  responsiveFontSizes
} from "@mui/material";
import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState
} from "react";
import { deepmerge } from "@mui/utils";

export type ThemeOptionsContextType = {
  themeOptions: ThemeOptions;
  setThemeOptions: (themeOptions: ThemeOptions) => void;
};

const ThemeOptionsContext = createContext<ThemeOptionsContextType>({
  themeOptions: {},
  setThemeOptions: () => {
    // don't do anything
  }
});

export const useThemeOptions = () => {
  return useContext(ThemeOptionsContext);
};

export type ThemeOptionsProviderProps = {
  themeOptions?: ThemeOptions;
};

export const ThemeOptionsProvider: FunctionComponent<
  ThemeOptionsProviderProps
> = ({ children, themeOptions: themeOptionsFromProp = {} }) => {
  const [themeOptions, setThemeOptions] = useState<ThemeOptions>({});
  const { themeOptions: themeOptionsFromContext } = useThemeOptions();

  const theme = useMemo(() => {
    return responsiveFontSizes(
      createTheme(
        deepmerge(
          deepmerge(themeOptionsFromContext, themeOptionsFromProp),
          themeOptions
        )
      )
    );
  }, [themeOptionsFromContext, themeOptionsFromProp, themeOptions]);

  return (
    <ThemeOptionsContext.Provider
      value={{
        themeOptions: deepmerge(
          deepmerge(themeOptionsFromContext, themeOptionsFromProp),
          themeOptions
        ),
        setThemeOptions
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeOptionsContext.Provider>
  );
};
