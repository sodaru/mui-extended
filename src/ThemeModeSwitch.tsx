import {
  useMediaQuery,
  ButtonGroup,
  Button,
  ButtonGroupProps
} from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { useThemeOptions } from "./ThemeOptionsContext";
import { useStateWithLocalStorage } from "./utils/WebStorage";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import InvertColorsIcon from "@mui/icons-material/InvertColors";

const resolveThemeMode = (
  themeMode: "system" | "dark" | "light",
  systemPrefersDarkMode: boolean
): "light" | "dark" => {
  if (themeMode == "system") {
    return systemPrefersDarkMode ? "dark" : "light";
  } else if (themeMode == "dark") {
    return "dark";
  } else {
    return "light";
  }
};

export const ThemeModeSwitch: FunctionComponent<ButtonGroupProps> = props => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [themeMode, setThemeMode] = useStateWithLocalStorage<
    "system" | "dark" | "light"
  >("theme-mode", "system");

  const { setThemeOptions } = useThemeOptions();

  useEffect(() => {
    setThemeOptions({
      palette: {
        mode: resolveThemeMode(themeMode, prefersDarkMode)
      }
    });
  }, [themeMode, prefersDarkMode, setThemeOptions]);

  return (
    <ButtonGroup
      {...props}
      variant="outlined"
      aria-label="theme-chooser"
      color={
        resolveThemeMode(themeMode, prefersDarkMode) == "light"
          ? "primary"
          : "secondary"
      }
    >
      <Button
        onClick={() => {
          setThemeMode("system");
        }}
        startIcon={<InvertColorsIcon />}
        disabled={themeMode == "system"}
      >
        System
      </Button>
      <Button
        onClick={() => {
          setThemeMode("dark");
        }}
        startIcon={<DarkModeIcon />}
        disabled={themeMode == "dark"}
      >
        Dark
      </Button>
      <Button
        onClick={() => {
          setThemeMode("light");
        }}
        startIcon={<LightModeIcon />}
        disabled={themeMode == "light"}
      >
        Light
      </Button>
    </ButtonGroup>
  );
};
