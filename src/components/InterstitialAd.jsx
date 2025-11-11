// components/InterstitialAd.jsx
"use client";

import { useEffect } from 'react';

export default function InterstitialAd() {
  useEffect(() => {
    const scriptId = 'interstitial-ad-script';
    
    // Remove existing script
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Clear all storage
    const clearAdStorage = () => {
      try {
        localStorage.removeItem('vignette_shown');
        sessionStorage.removeItem('vignette_shown');
        
        // Clear cookies
        document.cookie.split(";").forEach(c => {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
      } catch (e) {
        console.warn('Storage clear failed:', e);
      }
    };

    clearAdStorage();

    // Create script
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.setAttribute('data-zone', '10117096');
    script.src = `https://groleegni.net/vignette.min.js?t=${Date.now()}`;
    script.async = true;

    script.onload = () => {
      console.log('✅ Ad script loaded');

      // Show ad IMMEDIATELY (50ms - instant!)
      setTimeout(() => {
        if (window.invoke && typeof window.invoke === 'function') {
          try {
            window.invoke();
            console.log('⚡ Ad shown instantly');
            
            // Clear storage after ad shows
            setTimeout(clearAdStorage, 3000);
          } catch (e) {
            console.error('Ad invoke error:', e);
          }
        } else {
          console.warn('⚠️ window.invoke not available');
        }
      }, 50);
    };

    script.onerror = () => {
      console.error('❌ Ad script failed to load');
    };

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
      clearAdStorage();
    };
  }, []); // Empty dependency array - runs once on mount

  return null;
}