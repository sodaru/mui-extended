# Web Storage

---

Provides utilities for `localStorage` and `sessionStorage`

## Usage

- `useStateWithSessionStorage`

  ```typescript
  import { useStateWithSessionStorage } from "@solib/ui-components";

  // In a function component
  // ...
  const [state, setState] = useStateWithSessionStorage(
    "sessionStorageKey", // any unique key to use in store
    "initialValue" // uses type generics same as `useState`
  );
  ```

- `useStateWithLocalStorage`

  ```typescript
  import { useStateWithLocalStorage } from "@solib/ui-components";

  // In a function component
  // ...
  const [state, setState] = useStateWithLocalStorage(
    "localStorageKey", // any unique key to use in store
    "initialValue" // uses type generics same as `useState`
  );
  ```

_This Demo uses `useStateWithSessionStorage` to persist navigation menu across page reloads_
