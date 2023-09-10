import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getReactOnComments() {
  try {
    const reactOnComments = await prisma.ReactOnComment.findMany();
    return { reactOnComments };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createReactOnComment(reactOnComment) {
  try {
    const prisma = new PrismaClient();
    const reactOnCommentFromDB = await prisma.ReactOnComment.create({
      data: reactOnComment,
    });
    return { reactOnComment: reactOnCommentFromDB };
  } catch (error) {
    return { error };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteReactOnComment(reactOnCommentID) {
  try {
    const reactOnComment = await prisma.ReactOnComment.delete({
      where: { id: reactOnCommentID },
    });
    return reactOnComment;
  } catch (error) {
    return {
      error: `Failed to delete reactOnComment with ID ${reactOnCommentID}: ${error.message}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}
