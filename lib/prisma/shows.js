import prisma from ".";

export async function getShows() {
  try {
    const shows = await prisma.show.findMany();
    return { shows };
  } catch (error) {
    return { error };
  }
}
