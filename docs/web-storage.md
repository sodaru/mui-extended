# Web Storage

---

Provides utilities for `localStorage` and `sessionStorage`

## Usage

- `useStateWithSessionStorage`

  ```typescript
  import { useStateWithSessionStorage } from "mui-extended";

  // In a function component
  // ...
  const [state, setState] = useStateWithSessionStorage(
    "sessionStorageKey", // any unique key to use in store
    "initialValue" // uses type generics same as `useState`
  );
  ```

- `useStateWithLocalStorage`

  ```typescript
  import { useStateWithLocalStorage } from "mui-extended";

  // In a function component
  // ...
  const [state, setState] = useStateWithLocalStorage(
    "localStorageKey", // any unique key to use in store
    "initialValue" // uses type generics same as `useState`
  );
  ```

_This Demo uses `useStateWithSessionStorage` to persist navigation menu's expansion state across page reloads_
