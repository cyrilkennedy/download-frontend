'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';
import SkeletonPreview from '@/components/SkeletonPreview';
import ButtonLoading from '@/components/ButtonLoading';
import ProgressOverlay from '@/components/ProgressOverlay';
import { fetchVideoMetadata } from '@/lib/api';
import styles from './page.module.css';

export default function Steptwo() {
  const [showLoading, setShowLoading] = useState(true);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const [videoData, setVideoData] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('hd');
  const [isDownloading, setIsDownloading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setShowLoading(false), 500);

    const fetchVideo = async () => {
      try {
        const rawData = localStorage.getItem('vidfetch_data');
        if (!rawData) {
          console.warn('No data found in localStorage, redirecting to step one.');
          router.push('/stepone');
          return;
        }

        let savedData;
        try {
          savedData = JSON.parse(rawData);
        } catch (e) {
          console.error('Invalid JSON in localStorage');
          router.push('/stepone');
          return;
        }

        if (!savedData || !savedData.url) {
          console.warn('No valid video data found, redirecting to step one.');
          router.push('/stepone');
          return;
        }

        setTimeout(async () => {
          try {
            console.log('🔍 Fetching video metadata for:', savedData.url);
            const response = await fetchVideoMetadata(savedData.url);
            console.log('📦 API Response:', response);

            const mockVideoData = {
              title: response.title || 'Untitled Video',
              thumbnail:
                response.thumbnail ||
                'https://via.placeholder.com/640x360/667eea/ffffff?text=Video+Preview',
              author: response.author || 'Unknown',
              platform: savedData.platform || '',
              views: response.views || '',
              duration: response.duration || '',
              videoUrl: response.videoUrl || response.url || response.downloadUrl, // ✅ Try multiple properties
              formats:
                response.formats ||
                [
                  {
                    id: 'hd',
                    label: 'HD Video',
                    quality: '1080p',
                    format: 'MP4',
                    url: response.videoUrl || response.downloadUrl || response.url || savedData.url,
                  },
                  {
                    id: 'sd',
                    label: 'SD Video',
                    quality: '720p',
                    format: 'MP4',
                    url: response.videoUrl || response.downloadUrl || response.url || savedData.url,
                  },
                  {
                    id: 'audio',
                    label: 'MP3 Audio',
                    quality: '320kbps',
                    format: 'MP3',
                    url: response.audioUrl || response.videoUrl || response.url || savedData.url,
                  },
                ],
            };

            console.log('✅ Processed video data:', mockVideoData);
            console.log('🎬 Video URLs:', {
              hd: mockVideoData.formats[0].url,
              sd: mockVideoData.formats[1].url,
              audio: mockVideoData.formats[2].url
            });

            setVideoData(mockVideoData);

            // ✅ Save properly for Step 3
            const dataToSave = {
              url: savedData.url,
              platform: savedData.platform || '',
              videoData: mockVideoData,
              selectedFormat: 'hd', // Save default format
            };
            localStorage.setItem('vidfetch_data', JSON.stringify(dataToSave));
            console.log('✅ Saved to localStorage:', dataToSave);

            setIsLoadingVideo(false);
          } catch (err) {
            console.error('Error fetching video:', err);
            setError('Failed to fetch video. Please try again.');
            setIsLoadingVideo(false);
          }
        }, 2000);
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
    // ✅ Update localStorage with selected format
    try {
      const savedData = JSON.parse(localStorage.getItem('vidfetch_data') || '{}');
      savedData.selectedFormat = formatId;
      localStorage.setItem('vidfetch_data', JSON.stringify(savedData));
    } catch (e) {
      console.error('Failed to save selected format', e);
    }
  };

  const handleDownload = () => {
    if (!videoData || !selectedFormat) return;
    setIsDownloading(true);
    setShowProgress(true);
  };

  // ✅ Use useCallback to prevent re-creation on every render
  const handleDownloadComplete = useCallback(() => {
    console.log('✅ Download complete, navigating to step 3...');
    setShowProgress(false);
    setIsDownloading(false);
    router.push('/stepthree');
  }, [router]);

  const handleCancel = useCallback(() => {
    console.log('❌ Download cancelled');
    setShowProgress(false);
    setIsDownloading(false);
  }, []);

  const selectedFormatData = videoData?.formats.find(f => f.id === selectedFormat);

  return (
    <>
      {showLoading && <LoadingScreen duration={500} />}
      {showProgress && (
        <ProgressOverlay
          visible={showProgress}
          onComplete={handleDownloadComplete}
          onCancel={handleCancel}
          fileName={`${videoData?.title}.${selectedFormatData?.format.toLowerCase()}`}
          format={`${selectedFormatData?.quality} • ${selectedFormatData?.format}`}
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
              <div className={`${styles.stepCircle} ${styles.completed}`}>✓</div>
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

          {/* Back Button */}
          <button className={styles.backButton} onClick={() => router.push('/stepone')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>

          {isLoadingVideo ? (
            <SkeletonPreview />
          ) : error ? (
            <div className={styles.errorCard}>
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <ButtonLoading variant="primary" onClick={() => router.push('/stepone')}>
                Try Again
              </ButtonLoading>
            </div>
          ) : (
            <>
              <div className={styles.previewCard}>
                <img src={videoData?.thumbnail} alt={videoData?.title} className={styles.thumbnail} />
                <h2 className={styles.videoTitle}>{videoData?.title}</h2>
                <p className={styles.videoAuthor}>by {videoData?.author}</p>
              </div>

              <div className={styles.formatSection}>
                <h3 className={styles.formatTitle}>Choose Format</h3>
                <div className={styles.formatGrid}>
                  {videoData?.formats.map((format) => (
                    <div
                      key={format.id}
                      className={`${styles.formatCard} ${selectedFormat === format.id ? styles.selected : ''}`}
                      onClick={() => handleFormatSelect(format.id)}
                    >
                      <div className={styles.formatIcon}>
                        {format.id === 'audio' ? '🎵' : '🎬'}
                      </div>
                      <h4>{format.label}</h4>
                      <p>{format.quality} • {format.format}</p>
                      {selectedFormat === format.id && (
                        <div className={styles.selectedBadge}>✓</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <ButtonLoading
                variant="primary"
                loading={isDownloading}
                loadingText="Processing..."
                onClick={handleDownload}
                disabled={!selectedFormat}
                className={styles.downloadButton}
              >
                Download {selectedFormatData?.label}
              </ButtonLoading>
            </>
          )}
        </div>
      </div>
    </>
  );
}