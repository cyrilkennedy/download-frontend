'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './ProgressOverlay.module.css';

export default function ProgressOverlay({ 
  visible = false, 
  onComplete,
  onCancel,
  fileName = "video.mp4",
  format = "HD • MP4",
  fileSize = "",
  videoTitle = "Amazing Video"
}) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // ✅ Use ref to avoid dependency issues
  const onCompleteRef = useRef(onComplete);
  const onCancelRef = useRef(onCancel);

  // ✅ Keep refs updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    onCancelRef.current = onCancel;
  }, [onCancel]);

  useEffect(() => {
    if (!visible) {
      setProgress(0);
      setIsComplete(false);
      return;
    }
    
    // Simulate progress with realistic timing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            if (onCompleteRef.current) {
              onCompleteRef.current();
            }
          }, 1500);
          return 100;
        }
        // Simulate realistic download progress
        const increment = Math.random() * 8 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, [visible]); // ✅ Only depend on visible

  if (!visible) return null;

  const statusMessage = 
    progress < 30 ? "Preparing your video..." :
    progress < 60 ? "Processing download..." :
    progress < 90 ? "Almost there..." :
    progress < 100 ? "Finalizing..." : 
    "Complete!";

  // Calculate stroke offset for circular progress
  const circumference = 2 * Math.PI * 54; // radius = 54
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={() => onCancelRef.current?.()}></div>
      
      <div className={`${styles.card} ${isComplete ? styles.success : ''}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" fill="url(#headerGradient)"/>
              <defs>
                <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0F62FE" />
                  <stop offset="100%" stopColor="#0A47C4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className={styles.brandName}>DownlyVideo</span>
        </div>

        {/* Progress Circle */}
        <div className={styles.progressContainer}>
          <svg className={styles.progressCircle} width="120" height="120" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#E9ECEF"
              strokeWidth="6"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={isComplete ? "#10B981" : "url(#progressGradient)"}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 60 60)"
              className={styles.progressRing}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F62FE" />
                <stop offset="100%" stopColor="#0A47C4" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Percentage Display */}
          <div className={styles.percentageDisplay}>
            {isComplete ? (
              <svg className={styles.checkmark} width="60" height="60" viewBox="0 0 60 60">
                <path
                  d="M15 30 L25 40 L45 20"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.checkPath}
                />
              </svg>
            ) : (
              <>
                <span className={styles.percentage}>{Math.round(progress)}%</span>
                <span className={styles.percentageLabel}>Downloaded</span>
              </>
            )}
          </div>
        </div>

        {/* Status Message */}
        <p className={styles.statusMessage}>
          {isComplete ? "Download Complete! ✓" : statusMessage}
        </p>

        {/* File Information */}
        <div className={styles.fileInfo}>
          <p className={styles.fileName}>{videoTitle}</p>
          <div className={styles.fileDetails}>
            <span className={styles.formatBadge}>{format}</span>
            <span className={styles.fileSize}>{fileSize}</span>
          </div>
        </div>

        {/* Cancel Button */}
        {!isComplete && onCancelRef.current && (
          <button className={styles.cancelButton} onClick={() => onCancelRef.current?.()}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}