import prisma from './index';
import type { FavoriteShow } from '@prisma/client';

// Get all favorites
export async function getFavoriteShows(): Promise<{
  count?: number;
  favoriteShows?: FavoriteShow[];
  error?: string;
}> {
  try {
    const favoriteShowCount = await prisma.favoriteShow.count();
    const favoriteShows = await prisma.favoriteShow.findMany();
    return {
      count: favoriteShowCount,
      favoriteShows: favoriteShows,
    };
  } catch (error) {
    return { error: error.message ?? 'Failed to get follows' };
  } finally {
    await prisma.$disconnect();
  }
}

// Get a single favorite by ID
export async function getFavoriteShow(
  favoriteShowID: string
): Promise<{ favoriteShow?: FavoriteShow; error?: string }> {
  try {
    const favoriteShow = await prisma.favoriteShow.findUnique({
      where: {
        id: favoriteShowID,
      },
    });
    if (!favoriteShow) {
      return { error: 'FavoriteShow not found.' };
    }
    return { favoriteShow };
  } catch (error) {
    return { error: error.message ?? 'Failed to get favorite' };
  } finally {
    await prisma.$disconnect();
  }
}

// Create a favorite
export async function createFavoriteShow(
  favoriteShow: Omit<FavoriteShow, 'id'>
): Promise<{ favoriteShow?: FavoriteShow; error?: string }> {
  try {
    const favoriteShowFromDB = await prisma.favoriteShow.create({
      data: favoriteShow,
    });
    return { favoriteShow: favoriteShowFromDB };
  } catch (error) {
    return { error: error.message ?? 'Failed to create favorite' };
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a favorite by ID
export async function deleteFavoriteShow(
  favoriteShowID: string
): Promise<{ favoriteShow?: FavoriteShow; error?: string }> {
  try {
    const favoriteShow = await prisma.favoriteShow.delete({
      where: { id: favoriteShowID },
    });
    return { favoriteShow };
  } catch (error) {
    return { error: error.message ?? 'Failed to delete favorite' };
  } finally {
    await prisma.$disconnect();
  }
}
