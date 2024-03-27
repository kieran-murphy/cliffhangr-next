/*
  Warnings:

  - Added the required column `seasons` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Show" ADD COLUMN     "seasons" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
