import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    rememberMe: z.literal("true", {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
