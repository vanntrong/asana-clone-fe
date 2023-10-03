import { GetListUsersParams } from "@/apis/users/getListUser";

export const queryKey = {
  getMe: () => ["getMe"],
  getList: (params: GetListUsersParams) => ["getList", params],
};
