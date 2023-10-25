import { PATHS } from "@/configs/path";
import { TokenName, setToken } from "@/utils/token";
import React, { useCallback } from "react";
import { signOut } from "next-auth/react";

const useLogout = () => {
  const logout = useCallback(async () => {
    setToken(TokenName.ACCESS_TOKEN, "");
    setToken(TokenName.REFRESH_TOKEN, "");
    await signOut();
    window.location.search = "";
    window.location.pathname = PATHS.LOGIN;
  }, []);

  return {
    logout,
  };
};

export default useLogout;
