import prisma from "./index";

import type { CommentOnReview } from "@prisma/client";

// Get all comments
export async function getCommentOnReviews(): Promise<| { count?: number; commentOnReviews?: CommentOnReview[]; error?: string }> {
  try {
    const commentOnReviewCount = await prisma.commentOnReview.count();
    const commentOnReviews = await prisma.commentOnReview.findMany();
    return {
      count: commentOnReviewCount,
      commentOnReviews: commentOnReviews,
    };
  } catch (error) {
    return {
      error: `Failed to get all comments: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Get a single comment by ID
export async function getCommentOnReview(commentOnReviewID: string): Promise<{ commentOnReview?: CommentOnReview; error?: string; }> {
  try {
    const commentOnReview = await prisma.commentOnReview.findUnique({
      where: {
        id: commentOnReviewID,
      },
    });
    if (!commentOnReview) {
      return { error: "CommentOnReview not found." };
    }
    return { commentOnReview };
  } catch (error) {
    return {
      error: `Failed to get comment with ID ${commentOnReviewID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
};

// Create a comment
export async function createCommentOnReview(commentOnReview: Omit<CommentOnReview, "id">): Promise<{ commentOnReview?: CommentOnReview; error?: string }> {
  try {
    const commentOnReviewFromDB = await prisma.commentOnReview.create({
      data: commentOnReview,
    });
    return { commentOnReview: commentOnReviewFromDB };
  } catch (error) {
    return {
      error: `Failed to create comment: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Update a comment
export async function updateCommentOnReview(commentOnReviewID: string, updateData: Partial<CommentOnReview>): Promise<{ commentOnReview?: CommentOnReview; error?: string }> {
  try {
    const updatedCommentOnReview = await prisma.commentOnReview.update({
      where: {
        id: commentOnReviewID,
      },
      data: updateData,
    });
    return { commentOnReview: updatedCommentOnReview };
  } catch (error) {
    return {
      error: `Failed to update commentOnReview with ID ${commentOnReviewID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a comment by ID
export async function deleteCommentOnReview(commentOnReviewID: string): Promise<{ commentOnReview?: CommentOnReview; error?: string }> {
  try {
    const commentOnReview = await prisma.commentOnReview.delete({
      where: { id: commentOnReviewID },
    });
    return { commentOnReview };
  } catch (error) {
    return {
      error: `Failed to delete commentOnReview with ID ${commentOnReviewID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}
