import { z } from "zod";

export const addClubSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "First name must be less than 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Middle name must be less than 500 characters"),
  logo: z.instanceof(File),
  backgroundImage: z.instanceof(File),
  league: z
    .string()
    .min(1, "League is required")
    .max(50, "League must be less than 50 characters"),
});
