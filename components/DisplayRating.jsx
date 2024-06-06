import React from "react";
import ReactStars from "react-stars";

const DisplayRating = ({ score, size }) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <ReactStars
      count={5}
      value={score}
      onChange={ratingChanged}
      size={size}
      color2={"#ffd700"}
      edit={false}
    />
  );
};

export default DisplayRating;
