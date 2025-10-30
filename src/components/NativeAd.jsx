// components/NativeAd.jsx
"use client";

import { useEffect, useRef } from 'react';

export default function NativeAd({ id, minHeight = 250 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl27954563.effectivegatecpm.com/0e1640332d1c1c66fd5db9d9651057fa/invoke.js';
    ref.current.appendChild(script);

    return () => {
      if (ref.current?.contains(script)) ref.current.removeChild(script);
    };
  }, []);

  return (
    <div ref={ref} className="w-full mx-auto px-2" style={{ minHeight: `${minHeight}px` }}>
      <div
        id={id}
        className="text-[10px] leading-tight"
        style={{
          fontFamily: 'Arial, sans-serif',
          color: '#666',
          aspectRatio: '1 / 1',
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      />
    </div>
  );
}