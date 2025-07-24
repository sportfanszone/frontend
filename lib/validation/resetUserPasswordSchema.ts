import { z } from "zod";

export const resetUserPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string().min(8, "confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });
