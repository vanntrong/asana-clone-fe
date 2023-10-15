import { Task } from "@/modules/projects/types";
import { FilterParamKeys } from "../types/homeType";

export const getTaskLink = (searchParams: URLSearchParams, task: Task) => {
  searchParams.set(FilterParamKeys.TASK_ID, task.id.toString());
  return searchParams.toString();
};
