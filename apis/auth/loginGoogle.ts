import { LoginResponse } from "@/modules/auth/services/useLogin";
import { axiosInstance } from "@/utils/axios";

export type LoginGoogleData = {
  id_token: string;
};

export const loginGoogleApi = (data: LoginGoogleData): Promise<LoginResponse> =>
  axiosInstance.post("/auth/login-google", data);
