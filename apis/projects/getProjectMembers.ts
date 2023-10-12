import { User } from "@/modules/users/types";
import { PaginationParams, PaginationResponse } from "@/types";
import { axiosInstance } from "@/utils/axios";

export type GetProjectMembersParams = PaginationParams & {
  id?: string;
  keyword?: string;
};

export type GetProjectMembersResponse = PaginationResponse<User>;

export const getProjectMembersApi = ({
  id,
  ...params
}: GetProjectMembersParams): Promise<GetProjectMembersResponse> =>
  axiosInstance.get(`/projects/${id}/members`, { params });
