import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getReviews() {
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
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export const getReview = async (reviewID) => {
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
      return { error: "Review not found." };
    }
    return { review };
  } catch (error) {
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

export async function createReview(review) {
  try {
    const reviewFromDB = await prisma.review.create({
      data: review,
    });
    return { review: reviewFromDB };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteReview(reviewID) {
  try {
    await prisma.$transaction(async (prisma) => {
      // First, find all comments associated with the review
      // const comments = await prisma.commentOnReview.findMany({
      //   where: { reviewId: reviewID },
      // });
      // const commentIds = comments.map((comment) => comment.id);

      // Delete ReactOnComment records associated with the found comments
      // if (commentIds.length > 0) {
      //   await prisma.reactOnComment.deleteMany({
      //     where: { commentId: { in: commentIds } },
      //   });
      // }

      // Delete the comments associated with the review
      await prisma.commentOnReview.deleteMany({
        where: { reviewId: reviewID },
      });

      // Finally, delete the review itself
      await prisma.review.delete({
        where: { id: reviewID },
      });
    });

    return {
      review: `Review with ID ${reviewID} and all its related components were successfully deleted.`,
      error: null,
    };
  } catch (error) {
    return {
      review: null,
      error: `Failed to delete review with ID ${reviewID}: ${error.message}`,
    };
  }
}
