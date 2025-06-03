import { Prisma } from '@prisma/client';

export type CommentType = Prisma.CommentOnReviewGetPayload<{
  include: { user: true };
}>;
