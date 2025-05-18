import React from "react";
import SmallReview from "@/components/SmallReview";

import type { Favorite } from "@/types/favorite";

type FavouritesProps = {
  favourites: Favorite[];
};

const Favourites = ({ favourites }: FavouritesProps): React.JSX.Element => {
  return (
    <div className="m-6 w-full">
      {favourites.length !== 0 ? (
        favourites.map((fav) => (
          <SmallReview show={fav.show} key={fav.show.id} />
        ))
      ) : (
        <h1 className="w-full text-center">No favourites yet</h1>
      )}
    </div>
  );
};

export default Favourites;
