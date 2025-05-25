import prisma from "./index";
import type { Follow } from "@prisma/client";

// Get all follows
export async function getFollows(): Promise<
  | { count: number; follows: Follow[] }
  | { error: unknown }
> {
  try {
    const followCount = await prisma.follow.count();
    const follows = await prisma.follow.findMany();
    return {
      count: followCount,
      follows,
    };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

// Get a single follow by ID
export async function getFollow(
  followID: string
): Promise<{ follow?: Follow; error?: string }> {
  try {
    const follow = await prisma.follow.findUnique({
      where: { id: followID },
    });
    if (!follow) {
      return { error: "Follow not found." };
    }
    return { follow };
  } catch (error: any) {
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

// Create a follow
export async function createFollow(
  follow: Omit<Follow, "id">
): Promise<{ follow?: Follow; error?: unknown }> {
  try {
    const followFromDB = await prisma.follow.create({ data: follow });
    return { follow: followFromDB };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a follow by ID
export async function deleteFollow(
  followID: string
): Promise<{ follow?: Follow; error: string | null }> {
  try {
    const follow = await prisma.follow.delete({ where: { id: followID } });
    return { follow, error: null };
  } catch (error: any) {
    return {
      error: `Failed to delete follow with ID ${followID}: ${error.message}`,
    };
  }
}
