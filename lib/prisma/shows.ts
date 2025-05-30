import prisma from "./index";

import type { Show } from "@prisma/client";

// Get all shows
export async function getShows(): Promise<{ count?: number; shows?: Show[]; error?: string }> {
  try {
    const showCount = await prisma.show.count();
    const shows = await prisma.show.findMany({
      include: {
        favoritedBy: true,
        reviews: true,
        watchListedBy: true,
      },
    });
    return {
      count: showCount,
      shows: shows,
    };
  } catch (error) {
    return {
      error: `Failed to get all shows: ${error.message}`
    };
  } finally {
    await prisma.$disconnect();
  };
};

// Get a single show by ID
export const getShow = async (showID: string): Promise<{ show?: Show; error?: string }> => {
  try {
    const show = await prisma.show.findUnique({
      where: {
        id: showID,
      },
      include: {
        favoritedBy: true,
        reviews: true,
        watchListedBy: true,
      },
    });
    if (!show) {
      return { error: "Show not found." };
    }
    return { show };
  } catch (error) {
    return {
      error: `Failed to get show with ID ${showID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  };
};

// Search shows by name
export const searchShowsByName = async (nameQuery: string): Promise<{ count?: number; shows?: Show[]; error?: string; }> => {
  try {
    const shows = await prisma.show.findMany({
      where: {
        title: {
          contains: nameQuery,
          mode: "insensitive",
        },
      },
    });
    if (!shows) {
      return { error: "No shows found." };
    }
    return {
      count: shows.length,
      shows: shows,
    };
  } catch (error) {
    return {
      error: `Failed to search for ${nameQuery}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  };
};

// Create a show
export async function createShow(show: Omit<Show, "id">): Promise<{ show?: Show; error?: string }> {
  try {
    const showFromDB = await prisma.show.create({
      data: show,
    });
    return { show: showFromDB };
  } catch (error) {
    return {
      error: `Failed to create react: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  };
};

// Update a show
export const updateShow = async (showID: string, updateData: Partial<Show>): Promise<{ show?: Show; error?: string; }> => {
  try {
    const updatedShow = await prisma.show.update({
      where: { id: showID },
      data: updateData,
    });
    return { show: updatedShow };
  } catch (error) {
    return {
      error: `Failed to update show with ID ${showID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  };
};


// Delete a show
export async function deleteShow(showID: string): Promise<{ show?: Show; error?: string }> {
  try {
    const show = await prisma.show.delete({ where: { id: showID } });
    return { show };
  } catch (error) {
    return {
      error: `Failed to delete show with ID ${showID}: ${error.message}`,
    }
  } finally {
    await prisma.$disconnect();
  };
};
