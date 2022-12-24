```YAML
title: Web Storage
meta:
  description:
    A react/typesctipt component to store state in localStorage and/or sessionStorage.
```

# Web Storage

---

Provides utilities for `localStorage` and `sessionStorage`

## Usage

- `useStateWithSessionStorage`

  ```typescript
  import { useStateWithSessionStorage } from "mui-extended";

  // In a function component
  // ...
  const [state, setState, checked] = useStateWithSessionStorage(
    "sessionStorageKey", // any unique key to use in store
    "initialValue" // uses type generics same as `useState`
  );
  ```

- `useStateWithLocalStorage`

  ```typescript
  import { useStateWithLocalStorage } from "mui-extended";

  // In a function component
  // ...
  const [state, setState, checked] = useStateWithLocalStorage(
    "localStorageKey", // any unique key to use in store
    "initialValue" // uses type generics same as `useState`
  );
  ```

> `state` and `setState` are similar to Reacts `useState` return values  
> `checked` will be **true** only after the storage is checked for value

_This Demo uses `useStateWithSessionStorage` to persist navigation menu's expansion state across page reloads_
