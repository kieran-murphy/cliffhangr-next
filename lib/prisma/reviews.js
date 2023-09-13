import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getReviews() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        reactOnReviews: true,
        CommentOnReview: true,
      },
    });
    return { reviews };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createReview(review) {
  try {
    const prisma = new PrismaClient();
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
    const review = await prisma.review.findUnique({
      where: { id: reviewID },
    });
    await prisma.review.delete({ where: { id: reviewID } });
  } catch (error) {
    return {
      error: `Failed to delete review with ID ${reviewID}: ${error.message}`,
    };
  }
}
