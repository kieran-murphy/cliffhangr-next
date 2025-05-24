import { Prisma } from "@prisma/client";

export type UserType = Prisma.UserGetPayload<{
  include: {
    writtenReviews: {
      include: {
        show: true;
        user: true;
        reactOnReviews: {
          include: { user: true };
        };
        CommentOnReview: {
          include: { user: true };
        };
      };
    };
    favoriteShows: {
      include: { show: true };
    };
    watchlistShows: {
      include: { show: true };
    };
    followers: {
      select: {
        id: true;
        followerId: true;
        followingId: true;
        followed: {
          select: {
            id: true;
            username: true;
          };
        };
      };
    };
    following: {
      select: {
        id: true;
        followerId: true;
        followingId: true;
        followedBy: {
          select: {
            id: true;
            username: true;
          };
        };
      };
    };
  };
}>;
