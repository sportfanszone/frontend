import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  link: z.string().url("Invalid URL").optional().or(z.literal("")),
  clubId: z.string().min(1, "Club ID is required"),
  files: z.array(z.instanceof(File)).optional().default([]),
});

export type PostSchema = z.infer<typeof postSchema>;
