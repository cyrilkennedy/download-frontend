// components/InterstitialAd.jsx
"use client";

import { useEffect } from 'react';

export default function InterstitialAd() {
  const showAd = () => {
    // 🔥 LOAD SCRIPT
    const script = document.createElement('script');
    script.dataset.zone = '10117096';
    script.src = 'https://groleegni.net/vignette.min.js';
    script.async = true;
    script.onload = () => {
      // 🔥 THIS LINE TRIGGERS THE AD!
      if (window.loadAds) window.loadAds();
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    window.showInterstitial = showAd;
  }, []);

  return null;
}