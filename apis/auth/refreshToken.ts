import { Response } from "@/types";
import axios from "axios";

export type TRefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};

export const refreshToken = (
  token: string
): Promise<Response<TRefreshTokenResponse>> => {
  return axios
    .post(
      "/auth/refresh-token",
      { refresh_token: token },
      {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
      }
    )
    .then((data) => data.data);
};
