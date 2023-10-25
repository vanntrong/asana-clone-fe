import { Response } from "@/types";
import { axiosInstance } from "@/utils/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SignUpSchema } from "../schemas/signUpSchema";
import { queryKey } from "./key";

export type SignUpResponse = Response<{
  access_token: string;
  refresh_token: string;
}>;

const useSignUp = (
  options?: UseMutationOptions<SignUpResponse, AxiosError, SignUpSchema>
) => {
  const key = queryKey.signUp();

  return useMutation(
    key,
    (payload: SignUpSchema): Promise<SignUpResponse> =>
      axiosInstance.post("/auth/register", payload),
    {
      ...options,
    }
  );
};

export default useSignUp;
