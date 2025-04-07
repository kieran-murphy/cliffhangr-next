import React from "react";
import SmallReview from "./SmallReview";

const Favourites = ({ favourites }) => {
  return (
    <div className="m-6 w-full">
      {favourites.length !== 0 ? (
        favourites.map((fav) => {
          return (
            <SmallReview
              showId={fav.showId}
              key={fav.showId}
            />
          );
        })
      ) : (
        <h1 className="w-full text-center">No favourites yet</h1>
      )}
    </div>
  );
};

export default Favourites;
