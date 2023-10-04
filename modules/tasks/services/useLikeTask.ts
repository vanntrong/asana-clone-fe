import { LikeTaskApiData, likeTaskApi } from "@/apis/tasks/likeTask";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKey } from "./key";

const useLikeTask = (
  options?: UseMutationOptions<unknown, AxiosError, LikeTaskApiData>
) => {
  const key = queryKey.likeTask();

  return useMutation<unknown, AxiosError, LikeTaskApiData>(
    key,
    (payload) => likeTaskApi(payload),
    options
  );
};

export default useLikeTask;
