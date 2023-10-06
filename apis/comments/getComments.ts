import { Comment } from "@/modules/comments/types";
import { PaginationParams, PaginationResponse } from "@/types";
import { axiosInstance } from "@/utils/axios";

export type GetCommentsParams = PaginationParams & {
  task_id: string;
};

export const getCommentsApi = (
  params: GetCommentsParams
): Promise<PaginationResponse<Comment>> =>
  axiosInstance.get("/comments/", { params });
