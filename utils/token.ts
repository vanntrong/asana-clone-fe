import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

export enum TokenName {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

export const setToken = (
  name: string,
  value: string,
  options?: OptionsType
) => {
  setCookie(name, value, {
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    ...options,
  });
};

export const getToken = (name: string) => {
  return getCookie(name);
};

export const deleteToken = (name: string) => {
  deleteCookie(name);
};
