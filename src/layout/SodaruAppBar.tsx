import { AppBar, IconButton, Toolbar, AppBarProps } from "@mui/material";
import { FunctionComponent } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useHideMenu } from "./HideMenu";

export const SodaruAppBar: FunctionComponent<AppBarProps> = ({
  children,
  ...props
}) => {
  const hideMenu = useHideMenu();
  return (
    <AppBar {...props}>
      <Toolbar>
        <IconButton
          onClick={() => hideMenu.toggle()}
          size="large"
          color="inherit"
          aria-label="menu"
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        {children}
      </Toolbar>
    </AppBar>
  );
};
