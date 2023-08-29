import * as z from "zod";

export const loginEmailSchema = z.object({
  email: z.string().email(),
});

export type LoginEmailSchema = z.infer<typeof loginEmailSchema>;

export const loginPasswordSchema = z.object({
  password: z.string().min(6),
});

export type LoginPasswordSchema = z.infer<typeof loginPasswordSchema>;
