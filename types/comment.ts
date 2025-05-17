import type { User } from "./user";

export type Comment = {
  id: string;
  userId: string;
  reviewId: string;
  text: string;
  createdAt: string;
  user?: Pick<User, "id" | "username">;
};