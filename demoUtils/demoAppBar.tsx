import {
  AppBar,
  IconButton,
  Toolbar,
  AppBarProps,
  Box,
  Typography,
  Tooltip,
  Link,
  ButtonGroup,
  Button
} from "@mui/material";
import { FunctionComponent } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useHideMenu } from "../src/layout/HideMenu";
import { NextConfig } from "next";
import getConfig from "next/config";
import GitHubIcon from "@mui/icons-material/GitHub";

const nextConfig: NextConfig = getConfig();

export const DemoAppBar: FunctionComponent<
  AppBarProps & { hideMenuBtn?: boolean }
> = ({ hideMenuBtn, ...props }) => {
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
        <Box flexGrow={1}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {nextConfig.publicRuntimeConfig?.demo?.title || ""}
          </Typography>
        </Box>

        <Tooltip title="Source" arrow>
          <Link
            color="inherit"
            href={nextConfig.publicRuntimeConfig?.demo?.repoUrl}
            target="_blank"
            mr={2}
          >
            <ButtonGroup size="small">
              <Button color="inherit" startIcon={<GitHubIcon />}>
                Star
              </Button>
            </ButtonGroup>
          </Link>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
