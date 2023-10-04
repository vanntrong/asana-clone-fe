import { AddMembersData } from "@/modules/projects/schemas/addMembersSchema";
import { axiosInstance } from "@/utils/axios";

export const addMembersApi = ({
  projectId,
  ...payload
}: AddMembersData & { projectId: string }) =>
  axiosInstance.patch(`/projects/${projectId}/members/add`, payload);
