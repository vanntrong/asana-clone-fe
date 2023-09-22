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
    (params: Record<string, string>) => {
      Object.entries(params).forEach(([key, value]) => {
        current.set(key, value);
      });

      router.replace(`${pathname}?${current.toString()}`);
    },
    [current, router, pathname]
  );

  return {
    searchParams: current,
    setSearchParams: set,
  };
};

export default useQueryParams;
