import React from 'react';

const LoadingSpinner = (): React.JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <span className="loading loading-ring loading-lg m-4" />
    </div>
  );
};

export default LoadingSpinner;
