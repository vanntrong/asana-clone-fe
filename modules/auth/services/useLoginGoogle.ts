import { LoginGoogleData, loginGoogleApi } from "@/apis/auth/loginGoogle";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKey } from "./key";
import { LoginResponse } from "./useLogin";

const useLoginGoogle = (
  options?: UseMutationOptions<LoginResponse, AxiosError, LoginGoogleData>
) => {
  const key = queryKey.login();

  return useMutation(
    key,
    (payload: LoginGoogleData) => loginGoogleApi(payload),
    {
      ...options,
    }
  );
};

export default useLoginGoogle;
