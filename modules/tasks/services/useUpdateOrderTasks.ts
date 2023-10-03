import React from "react";
import { queryKey } from "./key";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import {
  UpdateOrderTasksData,
  updateOrderTasksApi,
} from "@/apis/tasks/updateOrderTasks";
import { AxiosError } from "axios";

const useUpdateOrderTasks = (
  options?: UseMutationOptions<unknown, AxiosError, UpdateOrderTasksData>
) => {
  const key = queryKey.updateOrderTasks();

  return useMutation<unknown, AxiosError, UpdateOrderTasksData>(
    key,
    (payload) => updateOrderTasksApi(payload),
    options
  );
};

export default useUpdateOrderTasks;
