import React from "react";
import SmallReview from "./SmallReview";

const Watchlist = ({ watchlist }) => {
  return (
    <div className="m-6 w-full">
      {watchlist.length !== 0 ? (
        watchlist.map((w) => {
          return (
            <SmallReview showId={w.showId} key={w.showId} score={w.score} />
          );
        })
      ) : (
        <h1 className="w-full text-center">No watchlist yet</h1>
      )}
    </div>
  );
};

export default Watchlist;
