/*
  Warnings:

  - You are about to drop the column `body` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "body",
DROP COLUMN "image",
ADD COLUMN     "author" TEXT NOT NULL DEFAULT 'Default author',
ADD COLUMN     "content" TEXT NOT NULL DEFAULT 'Default content',
ADD COLUMN     "images" TEXT DEFAULT 'image.png';
