import { prisma } from "../../../configs/db";
import { Blog } from "../../../db/prisma/generated/prisma";

const createBlog = async (
  payload: {
    title: string;
    content: string;
    categories: string[];
    tags?: string[];
  },
  poster: string,
  galleries: Express.Multer.File[]
) => {
  // Define the type for the new blog
  type NewBlog = Omit<Blog, "id" | "createdAt" | "updatedAt" | "published">;

  // Create the new blog object
  const newBlog: NewBlog = {
    title: payload.title,
    slug: payload.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, ""),
    poster: poster,
    content: payload.content,
    excerpt: payload.content.substring(0, 100) + "...",
    authorId: 2, // hardcoded for now
    views: 0,
  };

  // * Use a transaction to ensure all related operations are atomic
  await prisma.$transaction(async (tx) => {
    // * Create the blog entry
    const createdBlog = await tx.blog.create({ data: newBlog });

    // * Create gallery entries
    await Promise.all(
      galleries.map((file) =>
        tx.gallery.create({
          data: { blogId: createdBlog.id, url: file.path },
        })
      )
    );

    // * Link categories to the blog
    await Promise.all(
      payload.categories.map((categoryId) =>
        tx.blogCategory.create({
          data: { blogId: createdBlog.id, categoryId: Number(categoryId) },
        })
      )
    );

    // * Handle tags: create if not exist and link to the blog
    if (payload.tags) {
      await Promise.all(
        payload.tags.map(async (tag) => {
          const createdTag = await tx.tag.upsert({
            where: { name: tag },
            update: {},
            create: { name: tag },
          });
          await tx.blogTag.create({
            data: { blogId: createdBlog.id, tagId: createdTag.id },
          });
        })
      );
    }
  });
};

export const blogService = {
  createBlog,
};
