import { GetCommentsParams } from "@/apis/comments/getComments";

export const queryKey = {
  getComments: (params?: GetCommentsParams) => ["comments", params],
  createComment: () => ["createComments"],
};
