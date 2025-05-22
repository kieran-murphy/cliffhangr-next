import type { User } from "./user";

export type ReactOnReview = {
  id: string;
  userId: string;
  reviewId: string;
  react: "LIKE" | "LOVE" | "LAUGH" | "WOW" | "ANGRY";
  createdAt: string;
  user: User;
};