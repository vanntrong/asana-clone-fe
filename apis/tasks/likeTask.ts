import { axiosInstance } from "@/utils/axios";

export type LikeTaskApiData = {
  task_id: string;
  project_id: string;
  section_id: string;
};

export const likeTaskApi = ({ task_id, ...payload }: LikeTaskApiData) =>
  axiosInstance.patch(`/tasks/${task_id}/like`, payload);
