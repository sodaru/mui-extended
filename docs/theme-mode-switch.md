```YAML
title: Theme Mode Switch
meta:
  description:
    react Theme switcher to toggle theme mode.
```

# Theme Mode Switch

---

A Switch Component to toggle theme mode

## Usage

```typescript
import { ThemeModeSwitch } from "mui-extended";

const themeModeSwitch = <ThemeModeSwitch />;
```

## Features

- Saves the user preference in LocalStorage
- Default Mode is `light` until the preferense is read from `localStorage`
- if localStorage is `null`, preference is loaded from [System preference](https://mui.com/material-ui/customization/dark-mode/#system-preference)
