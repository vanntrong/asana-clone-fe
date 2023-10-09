import { AddMembersData } from "@/modules/projects/schemas/addMembersSchema";
import { axiosInstance } from "@/utils/axios";

export const addMembersApi = ({
  project_id,
  ...payload
}: AddMembersData & { project_id: string }) =>
  axiosInstance.patch(`/projects/${project_id}/members/add`, payload);
