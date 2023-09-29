import React from "react";
import { queryKey } from "./key";
import { GetTasksParams, getTasksApi } from "@/apis/tasks/getTasks";
import { useQueries } from "@tanstack/react-query";

const useGetTasks = (params?: Array<GetTasksParams>) => {
  return useQueries({
    queries: (params || []).map((param) => {
      const key = queryKey.getTasks(param);

      return {
        queryKey: key,
        queryFn: () => getTasksApi(param),
        enabled: !!param.project_id && !!param.section_id,
      };
    }),
  });
};

export default useGetTasks;
