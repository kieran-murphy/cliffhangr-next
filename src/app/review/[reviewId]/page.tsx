import React from "react";
import prisma from "@/lib/prisma";
import ReviewClient from "./ReviewClient";

interface PageProps {
  params: {
    reviewId: string;
  };
}

const ReviewPage = async ({ params }: PageProps): Promise<React.JSX.Element> => {
  const review = await prisma.review.findUnique({
    where: { id: params.reviewId },
    include: {
      user: true,
      reactOnReviews: { include: { user: true } },
      CommentOnReview: { include: { user: true } },
      show: true,
    },
  });

  if (!review) {
    throw new Error(`Review with id=${params.reviewId} not found`);
  }

  return <ReviewClient review={review} />;
}

export default ReviewPage;