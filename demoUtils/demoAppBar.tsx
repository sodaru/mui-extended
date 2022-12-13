import { AppBar, IconButton, Toolbar, AppBarProps } from "@mui/material";
import { FunctionComponent } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useHideMenu } from "../src/layout/HideMenu";

export const DemoAppBar: FunctionComponent<
  AppBarProps & { hideMenuBtn?: boolean }
> = ({ children, hideMenuBtn, ...props }) => {
  const hideMenu = useHideMenu();
  const MenuIcn = hideMenu.hide ? MenuIcon : MenuOpenIcon;
  return (
    <AppBar {...props}>
      <Toolbar>
        {hideMenuBtn ? (
          ""
        ) : (
          <IconButton
            onClick={() => hideMenu.toggle()}
            size="large"
            color="inherit"
            aria-label="menu"
            edge="start"
          >
            <MenuIcn />
          </IconButton>
        )}
        {children}
      </Toolbar>
    </AppBar>
  );
};
