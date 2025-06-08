import React from 'react';
import prisma from '@/lib/prisma';
import ReviewClient from './ReviewClient';
import NotFoundMessage from '@/components/NotFoundMessage';

interface PageProps {
  params: {
    reviewId: string;
  };
}

const ReviewPage = async ({ params }: PageProps): Promise<React.JSX.Element> => {
  const { reviewId } = await params;
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    include: {
      user: true,
      reactOnReviews: { include: { user: true } },
      CommentOnReview: { include: { user: true } },
      show: true,
    },
  });

  if (!review) {
    const errorMsg = `Review with id="${reviewId}" not found.`;
    return <NotFoundMessage error={errorMsg} />;
  }

  return <ReviewClient review={review} />;
};

export default ReviewPage;
