import type { User } from "./user";

export type Follow = {
  id: string;
  followingId: string;
  followerId: string;
  followed: User;
  followedBy: User;
};
