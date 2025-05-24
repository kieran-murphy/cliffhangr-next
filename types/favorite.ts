import { Prisma } from "@prisma/client";

export type FavoriteType = Prisma.FavoriteShowGetPayload<{
  include: { show: true };
}>;