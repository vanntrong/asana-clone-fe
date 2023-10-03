import { axiosInstance } from "@/utils/axios";

export type UpdateOrderTasksData = {
  project_id: string;
  section_id: string;
  tasks: string[];
};

export const updateOrderTasksApi = (payload: UpdateOrderTasksData) => {
  return axiosInstance.patch("/tasks/orders", payload);
};
