import React from "react";
import SmallReview from "@/components/SmallReview";

const Watchlist = ({ watchlist }) => {
  return (
    <div className="m-6 w-full">
      {watchlist.length !== 0 ? (
        watchlist.map((w) => {
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
