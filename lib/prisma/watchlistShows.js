import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getWatchlistShows() {
  try {
    const watchlistShowCount = await prisma.watchlistShow.count();
    const watchlistShows = await prisma.watchlistShow.findMany();
    return {
      count: watchlistShowCount,
      watchlistShows: watchlistShows,
    };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export const getWatchlistShow = async (watchlistShowID) => {
  try {
    const watchlistShow = await prisma.watchlistShow.findUnique({
      where: {
        id: watchlistShowID,
      },
    });
    if (!watchlistShow) {
      return { error: "watchlistShow not found." };
    }
    return { watchlistShow };
  } catch (error) {
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

export async function createWatchlistShow(watchlistShow) {
  try {
    const watchlistShowFromDB = await prisma.watchlistShow.create({
      data: watchlistShow,
    });
    return { watchlistShows: watchlistShowFromDB };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteWatchlistShow(watchlistShowID) {
  try {
    const watchlistShow = await prisma.watchlistShow.delete({
      where: { id: watchlistShowID },
    });
    return watchlistShow;
  } catch (error) {
    return {
      error: `Failed to delete watchlistShow with ID ${watchlistShowID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}
