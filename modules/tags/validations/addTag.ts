import * as z from "zod";

export const addTagSchema = z.object({
  name: z
    .string()
    .min(1, "Tag name must be at least 1 character long")
    .max(20, "Tag name must be at most 20 characters long"),
  color: z.string().regex(/^#([0-9a-f]{3}){1,2}$/i, "Invalid color"),
  project_id: z.string().uuid("Invalid project id"),
});

export type AddTagSchema = z.infer<typeof addTagSchema>;
