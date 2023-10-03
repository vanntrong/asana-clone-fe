import * as z from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1).max(255),
  managers: z.array(z.string().uuid()).min(1),
  members: z.array(z.string().uuid()).min(1),
});

export type CreateProjectPayload = z.infer<typeof createProjectSchema>;
