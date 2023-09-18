import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getReactOnReviews() {
  try {
    const reactOnReviewCount = await prisma.ReactOnReview.count();
    const reactOnReviews = await prisma.ReactOnReview.findMany();
    return {
      count: reactOnReviewCount,
      reactOnReviews: reactOnReviews,
    };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createReactOnReview(reactOnReview) {
  try {
    const prisma = new PrismaClient();
    const reactOnReviewFromDB = await prisma.ReactOnReview.create({
      data: reactOnReview,
    });
    return { reactOnReview: reactOnReviewFromDB };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteReactOnReview(reactOnReviewID) {
  try {
    const reactOnReview = await prisma.ReactOnReview.delete({
      where: { id: reactOnReviewID },
    });
    return reactOnReview;
  } catch (error) {
    return {
      error: `Failed to delete reactOnReview with ID ${reactOnReviewID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}
