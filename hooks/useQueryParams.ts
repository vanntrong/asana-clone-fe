import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";

const useQueryParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const current = useMemo(
    () => new URLSearchParams(Array.from(searchParams.entries())),
    [searchParams]
  );

  const set = useCallback(
    (params: Record<string, string | string[]>) => {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value))
          value.forEach((v) => {
            if (current.has(key)) current.delete(key);
            current.append(key, v);
          });
        else current.set(key, value);
      });

      router.replace(`${pathname}?${current.toString()}`);
    },
    [current, router, pathname]
  );

  const remove = useCallback(
    (params: string | string[]) => {
      if (Array.isArray(params)) params.forEach((p) => current.delete(p));
      else current.delete(params);
      router.replace(`${pathname}?${current.toString()}`);
    },
    [current, router, pathname]
  );

  const reset = useCallback(
    (params: Record<string, string | string[]> = {}, keep: string[] = []) => {
      const currentObject = Object.fromEntries(current.entries());
      for (const key in currentObject) {
        if (!keep.includes(key)) current.delete(key);
      }

      set(params);
    },
    [current, set]
  );

  return {
    searchParams: current,
    setSearchParams: set,
    removeSearchParams: remove,
    resetSearchParams: reset,
  };
};

export default useQueryParams;
