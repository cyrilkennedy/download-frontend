// lib/helpers.js

/**
 * Detect platform from video URL
 * @param {string} url - Video URL
 * @returns {string|null} Platform name
 */
export function detectPlatform(url) {
  if (!url) return null;
  
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes('tiktok.com') || urlLower.includes('vm.tiktok.com')) {
    return 'TikTok';
  }
  if (urlLower.includes('instagram.com') || urlLower.includes('instagr.am')) {
    return 'Instagram';
  }
  if (urlLower.includes('facebook.com') || urlLower.includes('fb.watch') || urlLower.includes('fb.com')) {
    return 'Facebook';
  }
  if (urlLower.includes('twitter.com') || urlLower.includes('x.com') || urlLower.includes('t.co')) {
    return 'Twitter';
  }
  
  return null;
}

/**
 * Validate video URL
 * @param {string} url - URL to validate
 * @returns {boolean}
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Format file size to human readable
 * @param {number} bytes - File size in bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format duration to MM:SS
 * @param {number} seconds - Duration in seconds
 * @returns {string}
 */
export function formatDuration(seconds) {
  if (!seconds) return '00:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Save video data to localStorage
 * @param {Object} data - Video data
 */
export function saveVideoData(data) {
  try {
    localStorage.setItem('vidfetch_video_data', JSON.stringify(data));
    localStorage.setItem('vidfetch_timestamp', Date.now().toString());
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

/**
 * Get video data from localStorage
 * @returns {Object|null}
 */
export function getVideoData() {
  try {
    const data = localStorage.getItem('vidfetch_video_data');
    const timestamp = localStorage.getItem('vidfetch_timestamp');
    
    // Clear data if older than 1 hour
    if (timestamp && Date.now() - parseInt(timestamp) > 3600000) {
      clearVideoData();
      return null;
    }
    
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
    return null;
  }
}

/**
 * Clear video data from localStorage
 */
export function clearVideoData() {
  try {
    localStorage.removeItem('vidfetch_video_data');
    localStorage.removeItem('vidfetch_timestamp');
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}

/**
 * Add video to recent downloads
 * @param {Object} videoInfo - Video information
 */
export function addToRecentDownloads(videoInfo) {
  try {
    const recent = getRecentDownloads();
    const newRecent = [videoInfo, ...recent].slice(0, 6); // Keep only 6 recent
    localStorage.setItem('vidfetch_recent', JSON.stringify(newRecent));
  } catch (error) {
    console.error('Failed to save recent download:', error);
  }
}

/**
 * Get recent downloads from localStorage
 * @returns {Array}
 */
export function getRecentDownloads() {
  try {
    const recent = localStorage.getItem('vidfetch_recent');
    return recent ? JSON.parse(recent) : [];
  } catch (error) {
    console.error('Failed to get recent downloads:', error);
    return [];
  }
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string}
 */
export function truncateText(text, maxLength = 50) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}