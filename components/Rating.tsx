import React from "react";
import ReactStars from "react-stars";

type RatingProps = {
  reviewScore: number;
  setReviewScore: (newRating: number) => void;
}

const Rating = ({ reviewScore, setReviewScore }: RatingProps): React.JSX.Element => {
  const ratingChanged = (newRating: number): void => {
    setReviewScore(newRating);
  };
  
  return (
    <ReactStars
      count={5}
      value={reviewScore}
      onChange={ratingChanged}
      size={30}
      color2={"#ffd700"}
    />
  );
};

export default Rating;
