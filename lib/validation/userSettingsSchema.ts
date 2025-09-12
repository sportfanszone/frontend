import { z } from "zod";

// Zod schemas for validation
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long"),
  middleName: z.string().max(50, "Middle name is too long").optional(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username is too long"),
});

export const securityInfoSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    passwordConfirm: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });

export const photoSchema = z.object({
  profilePhoto: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      if (!file) return true; // Allow optional file
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      return validTypes.includes(file.type);
    }, "Only PNG, JPG, or JPEG files are allowed")
    .refine((file) => {
      if (!file) return true;
      return file.size <= 5 * 1024 * 1024; // 5MB limit
    }, "File size must be less than 5MB"),
  coverPhoto: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      if (!file) return true;
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      return validTypes.includes(file.type);
    }, "Only PNG, JPG, or JPEG files are allowed")
    .refine((file) => {
      if (!file) return true;
      return file.size <= 5 * 1024 * 1024; // 5MB limit
    }, "File size must be less than 5MB"),
});
