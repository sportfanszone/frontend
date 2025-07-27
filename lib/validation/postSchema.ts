import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  link: z.union([z.string().url("Invalid URL"), z.literal("")]),
  clubId: z.string().min(1, "Club is required"),
  files: z.array(z.instanceof(File)).optional().default([]),
});

export type PostSchema = z.infer<typeof postSchema>;
