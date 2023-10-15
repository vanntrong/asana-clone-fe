import { AddTagSchema } from "@/modules/tags/validations/addTag";
import { axiosInstance } from "@/utils/axios";

export const createTagApi = (payload: AddTagSchema) =>
  axiosInstance.post("/tags/", payload);
