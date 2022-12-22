```YAML
title: HideMenu
meta:
  description:
    A react wrapper to hide and show menu.
```

# HideMenu

---

A React Context Wrapper to share the state of menu visibility (open/close) across disjoint components

## Usage

- Use `HideMenuProvider` at the root Component to bind the state to context

  ```typescript
  import { HideMenuProvider } from "mui-extended";

  const rootComponent = <HideMenuProvider>{childComponents}</HideMenuProvider>;
  ```

- In Child Components, use `useHideMenu` to access and toggle menu state

  ```typescript
  import { useHideMenu } from "mui-extended";

  // ...
  // within a functional component
  const hideMenu: { hide: boolean; toggle: () => void } = useHideMenu();

  console.log(hideMenu.hide); // true or false

  const toggleButton = <button onClick={hideMenu.toggle}>Toggle</button>;
  ```
