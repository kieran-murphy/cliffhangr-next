import { Prisma } from '@prisma/client';

export type WatchlistItemType = Prisma.WatchlistShowGetPayload<{
  include: {
    show: true;
  };
}>;
