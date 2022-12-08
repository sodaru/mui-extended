import { Box, Tooltip, Typography } from "@mui/material";
import { NextConfig } from "next";
import getConfig from "next/config";
import { FunctionComponent, PropsWithChildren } from "react";
import {
  AppBarWithMenu,
  HideMenuProvider,
  Layout,
  ThemeModeSwitch,
  useStateWithSessionStorage
} from "../src";
import {
  TreeMenuWithNextLinks,
  TreeMenuWithNextLinksProps
} from "../src/TreeMenuWithNextLinks";

type CustomLayoutProps = PropsWithChildren<{
  pages: [];
}>;

const nextConfig: NextConfig = getConfig();

export const TreeMenuWithNextLinksSessionPersisted: FunctionComponent<
  TreeMenuWithNextLinksProps
> = props => {
  const [expanded, setExpanded] = useStateWithSessionStorage<string[]>(
    "layoutMenuExpanded",
    []
  );

  const onNodeToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  return (
    <TreeMenuWithNextLinks
      {...props}
      TreeViewProps={{
        expanded,
        onNodeToggle
      }}
    />
  );
};

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
    basePath: nextConfig.basePath,
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

export const getAppBar = ({ hideMenuBtn }: { hideMenuBtn: boolean }) => {
  return (
    <AppBarWithMenu hideMenuBtn={hideMenuBtn}>
      <Box flexGrow={1}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {nextConfig.publicRuntimeConfig?.demo?.title || ""}
        </Typography>
      </Box>

      <Tooltip title="Source" arrow>
        <a
          href={nextConfig.publicRuntimeConfig?.demo?.repoUrl || ""}
          target="_blank"
          rel="noreferrer"
        >
          {/* <SodaruImage
          src="https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png"
          alt="Git Repo"
          width={54}
          height={54}
        /> */}
        </a>
      </Tooltip>
    </AppBarWithMenu>
  );
};

export const getMenu = ({ pages }: { pages?: string[] }) => {
  return (
    <span>
      <Box p={1}></Box>
      <TreeMenuWithNextLinksSessionPersisted
        {...convertDemoPagesToTreeMenuProps(pages)}
      />
      <Box display="flex" p={1} justifyContent="center" alignItems="center">
        <ThemeModeSwitch orientation="vertical" />
      </Box>
    </span>
  );
};

export const AppLayout = (props: CustomLayoutProps) => {
  return (
    <HideMenuProvider>
      <Layout
        menu={getMenu({ pages: props.pages })}
        appBar={getAppBar({ hideMenuBtn: false })}
        splitPaneProps={{ minSize: 250 }}
      >
        {props.children}
      </Layout>
    </HideMenuProvider>
  );
};
