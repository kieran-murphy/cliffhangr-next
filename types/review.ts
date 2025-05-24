import { Prisma } from "@prisma/client";

export type ReviewType = Prisma.ReviewGetPayload<{
  include: {
    user: true;
    show: true;
    reactOnReviews: {
      include: { user: true };
    };
    CommentOnReview: {
      include: { user: true };
    };
  }
}>