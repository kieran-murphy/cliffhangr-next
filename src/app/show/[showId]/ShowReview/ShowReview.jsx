import Link from "next/link";
import "./ShowReview.css";

const ShowReview = ({ review }) => {
  return (
    review !== null && (
      <Link href={`/review/${review.id}`}>
        <div className="my-4 pt-1 h-10 button">
          <div className="btn modal-button flex flex-row place-content-between p-4">
            <h1 className="font-bold">{review.user.username}</h1>
            <h1>{review.rating}⭐</h1>
          </div>
        </div>
      </Link>
    )
  );
};

export default ShowReview;
