/*
  Warnings:

  - You are about to drop the column `username` on the `CommentOnReview` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `ReactOnReview` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CommentOnReview" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "ReactOnReview" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "username";
