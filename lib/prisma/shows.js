import prisma from "./index";

export async function getShows() {
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
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export const getShow = async (showID) => {
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
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

export const searchShowsByName = async (nameQuery) => {
  try {
    const shows = await prisma.show.findMany({
      where: {
        title: {
          contains: nameQuery,
          mode: "insensitive", // Case insensitive search
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
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

export async function createShow(show) {
  try {
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

export const updateShow = async (showID, data) => {
  try {
    const updatedShow = await prisma.show.update({
      where: { id: showID },
      data: data,
    });

    if (!updatedShow) {
      return { error: "Show update failed." };
    }

    return { show: updatedShow };
  } catch (error) {
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

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
