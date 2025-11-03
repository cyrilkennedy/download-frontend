// components/InterstitialAd.jsx
"use client";

import { useEffect } from 'react';

export default function InterstitialAd() {
  useEffect(() => {
    // Prevent duplicate loading
    const scriptId = 'interstitial-ad-script';
    if (document.getElementById(scriptId)) {
      console.log('⚠️ Interstitial ad already loaded');
      return;
    }

    // Load the vignette/interstitial script
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.setAttribute('data-zone', '10117096');
    script.src = 'https://groleegni.net/vignette.min.js';
    script.async = true;

    script.onload = () => {
      console.log('✅ Interstitial ad loaded - auto-shows on navigation');
      
      // Create manual trigger function for downloads
      window.triggerInterstitialAd = () => {
        try {
          // Method 1: Try direct invoke (if available)
          if (window.invoke && typeof window.invoke === 'function') {
            window.invoke();
            console.log('📢 Interstitial ad triggered (Method 1)');
            return;
          }

          // Method 2: Try clicking invisible link (vignette trigger)
          const dummyLink = document.createElement('a');
          dummyLink.href = '#';
          dummyLink.style.display = 'none';
          document.body.appendChild(dummyLink);
          dummyLink.click();
          document.body.removeChild(dummyLink);
          console.log('📢 Interstitial ad triggered (Method 2)');
        } catch (error) {
          console.error('❌ Failed to trigger interstitial:', error);
        }
      };
    };

    script.onerror = () => {
      console.error('❌ Interstitial ad failed to load');
    };

    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
      delete window.triggerInterstitialAd;
    };
  }, []);

  return null;
}