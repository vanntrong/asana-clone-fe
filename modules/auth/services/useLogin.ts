import React from "react";
import { queryKey } from "./key";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios";
import { AxiosError, AxiosResponse } from "axios";
import { LoginSchema } from "../schemas/loginSchema";

type LoginResponse = {
  token: {
    access_token: string;
    refresh_token: string;
  };
};

const useLogin = (
  options?: UseMutationOptions<
    AxiosResponse<LoginResponse>,
    AxiosError,
    LoginSchema
  >
) => {
  const key = queryKey.login();

  return useMutation(
    key,
    (payload: LoginSchema) =>
      axiosInstance.post<LoginResponse>("/auth/login", payload),
    {
      ...options,
    }
  );
};

export default useLogin;
