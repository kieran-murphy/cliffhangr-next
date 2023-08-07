import prisma from ".";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return { users };
  } catch (error) {
    return { error };
  }
}

export async function createUser(user) {
  try {
    const userFromDB = await prisma.user.create({
      data: user,
    });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

export async function deleteUser(userID) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userID },
      //   include: { accords: true },
    });
    // for (const accord of fragrance.accords) {
    //   await prisma.accord.delete({ where: { id: accord.id } });
    // }
    // Delete the show itself
    await prisma.user.delete({ where: { id: userID } });
  } catch (error) {
    return {
      error: `Failed to delete user with ID ${userID}: ${error.message}`,
    };
  }
}
