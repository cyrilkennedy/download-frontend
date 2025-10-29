'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';
import SkeletonPreview from '@/components/SkeletonPreview';
import ButtonLoading from '@/components/ButtonLoading';
import ProgressOverlay from '@/components/ProgressOverlay';
import { fetchVideoMetadata } from '@/lib/api';
import { getVideoData, saveVideoData, addToRecentDownloads, formatFileSize } from '@/lib/helper';
import styles from './page.module.css';

export default function StepTwo() {
  const [showLoading, setShowLoading] = useState(true);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const [videoData, setVideoData] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('hd');
  const [isDownloading, setIsDownloading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Quick page load
    setTimeout(() => setShowLoading(false), 500);

    // Fetch video data
    const fetchVideo = async () => {
      try {
        const savedData = getVideoData();
        
        if (!savedData || !savedData.url) {
          router.push('/stepone');
          return;
        }

        // Simulate fetching video metadata
        setTimeout(async () => {
          try {
            // Call your backend API
            const response = await fetchVideoMetadata(savedData.url);
            
            // Mock data structure (adjust based on your API response)
            const mockVideoData = {
              title: response.title || "",
              thumbnail: response.thumbnail || "https://via.placeholder.com/640x360/667eea/ffffff?text=Video+Preview",
              author: response.author || "",
              platform: savedData.platform || "",
              views: response.views || "",
              duration: response.duration || "",
              formats: response.formats || [
                {
                  id: 'hd',
                  label: 'HD Video',
                  quality: '1080p',
                  format: 'MP4',
                  // size: '24.5 MB',
                  url: response.hdUrl || '#'
                },
                {
                  id: 'sd',
                  label: 'SD Video',
                  quality: '720p',
                  format: 'MP4',
                  // size: '12.8 MB',
                  url: response.sdUrl || '#'
                },
                {
                  id: 'audio',
                  label: 'MP3 Audio',
                  quality: '320kbps',
                  format: 'MP3',
                  // size: '3.2 MB',
                  url: response.audioUrl || '#'
                }
              ]
            };

            setVideoData(mockVideoData);
            saveVideoData({ ...savedData, videoData: mockVideoData });
            setIsLoadingVideo(false);
          } catch (err) {
            console.error('Error fetching video:', err);
            setError('Failed to fetch video. Please try again.');
            setIsLoadingVideo(false);
          }
        }, 2000); // 2 second loading simulation

      } catch (err) {
        console.error('Error:', err);
        setError('Something went wrong. Please try again.');
        setIsLoadingVideo(false);
      }
    };

    fetchVideo();
  }, [router]);

  const handleFormatSelect = (formatId) => {
    setSelectedFormat(formatId);
  };

  const handleDownload = () => {
    if (!videoData || !selectedFormat) return;

    const format = videoData.formats.find(f => f.id === selectedFormat);
    
    setIsDownloading(true);
    setShowProgress(true);

    // Add to recent downloads
    addToRecentDownloads({
      title: videoData.title,
      thumbnail: videoData.thumbnail,
      platform: videoData.platform,
      format: format.quality,
      size: format.size,
      timestamp: Date.now()
    });
  };

  const handleDownloadComplete = () => {
    setShowProgress(false);
    setIsDownloading(false);
    
    // Navigate to success page
    setTimeout(() => {
      router.push('/stepthree');
    }, 500);
  };

  const handleCancel = () => {
    setShowProgress(false);
    setIsDownloading(false);
  };

  const selectedFormatData = videoData?.formats.find(f => f.id === selectedFormat);

  return (
    <>
      {showLoading && <LoadingScreen duration={500} />}
      
      {/* Progress Overlay */}
      {showProgress && (
        <ProgressOverlay
          visible={showProgress}
          onComplete={handleDownloadComplete}
          onCancel={handleCancel}
          fileName={`${videoData?.title}.${selectedFormatData?.format.toLowerCase()}`}
          format={`${selectedFormatData?.quality} • ${selectedFormatData?.format}`}
          fileSize={selectedFormatData?.size}
          videoTitle={videoData?.title}
        />
      )}

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '66%' }}></div>
          </div>

          {/* Step Indicator */}
          <div className={styles.stepIndicator}>
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${styles.completed}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M5 12l5 5L20 7"/>
                </svg>
              </div>
              <span className={styles.stepLabel}>Paste URL</span>
            </div>
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${styles.active}`}>2</div>
              <span className={styles.stepLabel}>Preview</span>
            </div>
            <div className={styles.step}>
              <div className={styles.stepCircle}>3</div>
              <span className={styles.stepLabel}>Download</span>
            </div>
          </div>

          {/* Back & Cancel Buttons */}
          <div className={styles.actionButtons}>
            <button className={styles.backButton} onClick={() => router.push('/stepone')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
            <button className={styles.cancelButton} onClick={() => router.push('/')}>
              Cancel
            </button>
          </div>

          {/* Loading State */}
          {isLoadingVideo ? (
            <SkeletonPreview />
          ) : error ? (
            <div className={styles.errorCard}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <ButtonLoading variant="primary" onClick={() => router.push('/stepone')}>
                Try Again
              </ButtonLoading>
            </div>
          ) : (
            <>
              {/* Video Preview Card */}
              <div className={styles.previewCard}>
                {/* Video Thumbnail */}
                <div className={styles.videoPreview}>
                  <img src={videoData?.thumbnail} alt={videoData?.title} className={styles.thumbnail} />
                  <div className={styles.playOverlay}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
                      <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.9)"/>
                      <path d="M10 8l6 4-6 4V8z" fill="#0F62FE"/>
                    </svg>
                  </div>
                  <div className={styles.duration}>{videoData?.duration}</div>
                </div>

                Video Info
                <div className={styles.videoInfo}>
                  <h2 className={styles.videoTitle}>{videoData?.title}</h2>
                  <div className={styles.videoMeta}>
                    <div className={styles.platformBadge}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.10-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.40-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                      {videoData?.platform}
                    </div>
                    <span className={styles.author}>{videoData?.author}</span>
                    {/* <span className={styles.views}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      {videoData?.views} views
                    </span> */}
                  </div>
                </div>

                {/* Premium Quality Badge */}
                <div className={styles.premiumBadge}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFC107">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Premium Quality Available
                </div>
              </div>

              {/* Format Selection */}
              <div className={styles.formatSection}>
                <h3 className={styles.formatTitle}>Choose Format</h3>
                <p className={styles.formatSubtitle}>Select your preferred download quality</p>

                <div className={styles.formatGrid}>
                  {videoData?.formats.map((format) => (
                    <div
                      key={format.id}
                      className={`${styles.formatCard} ${selectedFormat === format.id ? styles.selected : ''}`}
                      onClick={() => handleFormatSelect(format.id)}
                    >
                      <div className={styles.formatIcon}>
                        {format.id === 'hd' && (
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="7" width="20" height="10" rx="2"/>
                            <path d="M12 7v10"/>
                          </svg>
                        )}
                        {format.id === 'sd' && (
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="3" width="20" height="14" rx="2"/>
                            <path d="M8 21h8"/>
                            <path d="M12 17v4"/>
                          </svg>
                        )}
                        {format.id === 'audio' && (
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18V5l12-2v13"/>
                            <circle cx="6" cy="18" r="3"/>
                            <circle cx="18" cy="16" r="3"/>
                          </svg>
                        )}
                      </div>
                      
                      <div className={styles.formatInfo}>
                        <h4 className={styles.formatLabel}>{format.label}</h4>
                        <p className={styles.formatDetails}>{format.quality} • {format.format}</p>
                        <p className={styles.formatSize}>{format.size}</p>
                      </div>

                      {selectedFormat === format.id && (
                        <div className={styles.checkmark}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                      )}

                      {format.id === 'hd' && (
                        <span className={styles.recommendedBadge}>Recommended</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Button */}
              <ButtonLoading
                variant="orange"
                loading={isDownloading}
                loadingText="Processing Download..."
                onClick={handleDownload}
                className={styles.downloadButton}
                disabled={!selectedFormat}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Download {selectedFormatData?.label}
              </ButtonLoading>
            </>
          )}
        </div>
      </div>
    </>
  );
}