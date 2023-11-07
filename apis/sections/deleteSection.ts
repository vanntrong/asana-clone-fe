import { axiosInstance } from "@/utils/axios";

export const deleteSectionApi = (id: string) =>
  axiosInstance.delete(`/sections/${id}`);
