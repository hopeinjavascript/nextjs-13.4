'use client';

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

import React from 'react';

// this will be shown for any unexpected error that happens in our application
const Error = ({ error, reset }: ErrorPageProps) => {
  console.error({ error });
  return (
    <div>
      <h1>Error 😑</h1>
      <p>Something went wrong</p>
      <p className="note">
        Good to implement Custom Error page if you wish to show your branding
      </p>
      <button type="reset" onClick={reset}>
        Try again
      </button>
    </div>
  );
};

export default Error;
