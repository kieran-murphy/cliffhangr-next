import type { User } from "./user";
import type { Show } from "./show";
import type { ReactOnReview } from "./react";
import type { Comment } from "./comment";

export type Review = {
  id: string;
  text?: string;
  rating: number;
  createdAt: string;
  userId: string;
  showId: string;
  user: User;
  show: Show;
  reactOnReviews: ReactOnReview[];
  CommentOnReview: Comment[];
};
