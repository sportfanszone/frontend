import { z } from "zod";

export const commentSchema = z
  .object({
    content: z
      .string()
      .trim()
      .max(1000, "Comment text must be 1000 characters or less")
      .optional(),

    image: z
      .custom<File | undefined>()
      .refine((file) => !file || file.type.startsWith("image/"), {
        message: "Please upload a valid image file (e.g., JPEG, PNG)",
      })
      .optional(),

    audio: z
      .custom<File | undefined>()
      .refine((file) => !file || file.type.startsWith("audio/"), {
        message: "Please upload a valid audio file (e.g., WEBM, MP3)",
      })
      .optional(),

    PostId: z.string().uuid("Invalid post ID format").optional(),
    ParentCommentId: z
      .string()
      .uuid("Invalid parent comment ID format")
      .optional(),
  })
  .refine((data) => !!(data.PostId || data.ParentCommentId), {
    message: "Comment must be a reply to a post or another comment",
    path: ["PostId"],
  })
  .refine((data) => !!(data.content || data.image || data.audio), {
    message: "Add text, an image, or an audio file to your comment",
    path: ["content"],
  });

export type CommentSchema = z.infer<typeof commentSchema>;
