import React from 'react';

function OfflineFallback() {
  return (
    <div>
      <h1>Oops! You're offline.</h1>
      <p>It seems like you're not connected to the internet.</p>
      <p>Please check your connection and try again later.</p>
    </div>
  );
}

export default OfflineFallback;
