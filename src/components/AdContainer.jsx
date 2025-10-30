// components/AdContainer.jsx
"use client";

import { useEffect, useRef } from 'react';

export default function AdContainer({ zone, size = "300x250" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const div = document.createElement('div');
    div.dataset.zone = zone;
    div.style.width = size.split('x')[0] + 'px';
    div.style.height = size.split('x')[1] + 'px';
    ref.current.appendChild(div);

    return () => {
      if (ref.current?.contains(div)) {
        ref.current.removeChild(div);
      }
    };
  }, [zone, size]);

  return <div ref={ref} className="flex justify-center" />;
}