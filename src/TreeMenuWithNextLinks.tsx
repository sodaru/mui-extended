import { forwardRef, FunctionComponent } from "react";
import {
  TreeItem,
  TreeItemContentProps,
  TreeItemProps,
  TreeView,
  TreeViewProps,
  useTreeItem
} from "@mui/lab";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Link from "next/link";
import { Typography } from "@mui/material";
import clsx from "clsx";
import { deepmerge } from "@mui/utils";
import { useRouter } from "next/router";

type TreeLinkType = {
  link: string;
  label?: string;
};

/**
 * #### Usage
 *  - multi level links are separated by '/'
 *  - label in later link overrides the label in previous links
 *
 * #### Example
 * ```typescript
 * const links: TreeMenuWithNextLinksProps = {
 *   links: [
 *     "root",
 *     "docs",
 *     "/docs/getting-started", // leading and ending '/' are ignored
 *     {
 *       link: "docs/install/",
 *       label: "Documentation/Install"
 *     }
 *   ]
 * }
 * ```
 */
export type TreeMenuWithNextLinksProps = {
  links: (string | TreeLinkType)[];
  improveLabels?: boolean;
  TreeViewProps?: TreeViewProps;
  TreeItemProps?: TreeItemProps;
};

type TreeNode = {
  id: string;
  link?: string;
  label: string;
  children: Record<string, TreeNode>;
};

const trimSlashes = (str: string): string => {
  if (str.startsWith("/")) {
    str = str.substring(1);
  }
  if (str.endsWith("/")) {
    str = str.substring(0, str.length - 1);
  }
  return str;
};

const convertLinksToTreeNodes = (
  links: TreeMenuWithNextLinksProps["links"]
): Record<string, TreeNode> => {
  const rootTreeNode: TreeNode = {
    id: "",
    link: "",
    label: "",
    children: {}
  };

  for (const link of links) {
    const _link: TreeLinkType = typeof link == "string" ? { link } : link;
    if (_link.label === undefined) {
      _link.label = _link.link;
    }
    _link.link = trimSlashes(_link.link);
    _link.label = trimSlashes(_link.label);

    const linkSegments = _link.link.split("/");
    const labelSegments = _link.label.split("/");
    if (labelSegments.length < linkSegments.length) {
      labelSegments.unshift(
        ...new Array(linkSegments.length - labelSegments.length).fill(null)
      ); // insert null at start
    } else if (labelSegments.length > linkSegments.length) {
      const noOfExtraLabels = labelSegments.length - linkSegments.length;
      for (let i = 0; i < noOfExtraLabels; i++) {
        labelSegments.shift();
      }
    }

    let currentNode: TreeNode = rootTreeNode;

    for (let i = 0; i < linkSegments.length; i++) {
      const linkSegment = linkSegments[i];
      const labelSegment = labelSegments[i];
      if (!currentNode.children[linkSegment]) {
        currentNode.children[linkSegment] = {
          id: linkSegments.slice(0, i + 1).join("/"),
          label: labelSegment,
          children: {}
        };
      }
      currentNode = currentNode.children[linkSegment];
      if (labelSegment) {
        currentNode.label = labelSegment;
      }
    }
    currentNode.link = _link.link;
  }

  return rootTreeNode.children;
};

/**
 * Prevents event from bubling up from icon component, So clicking on icon only provides expansion and collapse of childtree
 */
const CustomTreeItemContent = forwardRef<
  HTMLDivElement,
  TreeItemContentProps & { link?: string }
>(function CustomTreeItemContent(props, ref) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    link
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    handleExpansion(event);
  };

  const handleSelectionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!expanded) {
      handleExpansion(event);
    }
    handleSelection(event);
  };

  let content = (
    <Typography
      onClick={handleSelectionClick}
      component="div"
      className={classes.label}
    >
      {label}
    </Typography>
  );

  if (link !== undefined) {
    content = (
      <Link href={link} passHref={true}>
        <a style={{ width: "100%" }}>{content}</a>
      </Link>
    );
  }

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled
      })}
      onMouseDown={handleMouseDown}
      ref={ref}
    >
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      {content}
    </div>
  );
});

const improveLabel = (label: string, improve?: boolean) => {
  if (improve) {
    label = label
      .split(/(-|_)/)
      .filter(c => c != "-" && c != "_")
      .map(s => s.charAt(0).toLocaleUpperCase() + s.substring(1))
      .join(" ");
  }
  return label;
};

const getNearestLink = (node: TreeNode): string => {
  while (node && !node.link) {
    node = Object.values(node.children)?.[0];
  }
  return node?.link || "";
};

const renderTreeNode = (
  node: TreeNode,
  improveLabels?: boolean,
  TreeItemProps?: TreeItemProps
) => {
  return (
    <TreeItem
      nodeId={node.id + ""}
      label={improveLabel(node.label, improveLabels)}
      key={node.id}
      ContentComponent={CustomTreeItemContent}
      // @ts-expect-error CustomTreeItemContent expects link
      ContentProps={{ link: getNearestLink(node) }}
      {...TreeItemProps}
    >
      {Object.values(node.children).map(_node =>
        renderTreeNode(_node, improveLabels, TreeItemProps)
      )}
    </TreeItem>
  );
};

export const TreeMenuWithNextLinks: FunctionComponent<
  TreeMenuWithNextLinksProps
> = ({ links, improveLabels, TreeViewProps, TreeItemProps }) => {
  const router = useRouter();

  const topTreeNodes = convertLinksToTreeNodes(links);

  const _treeViewProps = { ...TreeViewProps };
  _treeViewProps.selected = router.asPath.substring(1);

  const treeViewSx = deepmerge(TreeViewProps?.sx || {}, {
    "& .MuiTreeItem-content": {
      padding: 0.5
    },
    "& a, a:hover": {
      textDecoration: "none",
      color: "inherit"
    }
  });
  _treeViewProps.sx = treeViewSx;

  return (
    <TreeView
      aria-label="links"
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      {..._treeViewProps}
    >
      {Object.values(topTreeNodes).map(node =>
        renderTreeNode(node, improveLabels, TreeItemProps)
      )}
    </TreeView>
  );
};
