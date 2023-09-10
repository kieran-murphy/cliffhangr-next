-- DropForeignKey
ALTER TABLE "CommentOnReview" DROP CONSTRAINT "CommentOnReview_userId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteShow" DROP CONSTRAINT "FavoriteShow_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReactOnComment" DROP CONSTRAINT "ReactOnComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReactOnReview" DROP CONSTRAINT "ReactOnReview_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AddForeignKey
ALTER TABLE "FavoriteShow" ADD CONSTRAINT "FavoriteShow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReactOnReview" ADD CONSTRAINT "ReactOnReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentOnReview" ADD CONSTRAINT "CommentOnReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReactOnComment" ADD CONSTRAINT "ReactOnComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
