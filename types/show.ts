import { Prisma } from "@prisma/client";

export type ShowType = Prisma.ShowGetPayload<{
  include: {
    reviews: {
      include: {
        user: true;
        show: true;
        reactOnReviews: {
          include: { user: true };
        };
        CommentOnReview: {
          include: { user: true };
        };
      };
    };
    favoritedBy: true;
    watchListedBy: true;
  };
}>;