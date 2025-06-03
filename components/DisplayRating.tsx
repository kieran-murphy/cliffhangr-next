import React from 'react';
import ReactStars from 'react-stars';

export interface DisplayRatingProps {
  rating: number;
  size: number;
}

const DisplayRating = ({ rating, size }: DisplayRatingProps): React.JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
      }}
    >
      <ReactStars count={5} value={rating} size={size} color2="#ffd700" edit={false} />
    </div>
  );
};

export default DisplayRating;
