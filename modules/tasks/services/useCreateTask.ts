import { CreateTaskResponse, createTaskApi } from "@/apis/tasks/createTask";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { CreateTaskPayload } from "../schemas/createTaskSchema";
import { queryKey } from "./key";
import { queryKey as taskKey } from "@/modules/tasks/services/key";
import { queryClient } from "@/app/providers";

const useCreateTask = (
  options?: UseMutationOptions<
    AxiosResponse<CreateTaskResponse>,
    AxiosError,
    CreateTaskPayload
  >
) => {
  const key = queryKey.createTask();

  return useMutation<
    AxiosResponse<CreateTaskResponse>,
    AxiosError,
    CreateTaskPayload
  >(key, (data: CreateTaskPayload) => createTaskApi(data), {
    onSuccess(_, variables) {
      const key = taskKey.getTasks({
        project_id: variables.project_id,
        section_id: variables.section_id,
      });
      queryClient.invalidateQueries(key);
    },
    ...options,
  });
};

export default useCreateTask;
