import { Review } from './review';
import { Favorite } from './favorite';
import { WatchlistItem } from './watchlist';

export type Show = {
  id: string;
  title: string;
  image: string;
  year: number;
  seasons: number;
  averageRating: number;
  reviews: Review[];
  favoritedBy: Favorite[];
  watchListedBy: WatchlistItem[];
};