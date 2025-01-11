/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "comments_email_key" ON "comments"("email");
