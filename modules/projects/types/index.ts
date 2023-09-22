export type Project = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  avatar: string;
};

export type Task = any;

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
