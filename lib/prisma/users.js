import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function getUsers() {
  try {
    const userCount = await prisma.user.count();
    const users = await prisma.user.findMany({
      include: {
        favoriteShows: true,
        reactOnReviews: true,
        writtenReviews: true,
        CommentOnReview: true,
        following: true,
        followers: true,
      },
    });
    return {
      count: userCount,
      users: users,
    };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export const getUser = async (userID) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
      include: {
        favoriteShows: true,
        reactOnReviews: true,
        writtenReviews: true,
        CommentOnReview: true,
        followers: true,
        following: true,
      },
    });
    if (!user) {
      return { error: "User not found." };
    }
    return { user };
  } catch (error) {
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

export const getUserForLogin = async (nameQuery) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: nameQuery,
      },
    });
    if (!user) {
      return { error: "User not found." };
    }
    return { user };
  } catch (error) {
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

export const searchUsersByName = async (nameQuery) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: nameQuery,
          mode: "insensitive", // Case insensitive search
        },
      },
    });

    if (!users) {
      return { error: "No users found." };
    }

    return {
      count: users.length,
      users: users,
    };
  } catch (error) {
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

export async function createUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  try {
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

export const updateUser = async (userID, data) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userID },
      data: data,
    });

    if (!updatedUser) {
      return { error: "User update failed." };
    }

    return { user: updatedUser };
  } catch (error) {
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

export async function deleteUser(userID) {
  try {
    const user = await prisma.user.delete({ where: { id: userID } });
    return {
      user: user,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: `Failed to delete user with ID ${userID}: ${error.message}`,
    };
  }
}
