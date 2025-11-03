// components/SocialBarAd.jsx
'use client';
import { useEffect, useRef } from 'react';

export default function SocialBarAd() {
  const adRef = useRef(null);
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (scriptAdded.current) return;

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      const zoneId = '285733e3805b1e097880a31af72e311e';

      // Create container for the ad
      const container = document.createElement('div');
      container.id = `container-${zoneId}`;
      container.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        background: white;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
        padding: 5px;
      `;

      // Create atOptions script
      const optionsScript = document.createElement('script');
      optionsScript.type = 'text/javascript';
      optionsScript.innerHTML = `
        atOptions = {
          'key' : '${zoneId}',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;
      container.appendChild(optionsScript);

      // Add invoke.js script
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = `//www.highperformanceformat.com/${zoneId}/invoke.js`;
      
      invokeScript.onload = () => {
        console.log('✅ Bottom native banner loaded (320x50)');
      };

      invokeScript.onerror = () => {
        console.error('❌ Failed to load bottom banner');
      };

      container.appendChild(invokeScript);
      document.body.appendChild(container);

      scriptAdded.current = true;
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}