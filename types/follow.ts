import { Prisma } from "@prisma/client";

export type FollowType = Prisma.FollowGetPayload<{
  include: {
    followed: true;
    followedBy: true;
  };
}>;
