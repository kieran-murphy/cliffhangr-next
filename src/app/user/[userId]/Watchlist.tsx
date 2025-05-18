import React from "react";
import SmallReview from "@/components/SmallReview";

import type { WatchlistItem } from "@/types/watchlist";

type WatchlistProps = {
  watchlist: WatchlistItem[]
}

const Watchlist = ({ watchlist }: WatchlistProps): React.JSX.Element => {
  return (
    <div className="m-6 w-full">
      {watchlist.length !== 0 ? (
        watchlist.map((w: WatchlistItem) => {
          return (
            <SmallReview show={w.show} key={w.show.id} />
          );
        })
      ) : (
        <h1 className="w-full text-center">No watchlist yet</h1>
      )}
    </div>
  );
};

export default Watchlist;
