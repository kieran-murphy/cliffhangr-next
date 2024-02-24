/*
  Warnings:

  - You are about to drop the `ReactOnComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReactOnComment" DROP CONSTRAINT "ReactOnComment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "ReactOnComment" DROP CONSTRAINT "ReactOnComment_userId_fkey";

-- DropTable
DROP TABLE "ReactOnComment";
