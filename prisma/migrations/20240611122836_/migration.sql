/*
  Warnings:

  - Added the required column `username` to the `CommentOnReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentOnReview" ADD COLUMN     "username" TEXT NOT NULL;
