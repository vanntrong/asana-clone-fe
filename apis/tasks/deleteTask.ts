import { axiosInstance } from "@/utils/axios";

export const deleteTask = async (id: string) => {
  return axiosInstance.delete(`/tasks/${id}`);
};
