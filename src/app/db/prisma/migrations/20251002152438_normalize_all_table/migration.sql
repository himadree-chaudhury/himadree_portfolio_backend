/*
  Warnings:

  - You are about to drop the column `gallery` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the `_BlogCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlogTags` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `isBlocked` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."_BlogCategories" DROP CONSTRAINT "_BlogCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_BlogCategories" DROP CONSTRAINT "_BlogCategories_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_BlogTags" DROP CONSTRAINT "_BlogTags_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_BlogTags" DROP CONSTRAINT "_BlogTags_B_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "gallery";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isBlocked" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL;

-- DropTable
DROP TABLE "public"."_BlogCategories";

-- DropTable
DROP TABLE "public"."_BlogTags";

-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogCategory" (
    "blogId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "BlogCategory_pkey" PRIMARY KEY ("blogId","categoryId")
);

-- CreateTable
CREATE TABLE "BlogTag" (
    "blogId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "BlogTag_pkey" PRIMARY KEY ("blogId","tagId")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "userId" INTEGER NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId","blogId")
);

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogCategory" ADD CONSTRAINT "BlogCategory_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogCategory" ADD CONSTRAINT "BlogCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogTag" ADD CONSTRAINT "BlogTag_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogTag" ADD CONSTRAINT "BlogTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
