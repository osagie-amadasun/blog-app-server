-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "author" DROP DEFAULT,
ALTER COLUMN "content" DROP DEFAULT;
