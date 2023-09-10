import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getFavoriteShows() {
  try {
    const favoriteShows = await prisma.FavoriteShow.findMany();
    return { favoriteShows };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createFavoriteShow(favoriteShow) {
  try {
    const prisma = new PrismaClient();
    const favoriteShowFromDB = await prisma.FavoriteShow.create({
      data: favoriteShow,
    });
    return { favoriteShows: favoriteShowFromDB };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteFavoriteShow(favoriteShowID) {
  try {
    const favoriteShow = await prisma.FavoriteShow.delete({
      where: { id: favoriteShowID },
    });
    return favoriteShow;
  } catch (error) {
    return {
      error: `Failed to delete favoriteShow with ID ${favoriteShowID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}