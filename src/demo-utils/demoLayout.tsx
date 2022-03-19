import { Typography } from "@mui/material";
import getConfig from "next/config";
import { FunctionComponent, ReactNode } from "react";
import { SodaruPageComponentType } from "..";
import { HideMenuProvider, Layout, SodaruAppBar } from "../layout";
import {
  TreeMenuWithNextLinks,
  TreeMenuWithNextLinksProps
} from "../TreeMenuWithNextLinks";

export const convertDemoPagesToTreeMenuProps = (
  pages: string[]
): TreeMenuWithNextLinksProps => {
  const props: TreeMenuWithNextLinksProps = {
    links: pages.map(page => {
      let link: TreeMenuWithNextLinksProps["links"][number] = page;
      if (link == "index") {
        link = { link: "/", label: "home" };
      } else if (link.endsWith("/index")) {
        link = link.substring(0, link.lastIndexOf("/index"));
      }
      return link;
    }),
    basePath: getConfig().basePath,
    improveLabels: true
  };

  props.links.sort((a, b) => {
    const key1 = typeof a == "string" ? a : a.link;
    const key2 = typeof b == "string" ? b : b.link;

    if (key1 === "/") {
      return -1;
    }
    if (key2 === "/") {
      return 1;
    }
    return key1.localeCompare(key2);
  });

  return props;
};

const demoLayouts: FunctionComponent[] = [];

export const getDemoLayout = (
  title: ReactNode,
  noMenu = false,
  noAppBar = false
) => {
  const index = (noMenu ? 2 : 0) + (noAppBar ? 1 : 0);
  if (!demoLayouts[index]) {
    const DemoLayout: FunctionComponent<{ pages?: string[] }> = ({
      children,
      pages
    }) => {
      const menu = noMenu ? undefined : (
        <TreeMenuWithNextLinks {...convertDemoPagesToTreeMenuProps(pages)} />
      );
      const appBar = noAppBar ? undefined : (
        <SodaruAppBar hideMenuBtn={noMenu}>{title}</SodaruAppBar>
      );
      return (
        <HideMenuProvider>
          <Layout menu={menu} appBar={appBar}>
            {children}
          </Layout>
        </HideMenuProvider>
      );
    };
    demoLayouts[index] = DemoLayout;
  }
  return demoLayouts[index];
};

type DemoPageProps = {
  docs: Record<string, string>;
  pages: string[];
};

export const demoPage = (
  demo: FunctionComponent<Partial<DemoPageProps>>,
  title: ReactNode = (
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      Sodaru UI Components
    </Typography>
  ),
  noMenu = false,
  noAppBar = false,
  noLayout = false
): SodaruPageComponentType<DemoPageProps> => {
  const pageComponent = demo as SodaruPageComponentType<DemoPageProps>;

  if (!noLayout) {
    pageComponent.layout = getDemoLayout(title, noMenu, noAppBar);
    pageComponent.propsDistribution = { page: ["docs"], layout: ["pages"] };
  }

  return pageComponent;
};
