import prisma from './index';

import type { ReactOnReview } from '@prisma/client';

// Get all reacts
export async function getReactOnReviews(): Promise<{
  count?: number;
  reactOnReviews?: ReactOnReview[];
  error?: string;
}> {
  try {
    const reactOnReviewCount = await prisma.reactOnReview.count();
    const reactOnReviews = await prisma.reactOnReview.findMany();
    return {
      count: reactOnReviewCount,
      reactOnReviews: reactOnReviews,
    };
  } catch (error) {
    return {
      error: `Failed to get all reacts: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Get a single react by ID
export const getReactOnReview = async (
  reactOnReviewID: string
): Promise<{ reactOnReview?: ReactOnReview; error?: string }> => {
  try {
    const reactOnReview = await prisma.reactOnReview.findUnique({
      where: {
        id: reactOnReviewID,
      },
    });
    if (!reactOnReview) {
      return { error: `ReactOnReview with ID: ${reactOnReviewID} not found.` };
    }
    return { reactOnReview };
  } catch (error) {
    return {
      error: `Failed to get react with ID ${reactOnReviewID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
};

// Create a react
export async function createReactOnReview(
  reactOnReview: Omit<ReactOnReview, 'id'>
): Promise<{ reactOnReview?: ReactOnReview; error?: string }> {
  try {
    const reactOnReviewFromDB = await prisma.reactOnReview.create({
      data: reactOnReview,
    });
    return { reactOnReview: reactOnReviewFromDB };
  } catch (error) {
    return {
      error: `Failed to create react: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a react by ID
export async function deleteReactOnReview(
  reactOnReviewID: string
): Promise<{ reactOnReview?: ReactOnReview; error?: string }> {
  try {
    const reactOnReview = await prisma.reactOnReview.delete({
      where: { id: reactOnReviewID },
    });
    return { reactOnReview };
  } catch (error) {
    return {
      error: `Failed to delete reactOnReview with ID ${reactOnReviewID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}
