import { User } from "@/modules/users/types";
import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";

export type GetProjectMembersParams = {
  id?: string;
  keyword?: string;
};

export type GetProjectMembersResponse = Response<Array<User>>;

export const getProjectMembersApi = ({
  id,
  ...params
}: GetProjectMembersParams): Promise<GetProjectMembersResponse> =>
  axiosInstance.get(`/projects/${id}/members`, { params });
