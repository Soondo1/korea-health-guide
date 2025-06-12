/**
 * Client-side rate limiting utility
 * 
 * Note: Proper rate limiting should be implemented server-side.
 * This client-side implementation is for demonstration purposes only.
 */

interface RateLimitEntry {
  count: number;
  timestamp: number;
}

interface RateLimitOptions {
  maxRequests: number;  // Maximum number of requests allowed
  timeWindow: number;   // Time window in milliseconds
  storageKey: string;   // Key to use for storing rate limit data
}

/**
 * Simple client-side rate limiting implementation
 * @param options Configuration options for the rate limiter
 * @returns A function that checks if a request should be allowed
 */
export function createRateLimiter(options: RateLimitOptions = {
  maxRequests: 5,
  timeWindow: 60000, // 1 minute
  storageKey: 'rate_limit'
}) {
  const { maxRequests, timeWindow, storageKey } = options;
  
  /**
   * Checks if the current request should be allowed based on rate limiting rules
   * @returns An object with allowed flag and reset time
   */
  return function checkRateLimit(): { 
    allowed: boolean; 
    resetTime: number | null;
    remainingRequests: number;
  } {
    try {
      const now = Date.now();
      const storedData = localStorage.getItem(storageKey);
      let rateData: RateLimitEntry = storedData 
        ? JSON.parse(storedData) 
        : { count: 0, timestamp: now };
      
      // Reset count if the time window has passed
      if (now - rateData.timestamp > timeWindow) {
        rateData = { count: 0, timestamp: now };
      }
      
      // Increment the request count
      rateData.count += 1;
      
      // Store updated data
      localStorage.setItem(storageKey, JSON.stringify(rateData));
      
      // Calculate remaining time until reset
      const resetTime = rateData.timestamp + timeWindow;
      const remainingRequests = Math.max(0, maxRequests - rateData.count);
      
      // Check if the request is allowed
      return {
        allowed: rateData.count <= maxRequests,
        resetTime: resetTime,
        remainingRequests
      };
    } catch (e) {
      // If there's an error (e.g., localStorage not available), allow the request
      console.error('Rate limiting error:', e);
      return {
        allowed: true,
        resetTime: null,
        remainingRequests: maxRequests
      };
    }
  };
}

/**
 * Format milliseconds into a human-readable time string
 * @param ms Milliseconds to format
 * @returns Formatted time string (e.g., "2m 30s")
 */
export function formatTimeRemaining(ms: number): string {
  if (ms <= 0) return '0s';
  
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  
  if (minutes === 0) {
    return `${seconds}s`;
  }
  
  return `${minutes}m ${seconds}s`;
} 