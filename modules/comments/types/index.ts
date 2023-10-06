import { Task } from "@/modules/projects/types";
import { User } from "@/modules/users/types";

export type Comment = {
  id: string;
  authorId: string;
  taskId: string;
  content: string;
  created_at: string;
  deletedAt: string | null;
  author: User;
  task: Task;
};
