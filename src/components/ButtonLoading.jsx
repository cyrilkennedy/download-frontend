'use client';
import styles from './ButtonLoading.module.css';

export default function ButtonLoading({ 
  children, 
  loading = false, 
  loadingText = "Processing...",
  onClick,
  className = "",
  variant = "primary", // primary, secondary, success, orange
  disabled = false,
  type = "button"
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${loading ? styles.loading : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <span className={styles.buttonText}>
        {children}
      </span>
      {loading && (
        <div className={styles.loadingContainer}>
          <svg className={styles.spinner} viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="48 16"
              strokeLinecap="round"
            />
          </svg>
          <span className={styles.loadingText}>{loadingText}</span>
        </div>
      )}
    </button>
  );
}