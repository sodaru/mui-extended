```YAML
title: Cookie Preference
meta:
  description:
    A react modal/dialog to view and set Cookie Preference.
```

# Cookie Preference

---

Provides Cookie Preference Settings Dialog

Saves the preferences in LocalStorage with key = `cookie-preference`, value = Map of preferenceName to boolean (true to allow, false to block)

## Usage

- Using a Fab

  ```typescript
  import { CookiePreference } from "mui-extended";

  const myPage = () => {
    return (
      <Tooltip title="Cookie Preferences">
        <CookiePreference sx={{ position: "fixed", bottom: 25, right: 25 }} />
      </Tooltip>
    );
  };
  ```

  This creates a Floating Action Button, when clicked opens a Cookie Preference Dialog

  **Props**

  - [`AllFabProps`](https://mui.com/material-ui/api/fab/#props)
  - `dialogProps` (_Optional_) **`CookiePreferenceDialogProps`**

- Using Dialog

  ```typescript
  import { CookiePreferenceDialog } from "mui-extended";

  const myPage = () => {
    return (
      <CookiePreferenceDialog
        open={open}
        onClose={onClose}
        preferences={prefs}
      />
    );
  };
  ```

  Use this component to display Cookie Preferences

  **Props**

  - All [`ResponsiveDialogProps`](./responsive-dialog)
  - `title` (_Optional_) ReactNode, Overrides Dialog Title
  - `description` (_Optional_) ReactNode, Overrides Description
  - `necessory` (_Optional_) Object of Type,
    ```typescript
    { title?: string; description?: ReactNode }
    ```
    Overrides necessory preference section
  - `preferences` Object of Type
    ```typescript
    Record<string, { default: boolean; title: string; description: ReactNode }>;
    ```
    Overrides preference section

- Using DefaultPreferences

  ```typescript
  import { defaultCookiePreferences } from "mui-extended";
  ```
