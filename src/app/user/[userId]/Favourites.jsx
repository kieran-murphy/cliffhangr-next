import SmallReview from "@/components/SmallReview";

const Favourites = ({ favourites }) => {
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
