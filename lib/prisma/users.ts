import prisma from './index';
import bcrypt from 'bcrypt';
import { getErrorMessage } from '@/utils/error';

import type { User } from '@prisma/client';

// Get all users
export async function getUsers(): Promise<{ count?: number; users?: User[]; error?: string }> {
  try {
    const userCount = await prisma.user.count();
    const users = await prisma.user.findMany({
      include: {
        favoriteShows: true,
        watchlistShows: true,
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
    return {
      error: `Failed to get all users: ${getErrorMessage(error)}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Get a single user by ID
export const getUser = async (userID: string): Promise<{ user?: User; error?: string }> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
      include: {
        writtenReviews: {
          include: { show: true },
        },
        favoriteShows: {
          include: { show: true },
        },
        watchlistShows: {
          include: { show: true },
        },
        followers: {
          select: {
            id: true,
            followerId: true,
            followingId: true,
            followed: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        following: {
          select: {
            id: true,
            followerId: true,
            followingId: true,
            followedBy: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      return { error: 'User not found.' };
    }
    return { user };
  } catch (error) {
    return {
      error: `Failed to get user with ID ${userID}: ${getErrorMessage(error)}`,
    };
  } finally {
    await prisma.$disconnect();
  }
};

// Search users by name
export const searchUsersByName = async (
  nameQuery: string
): Promise<{ count?: number; users?: User[]; error?: string }> => {
  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: nameQuery,
          mode: 'insensitive',
        },
      },
    });

    if (!users) {
      return { error: 'No users found.' };
    }

    return {
      count: users.length,
      users: users,
    };
  } catch (error) {
    return {
      error: `Failed to search for ${nameQuery}: ${getErrorMessage(error)}`,
    };
  } finally {
    await prisma.$disconnect();
  }
};

// Create a new user
export async function createUser(
  user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
): Promise<{ user?: User; error?: string }> {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  try {
    const userFromDB = await prisma.user.create({
      data: user,
    });
    return { user: userFromDB };
  } catch (error) {
    return {
      error: `Failed to create user: ${getErrorMessage(error)}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Update a user
export const updateUser = async (
  userID: string,
  updateData: Partial<User>
): Promise<{ user?: User; error?: string }> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userID },
      data: updateData,
    });
    return { user: updatedUser };
  } catch (error) {
    return {
      error: `Failed to update user with ID ${userID}: ${getErrorMessage(error)}`,
    };
  } finally {
    await prisma.$disconnect();
  }
};

// Delete a user
export async function deleteUser(userID: string): Promise<{ user?: User; error?: string }> {
  try {
    const user = await prisma.user.delete({ where: { id: userID } });
    return {
      user: user,
    };
  } catch (error) {
    return {
      error: `Failed to delete user with ID ${userID}: ${getErrorMessage(error)}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}
