// components/Banner.jsx
import { useEffect, useRef } from 'react';

export default function Banner({ position }) {
  const containerRef = useRef(null);

  // Map positions to zone IDs
  const zoneMap = {
    header: "10115553",
    middle: "10115553",
    footer: "10115553",
  };

  const zone = zoneMap[position];

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined' && containerRef.current) {
      const script = document.createElement('script');
      script.dataset.zone = zone;
      script.src = 'https://forfrogadiertor.com/tag.min.js';
      containerRef.current.appendChild(script);

      return () => {
        // Cleanup script on unmount
        if (containerRef.current && containerRef.current.contains(script)) {
          containerRef.current.removeChild(script);
        }
      };
    }
  }, [zone]);

  return (
    <div
      ref={containerRef}
      className={`
        ${position === "header" ? "py-2 bg-gray-100" : ""}
        ${position === "middle" ? "my-6" : ""}
        ${position === "footer" ? "mt-8 py-4 bg-gray-100" : ""}
        flex justify-center
      `}
    >
      <noscript>
        <iframe
          src={`https://forfrogadiertor.com/${zone}`}
          width="300"
          height="250"
          frameBorder="0"
          scrolling="no"
        />
      </noscript>
    </div>
  );
}