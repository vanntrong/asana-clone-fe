import * as z from "zod";

export const updateTaskSchema = z.object({
  title: z.string().nonempty().optional(),
  description: z.string().optional(),
  start_date: z.date().or(z.string()).optional(),
  due_date: z.date().or(z.string()).optional(),
  assignee_id: z.string().uuid().optional(),
  project_id: z.string().uuid().optional(),
  section_id: z.string().uuid().optional(),
  is_done: z.boolean().optional(),
  tags: z.string().optional(),
  parent_task_id: z.string().uuid().optional().nullable(),
});

export type UpdateTaskPayload = z.infer<typeof updateTaskSchema>;
