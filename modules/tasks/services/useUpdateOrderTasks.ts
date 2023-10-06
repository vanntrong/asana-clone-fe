import React from "react";
import { queryKey } from "./key";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import {
  UpdateOrderTasksData,
  updateOrderTasksApi,
} from "@/apis/tasks/updateOrderTasks";
import { AxiosError } from "axios";
import { queryClient } from "@/app/providers";

const useUpdateOrderTasks = (
  options?: UseMutationOptions<unknown, AxiosError, UpdateOrderTasksData>
) => {
  const key = queryKey.updateOrderTasks();

  return useMutation<unknown, AxiosError, UpdateOrderTasksData>(
    key,
    (payload) => updateOrderTasksApi(payload),
    {
      onSuccess(_, variables) {
        const key = queryKey.getTasks({
          project_id: variables.project_id,
          section_id: variables.section_id,
        });
        queryClient.invalidateQueries(key);
      },
      ...options,
    }
  );
};

export default useUpdateOrderTasks;
