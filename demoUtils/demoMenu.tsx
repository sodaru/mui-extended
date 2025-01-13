import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { ThemeModeSwitch } from "../src";
import {
  TreeMenuWithNextLinks,
  TreeMenuWithNextLinksProps
} from "../src/TreeMenuWithLinks";
import { useStateWithSessionStorage } from "../src/utils";

export const TreeMenuWithNextLinksSessionPersisted: FunctionComponent<
  TreeMenuWithNextLinksProps
> = props => {
  const [expanded, setExpanded] = useStateWithSessionStorage<
    Record<string, boolean>
  >("layoutMenuExpanded", {});

  return (
    <TreeMenuWithNextLinks
      {...props}
      RichTreeViewProps={{
        expandedItems: Object.keys(expanded).filter(k => expanded[k]),
        onItemExpansionToggle: (event, itemId: string, isExpanded: boolean) => {
          const newExpanded = { ...expanded };
          newExpanded[itemId] = isExpanded;
          setExpanded(newExpanded);
        }
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

export const DemoMenu = ({ pages }: { pages?: string[] }) => {
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
