import { Review } from "./review";
import { Favorite } from "./favorite";
import { Follow } from "./follow";
import { WatchlistItem } from "./watchlist";

export type User = {
  id: string;
  username: string;
  email: string;
  imageUrl?: string;
  bio?: string;
  role: "BASIC" | "ADMIN";
  createdAt?: string; // if you include timestamps in your API
  updatedAt?: string;
  writtenReviews: Review[];
  favoriteShows: Favorite[];
  watchlistShows: WatchlistItem[];
  followers: Follow[];
  following: Follow[];
};