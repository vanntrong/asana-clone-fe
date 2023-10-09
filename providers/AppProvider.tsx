"use client";

import useQueryParams from "@/hooks/useQueryParams";
import useGetMyProjects from "@/modules/projects/services/useGetMyProjects";
import { useProjectsStore } from "@/modules/projects/store";
import useGetMe from "@/modules/users/services/useGetMe";
import { useAuthStore } from "@/stores/global";
import React from "react";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useAuthStore();
  const { setProjects } = useProjectsStore();
  const { searchParams, setSearchParams } = useQueryParams();
  const currentproject_id = searchParams.get("project_id");
  const { isSuccess } = useGetMe({
    onSuccess: (data) => {
      setUser(data.data);
    },
  });
  useGetMyProjects({
    enabled: isSuccess,
    onSuccess(data) {
      setProjects(data.data);
      if (currentproject_id || data.data.length === 0) {
        return;
      }
      setSearchParams({ project_id: data.data[0].id });
    },
  });

  return <>{children}</>;
};

export default AppProvider;
