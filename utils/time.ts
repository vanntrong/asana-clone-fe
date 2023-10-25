import dayjs from "dayjs";

/**
 * The function `formatTimeToString` takes a date and a format string as input and returns a formatted
 * string representation of the date.
 * @param {string | Date} [date] - The `date` parameter is an optional parameter that can accept a
 * string or a Date object. It represents the date and time that you want to format.
 * @param [format=DD/MM/YYYY, h:mm:ss A] - The `format` parameter is a string that specifies the
 * desired format for the output string. It uses a combination of letters and special characters to
 * represent different parts of the date and time.
 * @returns The function `formatTimeToString` returns a formatted string representation of the given
 * date.
 */
export const formatTimeToString = (
  date?: string | Date,
  format = "DD/MM/YYYY, hh:mm:ss A Z"
) => {
  return dayjs(date).format(format);
};

/**
 * The function `timeToEndOfDay` returns the end of the day for a given date or the current date if no
 * date is provided.
 * @param {string | Date} [date] - The `date` parameter is an optional parameter that can be either a
 * string or a Date object. It represents the date for which you want to calculate the end of the day.
 * If no value is provided for `date`, the current date and time will be used.
 * @returns the end of the day as a Date object.
 */
export const timeToEndOfDay = (date?: string | Date) => {
  return dayjs(date).endOf("day").toDate();
};

/**
 * The function `timeToStartOfDay` returns the start of the day for a given date or the current date if
 * no date is provided.
 * @param {string | Date} [date] - The `date` parameter is an optional parameter that can be either a
 * string or a Date object. It represents the date for which you want to calculate the start of the
 * day. If no value is provided for `date`, the current date will be used.
 * @returns The function `timeToStartOfDay` returns the start of the day for the given date.
 */
export const timeToStartOfDay = (date?: string | Date) => {
  return dayjs(date).startOf("day").toDate();
};
