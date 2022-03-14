import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import {
  SodaruAppBar,
  Layout,
  SimpleMenuWithNextLinks,
  SodaruPageComponentType,
  HideMenuProvider
} from "../src";

const Menu: FunctionComponent<{ route: string }> = ({ route }) => (
  <SimpleMenuWithNextLinks
    pages={[
      { link: "/", label: "Home", menuItemProps: { selected: route === "/" } },
      "layout-without-menu",
      {
        link: "sodaru-theme",
        label: "Sodaru Theme",
        menuItemProps: { selected: route === "/sodaru-theme" }
      },
      {
        link: "sodaru-logo",
        label: "Sodaru Logo",
        menuItemProps: { selected: route === "/sodaru-logo" }
      },
      {
        link: "hash-router",
        label: "Hash Router",
        menuItemProps: { selected: route === "/hash-router" }
      }
    ]}
  />
);

const composedLayouts: FunctionComponent[] = [];

export const getComposedLayout = (noMenu = false, noAppBar = false) => {
  const index = (noMenu ? 2 : 0) + (noAppBar ? 1 : 0);
  if (!composedLayouts[index]) {
    const CLayout: FunctionComponent = ({ children }) => {
      const router = useRouter();
      const menu = noMenu ? undefined : <Menu route={router.route} />;
      const appBar = noAppBar ? undefined : <SodaruAppBar />;
      return (
        <HideMenuProvider>
          <Layout menu={menu} appBar={appBar}>
            {children}
          </Layout>
        </HideMenuProvider>
      );
    };
    composedLayouts[index] = CLayout;
  }
  return composedLayouts[index];
};

const Index: SodaruPageComponentType = () => {
  const router = useRouter();
  return (
    <Box>
      <Typography variant="h3">Welcome</Typography>
      <Typography variant="h4">
        This is a showcase of Common UI Components
      </Typography>
      <Typography variant="body1">This page does not have a Layout</Typography>
      <Typography variant="body2">
        All Demo Pages include a Layout with Menu
      </Typography>
      <Box width={200}>{<Menu route={router.route} />}</Box>
    </Box>
  );
};

export default Index;
