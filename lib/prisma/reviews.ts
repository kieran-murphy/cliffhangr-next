import { getErrorMessage } from '@/utils/error';
import prisma from './index';

import type { Review } from '@prisma/client';

// Get all reviews
export async function getReviews(): Promise<{
  count?: number;
  reviews?: Review[];
  error?: string;
}> {
  try {
    const reviewCount = await prisma.review.count();
    const reviews = await prisma.review.findMany({
      include: {
        reactOnReviews: true,
        CommentOnReview: true,
      },
    });
    return {
      count: reviewCount,
      reviews: reviews,
    };
  } catch (error) {
    return {
      error: `Failed to get all reviews: ${getErrorMessage(error)}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Get a single review by ID
export const getReview = async (reviewID: string): Promise<{ review?: Review; error?: string }> => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: reviewID,
      },
      include: {
        reactOnReviews: true,
        CommentOnReview: true,
      },
    });
    if (!review) {
      return { error: 'Review not found.' };
    }
    return { review };
  } catch (error) {
    return {
      error: `Failed to get review with ID ${reviewID}: ${getErrorMessage(error)}`,
    };
  } finally {
    await prisma.$disconnect();
  }
};

// Create a review
export async function createReview(
  review: Omit<Review, 'id'>
): Promise<{ review?: Review; error?: string }> {
  try {
    const reviewFromDB = await prisma.review.create({
      data: review,
    });
    return { review: reviewFromDB };
  } catch (error) {
    return {
      error: `Failed to create react: ${getErrorMessage(error)}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a review
export async function deleteReview(reviewID: string): Promise<{ review?: Review; error?: string }> {
  try {
    const review = await prisma.$transaction(async (prisma) => {
      // Delete associated comments first
      await prisma.commentOnReview.deleteMany({
        where: { reviewId: reviewID },
      });
      // Delete and return the review itself
      const deleted = await prisma.review.delete({
        where: { id: reviewID },
      });
      return deleted;
    });

    return { review };
  } catch (error) {
    return {
      error: `Failed to delete review with ID ${reviewID}: ${getErrorMessage(error)}`,
    };
  }
}
