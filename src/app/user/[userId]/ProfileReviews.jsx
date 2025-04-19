import SmallReview from "@/components/SmallReview";

const ProfileReviews = ({ reviews }) => {
  return (
    <div className="m-6 w-full">
      {reviews.length !== 0 ? (
        reviews.map((review) => {
          return (
            <SmallReview
              show={review.show}
              key={review.show.id}
            />
          );
        })
      ) : (
        <h1 className="w-full text-center">No reviews yet</h1>
      )}
    </div>
  );
};

export default ProfileReviews;
