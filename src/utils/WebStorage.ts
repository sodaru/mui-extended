import { useState, useEffect, Dispatch, SetStateAction } from "react";

type UseStateReturnType<T> = [T, Dispatch<SetStateAction<T>>];

const useStateWithWebStorage = <T>(
  webStorage: Storage,
  webStorageKey: string,
  initialValue: T
): UseStateReturnType<T> => {
  const getItem = (key: string): T => {
    let value =
      typeof webStorage !== "undefined" ? webStorage.getItem(key) : undefined;

    if (typeof value === "string") {
      value = JSON.parse(value);
    }
    return value as unknown as T;
  };

  const [value, setValue] = useState<T>(getItem(webStorageKey) || initialValue);

  useEffect(() => {
    if (typeof webStorage !== "undefined") {
      webStorage.setItem(webStorageKey, JSON.stringify(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, webStorageKey]);

  return [value, setValue];
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
