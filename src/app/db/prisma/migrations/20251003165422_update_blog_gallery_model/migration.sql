/*
  Warnings:

  - You are about to drop the `Gallery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Gallery" DROP CONSTRAINT "Gallery_blogId_fkey";

-- DropTable
DROP TABLE "public"."Gallery";

-- CreateTable
CREATE TABLE "BlogGallery" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "BlogGallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogGallery" ADD CONSTRAINT "BlogGallery_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
