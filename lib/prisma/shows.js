import prisma from ".";

export async function getShows() {
  try {
    const shows = await prisma.show.findMany();
    return { shows };
  } catch (error) {
    return { error };
  }
}

export async function createShow(show) {
  try {
    const showFromDB = await prisma.show.create({
      data: show,
    });
    return { show: showFromDB };
  } catch (error) {
    return { error };
  }
}
