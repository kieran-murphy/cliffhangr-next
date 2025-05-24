import { Prisma } from "@prisma/client";

export type WatchlistItem = Prisma.WatchlistShowGetPayload<{
  include: {
    show: true;
  };
}>;