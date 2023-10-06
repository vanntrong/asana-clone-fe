import { CreateCommentData } from "@/modules/comments/schemas/createCommentSchema";
import { Comment } from "@/modules/comments/types";
import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";

export const createCommentApi = (
  data: CreateCommentData
): Promise<Response<Comment>> => axiosInstance.post("/comments/", data);
