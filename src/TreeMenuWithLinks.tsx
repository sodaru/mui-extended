import {
  RichTreeView,
  RichTreeViewProps,
  TreeItem2,
  TreeItem2Content,
  TreeItem2Props,
  TreeViewBaseItem,
  UseTreeItem2Status,
  useTreeItem2Utils
} from "@mui/x-tree-view";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createRef,
  FC,
  forwardRef,
  FunctionComponent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  RefObject
} from "react";

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
export type TreeMenuWithNextLinksProps<
  R extends Record<string, unknown> = Record<string, unknown>,
  Multiple extends boolean | undefined = false
> = {
  links: (string | TreeLinkType)[];
  improveLabels?: boolean;
  RichTreeViewProps?: Omit<RichTreeViewProps<R, Multiple>, "items">;
};

export type LinkComponentType = {
  href: string;
  children: ReactNode;
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

const withNextLink = (
  id: string,
  iconRef: RefObject<SVGSVGElement>,
  handleExpansion: (event: ReactMouseEvent<Element, MouseEvent>) => void
) => {
  const TreeItemContentWithNextLink: FC<{
    status: UseTreeItem2Status;
    indentationAtItemLevel?: true;
  }> = props => {
    const router = useRouter();

    const ref = createRef<HTMLDivElement>();
    const link = "/" + id.split(".").join("/");

    return (
      <Link href={link} style={{ textDecoration: "none", color: "inherit" }}>
        <TreeItem2Content
          {...props}
          ref={ref}
          onClick={e => {
            let isExpandIcon = false;
            let target = e.target as HTMLElement | SVGSVGElement;
            while (target && target != ref.current) {
              if (target == iconRef.current) {
                isExpandIcon = true;
                break;
              }
              target = target.parentElement;
            }
            e.preventDefault();
            e.stopPropagation();
            if (isExpandIcon) {
              handleExpansion(e);
            } else {
              router.push(link);
            }
          }}
        />
      </Link>
    );
  };
  return TreeItemContentWithNextLink;
};

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

const CustomTreeItem = forwardRef(function CustomTreeItem(
  props: TreeItem2Props,
  ref: React.Ref<HTMLLIElement>
) {
  const { publicAPI, interactions } = useTreeItem2Utils({
    itemId: props.itemId,
    children: props.children
  });

  const item = publicAPI.getItem(props.itemId) as { hasLink?: boolean };

  const iconRef = createRef<SVGSVGElement>();

  return (
    <TreeItem2
      {...props}
      ref={ref}
      slots={{
        content: item.hasLink
          ? withNextLink(
              props.itemId ?? "",
              iconRef,
              interactions.handleExpansion
            )
          : TreeItem2Content
      }}
      slotProps={{
        collapseIcon: { ref: iconRef },
        expandIcon: { ref: iconRef }
      }}
    />
  );
});

export const TreeMenuWithNextLinks: FunctionComponent<
  TreeMenuWithNextLinksProps
> = ({ links, improveLabels, RichTreeViewProps }) => {
  const topItems = convertToRichTreeViewItems(links, improveLabels);

  return (
    <RichTreeView
      {...RichTreeViewProps}
      items={topItems}
      slots={{ item: CustomTreeItem }}
    />
  );
};

const convertToRichTreeViewItems = (
  links: (string | TreeLinkType)[],
  improveLabels?: boolean
) => {
  const itemsMap: Record<string, TreeViewBaseItem & { hasLink?: boolean }> = {};

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
    for (let i = 0; i < linkSegments.length; i++) {
      const id = linkSegments.slice(0, i + 1).join(".");
      const label = labelSegments[i] ?? linkSegments[i];
      if (itemsMap[id] === undefined) {
        itemsMap[id] = {
          id,
          label,
          children: []
        };
      }
      itemsMap[id].label = label;

      if (improveLabels) {
        itemsMap[id].label = improveLabel(itemsMap[id].label, improveLabels);
      }

      if (i > 0) {
        const parentId = linkSegments.slice(0, i).join(".");
        const parentChildren = itemsMap[parentId].children ?? [];
        parentChildren.push(itemsMap[id]);
      }

      if (i == linkSegments.length - 1) {
        itemsMap[id].hasLink = true;
      }
    }
  }

  // remove duplicate items in children
  Object.values(itemsMap).forEach(item => {
    if (item.children?.length) {
      item.children = Object.values(
        Object.fromEntries(item.children.map(c => [c.id, c]))
      );
    }
  });

  return Object.values(itemsMap).filter(i => !i.id.includes("."));
};
