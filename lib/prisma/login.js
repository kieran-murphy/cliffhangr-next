import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function validateLogin(login) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: login.username,
          mode: "insensitive",
        },
      },
    });
    const result = await bcrypt.compare(login.password, user.hashedPassword);
    return { result: result };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}
