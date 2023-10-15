import { axiosInstance } from "@/utils/axios";

export const getList = (projectId?: string) =>
  axiosInstance.get("/tags/", { params: { project_id: projectId } });
