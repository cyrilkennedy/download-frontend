// components/NativeAd.js
'use client';
import { useEffect, useRef } from 'react';

export default function NativeAd({ position = "content" }) {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    const zoneId = '0e1640332d1c1c66fd5db9d9651057fa';
    const containerId = `container-${zoneId}-${position}`;

    // Create container for this specific ad
    const container = document.createElement('div');
    container.id = containerId;
    adRef.current.appendChild(container);

    // Wait for invoke.js to be available
    const initAd = () => {
      if (window.Option) {
        window.Option = {
          key: zoneId,
          format: 'iframe',
          height: 250,
          width: 300,
          params: {}
        };
      }
    };

    if (window.Option) {
      initAd();
    } else {
      const checkInterval = setInterval(() => {
        if (window.Option) {
          clearInterval(checkInterval);
          initAd();
        }
      }, 100);

      return () => clearInterval(checkInterval);
    }

  }, [position]);

  return (
    <div ref={adRef} className="my-8 flex justify-center">
      <div className="text-center">
        <p className="text-xs text-gray-400 mb-2">Advertisement</p>
        <div className="min-h-[250px] min-w-[300px] bg-gray-100 border border-gray-200 rounded">
          {/* Ad will be injected here */}
        </div>
      </div>
    </div>
  );
}