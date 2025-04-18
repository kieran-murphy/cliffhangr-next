import prisma from "./index";

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

export const getReactOnReview = async (reactOnReviewID) => {
  try {
    const reactOnReview = await prisma.ReactOnReview.findUnique({
      where: {
        id: reactOnReviewID,
      },
    });
    if (!reactOnReview) {
      return { error: "ReactOnReview not found." };
    }
    return { reactOnReview };
  } catch (error) {
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

export async function createReactOnReview(reactOnReview) {
  try {
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
