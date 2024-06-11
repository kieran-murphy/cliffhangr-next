import React from "react";
import ShowReview from "@/components/ShowReview/ShowReview";

const ShowReviewList = ({ user, show }) => {
  return (
    <div className="my-6">
      <div className="flex flex-row place-content-between mx-2">
        <h1 className="text-2xl font-medium mt-4">Reviews</h1>
        <h1 className="text-2xl font-medium mt-4">{show.reviews.length}</h1>
      </div>

      <hr className="m-1 opacity-50" />
      <div>
        {show !== null &&
          (show.reviews.length > 0 ? (
            show.reviews.map((review, index) => (
              <ShowReview
                key={review.id}
                user={user}
                reviewId={review.id}
                show={show}
              />
            ))
          ) : (
            <div className="mx-2">No reviews yet</div>
          ))}
      </div>
    </div>
  );
};

export default ShowReviewList;
