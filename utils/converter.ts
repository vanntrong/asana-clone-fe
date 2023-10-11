/**
 * The `toBoolean` function converts a value to a boolean, considering "true" and "false" strings as
 * boolean values.
 * @param {any} value - The `value` parameter is of type `any`, which means it can accept any data
 * type.
 * @returns The function `toBoolean` returns a boolean value.
 */
export const toBoolean = (value: any): boolean => {
  if (value === "true") return true;
  if (value === "false") return false;

  return Boolean(value);
};
