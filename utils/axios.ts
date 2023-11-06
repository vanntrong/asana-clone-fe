import axios from "axios";
import { TokenName, deleteToken, getToken, setToken } from "./token";
import toast from "react-hot-toast";
import { TRefreshTokenResponse, refreshToken } from "@/apis/auth/refreshToken";
import { jwtDecode } from "jwt-decode";
import { Response } from "@/types";
import { PATHS } from "@/configs/path";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const handleRefreshToken = (token: string) => {
  return refreshToken(token);
};

let refreshHandler: Promise<Response<TRefreshTokenResponse>> | null = null;

axiosInstance.interceptors.request.use(async (config) => {
  const token = getToken(TokenName.ACCESS_TOKEN);
  const refreshToken = getToken(TokenName.REFRESH_TOKEN);

  if (!token) {
    return config;
  }

  const now = new Date().getTime();
  const decodedToken: any = jwtDecode(token);

  const isTokenExpired = now > decodedToken.exp * 1000;

  if (isTokenExpired && refreshToken) {
    try {
      refreshHandler = refreshHandler
        ? refreshHandler
        : handleRefreshToken(refreshToken);

      const response = await refreshHandler;

      refreshHandler = null;
      if (response) {
        config.headers.authorization = `Bearer ${response.data.access_token}`;
        setToken(TokenName.ACCESS_TOKEN, response.data.access_token);
        setToken(TokenName.REFRESH_TOKEN, response.data.refresh_token);
      }
      return config;
    } catch (error) {
      deleteToken(TokenName.ACCESS_TOKEN);
      deleteToken(TokenName.REFRESH_TOKEN);
      window.location.href = PATHS.LOGIN;
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (value) => value.data,
  (error) => {
    console.log(error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
);
