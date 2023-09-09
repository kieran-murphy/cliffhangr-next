/*
  Warnings:

  - The primary key for the `FavoriteShow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ReactOnComment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ReactOnReview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,reviewId]` on the table `CommentOnReview` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,showId]` on the table `FavoriteShow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,commentId]` on the table `ReactOnComment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,reviewId]` on the table `ReactOnReview` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `FavoriteShow` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `ReactOnComment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `ReactOnReview` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "FavoriteShow" DROP CONSTRAINT "FavoriteShow_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "FavoriteShow_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ReactOnComment" DROP CONSTRAINT "ReactOnComment_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ReactOnComment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ReactOnReview" DROP CONSTRAINT "ReactOnReview_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ReactOnReview_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "CommentOnReview_userId_reviewId_key" ON "CommentOnReview"("userId", "reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteShow_userId_showId_key" ON "FavoriteShow"("userId", "showId");

-- CreateIndex
CREATE UNIQUE INDEX "ReactOnComment_userId_commentId_key" ON "ReactOnComment"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "ReactOnReview_userId_reviewId_key" ON "ReactOnReview"("userId", "reviewId");
