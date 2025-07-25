import { z } from "zod";

export const editClubSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "First name must be less than 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(50, "Description must be less than 50 characters"),
  logo: z.union([z.instanceof(File), z.string(), z.null()]).optional(),
  backgroundImage: z
    .union([z.instanceof(File), z.string(), z.null()])
    .optional(),
});
