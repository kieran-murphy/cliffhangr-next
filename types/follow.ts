import type { User } from "./user";

export type Follow = {
  id: string;
  followingId: string;
  followerId: string;
  followed?: Pick<User, "id" | "username">;
  followedBy?: Pick<User, "id" | "username">;
};
