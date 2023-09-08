import prisma from ".";

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

// export async function createReview(review) {
//   try {
//     const reviewFromDB = await prisma.review.create({
//       data: review,
//     });
//     return { review: reviewFromDB };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function deleteReview(reviewID) {
//   try {
//     const review = await prisma.review.findUnique({
//       where: { id: reviewID },
//     });
//     for (const accord of fragrance.accords) {
//       await prisma.accord.delete({ where: { id: accord.id } });
//     }
//     await prisma.review.delete({ where: { id: reviewID } });
//   } catch (error) {
//     return {
//       error: `Failed to delete review with ID ${reviewID}: ${error.message}`,
//     };
//   }
// }
