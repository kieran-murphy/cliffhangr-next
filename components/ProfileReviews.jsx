import React from "react";
import SmallReview from "./SmallReview";

const ProfileReviews = ({ reviews }) => {
  return (
    <div className="m-6 w-full">
      {reviews.length !== 0 ? (
        reviews.map((review) => {
          return (
            <SmallReview
              showId={review.showId}
              key={review.showId}
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
