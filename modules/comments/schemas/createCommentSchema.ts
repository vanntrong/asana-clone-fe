import * as z from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1).max(1000),
  task_id: z.string().uuid(),
});

export type CreateCommentData = z.infer<typeof createCommentSchema>;
