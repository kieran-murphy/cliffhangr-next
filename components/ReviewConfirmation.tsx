import React from 'react';

type ReviewConfirmationProps = {
  setConfirm: (value: boolean) => void;
};

const ReviewConfirmation = ({ setConfirm }: ReviewConfirmationProps): React.JSX.Element => {
  return (
    <div className="toast" onClick={() => setConfirm(false)}>
      <div className="alert alert-info">
        <div>
          <span>Your review has been submitted</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewConfirmation;
