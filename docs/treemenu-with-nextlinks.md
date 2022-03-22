# Tree Menu With [Next/Links](https://nextjs.org/docs/api-reference/next/link)

---

Creates a Tree Menu with links. Uses [`TreeView`](https://mui.com/components/tree-view/) component from `MUI`

## Usage

```typescript
import { TreeMenuWithNextLinks } from "@solib/ui-components";

const treeMenuProps: TreeMenuWithNextLinksProps;

const treeMenu = <TreeMenuWithNextLinks {...treeMenuProps} />;
```

### Props

- **links** array of `string` or `{ link: string; label?: string;}`
  - Valid Values are
    - `docs` - points to _`${basePath}/docs`_ link
    - `/docs/` - points to _`${basePath}/docs`_ link , leading and ending `/` are trimmed
    - `/docs/getting-started` - points to _`${basePath}/docs/getting-started`_ link
    - `{ link: "docs/install"}` - points to _`${basePath}/docs/install`_ link
    - `{ link: "docs/install", label: "Documentaion/Installation"}` - points to _`${basePath}/docs/install`_ link
  - Intermediate nodes will have link, if provided explicitly, Otherwise it acts as a normal Tree Node
  - right most label is applied to right most link
    - `{ link: "docs/install", label: "Installation"}`
      - Generates 2 Nodes
        - `docs`
          - `Installation` - pointing to _`${basePath}/docs/install`_
    - `{ link: "docs/install", label: "components/Documentation/Installation"}`
      - Generates 2 Nodes
        - `Documentation`
          - `Installation` - pointing to _`${basePath}/docs/install`_
- **basePath** _(Optional)_ `string` base path for the next link
- **improveLabels** _(Optional)_ `boolean`, if true lables are converted to UCFirst Words
- **TreeViewProps** _(Optional)_ [`TreeViewProps`](https://mui.com/api/tree-view/) from `MUI`
- **TreeItemProps** _(Optional)_ [`TreeItemProps`](https://mui.com/api/tree-item/) from `MUI`
