import { Prisma } from "@prisma/client"

export type ReactType = Prisma.ReactOnReviewGetPayload<{
  include: {
    user: true;
  }; 
}>;

