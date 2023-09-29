import * as z from "zod";

export const createTaskSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().optional(),
  start_date: z.date().or(z.string()).optional(),
  due_date: z.date().or(z.string()),
  assignee_id: z.string().uuid().optional(),
  project_id: z.string().uuid(),
  section_id: z.string().uuid(),
  is_done: z.boolean().optional(),
  tags: z.string().optional(),
  parent_task_id: z.string().uuid().optional(),
});

export type CreateTaskPayload = z.infer<typeof createTaskSchema>;
