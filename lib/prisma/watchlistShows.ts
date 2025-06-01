import prisma from "./index";

import type { WatchlistShow } from "@prisma/client";

// Get all watchlistShows
export async function getWatchlistShows(): Promise<{ count?: number; watchlistShows?: WatchlistShow[]; error?: string; }> {
  try {
    const watchlistShowCount = await prisma.watchlistShow.count();
    const watchlistShows = await prisma.watchlistShow.findMany();
    return {
      count: watchlistShowCount,
      watchlistShows: watchlistShows,
    };
  } catch (error) {
    return {
      error: `Failed to get all watchlistShows: ${error.message}`
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Get a single watchlistShow by ID
export const getWatchlistShow = async (watchlistShowID: string): Promise<{ watchlistShow?: WatchlistShow; error?: string; }> => {
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
    return {
      error: `Failed to get watchlistShow with ID ${watchlistShowID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
};

// Create a new watchlistShow
export async function createWatchlistShow(watchlistShow: Omit<WatchlistShow, "id">): Promise<{ watchlistShow?: WatchlistShow; error?: string; }> {
  try {
    const watchlistShowFromDB = await prisma.watchlistShow.create({
      data: watchlistShow,
    });
    return { watchlistShow: watchlistShowFromDB };
  } catch (error) {
    return {
      error: `Failed to create watchlistShow: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a watchlistShow
export async function deleteWatchlistShow(watchlistShowID: string): Promise<{ watchlistShow?: WatchlistShow; error?: string; }> {
  try {
    const watchlistShow = await prisma.watchlistShow.delete({
      where: { id: watchlistShowID },
    });
    return { watchlistShow } ;
  } catch (error) {
    return {
      error: `Failed to delete watchlistShow with ID ${watchlistShowID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}
