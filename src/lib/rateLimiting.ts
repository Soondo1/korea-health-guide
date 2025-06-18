/**
 * Enhanced client-side rate limiting utility
 * 
 * Note: This is a client-side implementation for user experience.
 * Server-side rate limiting should also be implemented for security.
 */

interface RateLimitEntry {
  count: number;
  timestamp: number;
  attempts: number; // Track consecutive attempts
}

interface RateLimitOptions {
  maxRequests: number;  // Maximum number of requests allowed
  timeWindow: number;   // Time window in milliseconds
  storageKey: string;   // Key to use for storing rate limit data
}

interface RateLimitResult {
  allowed: boolean;
  resetTime: number | null;
  remainingRequests: number;
  attemptsUsed: number;
}

/**
 * Enhanced client-side rate limiting implementation with better error handling
 * @param options Configuration options for the rate limiter
 * @returns A function that checks if a request should be allowed
 */
export function createRateLimiter(options: RateLimitOptions = {
  maxRequests: 5,
  timeWindow: 60000, // 1 minute
  storageKey: 'rate_limit'
}): () => RateLimitResult {
  const { maxRequests, timeWindow, storageKey } = options;
  
  // Fallback storage when localStorage is not available
  const memoryStorage: { [key: string]: string } = {};
  
  const isLocalStorageAvailable = (): boolean => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        // Test localStorage availability
        window.localStorage.setItem('test', 'test');
        window.localStorage.removeItem('test');
        return true;
      }
    } catch (e) {
      // localStorage not available
    }
    return false;
  };

  const setItem = (key: string, value: string): void => {
    try {
      if (isLocalStorageAvailable()) {
        window.localStorage.setItem(key, value);
      } else {
        memoryStorage[key] = value;
      }
    } catch (e) {
      // Silently fail if storage is not available
      memoryStorage[key] = value;
    }
  };

  const getItem = (key: string): string | null => {
    try {
      if (isLocalStorageAvailable()) {
        return window.localStorage.getItem(key);
      } else {
        return memoryStorage[key] || null;
      }
    } catch (e) {
      return memoryStorage[key] || null;
    }
  };
  
  /**
   * Checks if the current request should be allowed based on rate limiting rules
   * @returns An object with allowed flag, reset time, and remaining requests
   */
  return function checkRateLimit(): RateLimitResult {
    try {
      const now = Date.now();
      const storedData = getItem(storageKey);
      let rateData: RateLimitEntry;

      if (storedData) {
        try {
          rateData = JSON.parse(storedData);
          // Validate parsed data structure
          if (typeof rateData.count !== 'number' || typeof rateData.timestamp !== 'number') {
            throw new Error('Invalid stored data structure');
          }
        } catch (parseError) {
          // Reset on invalid data
          rateData = { count: 0, timestamp: now, attempts: 0 };
        }
      } else {
        rateData = { count: 0, timestamp: now, attempts: 0 };
      }
      
      // Reset count if the time window has passed
      if (now - rateData.timestamp > timeWindow) {
        rateData = { count: 0, timestamp: now, attempts: 0 };
      }
      
      // Increment the request count and attempts
      rateData.count += 1;
      rateData.attempts += 1;
      
      // Store updated data
      setItem(storageKey, JSON.stringify(rateData));
      
      // Calculate remaining time until reset
      const resetTime = rateData.timestamp + timeWindow;
      const remainingRequests = Math.max(0, maxRequests - rateData.count);
      
      // Check if the request is allowed
      const allowed = rateData.count <= maxRequests;
      
      return {
        allowed,
        resetTime: allowed ? null : resetTime,
        remainingRequests,
        attemptsUsed: rateData.attempts
      };
    } catch (e) {
      // If there's any error, allow the request but log the issue
      if (process.env.NODE_ENV === 'development') {
        console.warn('Rate limiting error:', e);
      }
      return {
        allowed: true,
        resetTime: null,
        remainingRequests: maxRequests,
        attemptsUsed: 0
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
  if (ms <= 0) return '0 seconds';
  
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  
  const parts: string[] = [];
  
  if (hours > 0) {
    parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  }
  
  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  }
  
  if (seconds > 0 && hours === 0) { // Don't show seconds if hours are present
    parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
  }
  
  if (parts.length === 0) {
    return '0 seconds';
  }
  
  if (parts.length === 1) {
    return parts[0];
  }
  
  // Join with commas and "and" for the last item
  const lastPart = parts.pop();
  return `${parts.join(', ')} and ${lastPart}`;
}

/**
 * Clear rate limiting data for a specific storage key
 * @param storageKey The storage key to clear
 */
export function clearRateLimit(storageKey: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(storageKey);
    }
  } catch (e) {
    // Silently fail if localStorage is not available
  }
} 