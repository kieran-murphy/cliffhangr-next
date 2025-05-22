import type { User } from "./user";
import type { Show } from "./show";
import type { ReactOnReview } from "./reactOnReview";
import type { Comment } from "./comment";

export type Review = {
  id: string;
  text: string | null;
  rating: number;
  createdAt: Date;
  userId: string;
  showId: string;
  user: Pick<User, "id" | "username">;
  show: Show;
  reactOnReviews: ReactOnReview[];
  CommentOnReview: Comment[];
};
