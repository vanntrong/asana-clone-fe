import { CreateTaskResponse, createTaskApi } from "@/apis/tasks/createTask";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { CreateTaskPayload } from "../schemas/createTaskSchema";
import { queryKey } from "./key";

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
  >(key, (data: CreateTaskPayload) => createTaskApi(data), options);
};

export default useCreateTask;
