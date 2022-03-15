import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useHashRouter = <T extends string | number | boolean>(
  initialHash?: T
): [T, (hash: T) => void] => {
  const [hash, setHash] = useState<T>(initialHash);

  const router = useRouter();

  const updateRoute = (_hash: T) => {
    if (!_hash) {
      router.back();
    } else {
      const url = new URL(window.location.href);
      url.hash = "#" + _hash;
      router.push(url);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    setHash(url.hash.substring(1) as T);
  }, [router.asPath]);

  return [hash, updateRoute];
};
