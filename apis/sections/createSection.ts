import { axiosInstance } from "@/utils/axios";

export interface CreateSectionPayload {
  name: string;
  project_id: string;
}

export const createSectionApi = (payload: CreateSectionPayload) =>
  axiosInstance.post("/sections/", payload);
