import prisma from "./index";

export async function getFollows() {
  try {
    const followCount = await prisma.follow.count();
    const follows = await prisma.follow.findMany();
    return {
      count: followCount,
      follows: follows,
    };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export const getFollow = async (followID) => {
  try {
    const follow = await prisma.follow.findUnique({
      where: {
        id: followID,
      },
    });
    if (!follow) {
      return { error: "Follow not found." };
    }
    return { follow };
  } catch (error) {
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};

export async function createFollow(follow) {
  try {
    const followFromDB = await prisma.follow.create({
      data: follow,
    });
    return { follow: followFromDB };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteFollow(followID) {
  try {
    const follow = await prisma.follow.delete({ where: { id: followID } });
    return {
      follow: follow,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: `Failed to delete follow with ID ${followID}: ${error.message}`,
    };
  }
}
