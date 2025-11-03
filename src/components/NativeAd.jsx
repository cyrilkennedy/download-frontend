// components/NativeAd.js
'use client';
import { useEffect, useRef } from 'react';

export default function NativeAd({ position = "content" }) {
  const adRef = useRef(null);
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (!adRef.current || scriptAdded.current) return;

    const zoneId = '0e1640332d1c1c66fd5db9d9651057fa';
    const containerId = `container-${zoneId}`;

    // Create container
    const container = document.createElement('div');
    container.id = containerId;
    adRef.current.appendChild(container);

    // Add invoke.js script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = `//pl27954563.effectivegatecpm.com/${zoneId}/invoke.js`;
    
    script.onload = () => {
      console.log(`✅ Native ad loaded at: ${position}`);
    };

    script.onerror = () => {
      console.error(`❌ Failed to load ad at: ${position}`);
    };

    adRef.current.appendChild(script);
    scriptAdded.current = true;

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