import { Task } from "@/modules/projects/types";
import { PaginationResponse, Response } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { AxiosResponse } from "axios";

export interface GetTasksParams {
  project_id: string;
  section_id: string;
}

export type GetTasksResponse = Response<Array<Task>>;

export const getTasksApi = async (
  params: GetTasksParams
): Promise<GetTasksResponse> => axiosInstance.get(`/tasks/`, { params });
