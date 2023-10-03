import { CreateProjectPayload } from "@/modules/projects/schemas/createProjectSchema";
import { Project } from "@/modules/projects/types";
import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";

export const createProjectApi = (
  payload: CreateProjectPayload
): Promise<Response<Project>> => axiosInstance.post("/projects/", payload);
