/**
 * The `formatCommentContent` function takes a string as input and replaces all line breaks with HTML
 * line break tags.
 * @param {string} data - The `data` parameter is a string that represents the content of a comment.
 * @returns The function `formatCommentContent` returns a string with line breaks replaced by the HTML
 * `<br>` tag.
 */
export const formatCommentContent = (data: string) => {
  return data.replace(/(?:\r\n|\r|\n)/g, "<br>");
};
