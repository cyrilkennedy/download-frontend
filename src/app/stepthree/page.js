'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ButtonLoading from '@/components/ButtonLoading';
import { getVideoData, clearVideoData } from '@/lib/helper';
import { proxyVideoDownload } from '@/lib/api'; // ✅ import proxy function
import styles from './page.module.css';

export default function StepThree() {
  const [videoData, setVideoData] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Save to localStorage
  const saveVideoData = (data) => {
    try {
      localStorage.setItem('vidfetch_data', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save video data', e);
    }
  };

  // Fetch metadata
  const fetchVideoMetadata = async (url) => {
    try {
      const res = await fetch('https://video-downloader-backend-u4a6.onrender.com/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      const text = await res.text();
      return JSON.parse(text);
    } catch (err) {
      console.error('❌ Failed to fetch video metadata:', err);
      return null;
    }
  };

  // ✅ NEW CLEAN DOWNLOAD HANDLER USING api.js
  const handleDownload = async () => {
    if (!videoData) return alert('No video data found!');
    const videoUrl =
      videoData.videoUrl ||
      videoData.medias?.[0]?.url ||
      videoData.formats?.[0]?.url;

    if (!videoUrl) return alert('No video URL found!');

    try {
      console.log('📡 Downloading via proxy for:', videoUrl);
      await proxyVideoDownload(videoUrl, videoData.title);
      console.log('✅ Download completed successfully');
    } catch (error) {
      console.error('❌ Download failed:', error);
      alert('❌ Failed to download video. Please try again.');
      setError(error.message);
    }
  };

  const handleDownloadAnother = () => {
    try {
      clearVideoData();
      localStorage.removeItem('vidfetch_data');
      localStorage.removeItem('vidfetch_completed');
    } catch (e) {
      console.warn('Failed to clear data', e);
    }
    router.push('/stepone');
  };

  useEffect(() => {
    const savedData = getVideoData();
    if (!savedData || !savedData.videoData) {
      router.push('/stepone');
      return;
    }

    setVideoData(savedData.videoData);
    setTimeout(() => {
      localStorage.setItem('vidfetch_completed', 'true');
      setShowLoading(false);
    }, 500);
  }, [router]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const savedData = getVideoData();

        if (!savedData || !savedData.url) {
          console.error('❌ No URL found in localStorage');
          router.push('/stepone');
          return;
        }

        console.log('🎬 Fetching video for URL:', savedData.url);
        setIsLoadingVideo(true);

        const response = await fetchVideoMetadata(savedData.url);
        if (!response) throw new Error('No response from backend');

        const mockVideoData = {
          title: response.title || 'Video Title',
          thumbnail: response.thumbnail || 'https://via.placeholder.com/640x360',
          author: response.author || '@unknown',
          platform: savedData.platform || 'TikTok',
          videoUrl: response.videoUrl || savedData.url,
          formats: response.formats || [
            {
              id: 'hd',
              label: 'HD Video',
              quality: '1080p',
              format: 'MP4',
              url: response.videoUrl || savedData.url,
              // size: '24.5 MB',
            },
          ],
        };

        console.log('✅ Processed video data:', mockVideoData);
        setVideoData(mockVideoData);
        saveVideoData({ ...savedData, videoData: mockVideoData });
      } catch (err) {
        console.error('❌ Error fetching video:', err);
        setError(`Failed to fetch video: ${err.message}`);
      } finally {
        setIsLoadingVideo(false);
      }
    };

    fetchVideo();
  }, [router]);

  if (!videoData) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.successCard}>
          <h1 className={styles.successTitle}>Video Ready!</h1>
          <p className={styles.successSubtitle}>Click below to download</p>

          <div className={styles.downloadCard}>
            <div className={styles.cardContent}>
              <img
                src={videoData.thumbnail}
                alt={videoData.title}
                className={styles.cardThumbnail}
              />
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{videoData.title}</h3>
                <div className={styles.cardMeta}>
                  <span className={styles.cardBadge}>HD</span>
                  <span className={styles.cardFormat}>MP4</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <ButtonLoading
              variant="secondary"
              onClick={handleDownload}
              className={styles.actionButton}
            >
              Download Video
            </ButtonLoading>

            <ButtonLoading
              variant="primary"
              onClick={handleDownloadAnother}
              className={styles.actionButton}
            >
              Download Another Video
            </ButtonLoading>
          </div>
        </div>
      </div>
    </div>
  );
}
