export interface RequestTimeoutConfig {
  default: number;
  auth: number;
  upload: number;
  download: number;
  longRunning: number;
}

export const DEFAULT_TIMEOUTS: RequestTimeoutConfig = {
  default: 30000,      // 30 seconds for regular requests
  auth: 10000,         // 10 seconds for auth requests
  upload: 300000,      // 5 minutes for uploads
  download: 120000,    // 2 minutes for downloads
  longRunning: 120000, // 120 seconds for AI operations (matching backend)
};

export interface RetryConfig {
  maxRetries: number;
  retryableStatuses: number[];
  retryDelay: (attempt: number) => number;
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
  retryDelay: (attempt: number) => Math.min(1000 * Math.pow(2, attempt - 1), 30000),
};

export interface RequestConfig {
  timeout?: number;
  retry?: boolean | Partial<RetryConfig>;
  silent?: boolean; // Don't show error toast
  skipAuth?: boolean; // Skip auth headers
  skipCSRF?: boolean; // Skip CSRF token
  signal?: AbortSignal; // For request cancellation
}