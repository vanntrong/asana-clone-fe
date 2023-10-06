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
        queryClient.setQueryData(key, (old: any) => {
          if (!old) return old;

          old.data = old.data.map((task: Task) =>
            task.id === variables.task_id
              ? {
                  ...task,
                  is_liked: !task.is_liked,
                  like_count: task.is_liked
                    ? task.like_count - 1
                    : task.like_count + 1,
                }
              : task
          );

          return old;
        });
        onSuccess?.(data, variables, context);
      },
      ...other,
    }
  );
};

export default useLikeTask;
