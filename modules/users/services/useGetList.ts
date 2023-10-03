import React from "react";
import { queryKey } from "./key";
import {
  GetListUsersParams,
  GetListUsersResponse,
  getListUsers,
} from "@/apis/users/getListUser";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useGetListUser = (
  params: GetListUsersParams,
  options?: UseQueryOptions<GetListUsersResponse, AxiosError>
) => {
  const key = queryKey.getList(params);

  return useQuery<GetListUsersResponse, AxiosError>(
    key,
    () => getListUsers(params),
    options
  );
};

export default useGetListUser;
