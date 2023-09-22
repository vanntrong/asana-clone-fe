import axios from "axios";
import { TokenName, getToken } from "./token";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken(TokenName.ACCESS_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (value) => value.data,
  (error) => {
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
);
