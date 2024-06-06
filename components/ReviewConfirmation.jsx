import React from "react";

const ReviewConfirmation = ({ setConfirm }) => {
  return (
    <div class="toast" onClick={() => setConfirm(false)}>
      <div class="alert alert-info">
        <div>
          <span>Your review has been submitted</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewConfirmation;
