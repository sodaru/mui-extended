```YAML
title: Close On Navigation modal
meta:
  description:
    A react customizabel modal component to close when browser is navigated back/forward.
```

# Close On Navigation

---

HOC to enable components(especially the Material UI Modals) to close when browser is navigated back/forward

## Usage

```typescript
import { withCloseOnNavigation } from "mui-extended";
import { Dialog } from "@mui/material";

const NavigationClasableDialog = withCloseOnNavigation(Dialog);
```

`withCloseOnNavigation` accepts any component with `open` and `onClose` props

_[Layout](../layout) component uses `withCloseOnNavigation` for menu in Mobile mode_

## Features

- Closes on navigating back
- Closes on navigating forward (using links on Modal Component)

### Note :

- Navigation uses [`window.history`](https://developer.mozilla.org/en-US/docs/Web/API/Window/history) api.
- Works along with [`next/link`](https://nextjs.org/docs/api-reference/next/link) and [`next/router`](https://nextjs.org/docs/api-reference/next/router)
- Any other method or navigation , and navigating to external links may break this
