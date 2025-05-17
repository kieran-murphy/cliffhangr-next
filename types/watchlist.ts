import type { Show } from "./show";

export type WatchlistItem = {
  id: string;
  userId: string;
  showId: string;
  createdAt: string;
  show?: Show;
};