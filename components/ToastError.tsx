import React from 'react';

type ToastErrorProps = {
  message: string | null;
};

const ToastError = ({ message }: ToastErrorProps): React.JSX.Element => {
  return (
    <div className="alert alert-error shadow-lg max-w-md mx-auto animate-fade-in-down">
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ToastError;
