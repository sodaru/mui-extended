import { useState, useEffect } from "react";

const useStateWithWebStorage = <T>(
  webStorage: Storage,
  webStorageKey: string,
  initialValue: T
): [T, (value: T) => void, boolean] => {
  const [value, setValue] = useState<{ checked: boolean; value: T }>({
    checked: false,
    value: initialValue
  });

  useEffect(() => {
    if (!value.checked && typeof webStorage !== "undefined") {
      // update value from storage to state during mount
      let value = webStorage.getItem(webStorageKey);

      if (typeof value === "string") {
        value = JSON.parse(value);
      }

      setValue({
        checked: true,
        value: value !== null ? (value as unknown as T) : initialValue
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const decoratedSetValue = (newValue: T) => {
    if (typeof webStorage !== "undefined") {
      // update storage when value changes
      webStorage.setItem(webStorageKey, JSON.stringify(newValue));
    }
    return setValue({ checked: value.checked, value: newValue });
  };

  return [value.value, decoratedSetValue, value.checked];
};

export const useStateWithSessionStorage = <T>(key: string, initialValue: T) => {
  return useStateWithWebStorage(
    typeof sessionStorage !== "undefined" ? sessionStorage : undefined,
    key,
    initialValue
  );
};

export const useStateWithLocalStorage = <T>(key: string, initialValue: T) => {
  return useStateWithWebStorage(
    typeof localStorage !== "undefined" ? localStorage : undefined,
    key,
    initialValue
  );
};
