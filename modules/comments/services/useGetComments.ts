import { GetCommentsParams, getCommentsApi } from "@/apis/comments/getComments";
import { PaginationResponse } from "@/types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Comment } from "../types";
import { queryKey } from "./key";

const useGetComments = (
  params: GetCommentsParams,
  options?: UseQueryOptions<PaginationResponse<Comment>, AxiosError>
) => {
  const key = queryKey.getComments(params);

  return useQuery<PaginationResponse<Comment>, AxiosError>(
    key,
    () => getCommentsApi(params),
    options
  );
};

export default useGetComments;
