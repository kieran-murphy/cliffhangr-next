import prisma from ".";

export async function getShows() {
  try {
    const shows = await prisma.show.findMany({
      include: {
        favoritedBy: true,
        reviews: true,
      },
    });
    return { shows };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

// export async function createShow(show) {
//   try {
//     const showFromDB = await prisma.show.create({
//       data: show,
//     });
//     return { show: showFromDB };
//   } catch (error) {
//     return { error };
//   }
// }

// export async function deleteShow(showID) {
//   try {
//     const show = await prisma.show.findUnique({
//       where: { id: showID },
//       //   include: { accords: true },
//     });
//     // for (const accord of fragrance.accords) {
//     //   await prisma.accord.delete({ where: { id: accord.id } });
//     // }
//     // Delete the show itself
//     await prisma.show.delete({ where: { id: showID } });
//   } catch (error) {
//     return {
//       error: `Failed to delete show with ID ${showID}: ${error.message}`,
//     };
//   }
// }
