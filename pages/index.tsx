import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { Layout } from "../src/Layout";
import { SimpleMenuWithNextLinks } from "../src/SimpleMenuWithNextLinks";
import { SodaruPageComponentType } from "../src/SodaruApp";

const Menu: FunctionComponent<{ route: string }> = ({ route }) => (
  <SimpleMenuWithNextLinks
    pages={[
      { link: "/", label: "Home", menuItemProps: { selected: route === "/" } },
      {
        link: "sodaru-theme",
        label: "Sodaru Theme",
        menuItemProps: { selected: route === "/sodaru-theme" }
      },
      {
        link: "sodaru-logo",
        label: "Sodaru Logo",
        menuItemProps: { selected: route === "/sodaru-logo" }
      }
    ]}
  />
);

export const ComposedLayout: FunctionComponent = ({ children }) => {
  const router = useRouter();
  return <Layout menu={<Menu route={router.route} />}>{children}</Layout>;
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
