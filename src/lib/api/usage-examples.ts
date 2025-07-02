/**
 * Usage examples for the enhanced API client
 * These examples show how to use the new features like cancellation, timeouts, and error handling
 */

import { apiClient } from './client';
import { requestManager } from './request-manager';
import { DEFAULT_TIMEOUTS } from './request-config';

// ================================
// Example 1: Cancellable File Upload
// ================================
export async function uploadFileWithCancellation(file: File) {
  // Create a cancellable request
  const signal = requestManager.createRequest('file-upload');

  try {
    const document = await apiClient.uploadDocument(
      file,
      {
        enable_ai: true,
        enable_ocr: true,
      },
      (progress) => {
        console.log(`Upload progress: ${progress}%`);
      },
      signal // Pass the abort signal
    );

    requestManager.cleanup('file-upload');
    return document;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.log('Upload was cancelled');
    }
    throw error;
  }
}

// Cancel the upload
export function cancelUpload() {
  requestManager.cancelRequest('file-upload');
}

// ================================
// Example 2: Search with Custom Timeout
// ================================
export async function searchWithTimeout(query: string) {
  try {
    const results = await apiClient.post(
      '/api/v1/search/hybrid',
      { query, limit: 20 },
      {
        requestConfig: {
          timeout: 5000, // 5 second timeout for search
          retry: false, // Don't retry search requests
        }
      }
    );
    return results;
  } catch (error: any) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Search timed out. Please try again.');
    }
    throw error;
  }
}

// ================================
// Example 3: Batch Operations with Progress
// ================================
export async function batchDeleteDocuments(documentIds: string[]) {
  const results = {
    succeeded: [] as string[],
    failed: [] as { id: string; error: string }[],
  };

  for (const id of documentIds) {
    try {
      await apiClient.delete(`/api/v1/documents/${id}`, {
        requestConfig: {
          silent: true, // Don't show individual error toasts
          retry: {
            maxRetries: 1, // Only retry once for deletes
          }
        }
      });
      results.succeeded.push(id);
    } catch (error: any) {
      results.failed.push({
        id,
        error: error.response?.data?.message || 'Delete failed',
      });
    }
  }

  return results;
}

// ================================
// Example 4: Long-Running Operation
// ================================
export async function generateWorkspaceAnalysis() {
  const signal = requestManager.createRequest('workspace-analysis');

  try {
    const analysis = await apiClient.post(
      '/api/v1/analytics/workspace-analysis',
      { detailed: true },
      {
        requestConfig: {
          timeout: DEFAULT_TIMEOUTS.longRunning, // 10 minutes
          signal,
        }
      }
    );
    
    requestManager.cleanup('workspace-analysis');
    return analysis;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.log('Analysis generation was cancelled');
    }
    throw error;
  }
}

// ================================
// Example 5: Silent Background Sync
// ================================
export async function backgroundSync() {
  try {
    await apiClient.post(
      '/api/v1/sync/workspace',
      {},
      {
        requestConfig: {
          silent: true, // Don't show errors to user
          retry: {
            maxRetries: 5, // Keep trying in background
            retryDelay: (attempt) => attempt * 10000, // 10s, 20s, 30s...
          }
        }
      }
    );
  } catch (error) {
    // Log to error tracking service
    console.error('Background sync failed after retries:', error);
  }
}

// ================================
// Example 6: React Hook Usage
// ================================
export function useDocumentUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  
  const uploadRef = useRef<{ cancel: () => void } | null>(null);

  const upload = useCallback(async (file: File) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    const { signal, cancel } = apiClient.createCancellableRequest();
    uploadRef.current = { cancel };

    try {
      const document = await apiClient.uploadDocument(
        file,
        { enable_ai: true },
        setProgress,
        signal
      );
      
      return document;
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setError(error);
      }
      throw error;
    } finally {
      setUploading(false);
      uploadRef.current = null;
    }
  }, []);

  const cancel = useCallback(() => {
    uploadRef.current?.cancel();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      uploadRef.current?.cancel();
    };
  }, []);

  return { upload, cancel, uploading, progress, error };
}

// ================================
// Example 7: Error Recovery Pattern
// ================================
export async function robustDocumentFetch(documentId: string) {
  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      // Try to get from cache first
      const cached = await apiClient.get(
        `/api/v1/documents/${documentId}`,
        {
          headers: { 'Cache-Control': 'max-age=300' }, // 5 min cache
          requestConfig: {
            timeout: 5000, // Quick timeout for cache
            retry: false,
          }
        }
      );
      
      return cached;
    } catch (error: any) {
      retries++;
      
      if (retries >= maxRetries) {
        // Final attempt with longer timeout
        return apiClient.get(
          `/api/v1/documents/${documentId}`,
          {
            headers: { 'Cache-Control': 'no-cache' },
            requestConfig: {
              timeout: 30000, // 30s for final attempt
              retry: true,
            }
          }
        );
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * retries));
    }
  }
}

// Import for React hooks
import { useState, useCallback, useRef, useEffect } from 'react';