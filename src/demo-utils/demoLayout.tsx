import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Tooltip,
  Typography
} from "@mui/material";
import getConfig from "next/config";
import {
  createElement,
  FunctionComponent,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useState
} from "react";
import { HideMenuProvider, Layout, SodaruAppBar } from "../layout";
import { MarkdownPreview } from "../markdown/Preview";
import { SodaruPageComponentType } from "../SodaruApp";
import { SodaruImage } from "../SodaruImage";
import { SodaruLogo } from "../SodaruLogo";
import {
  TreeMenuWithNextLinks,
  TreeMenuWithNextLinksProps
} from "../TreeMenuWithNextLinks";
import { useStateWithSessionStorage } from "../utils";

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

const demoLayouts: Record<string, FunctionComponent> = {};

const getDemoLayout = (noMenu = false, noAppBar = false, title: ReactNode) => {
  const index = (noMenu ? 2 : 0) + (noAppBar ? 1 : 0) + "" + title;
  if (!demoLayouts[index]) {
    const DemoLayout: FunctionComponent<
      PropsWithChildren<{ pages?: string[] }>
    > = ({ children, pages }) => {
      const menu = noMenu ? undefined : (
        <span>
          <Box p={1}>
            <Typography variant="subtitle2" sx={{ display: "flex" }}>
              <SodaruLogo width={32} height={32} />
              <Box p={0.5}>@solib/ui-components</Box>
            </Typography>
          </Box>
          <Divider />
          <TreeMenuWithNextLinksSessionPersisted
            {...convertDemoPagesToTreeMenuProps(pages)}
          />
        </span>
      );
      const appBar = noAppBar ? undefined : (
        <SodaruAppBar hideMenuBtn={noMenu}>
          <Box flexGrow={1}>{title}</Box>
          <Tooltip title="Source" arrow>
            <a
              href="https://gitlab.com/sodaru/solib/ui-components"
              target="_blank"
              rel="noreferrer"
            >
              <SodaruImage
                src="https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png"
                alt="Git Repo"
                width={54}
                height={54}
              />
            </a>
          </Tooltip>
        </SodaruAppBar>
      );
      return (
        <HideMenuProvider>
          <Layout menu={menu} appBar={appBar} splitPaneProps={{ minSize: 250 }}>
            {children}
          </Layout>
        </HideMenuProvider>
      );
    };
    demoLayouts[index] = DemoLayout;
  }
  return demoLayouts[index];
};

export type DemoPageProps = {
  docs: Record<string, string>;
  pages: string[];
};

export const demoPage = (
  demo: FunctionComponent<DemoPageProps> | ReactNode | undefined,
  ref: string,
  noMenu = false,
  noAppBar = false,
  noLayout = false,
  title: ReactNode = (
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      Sodaru UI Components
    </Typography>
  )
): SodaruPageComponentType<DemoPageProps> => {
  const PageComponent: SodaruPageComponentType<DemoPageProps> = props => {
    const _demo = demo
      ? isValidElement(demo)
        ? demo
        : createElement(demo as FunctionComponent<DemoPageProps>, props)
      : undefined;

    const [referenceExpanded, setReferenceExpanded] = useState(!_demo);
    const [demoExpanded, setDemoExpanded] = useState(!!_demo);

    return (
      <>
        <Accordion
          expanded={referenceExpanded}
          onChange={() => {
            setReferenceExpanded(!referenceExpanded);
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Reference
          </AccordionSummary>
          <AccordionDetails>
            <MarkdownPreview>{props.docs[ref]}</MarkdownPreview>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={demoExpanded}
          onChange={() => {
            setDemoExpanded(!demoExpanded);
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Demo
          </AccordionSummary>
          <AccordionDetails>{_demo}</AccordionDetails>
        </Accordion>
      </>
    );
  };

  if (!noLayout) {
    PageComponent.layout = getDemoLayout(noMenu, noAppBar, title);
    PageComponent.propsDistribution = {
      page: ["docs", "pages"],
      layout: ["pages"]
    };
  }

  return PageComponent;
};
