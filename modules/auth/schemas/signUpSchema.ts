import * as z from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
