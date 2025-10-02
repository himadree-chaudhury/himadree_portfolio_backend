import z from "zod";

export const blogValidationSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(50, "Title must be at most 50 characters long"),
  slug: z
    .string()
    .min(5, "Slug must be at least 5 characters long")
    .max(20, "Slug must be at most 20 characters long"),
  content: z.string().min(20, "Content must be at least 20 characters long"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  tags: z.array(z.string()).optional(),
});

//   galleries: z
//     .array(z.any())
//     .refine(
//       (files) => files.every((file) => file instanceof File),
//       "Each gallery item must be a file"
//     )
//     .refine(
//       (files) => files.every((file) => file.size <= 5 * 1024 * 1024),
//       "Each gallery image must be less than 5MB"
//     )
//     .refine(
//       (files) =>
//         files.every((file) =>
//           ["image/jpeg", "image/png", "image/webp"].includes(file.type)
//         ),
//       "Only .jpg, .png, .webp formats are supported"
//     )
//     .optional(),
//   poster: z
//     .any()
//     .refine((file) => file instanceof File, "Poster must be a file")
//     .refine((file) => file?.size <= 5 * 1024 * 1024, "Max file size is 5MB")
//     .refine(
//       (file) => ["image/jpeg", "image/png", "image/webp"].includes(file?.type),
//       "Only .jpg, .png, .webp formats are supported"
//     ),
