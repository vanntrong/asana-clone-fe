import { Task } from "@/modules/projects/types";
import { UpdateTaskPayload } from "@/modules/tasks/schemas/updateTaskSchema";
import { axiosInstance } from "@/utils/axios";

export const updateTaskApi = (
  id: string,
  payload: UpdateTaskPayload
): Promise<Task> => axiosInstance.put(`/tasks/${id}`, payload);
