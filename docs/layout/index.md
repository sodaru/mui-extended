# Layout

---

## Usage

```typescript
import { Layout } from "@solib/ui-components";

const menu: ReactNode;
const appBar: ReactNode;
const content: ReactNode;

const layout = (
  <Layout menu={menu} appBar={appBar}>
    {content}
  </Layout>
);
```

Layout has 3 parts

- **content** - Actual Content of the Layout
- **menu** _(Optional)_ - Closable Menu to be displayed on the left of the content
- **appBar** _(Optional)_ - App Bar to be displayed on the top of the content

_This Documentation Uses Layout component along with [`SodaruAppBar`](../layout/sodaru-appbar) and [`TreeMenuWithNextLinks`](./treemenu-with-nextlinks)_

---

## Features

### Responsive

- [`SplitPane`](../layout/split-pane) for Desktop
- [`SwipeableDrawer`](https://mui.com/components/drawers/#swipeable) wraapped with [`withCloseOnNavigation`](./close-on-navigation)

### Contained

Overflow in `menu` and `content` are handled independently