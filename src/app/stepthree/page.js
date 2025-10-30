"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonLoading from "@/components/ButtonLoading";
import { getVideoData, clearVideoData } from "@/lib/helper";
import styles from "./page.module.css";
import { toast } from "react-toastify";

export default function StepThree() {
  const [videoData, setVideoData] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('hd');
  const [popUnderShown, setPopUnderShown] = useState(false);
  const router = useRouter();

  // ✅ Load saved data on mount
  useEffect(() => {
    try {
      const rawData = localStorage.getItem('vidfetch_data');
      
      if (!rawData) {
        console.warn('No data found, redirecting to step one');
        router.push('/stepone');
        return;
      }

      const savedData = JSON.parse(rawData);
      
      if (!savedData || !savedData.videoData) {
        console.warn('Invalid video data, redirecting to step one');
        router.push('/stepone');
        return;
      }

      console.log('✅ Loaded video data in Step 3:', savedData);
      
      setVideoData(savedData.videoData);
      setSelectedFormat(savedData.selectedFormat || 'hd');
      
      setTimeout(() => {
        localStorage.setItem('vidfetch_completed', 'true');
        setShowLoading(false);
      }, 500);
      
    } catch (err) {
      console.error('❌ Error loading data:', err);
      router.push('/stepone');
    }
  }, [router]);

  // ---- ADSTERRA POP-UNDER TRIGGER ----
  const triggerPopUnder = () => {
    if (popUnderShown) return; // one-time only
    setPopUnderShown(true);

    // ---- ADSTERRA POP-UNDER CODE ----
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      atOptions = {
        'key' : '0340ae8bf65be2eb5d40f91113763206',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;
    document.body.appendChild(script);

    const invoke = document.createElement("script");
    invoke.src =
      "//www.highperformanceformat.com/0340ae8bf65be2eb5d40f91113763206/invoke.js";
    document.body.appendChild(invoke);
  };

  const handleDownload = async () => {
    console.log("DOWNLOAD VIDEO BUTTON CLICKED");

    if (!videoData) {
      toast.error("No video data found!");
      return;
    }

    const selectedFormatData = videoData.formats?.find(f => f.id === selectedFormat);
    const videoUrl = selectedFormatData?.url || videoData.videoUrl || videoData.url;

    // Sanitize filename to avoid illegal characters
    const sanitizeFileName = (name) => {
      return name.replace(/[\\/:*?"<>|]/g, "_").trim();
    };

    const fileName = `${sanitizeFileName(videoData.title || "video")}.${selectedFormatData?.format.toLowerCase() || 'mp4'}`;

    console.log("Extracted video URL:", videoUrl);
    console.log("Selected format:", selectedFormatData);

    if (!videoUrl || videoUrl === "#" || videoUrl === "") {
      toast.error("No valid video URL found!");
      setIsDownloading(false);
      return;
    }

    try {
      setIsDownloading(true);
      console.log("Starting download for:", videoUrl);

      // Always use backend proxy to fetch and download as Blob (bypasses CORS and forces download)
      console.log("Using backend proxy...");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 120s timeout for large files

      let response;
      try {
        response = await fetch(
          "https://video-downloader-backend-u4a6.onrender.com/api/proxy",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: videoUrl }),
            signal: controller.signal,
          }
        );
      } catch (err) {
        clearTimeout(timeoutId);
        throw new Error("Network error: " + err.message);
      }

      clearTimeout(timeoutId);

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      // Check HTTP status
      if (!response.ok) {
        let errorText = "Unknown error";
        try {
          errorText = await response.text();
        } catch {}
        throw new Error(`Backend error ${response.status}: ${errorText.substring(0, 200)}`);
      }

      // Validate content-type BEFORE .blob()
      const contentType = response.headers.get("content-type") || "";
      const contentDisposition = response.headers.get("content-disposition") || "";

      console.log("Content-Type:", contentType);
      console.log("Content-Disposition:", contentDisposition);

      if (
        !contentType.includes("video") &&
        !contentType.includes("octet-stream") &&
        !contentDisposition.includes("attachment")
      ) {
        let bodyText = "";
        try {
          bodyText = await response.text();
        } catch {}
        console.error("Invalid content received:", bodyText.substring(0, 500));
        throw new Error("Invalid file received. Expected video, got: " + contentType);
      }

      // Safe to call .blob()
      let blob;
      try {
        blob = await response.blob();
      } catch (err) {
        console.error("Failed to parse blob:", err);
        throw new Error("Failed to process video file");
      }

      if (!blob || blob.size === 0) {
        throw new Error("Downloaded file is empty");
      }

      // Trigger download
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 100);

      console.log("Download completed successfully!");
      toast.success("Download started! Check your downloads folder.");

      // ---- TRIGGER POP-UNDER AFTER DOWNLOAD ----
      setTimeout(() => {
        triggerPopUnder();
      }, 1500); // optional delay so it feels natural

    } catch (error) {
      console.error("Download failed:", error);

      let userMessage = "Failed to download video.";
      if (error.message.includes("content-type") || error.message.includes("Invalid")) {
        userMessage = "Server sent invalid file. Try another video or format.";
      } else if (error.message.includes("Network") || error.name === "AbortError") {
        userMessage = "Connection failed. Check internet or try again.";
      } else {
        userMessage = error.message.length > 100 
          ? "Download failed. Please try again." 
          : error.message;
      }

      toast.error(userMessage);
      setError(userMessage);
    } finally {
      setIsDownloading(false);
    }
  };

  // ✅ Go back to Step One
  const handleDownloadAnother = () => {
    console.log("🔄 DOWNLOAD ANOTHER VIDEO BUTTON CLICKED");
    try {
      clearVideoData();
      localStorage.removeItem("vidfetch_data");
      localStorage.removeItem("vidfetch_completed");
      console.log('✅ Cleared all data, returning to step one');
    } catch (e) {
      console.warn("Failed to clear data", e);
    }
    router.push("/stepone");
  };

  // ✅ UI
  if (showLoading || !videoData) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.loadingCard}>
            <div className={styles.spinner}></div>
            <p>Preparing your download...</p>
          </div>
        </div>
      </div>
    );
  }

  const selectedFormatData = videoData.formats?.find(f => f.id === selectedFormat);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: '100%' }}></div>
        </div>

        {/* Step Indicator */}
        <div className={styles.stepIndicator}>
          <div className={styles.step}>
            <div className={`${styles.stepCircle} ${styles.completed}`}>✓</div>
            <span className={styles.stepLabel}>Paste URL</span>
          </div>
          <div className={styles.step}>
            <div className={`${styles.stepCircle} ${styles.completed}`}>✓</div>
            <span className={styles.stepLabel}>Preview</span>
          </div>
          <div className={styles.step}>
            <div className={`${styles.stepCircle} ${styles.active}`}>3</div>
            <span className={styles.stepLabel}>Download</span>
          </div>
        </div>

        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="40" fill="#10B981" opacity="0.1"/>
              <circle cx="40" cy="40" r="30" fill="#10B981" opacity="0.2"/>
              <path 
                d="M25 40 L35 50 L55 30" 
                stroke="#10B981" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          
          <h1 className={styles.successTitle}>Video Ready!</h1>
          <p className={styles.successSubtitle}>Your video is ready to download</p>

          <div className={styles.downloadCard}>
            <div className={styles.cardContent}>
              <img
                src={videoData.thumbnail}
                alt={videoData.title}
                className={styles.cardThumbnail}
              />
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{videoData.title}</h3>
                <p className={styles.cardAuthor}>by {videoData.author || 'Unknown'}</p>
                <div className={styles.cardMeta}>
                  <span className={styles.cardBadge}>{selectedFormatData?.quality || 'HD'}</span>
                  <span className={styles.cardFormat}>{selectedFormatData?.format || 'MP4'}</span>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#dc3545">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
              </svg>
              {error}
            </div>
          )}

          <div className={styles.actionButtons}>
            {/* 🔥 MAIN DOWNLOAD BUTTON - FIRST */}
            <ButtonLoading
              variant="primary"
              onClick={handleDownload}
              className={styles.downloadButton}
              disabled={isDownloading}
              loading={isDownloading}
              loadingText="Downloading..."
            >
              ⬇️ {isDownloading ? "Downloading..." : "Download Video Now"}
            </ButtonLoading>

            {/* Secondary button */}
            <ButtonLoading
              variant="secondary"
              onClick={handleDownloadAnother}
              className={styles.secondaryButton}
              disabled={isDownloading}
            >
              🔄 Download Another Video
            </ButtonLoading>
          </div>

          <p className={styles.hint}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C757D" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            Your download will start automatically
          </p>
        </div>
      </div>
    </div>
  );
}