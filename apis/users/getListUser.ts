import { User } from "@/modules/users/types";
import { PaginationParams, PaginationResponse } from "@/types";
import { axiosInstance } from "@/utils/axios";

export type GetListUsersResponse = PaginationResponse<User>;

export type GetListUsersParams = PaginationParams & {
  exclude_in_project?: string;
};

export const getListUsers = (
  params: GetListUsersParams
): Promise<GetListUsersResponse> => axiosInstance.get("/users/", { params });
