import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        favoriteShows: true,
        reactOnReviews: true,
        writtenReviews: true,
        CommentOnReview: true,
        ReactOnComment: true,
      },
    });
    return { users };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createUser(user) {
  try {
    const prisma = new PrismaClient();
    const userFromDB = await prisma.user.create({
      data: user,
    });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUser(userID) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userID },
    });
    await prisma.user.delete({ where: { id: userID } });
  } catch (error) {
    return {
      error: `Failed to delete user with ID ${userID}: ${error.message}`,
    };
  }
}
