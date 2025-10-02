import { prisma } from "../../../configs/db";
import { Blog } from "../../../db/prisma/generated/prisma";
import { CustomError } from "../../../utils/error";

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

const getAllBlogs = async () => {
  const blogs = await prisma.blog.findMany();
  return blogs;
};

const getBlog = async (slug: string) => {
  const blog = await prisma.blog.update({
    where: { slug },
    data: { views: { increment: 1 } },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      categories: {
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      tags: {
        include: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
      galleries: {
        select: {
          url: true,
        },
      },
      comments: true,
    },
  });
  if (!blog) {
    throw CustomError.notFound({
      message: "Blog not found",
      errors: ["The requested blog does not exist."],
      hints: "Please check the blog slug and try again.",
    });
  }

  return blog;
};

export const blogService = {
  createBlog,
  getAllBlogs,
  getBlog,
};
