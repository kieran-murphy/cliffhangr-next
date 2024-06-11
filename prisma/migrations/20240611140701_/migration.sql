/*
  Warnings:

  - Added the required column `username` to the `ReactOnReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReactOnReview" ADD COLUMN     "username" TEXT NOT NULL;
