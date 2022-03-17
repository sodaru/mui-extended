import { ComponentType, forwardRef, FunctionComponent } from "react";
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
  basePath?: string;
  improveLabels?: boolean;
  TreeViewProps?: TreeViewProps;
  TreeItemProps?: TreeItemProps;
  CustomTreeItem?: ComponentType<TreeItemProps>;
};

type TreeNode = {
  id: number;
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
    id: -1,
    link: "",
    label: "",
    children: {}
  };

  let nodeId = 0;

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
          id: nodeId++,
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
const CustomContent = forwardRef<HTMLDivElement, TreeItemContentProps>(
  function CustomContent(props, ref) {
    const {
      classes,
      className,
      label,
      nodeId,
      icon: iconProp,
      expansionIcon,
      displayIcon
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
      handleSelection(event);
    };

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
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {label}
        </Typography>
      </div>
    );
  }
);

const TreeItemWithSeparateExpansionClick = (props: TreeItemProps) => (
  <TreeItem ContentComponent={CustomContent} {...props} />
);

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

const renderTreeNode = (
  node: TreeNode,
  TreeItemComponent: ComponentType<TreeItemProps>,
  improveLabels?: boolean,
  basePath?: string,
  TreeItemProps?: TreeItemProps
) => {
  let treeItem = (
    <TreeItemComponent
      nodeId={node.id + ""}
      label={improveLabel(node.label, improveLabels)}
      key={node.id}
      {...TreeItemProps}
    >
      {Object.values(node.children).map(_node =>
        renderTreeNode(
          _node,
          TreeItemComponent,
          improveLabels,
          basePath,
          TreeItemProps
        )
      )}
    </TreeItemComponent>
  );

  if (node.link !== undefined) {
    treeItem = (
      <Link
        href={(basePath || "") + "/" + node.link}
        key={node.id}
        passHref={true}
      >
        <a>{treeItem}</a>
      </Link>
    );
  }
  return treeItem;
};

export const TreeMenuWithNextLinks: FunctionComponent<
  TreeMenuWithNextLinksProps
> = ({
  links,
  basePath,
  improveLabels,
  TreeViewProps,
  TreeItemProps,
  CustomTreeItem
}) => {
  const topTreeNodes = convertLinksToTreeNodes(links);

  const TreeItemComponent =
    CustomTreeItem || TreeItemWithSeparateExpansionClick;

  return (
    <TreeView
      aria-label="links"
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      sx={{
        "& .MuiTreeItem-content": {
          padding: 0.5
        },
        "& a, a:hover": {
          textDecoration: "none",
          color: "inherit"
        }
      }}
      {...TreeViewProps}
    >
      {Object.values(topTreeNodes).map(node =>
        renderTreeNode(
          node,
          TreeItemComponent,
          improveLabels,
          basePath,
          TreeItemProps
        )
      )}
    </TreeView>
  );
};
