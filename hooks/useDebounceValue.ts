"use client";

import React, { useEffect } from "react";

const useDebounceValue = <T = string>(value: T, delay = 300) => {
  const [debounceValue, setDebounceValue] = React.useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [delay, value]);

  return debounceValue;
};

export default useDebounceValue;
