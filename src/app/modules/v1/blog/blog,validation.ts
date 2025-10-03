import z from "zod";

export const blogValidationSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(50, "Title must be at most 50 characters long"),
  content: z.string().min(20, "Content must be at least 20 characters long"),
    excerpt: z
      .string()
      .max(150, "Excerpt must be at most 150 characters long")
      .optional(),
  categories: z.array(z.number()).min(1, "At least one category is required"),
  tags: z.array(z.string()).optional(),
});

