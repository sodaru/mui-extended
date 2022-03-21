# Sodaru AppBar

---

## Usage

```typescript
import { SodaruAppBar } from "@solib/ui-components";
import { AppBarProps } from "@mui/material";

const hideMenuBtn: boolean;
const props: AppBarProps;
const content: ReactNode;

const sodaruAppBar = (
  <SodaruAppBar hideMenuBtn={noMenu}>{content}</SodaruAppBar>
);
```

## Features

- `SodaruAppBar` wraps [`AppBar`](https://mui.com/components/app-bar/) from mui
- Provides a default menu button, which can be hidden using `hideMenuBtn` prop
  - default menu button uses [`HideMenu`](../layout/hide-menu) Utility to control the state of menu across components
