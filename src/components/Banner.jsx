// components/BannerAd.jsx
'use client';
import { useEffect, useRef } from 'react';

export default function BannerAd({ position = "middle" }) {
  const adRef = useRef(null);
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (!adRef.current || scriptAdded.current) return;

    const zoneId = '0340ae8bf65be2eb5d40f91113763206';

    // Create atOptions script
    const optionsScript = document.createElement('script');
    optionsScript.type = 'text/javascript';
    optionsScript.innerHTML = `
      atOptions = {
        'key' : '${zoneId}',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;
    adRef.current.appendChild(optionsScript);

    // Add invoke.js script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `//www.highperformanceformat.com/${zoneId}/invoke.js`;
    
    invokeScript.onload = () => {
      console.log(`✅ Banner ad loaded at: ${position}`);
    };

    invokeScript.onerror = () => {
      console.error(`❌ Failed to load banner at: ${position}`);
    };

    adRef.current.appendChild(invokeScript);
    scriptAdded.current = true;

  }, [position]);

  return (
    <div className="w-full flex justify-center items-center py-6">
      <div className="text-center max-w-[320px] w-full">
        <p className="text-xs text-gray-400 mb-3">Advertisement</p>
        <div 
          ref={adRef} 
          className="bg-gray-50 rounded-lg border border-gray-200 p-2 min-h-[250px] flex items-center justify-center"
        >
          {/* Banner ad will be injected here */}
        </div>
      </div>
    </div>
  );
}