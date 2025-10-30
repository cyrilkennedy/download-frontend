'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';
import ButtonLoading from '@/components/ButtonLoading';
import Steptwo from '../steptwo/page';

import styles from './page.module.css';

export default function StepOne() {
  const [showLoading, setShowLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [totalItems, setTotalItems] = useState(0); // New state for total items
  const router = useRouter();

  useEffect(() => {
    // Quick loading for navigation
    setTimeout(() => setShowLoading(false), 800);

    // Load URL from localStorage if exists
    const savedUrl = localStorage.getItem('vidfetch_url');
    if (savedUrl) {
      setUrl(savedUrl);
      handleUrlChange(savedUrl);
    }

    // Load total items if exists
    const savedTotal = localStorage.getItem('vidfetch_total_items');
    if (savedTotal !== null) {
      const parsed = parseInt(savedTotal, 10);
      if (!Number.isNaN(parsed)) setTotalItems(parsed);
    }
  }, []);

  // Persist video data for next steps
  const saveVideoData = ({ url, platform }) => {
    try {
      const data = { url, platform, savedAt: Date.now(), totalItems }; // Include totalItems
      localStorage.setItem('vidfetch_data', JSON.stringify(data));
      localStorage.setItem('vidfetch_url', url);
      localStorage.setItem('vidfetch_platform', platform || '');
      localStorage.setItem('vidfetch_total_items', String(totalItems)); // Store total items
    } catch (err) {
      // fail silently but log for debugging
      // eslint-disable-next-line no-console
      console.error('Failed to save video data', err);
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  };

  const detectPlatform = (url) => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('tiktok.com')) return 'TikTok';
    if (lowerUrl.includes('instagram.com')) return 'Instagram';
    if (lowerUrl.includes('facebook.com')) return 'Facebook';
    if (lowerUrl.includes('twitter.com')) return 'Twitter';
    return null;
  };

  const handleUrlChange = (value) => {
    setUrl(value);
    setError('');
    
    if (value.trim() && isValidUrl(value)) {
      setIsDetecting(true);
      
      // Simulate platform detection delay
      setTimeout(() => {
        const detectedPlatform = detectPlatform(value);
        setPlatform(detectedPlatform);
        setIsDetecting(false);
        
        if (!detectedPlatform) {
          setError('Platform not supported. Please use TikTok, Instagram, Facebook, or Twitter URLs.');
        }
      }, 800);
    } else {
      setPlatform(null);
    }
  };

  const handleContinue = () => {
    if (!url.trim() || !isValidUrl(url)) {
      setError('Please enter a valid video URL');
      return;
    }

    if (!platform) {
      setError('Platform not supported');
      return;
    }

    setIsProcessing(true);
    
    // Save data for next step
    saveVideoData({ url, platform });
    
    // Navigate to step 2
    router.prefetch('/steptwo'); // Pre-fetch the next page
    setTimeout(() => {
      router.push('/steptwo'); // Use router.push for navigation
    }, 1500);
  };

  return (
    <>
      {showLoading && <LoadingScreen duration={800} />}
      
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '33%' }}></div>
          </div>

          {/* Step Indicator */}
          <div className={styles.stepIndicator}>
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${styles.active}`}>1</div>
              <span className={styles.stepLabel}>Paste URL</span>
            </div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>2</div>
              <span className={styles.stepLabel}>Preview</span>
            </div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>3</div>
              <span className={styles.stepLabel}>Download</span>
            </div>
          </div>

          {/* Back Button */}
          <button className={styles.backButton} onClick={() => router.push('/')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </button>

          {/* Main Card */}
          <div className={styles.card}>
            <h1 className={styles.title}>Paste Video URL</h1>
            <p className={styles.subtitle}>
              We support TikTok, Instagram, Facebook, and Twitter
            </p>

            {/* Platform Badges */}
            <div className={styles.platformBadges}>
              <div className={styles.badge}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.10-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.40-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                TikTok
              </div>
              <div className={styles.badge}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E4405F">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                </svg>
                Instagram
              </div>
              <div className={styles.badge}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </div>
              <div className={styles.badge}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </div>
            </div>

            {/* URL Input */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                className={`${styles.input} ${error ? styles.error : ''}`}
                placeholder="https://www.tiktok.com/@username/video/..."
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
              />
              
              {/* Platform Detection Badge */}
              {isDetecting && (
                <div className={styles.detectingBadge}>
                  <svg className={styles.spinner} width="16" height="16" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="48 16"/>
                  </svg>
                  Detecting platform...
                </div>
              )}
              
              {platform && !isDetecting && (
                <div className={styles.detectedBadge}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#10B981">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {platform} Detected ✓
                </div>
              )}

              {error && (
                <div className={styles.errorMessage}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#dc3545">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
                  </svg>
                  {error}
                </div>
              )}
            </div>

            <p className={styles.hint}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C757D" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              Paste any video URL from supported platforms
            </p>

            {/* Continue Button */}
            <ButtonLoading
              variant="primary"
              loading={isProcessing}
              loadingText="Loading..."
              onClick={handleContinue}
              className={styles.continueButton}
              disabled={!platform || !url.trim()}
            >
              Continue to Preview
            </ButtonLoading>
          </div>

          {/* Recently Downloaded (if any) */}
          <div className={styles.recentSection}>
            <h3 className={styles.recentTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Recently Downloaded
            </h3>
            <div className={styles.recentGrid}>
              <div className={styles.recentCard}>
                <div className={styles.recentThumb}>
                  <div className={styles.skeletonThumb}></div>
                </div>
                <p className={styles.recentName}>Dance Challeng...</p>
              </div>
              <div className={styles.recentCard}>
                <div className={styles.recentThumb}>
                  <div className={styles.skeletonThumb}></div>
                </div>
                <p className={styles.recentName}>Sunset Reel</p>
              </div>
              <div className={styles.recentCard}>
                <div className={styles.recentThumb}>
                  <div className={styles.skeletonThumb}></div>
                </div>
                <p className={styles.recentName}>Cooking Tutorial</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}