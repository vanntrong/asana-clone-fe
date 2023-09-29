import { CreateTaskPayload } from "@/modules/tasks/schemas/createTaskSchema";
import { axiosInstance } from "@/utils/axios";
import { AxiosResponse } from "axios";

export interface CreateTaskResponse {
  task: string;
}

export const createTaskApi = async (
  payload: CreateTaskPayload
): Promise<AxiosResponse<CreateTaskResponse>> =>
  axiosInstance.post("/tasks/", payload);
