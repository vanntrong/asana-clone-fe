import { axiosInstance } from "@/utils/axios";

export interface UpdateSectionPayload {
  name: string;
  project_id: string;
  description?: string;
  id: string;
}

export const updateSectionApi = ({ id, ...payload }: UpdateSectionPayload) =>
  axiosInstance.put(`/sections/${id}`, payload);
