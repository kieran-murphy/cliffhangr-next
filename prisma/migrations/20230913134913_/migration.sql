-- DropForeignKey
ALTER TABLE "CommentOnReview" DROP CONSTRAINT "CommentOnReview_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteShow" DROP CONSTRAINT "FavoriteShow_showId_fkey";

-- DropForeignKey
ALTER TABLE "ReactOnReview" DROP CONSTRAINT "ReactOnReview_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_showId_fkey";

-- AddForeignKey
ALTER TABLE "FavoriteShow" ADD CONSTRAINT "FavoriteShow_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReactOnReview" ADD CONSTRAINT "ReactOnReview_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentOnReview" ADD CONSTRAINT "CommentOnReview_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
