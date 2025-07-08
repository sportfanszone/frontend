import { z } from "zod";

export const addUserSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must be less than 50 characters"),
    middleName: z
      .string()
      .min(1, "Middle name is required")
      .max(50, "Middle name must be less than 50 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name must be less than 50 characters"),
    username: z
      .string()
      .min(1, "Username is required")
      .max(20, "Username must be less than 20 characters"),
    email: z.string().email("Invalid email address"),
    role: z.enum(["user", "admin"], {
      errorMap: () => ({ message: "Role must be either 'user' or 'admin'" }),
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string().min(8, "confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });
