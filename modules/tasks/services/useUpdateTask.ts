import { CreateTaskResponse, createTaskApi } from "@/apis/tasks/createTask";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { CreateTaskPayload } from "../schemas/createTaskSchema";
import { queryKey } from "./key";
import { Task } from "@/modules/projects/types";
import { UpdateTaskPayload } from "../schemas/updateTaskSchema";
import { updateTaskApi } from "@/apis/tasks/updateTask";

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
    options
  );
};

export default useUpdateTask;
