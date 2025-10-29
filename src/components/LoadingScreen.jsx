'use client';
import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen({ duration = 2000, onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [dots, setDots] = useState([false, false, false]);

  useEffect(() => {
    // Animate dots
    const dotTimers = [
      setTimeout(() => setDots([true, false, false]), 100),
      setTimeout(() => setDots([true, true, false]), 300),
      setTimeout(() => setDots([true, true, true]), 500)
    ];

    // Hide loading screen after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, duration);

    return () => {
      dotTimers.forEach(t => clearTimeout(t));
      clearTimeout(timer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.content}>
        {/* Animated Circle Loader */}
        <svg className={styles.circle} width="100" height="100" viewBox="0 0 100 100">
          <circle
            className={styles.circleBackground}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E9ECEF"
            strokeWidth="5"
          />
          <circle
            className={styles.circleProgress}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="235 78"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F62FE" />
              <stop offset="100%" stopColor="#0A47C4" />
            </linearGradient>
          </defs>
        </svg>

        {/* DownlyVideo Wordmark */}
        <h1 className={styles.wordmark}>DownlyVideo</h1>

        {/* Loading Dots */}
        <div className={styles.dotsContainer}>
          <span className={`${styles.dot} ${dots[0] ? styles.active : ''}`}></span>
          <span className={`${styles.dot} ${dots[1] ? styles.active : ''}`}></span>
          <span className={`${styles.dot} ${dots[2] ? styles.active : ''}`}></span>
        </div>

        {/* Status Text */}
        <p className={styles.statusText}>Loading your experience...</p>
      </div>
    </div>
  );
}