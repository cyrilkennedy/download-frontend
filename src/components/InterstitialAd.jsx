// components/InterstitialAd.jsx
"use client";

import { useEffect } from 'react';

export default function InterstitialAd() {
  useEffect(() => {
    if (sessionStorage.getItem('interstitial_shown')) return;
    sessionStorage.setItem('interstitial_shown', 'true');

    const script = document.createElement('script');
    script.dataset.zone = '10117096';
    script.src = 'https://groleegni.net/vignette.min.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}