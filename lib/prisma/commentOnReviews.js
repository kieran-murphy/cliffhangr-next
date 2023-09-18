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

export async function createCommentOnReview(commentOnReview) {
  try {
    const prisma = new PrismaClient();
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
