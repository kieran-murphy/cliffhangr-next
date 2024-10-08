import { useEffect, useState } from "react";
import ShowReview from "@/components/ShowReview/ShowReview";

const ShowReviewList = ({ user, show }) => {
  const [sortedReviews, setSortedReviews] = useState([]);
  useEffect(() => {
    const sortingReviews = [...show.reviews].sort((a, b) => {
      if (a.userId === user.id) return -1;
      if (b.userId === user.id) return 1;
      return 0;
    });
    setSortedReviews(sortingReviews);
  }, [user, show]);

  return (
    <div className="my-6">
      <div className="flex flex-row place-content-between mx-2">
        <h1 className="text-2xl font-medium mt-4">Reviews</h1>
        <h1 className="text-2xl font-medium mt-4">{sortedReviews.length}</h1>
      </div>

      <hr className="m-1 opacity-50" />
      <div>
        {show !== null &&
          (sortedReviews.length > 0 ? (
            sortedReviews.map((review) => (
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
