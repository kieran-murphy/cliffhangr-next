import type { User } from "./user";

export type Comment = {
  id: string;
  userId: string;
  reviewId: string;
  text: string;
  createdAt: Date;
  user: Pick<User, "id" | "username">;
};