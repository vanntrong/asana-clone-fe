import { omit } from "lodash";
import React, { useEffect } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

const useUpdateFormValues = <T extends FieldValues, D extends T>(
  setValue: UseFormSetValue<T>,
  value: D | null,
  omits?: string[]
) => {
  useEffect(() => {
    if (!value) return;
    Object.keys(omit(value, omits || [])).forEach((key) => {
      setValue(key as any, value[key]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
};

export default useUpdateFormValues;
