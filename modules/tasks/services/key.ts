import { GetTasksParams } from "@/apis/tasks/getTasks";

export const queryKey = {
  createTask: () => ["createTask"],
  getTasks: (params: GetTasksParams) => ["getTasks", params],
  updateTask: () => ["updateTask"],
  updateOrderTasks: () => ["updateOrderTasks"],
};
