import type { User } from "./user";
import type { Show } from "./show";

export type Review = {
  id: string;
  text?: string;
  rating: number;
  createdAt: string;
  userId: string;
  showId: string;
  user?: Pick<User, "id" | "username">;
  show?: Pick<Show, "id" | "title">;
};
