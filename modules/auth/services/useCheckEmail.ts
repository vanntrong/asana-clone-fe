import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { LoginEmailSchema } from "../schemas/loginSchema";
import { queryKey } from "./key";

type CheckEmailResponse = {
  info: {
    email: string;
    avatar: string;
  };
};

const useCheckEmail = (
  options?: UseMutationOptions<
    AxiosResponse<CheckEmailResponse>,
    AxiosError,
    LoginEmailSchema
  >
) => {
  const key = queryKey.checkEmail();

  return useMutation<
    AxiosResponse<CheckEmailResponse>,
    AxiosError,
    LoginEmailSchema
  >(
    key,
    (payload: LoginEmailSchema) =>
      axiosInstance.post<CheckEmailResponse>("/auth/check-email", payload),
    {
      ...options,
    }
  );
};

export default useCheckEmail;
