// components/NativeBanner.jsx

"use client";  // REQUIRED


import { useEffect, useRef } from 'react';

export default function NativeBanner() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl27954563.effectivegatecpm.com/0e1640332d1c1c66fd5db9d9651057fa/invoke.js';
    ref.current.appendChild(script);

    return () => {
      if (ref.current?.contains(script)) {
        ref.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto px-4" style={{ minHeight: '250px' }}>
      <div
        id="container-0e1640332d1c1c66fd5db9d9651057fa"
        style={{ maxWidth: '100%', overflow: 'hidden' }}
      />
    </div>
  );
}