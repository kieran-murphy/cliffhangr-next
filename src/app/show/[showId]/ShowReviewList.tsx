import { useEffect, useState } from 'react';
import ShowReview from './ShowReview/ShowReview';

import type { ShowType } from '@/types/show';
import type { ReviewType } from '@/types/review';

type ShowReviewListProps = {
  sessionUserID: string | null;
  show: ShowType;
};

const ShowReviewList = ({ sessionUserID, show }: ShowReviewListProps): React.JSX.Element => {
  const [sortedReviews, setSortedReviews] = useState<ReviewType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const reviewsPerPage = 8;

  useEffect(() => {
    const sortingReviews: ReviewType[] = [...show.reviews].sort((a, b) => {
      if (a.userId === sessionUserID) return -1;
      if (b.userId === sessionUserID) return 1;
      return 0;
    });
    setSortedReviews(sortingReviews);
  }, [sessionUserID, show]);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);

  const nextPage = () => {
    if (currentPage < Math.ceil(sortedReviews.length / reviewsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="my-6">
      <div className="flex flex-row place-content-between mx-2">
        <h1 className="text-2xl font-medium mt-4">Reviews</h1>
        <h1 className="text-2xl font-medium mt-4">{sortedReviews.length}</h1>
      </div>

      <hr className="m-1 opacity-50" />
      <div id="review-list">
        {show !== null &&
          (currentReviews.length > 0 ? (
            currentReviews.map((review) => <ShowReview key={review.id} review={review} />)
          ) : (
            <div className="mx-2">No reviews yet</div>
          ))}
      </div>

      <div className="flex flex-row place-content-between my-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="btn mx-1">
          {'< Prev'}
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(sortedReviews.length / reviewsPerPage)}
          className="btn mx-1"
        >
          {'Next >'}
        </button>
      </div>
    </div>
  );
};

export default ShowReviewList;
