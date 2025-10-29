// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "https://video-downloader-backend-u4a6.onrender.com";

/**
 * Fetch video metadata from URL
 * @param {string} videoUrl - The video URL to download
 * @returns {Promise<Object>} Video metadata
 */
export async function fetchVideoMetadata(videoUrl) {
  try {
    console.log('🔍 Fetching metadata for:', videoUrl);
    
    const response = await fetch(`${API_BASE_URL}/api/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: videoUrl }),
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ API Response:', data);
    
    if (data.status === 'error') {
      throw new Error(data.message || 'Failed to fetch video');
    }

    return data;
  } catch (error) {
    console.error('❌ API Error (fetchVideoMetadata):', error);
    throw error;
  }
}

/**
 * Download video via proxy (fixes CORS issues)
 * @param {string} videoUrl - Direct video URL
 * @param {string} filename - Desired filename
 */
export async function proxyVideoDownload(videoUrl, filename = "video") {
  try {
    console.log("📥 Starting proxy download for:", videoUrl);

    const response = await fetch(`${API_BASE_URL}/api/proxy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: videoUrl }),
    });

    console.log("📡 Proxy response status:", response.status);

    if (!response.ok) {
      const errText = await response.text();
      console.error("❌ Proxy backend error:", errText);
      throw new Error(`Proxy download failed: ${response.status} - ${errText}`);
    }

    // Check content type
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      console.error("⚠️ Proxy backend error JSON:", errorData);
      throw new Error(errorData.message || "Backend returned an error");
    }

    // Convert response to Blob (video file)
    const blob = await response.blob();
    
    if (!blob || blob.size === 0) {
      throw new Error('Received empty file from proxy');
    }
    
    console.log('✅ Received blob, size:', blob.size);
    
    const blobUrl = window.URL.createObjectURL(blob);

    // Trigger browser download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${filename}.mp4`;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);

    console.log("✅ Download completed successfully!");
    return { success: true };
  } catch (error) {
    console.error("❌ Proxy download error:", error);
    throw new Error(`Failed to download video: ${error.message}`);
  }
}

/**
 * Get stream URL for direct download
 * @param {string} videoUrl - The video URL
 * @returns {string} Stream URL
 */
export function getStreamUrl(videoUrl) {
  const params = new URLSearchParams({ url: videoUrl });
  return `${API_BASE_URL}/api/stream?${params.toString()}`;
}

/**
 * Health check - verify backend is running
 * @returns {Promise<Object>}
 */
export async function healthCheck() {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    console.log('💚 Backend Health:', data);
    return data;
  } catch (error) {
    console.error('❌ Health check failed:', error);
    return { status: 'error', message: 'Backend unavailable' };
  }
}