// components/InPagePush.jsx
"use client";

import { useEffect, useState } from 'react';

export default function InPagePush() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;

    const script = document.createElement('script');
    script.dataset.zone = '10115553';
    script.src = 'https://forfrogadiertor.com/tag.min.js';
    script.async = true;
    document.body.appendChild(script);

    setShown(true);
  }, [shown]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: '#fff',
        borderTop: '1px solid #ccc',
        padding: '10px',
        textAlign: 'center',
        zIndex: 9999,
        fontSize: '12px',
      }}
      id="inpage-push"
    >
      <span
        style={{
          position: 'absolute',
          right: '10px',
          top: '5px',
          cursor: 'pointer',
          fontSize: '20px',
        }}
        onClick={() => {
          document.getElementById('inpage-push').style.display = 'none';
        }}
      >
        X
      </span>
      <div id="ad-container">Ad loading...</div>
    </div>
  );
}