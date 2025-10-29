'use client';
import styles from './SuccessAnimation.module.css';

export default function SuccessAnimation({ 
  title = "Success!",
  message = "Operation completed successfully",
  size = "large" // small, medium, large
}) {
  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <div className={styles.iconWrapper}>
        <svg className={styles.checkmark} viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="#10B981"
            strokeWidth="4"
            className={styles.circle}
          />
          <path
            d="M20 40 L35 55 L60 30"
            fill="none"
            stroke="#10B981"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.check}
          />
        </svg>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
    </div>
  );
}