import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { LoginEmailSchema } from "../schemas/loginSchema";
import { queryKey } from "./key";
import { Response } from "@/types";

type CheckEmailResponse = Response<{
  email: string;
  avatar: string;
}>;

const useCheckEmail = (
  options?: UseMutationOptions<CheckEmailResponse, AxiosError, LoginEmailSchema>
) => {
  const key = queryKey.checkEmail();

  return useMutation<CheckEmailResponse, AxiosError, LoginEmailSchema>(
    key,
    (payload: LoginEmailSchema) =>
      axiosInstance.post("/auth/check-email", payload),
    {
      ...options,
    }
  );
};

export default useCheckEmail;
