'use client';

import React from 'react';

type NotFoundMessageProps = {
  error: string;
};

const NotFoundMessage = ({ error }: NotFoundMessageProps): React.JSX.Element => {
  return (
    <div className="flex justify-center mt-16">
      <div className="alert shadow-lg w-full max-w-md">
        <div>
          <span className="text-lg font-semibold">🚫 {error}</span>
          <p className="mt-2">Check the URL or go back to the previous page.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundMessage;
