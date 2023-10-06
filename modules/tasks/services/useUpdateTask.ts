import { CreateTaskResponse, createTaskApi } from "@/apis/tasks/createTask";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { CreateTaskPayload } from "../schemas/createTaskSchema";
import { queryKey } from "./key";
import { Task } from "@/modules/projects/types";
import { UpdateTaskPayload } from "../schemas/updateTaskSchema";
import { updateTaskApi } from "@/apis/tasks/updateTask";
import { queryKey as taskKey } from "@/modules/tasks/services/key";
import { queryClient } from "@/app/providers";

const useUpdateTask = (
  options?: UseMutationOptions<
    Task,
    AxiosError,
    { id: string; data: UpdateTaskPayload }
  >
) => {
  const key = queryKey.updateTask();

  return useMutation<Task, AxiosError, { id: string; data: UpdateTaskPayload }>(
    key,
    ({ id, data }: { id: string; data: UpdateTaskPayload }) =>
      updateTaskApi(id, data),
    {
      onSuccess: (_, variables) => {
        if (!variables.data.project_id || !variables.data.section_id) return;
        const key = taskKey.getTasks({
          project_id: variables.data.project_id,
          section_id: variables.data.section_id,
        });
        queryClient.invalidateQueries(key);
      },
      ...options,
    }
  );
};

export default useUpdateTask;
