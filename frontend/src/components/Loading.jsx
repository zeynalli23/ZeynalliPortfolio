import React from 'react';
import './Loading.css';

const Loading = ({ exiting = false }) => {
  return (
    <div
      className={`loading-screen ${exiting ? 'loading-exit' : ''}`}
      role="status"
      aria-label="Yükleniyor"
    >
      <div className="loading-backdrop" />
      <div className="loading-letters">
        <span className="loading-z">Z</span>
        <span className="loading-l">L</span>
      </div>
    </div>
  );
};

export default Loading;
