import type { Show } from "./show"

export type Favorite = {
  id: string;
  userId: string;
  showId: string;
  createdAt: string;
  show: Show;
};