import React from 'react';
import SmallReview from '@/components/SmallReview';

import type { WatchlistItemType } from '@/types/watchlist';

type WatchlistProps = {
  watchlist: WatchlistItemType[];
};

const Watchlist = ({ watchlist }: WatchlistProps): React.JSX.Element => {
  return (
    <div className="m-6 w-full">
      {watchlist.length !== 0 ? (
        watchlist.map((w: WatchlistItemType) => {
          return <SmallReview show={w.show} key={w.show.id} />;
        })
      ) : (
        <h1 className="w-full text-center">No watchlist yet</h1>
      )}
    </div>
  );
};

export default Watchlist;
