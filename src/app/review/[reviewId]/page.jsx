import prisma from "@/lib/prisma";
import ReviewClient from "./ReviewClient";

export default async function Page({ params }) {
  const review = await prisma.review.findUnique({
    where: { id: params.reviewId },
    include: {
      user: true,
      reactOnReviews: {
        include: {
          user: true,
        },
      },
      CommentOnReview: {
        include: {
          user: true,
        },
      },
      show: true,
    },
  });

  return <ReviewClient review={review} />;
}