// lib/animations.js

/**
 * Simulate progress with smooth easing
 * @param {Function} setProgress - setState function
 * @param {number} duration - Duration in ms
 * @param {Function} onComplete - Callback when complete
 * @returns {Function} Cleanup function
 */
export function simulateProgress(setProgress, duration = 3000, onComplete) {
  const startTime = Date.now();
  const interval = 50; // Update every 50ms
  
  const timer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / duration) * 100, 100);
    
    // Ease out cubic
    const eased = 100 - Math.pow(1 - (progress / 100), 3) * 100;
    
    setProgress(Math.min(Math.round(eased), 100));
    
    if (progress >= 100) {
      clearInterval(timer);
      if (onComplete) {
        setTimeout(onComplete, 500);
      }
    }
  }, interval);
  
  return () => clearInterval(timer);
}

/**
 * Wait for specified duration
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise}
 */
export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fade out element
 * @param {HTMLElement} element - Element to fade out
 * @param {number} duration - Duration in ms
 */
export function fadeOut(element, duration = 500) {
  return new Promise(resolve => {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '0';
    setTimeout(() => {
      element.style.display = 'none';
      resolve();
    }, duration);
  });
}

/**
 * Calculate circular progress stroke offset
 * @param {number} progress - Progress percentage (0-100)
 * @param {number} circumference - Circle circumference
 * @returns {number}
 */
export function calculateStrokeOffset(progress, circumference) {
  return circumference - (progress / 100) * circumference;
}