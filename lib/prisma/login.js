import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function validateLogin(login) {
  const username = login.username;
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    if (!user) {
      // User not found
      console.log("User not found");
      return { token: null, error: "User not found" };
    }
    const result = await bcrypt.compare(login.password, user.password);
    if (result) {
      // Create a JWT token
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Set token expiration
      });
      return { token, error: null };
    } else {
      // Authentication failed
      console.log("Authentication failed");
      return { token: null, error: "Authentication failed" };
    }
  } catch (error) {
    console.error(error);
    return { token: null, error: error.message || "An error occurred" };
  } finally {
    await prisma.$disconnect();
  }
}
