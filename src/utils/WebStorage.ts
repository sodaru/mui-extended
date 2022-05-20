import { isEqual } from "lodash";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

type UseStateReturnType<T> = [T, Dispatch<SetStateAction<T>>];

const useStateWithWebStorage = <T>(
  webStorage: Storage,
  webStorageKey: string,
  initialValue: T
): UseStateReturnType<T> => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    if (isEqual(value, initialValue)) {
      // update value from storage to state during mount
      let value =
        typeof webStorage !== "undefined"
          ? webStorage.getItem(webStorageKey)
          : undefined;

      if (typeof value === "string") {
        value = JSON.parse(value);
      }

      if (value !== null) {
        setValue(value as unknown as T);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const decoratedSetValue: Dispatch<SetStateAction<T>> = newValue => {
    if (typeof webStorage !== "undefined") {
      // update storage when value changes
      webStorage.setItem(webStorageKey, JSON.stringify(newValue));
    }
    return setValue(newValue);
  };

  return [value, decoratedSetValue];
};

export const useStateWithSessionStorage = <T>(
  key: string,
  initialValue: T
): UseStateReturnType<T> => {
  return useStateWithWebStorage(
    typeof sessionStorage !== "undefined" ? sessionStorage : undefined,
    key,
    initialValue
  );
};

export const useStateWithLocalStorage = <T>(
  key: string,
  initialValue: T
): UseStateReturnType<T> => {
  return useStateWithWebStorage(
    typeof localStorage !== "undefined" ? localStorage : undefined,
    key,
    initialValue
  );
};
