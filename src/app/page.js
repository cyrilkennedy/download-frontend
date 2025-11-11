'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';
import ButtonLoading from '@/components/ButtonLoading';
import styles from './page.module.css';
import { toast } from 'react-toastify';
import InterstitialAd from '@/components/InterstitialAd';


export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('vidfetch_visited');
    
    if (hasVisited) {
      setShowLoading(false);
    } else {
      localStorage.setItem('vidfetch_visited', 'true');
      setTimeout(() => setShowLoading(false), 2000);
    }
  }, []);

  const handleDownload = async () => {
    if (!url.trim()) return;
    
    setIsProcessing(true);
    
    // Save URL to localStorage
    localStorage.setItem('vidfetch_url', url);
    
    // Simulate processing delay
    setTimeout(() => {
      router.push('/stepone');
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleDownload();
    }
  };

  return (
    <>
    <InterstitialAd />
      {showLoading && <LoadingScreen duration={2000} />}
      
      <div className={styles.hero}>
        <div className={styles.container}>
          {/* Hero Content */}
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Download Videos <span className={styles.gradient}>Without Watermarks</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Fast, free, and easy. Download from TikTok, Instagram, Facebook, and Twitter in HD quality.
            </p>

            {/* URL Input Box */}
            <div className={styles.inputContainer}>
  <div className={styles.inputWrapper}>
    <input
      type="text"
      className={styles.input}
      placeholder="Paste video URL here..."
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      onKeyPress={handleKeyPress}
    />
    
    {/* 🔥 PASTE BUTTON */}
    <button
      onClick={async () => {
        try {
          const text = await navigator.clipboard.readText();
          setUrl(text.trim());
          // toast.success("✅ URL pasted!", { autoClose: 2000 });
          // Optional: Auto-process if valid
          if (text.includes('tiktok.com') || text.includes('instagram.com')) {
            handleDownload(); // or your detect function
          }
        } catch (err) {
          toast.error("❌ Failed to paste. Copy manually.");
        }
      }}
      className={styles.pasteButton}
      title="Paste from clipboard"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
        <polyline points="17 21 17 13 7 13 7 21"/>
        <polyline points="7 3 12 3 12 8 17 8"/>
      </svg>
    </button>
  </div>

  <ButtonLoading
    variant="orange"
    loading={isProcessing}
    loadingText="Processing..."
    onClick={handleDownload}
    className={styles.downloadButton}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
    </svg>
    Start
  </ButtonLoading>
</div>
            {/* Platform Badges */}
            <div className={styles.platforms}>
              <div className={styles.platformBadge}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                TikTok
              </div>
              <div className={styles.platformBadge}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                </svg>
                Instagram
              </div>
              <div className={styles.platformBadge}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </div>
              <div className={styles.platformBadge}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className={styles.features} id="platforms">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose VidFetch?</h2>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0F62FE" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>No Watermarks</h3>
              <p className={styles.featureDescription}>
                Download videos in their original quality without any watermarks or branding.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0F62FE" strokeWidth="2">
                  <rect x="2" y="6" width="20" height="12" rx="2"/>
                  <path d="M6 12h.01M10 12h.01M14 12h.01"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Multiple Formats</h3>
              <p className={styles.featureDescription}>
                Choose from HD, SD, or MP3 audio formats to match your needs.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0F62FE" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Lightning Fast</h3>
              <p className={styles.featureDescription}>
                Our optimized servers process and deliver your downloads in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className={styles.supported}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Supported Platforms</h2>
          <p className={styles.sectionSubtitle}>
            Download from all your favorite social media platforms
          </p>

          <div className={styles.platformGrid}>
            <div className={styles.platformCard}>
              <div className={styles.platformIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="#000000">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.10-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.40-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </div>
              <h3 className={styles.platformName}>TikTok</h3>
              <span className={styles.platformStatus}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#10B981">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Fully Supported
              </span>
            </div>

            <div className={styles.platformCard}>
              <div className={styles.platformIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="url(#instagramGradient)">
                  <defs>
                    <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                </svg>
              </div>
              <h3 className={styles.platformName}>Instagram</h3>
              <span className={styles.platformStatus}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#10B981">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Fully Supported
              </span>
            </div>

            <div className={styles.platformCard}>
              <div className={styles.platformIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <h3 className={styles.platformName}>Facebook</h3>
              <span className={styles.platformStatus}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#10B981">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Fully Supported
              </span>
            </div>

            <div className={styles.platformCard}>
              <div className={styles.platformIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="#1DA1F2">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <h3 className={styles.platformName}>Twitter</h3>
              <span className={styles.platformStatus}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#10B981">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Fully Supported
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}