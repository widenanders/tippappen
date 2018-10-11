import React from 'react';

export default function Loading({isLoading}) {
  return (
    <div id="loader">
      <div className="spinner" /> Loading...
    </div>
  )
}
