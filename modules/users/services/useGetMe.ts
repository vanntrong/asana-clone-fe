import React from "react";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios";
import { queryKey } from "./key";
import { User } from "../types";
import { AxiosError, AxiosResponse } from "axios";

type GetMeResponse = {
  user: User;
};

const useGetMe = (
  options?: UseQueryOptions<AxiosResponse<GetMeResponse>, AxiosError>
) => {
  const key = queryKey.getMe();

  return useQuery<AxiosResponse<GetMeResponse>, AxiosError>(
    key,
    () => axiosInstance.get<GetMeResponse>("/users/me"),
    options
  );
};

export default useGetMe;
