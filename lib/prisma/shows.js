import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getShows() {
  try {
    const showCount = await prisma.show.count();
    const shows = await prisma.show.findMany({
      include: {
        favoritedBy: true,
        reviews: true,
      },
    });
    return {
      count: showCount,
      shows: shows,
    };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createShow(show) {
  try {
    const prisma = new PrismaClient();
    const showFromDB = await prisma.show.create({
      data: show,
    });
    return { show: showFromDB };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteShow(showID) {
  try {
    const show = await prisma.show.delete({ where: { id: showID } });
    return {
      show: show,
      error: null,
    };
  } catch (error) {
    return {
      show: null,
      error: `Failed to delete show with ID ${showID}: ${error.message}`,
    };
  }
}
