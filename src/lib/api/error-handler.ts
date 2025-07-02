import { toast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';

export interface APIError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export class APIErrorHandler {
  private static readonly ERROR_MESSAGES: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'Authentication required. Please log in.',
    403: 'You don\'t have permission to perform this action.',
    404: 'The requested resource was not found.',
    409: 'A conflict occurred. Please refresh and try again.',
    422: 'The data provided is invalid.',
    429: 'Too many requests. Please slow down.',
    500: 'Server error. Please try again later.',
    502: 'Service temporarily unavailable.',
    503: 'Service temporarily unavailable.',
    504: 'Request timeout. Please try again.',
  };

  static handle(error: AxiosError): APIError {
    // Network errors
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        return {
          message: 'Request timed out. Please check your connection.',
          code: 'TIMEOUT',
        };
      }
      
      if (error.code === 'ERR_NETWORK') {
        return {
          message: 'Network error. Please check your internet connection.',
          code: 'NETWORK_ERROR',
        };
      }

      return {
        message: 'An unexpected error occurred. Please try again.',
        code: 'UNKNOWN_ERROR',
      };
    }

    const { status, data } = error.response;

    // Extract error message from response
    let message = data?.message || data?.error || this.ERROR_MESSAGES[status] || 'An error occurred';
    
    // Handle specific error cases
    if (status === 429 && data?.retry_after) {
      message = `Rate limit exceeded. Please wait ${data.retry_after} seconds.`;
    }

    return {
      message,
      code: data?.code,
      status,
      details: data?.details || data?.errors,
    };
  }

  static showError(error: APIError, options?: { silent?: boolean }) {
    if (!options?.silent) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  }

  static isRetryable(error: AxiosError): boolean {
    if (!error.response) {
      // Network errors are retryable
      return true;
    }

    const { status } = error.response;
    
    // Retry on server errors and rate limits
    return status >= 500 || status === 429 || status === 408;
  }

  static getRetryDelay(error: AxiosError, attempt: number): number {
    if (error.response?.status === 429) {
      // Use retry-after header if available
      const retryAfter = error.response.headers['retry-after'];
      if (retryAfter) {
        return parseInt(retryAfter) * 1000;
      }
    }

    // Exponential backoff: 1s, 2s, 4s, 8s...
    return Math.min(1000 * Math.pow(2, attempt - 1), 30000);
  }
}