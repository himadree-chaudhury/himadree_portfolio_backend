import { Category } from "../../../db/prisma/generated/prisma";
import { CustomError } from "../../../utils/error";
import { prisma } from "./../../../configs/db";

const createCategory = async (payload: Category) => {
  const isCategoryExists = await prisma.category.findUnique({
    where: { name: payload.name },
  });
  if (isCategoryExists) {
    const error = CustomError.conflict({
      message: "Category already exists",
      errors: ["A category with this name already exists."],
      hints: "Please check the category name and try again.",
    });
    throw error;
  }

  await prisma.category.create({
    data: payload,
  });
};
export const categoryService = {
  createCategory,
};
