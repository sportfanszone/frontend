import { z } from "zod";

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

export const photoSchema = z
  .object({
    profilePhoto: z
      .instanceof(File)
      .optional()
      .nullable()
      .refine((file) => {
        if (!file) return true;
        const validTypes = ["image/png", "image/jpeg", "image/jpg"];
        return validTypes.includes(file.type);
      }, "Only PNG, JPG, or JPEG files are allowed")
      .refine((file) => {
        if (!file) return true;
        return file.size <= 2 * 1024 * 1024; // 2MB limit
      }, "File size must be less than 2MB"),
    coverPhoto: z
      .instanceof(File)
      .optional()
      .nullable()
      .refine((file) => {
        if (!file) return true;
        const validTypes = ["image/png", "image/jpeg", "image/jpg"];
        return validTypes.includes(file.type);
      }, "Only PNG, JPG, or JPEG files are allowed")
      .refine((file) => {
        if (!file) return true;
        return file.size <= 2 * 1024 * 1024; // 2MB limit
      }, "File size must be less than 2MB"),
  })
  .refine((data) => data.profilePhoto || data.coverPhoto, {
    message: "At least one photo (profile or cover) must be provided",
    path: [],
  });

export const notificationSchema = z.object({
  profileView: z.boolean(),
  topicComment: z.boolean(),
  achievement: z.boolean(),
  commentReply: z.boolean(),
  follow: z.boolean(),
  clubTopic: z.boolean(),
  adminBroadcast: z.boolean(),
  postLike: z.boolean(),
});
