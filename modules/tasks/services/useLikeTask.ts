import { LikeTaskApiData, likeTaskApi } from "@/apis/tasks/likeTask";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKey } from "./key";
import { queryClient } from "@/app/providers";
import { Task } from "@/modules/projects/types";

const useLikeTask = (
  options?: UseMutationOptions<unknown, AxiosError, LikeTaskApiData>
) => {
  const { onSuccess, ...other } = options || {};
  const key = queryKey.likeTask();

  return useMutation<unknown, AxiosError, LikeTaskApiData>(
    key,
    (payload) => likeTaskApi(payload),
    {
      onSuccess(data, variables, context) {
        const key = queryKey.getTasks({
          section_id: variables.section_id,
          project_id: variables.project_id,
        });
        queryClient.invalidateQueries(key);
        onSuccess?.(data, variables, context);
      },
      ...other,
    }
  );
};

export default useLikeTask;
