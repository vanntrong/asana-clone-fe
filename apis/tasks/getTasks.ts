import { Task } from "@/modules/projects/types";
import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";

export interface GetTasksParams {
  project_id: string;
  section_id: string;
  assignee_ids?: string[];
  is_done?: boolean;
  due_date?: string;
}

export type GetTasksResponse = Response<Array<Task>>;

export const getTasksApi = async (
  params: GetTasksParams
): Promise<GetTasksResponse> => axiosInstance.get(`/tasks/`, { params });
