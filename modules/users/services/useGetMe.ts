import React from "react";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios";
import { queryKey } from "./key";
import { User } from "../types";
import { AxiosError, AxiosResponse } from "axios";
import { Response } from "@/types";

const useGetMe = (options?: UseQueryOptions<Response<User>, AxiosError>) => {
  const key = queryKey.getMe();

  return useQuery<Response<User>, AxiosError>(
    key,
    () => axiosInstance.get("/users/me"),
    options
  );
};

export default useGetMe;
