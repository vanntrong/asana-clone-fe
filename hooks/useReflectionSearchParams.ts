import { useCallback, useMemo } from "react";
import useQueryParams from "./useQueryParams";

const hasKey = <T extends Record<any, any>>(obj: T, key: keyof T) => {
  return key in obj;
};

const useReflectionSearchParams = <T extends Record<any, any>>(
  initialValues?: T
): [T, (params: Partial<T>) => void] => {
  const { searchParams, setSearchParams } = useQueryParams();

  const isFieldTrue = useCallback(
    (field: keyof T) => field !== "" && field !== null && field !== undefined,
    []
  );

  const values = useMemo(() => {
    const params: T = {
      ...(initialValues || {}),
    };

    for (const key of searchParams.keys()) {
      console.log(key);
      if (isFieldTrue(searchParams.get(key))) {
        (params as any)[key] = searchParams.get(key);
      }
    }
    return params;
  }, [initialValues, searchParams, isFieldTrue]);

  const set = useCallback(
    (params: Partial<T>) => {
      setSearchParams(params as any);
    },
    [setSearchParams]
  );

  return [values, set];
};

export default useReflectionSearchParams;
