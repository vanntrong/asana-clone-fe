import * as z from "zod";

export const addMembersSchema = z.object({
  members: z.array(z.string().uuid()).min(1),
});

export type AddMembersData = z.infer<typeof addMembersSchema>;
