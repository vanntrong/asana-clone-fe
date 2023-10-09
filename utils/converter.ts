export const toBoolean = (value: any): boolean => {
  if (value === "true") return true;
  if (value === "false") return false;

  return Boolean(value);
};
