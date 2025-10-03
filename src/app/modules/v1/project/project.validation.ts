import z from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(50, "Title must be at most 50 characters long"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long"),
  excerpt: z
    .string()
    .max(150, "Excerpt must be at most 150 characters long")
    .optional(),
  links: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, {
            message: "Link name must be at least 2 characters long",
          })
          .max(20, {
            message: "Link name must be at most 20 characters long",
          }),
        url: z.url("Please enter a valid URL"),
      })
    )
    .min(1, "At least one link is required"),
  technologies: z
    .array(
      z
        .string()
        .min(2, {
          message: "Technology name must be at least 2 characters long",
        })
        .max(50, {
          message: "Technology name must be at most 50 characters long",
        })
    )
    .min(1, "At least one technology is required"),
});
