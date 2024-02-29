import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCommentOnReviews() {
  try {
    const commentOnReviewCount = await prisma.CommentOnReview.count();
    const commentOnReviews = await prisma.CommentOnReview.findMany();
    return {
      count: commentOnReviewCount,
      commentOnReviews: commentOnReviews,
    };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export const getCommentOnReview = async (commentOnReviewID) => {
  try {
    const commentOnReview = await prisma.CommentOnReview.findUnique({
      where: {
        id: commentOnReviewID,
      },
    });
    if (!commentOnReview) {
      return { error: "CommentOnReview not found." };
    }
    return { commentOnReview };
  } catch (error) {
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

export async function createCommentOnReview(commentOnReview) {
  try {
    const commentOnReviewFromDB = await prisma.CommentOnReview.create({
      data: commentOnReview,
    });
    return { commentOnReview: commentOnReviewFromDB };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateCommentOnReview(commentOnReviewID, updateData) {
  try {
    const updatedCommentOnReview = await prisma.CommentOnReview.update({
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

export async function deleteCommentOnReview(commentOnReviewID) {
  try {
    const commentOnReview = await prisma.CommentOnReview.delete({
      where: { id: commentOnReviewID },
    });
    return commentOnReview;
  } catch (error) {
    return {
      error: `Failed to delete commentOnReview with ID ${commentOnReviewID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}
