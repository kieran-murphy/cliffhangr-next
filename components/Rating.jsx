import React from "react";
import ReactStars from "react-stars";

const Rating = ({ reviewScore, setReviewScore }) => {
  const ratingChanged = (newRating) => {
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
