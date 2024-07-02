import React from "react";
import ReactStars from "react-stars";

const DisplayRating = ({ rating, size }) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <ReactStars
        count={5}
        value={rating}
        onChange={ratingChanged}
        size={size}
        color2={"#ffd700"}
        edit={false}
      />
    </div>
  );
};

export default DisplayRating;
