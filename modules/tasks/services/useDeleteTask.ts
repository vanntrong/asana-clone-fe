import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { queryKey } from "./key";
import { deleteTask } from "@/apis/tasks/deleteTask";
import { AxiosError } from "axios";

const useDeleteTask = (
  options?: UseMutationOptions<unknown, AxiosError, string>
) => {
  const key = queryKey.deleteTask();

  return useMutation(key, (id: string) => deleteTask(id), options);
};

export default useDeleteTask;
