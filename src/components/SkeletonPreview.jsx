'use client';
import styles from './SkeletonPreview.module.css';

export default function SkeletonPreview({ type = "video" }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.miniLoader}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="url(#miniGradient)"
              strokeWidth="3"
              strokeDasharray="90 26"
              strokeLinecap="round"
              className={styles.circle}
            />
            <defs>
              <linearGradient id="miniGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F62FE" />
                <stop offset="100%" stopColor="#0A47C4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className={styles.brandText}>DownlyVideo</span>
      </div>

      {/* Skeleton Video Preview */}
      <div className={styles.videoSkeleton}></div>

      {/* Skeleton Text Lines */}
      <div className={styles.textLines}>
        <div className={`${styles.line} ${styles.title}`}></div>
        <div className={`${styles.line} ${styles.subtitle}`}></div>
        <div className={`${styles.line} ${styles.stats}`}></div>
      </div>

      {/* Skeleton Format Buttons */}
      <div className={styles.formatButtons}>
        <div className={styles.formatCard}></div>
        <div className={styles.formatCard}></div>
        <div className={styles.formatCard}></div>
      </div>

      {/* Loading Text */}
      <p className={styles.loadingText}>DownlyVideo is fetching your video...</p>
    </div>
  );
}