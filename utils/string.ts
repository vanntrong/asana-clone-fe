export const formatCommentContent = (data: string) => {
  return data.replace(/(?:\r\n|\r|\n)/g, "<br>");
};
