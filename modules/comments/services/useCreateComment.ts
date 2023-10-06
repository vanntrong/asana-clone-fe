import { createCommentApi } from "@/apis/comments/createComment";
import { queryClient } from "@/app/providers";
import { Response } from "@/types";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreateCommentData } from "../schemas/createCommentSchema";
import { Comment } from "../types";
import { queryKey } from "./key";

const useCreateComment = (
  options?: UseMutationOptions<Response<Comment>, AxiosError, CreateCommentData>
) => {
  const key = queryKey.createComment();

  return useMutation<Response<Comment>, AxiosError, CreateCommentData>(
    key,
    (data) => createCommentApi(data),
    {
      onSuccess(data, variables, context) {
        const key = queryKey.getComments({
          task_id: variables.task_id,
        });

        queryClient.invalidateQueries(key);
      },
      ...options,
    }
  );
};

export default useCreateComment;
