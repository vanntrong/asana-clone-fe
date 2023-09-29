import { User } from "@/modules/users/types";

export type Project = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  avatar: string;
};

export type Task = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  is_done: false;
  tags: string;
  assignee_id: string;
  project_id: string;
  created_by_id: string;
  parent_task_id: string;
  section_id: string;
  assignee: User;
  created_by: User;
};

export type Section = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  name: string;
  description: string;
  project_id: string;
  tasks: Array<Task>;
};
