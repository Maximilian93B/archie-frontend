# API Client Improvements Documentation

## Overview

The Archivus API client has been enhanced with robust error handling, request cancellation, CSRF protection, and configurable timeouts. This document outlines the improvements and how to use them.

## Key Improvements

### 1. **Enhanced Error Handling**

The API client now includes:
- Centralized error handling with user-friendly messages
- Automatic retry logic for failed requests
- Network error detection and handling
- Silent error mode for background operations

```typescript
// Example: Silent background operation
await apiClient.post('/api/v1/sync', data, {
  requestConfig: {
    silent: true, // No error toasts shown to user
  }
});
```

### 2. **Request Cancellation**

All requests can now be cancelled using AbortController:

```typescript
// Create cancellable request
const { signal, cancel } = apiClient.createCancellableRequest();

// Make request with signal
const result = await apiClient.get('/api/v1/documents', {
  requestConfig: { signal }
});

// Cancel if needed
cancel();
```

### 3. **CSRF Protection**

CSRF tokens are automatically:
- Fetched from the backend
- Included in state-changing requests (POST, PUT, DELETE)
- Refreshed when expired
- Cached for performance

No additional configuration needed - it works automatically!

### 4. **Configurable Timeouts**

Different timeout configurations for different request types:

```typescript
const DEFAULT_TIMEOUTS = {
  default: 30000,      // 30 seconds for regular requests
  auth: 10000,         // 10 seconds for auth requests
  upload: 300000,      // 5 minutes for uploads
  download: 120000,    // 2 minutes for downloads
  longRunning: 600000, // 10 minutes for long operations
};
```

Override per request:
```typescript
await apiClient.get('/api/v1/documents', {
  requestConfig: {
    timeout: 5000, // 5 second timeout
  }
});
```

### 5. **Automatic Token Refresh**

The client now:
- Tracks token expiration time
- Refreshes tokens proactively (5 minutes before expiration)
- Retries failed requests after token refresh
- Handles multi-tab logout

### 6. **Request Retry Logic**

Failed requests are automatically retried with:
- Exponential backoff (1s, 2s, 4s, 8s...)
- Configurable retry count
- Smart retry detection (only retries safe operations)

```typescript
await apiClient.get('/api/v1/documents', {
  requestConfig: {
    retry: {
      maxRetries: 5,
      retryableStatuses: [408, 429, 500, 502, 503, 504],
    }
  }
});
```

### 7. **Request Manager**

Manage multiple requests with the RequestManager:

```typescript
import { requestManager } from '@/lib/api/request-manager';

// Create managed request
const signal = requestManager.createRequest('my-operation');

// Cancel specific request
requestManager.cancelRequest('my-operation');

// Cancel all requests
requestManager.cancelAll();
```

## Usage Examples

### Basic Request with Error Handling

```typescript
try {
  const documents = await apiClient.get('/api/v1/documents');
  // Success
} catch (error) {
  // Error is automatically shown to user via toast
  // You can still handle it specifically if needed
}
```

### File Upload with Progress and Cancellation

```typescript
const { signal, cancel } = apiClient.createCancellableRequest();

const document = await apiClient.uploadDocument(
  file,
  { enable_ai: true },
  (progress) => console.log(`${progress}% uploaded`),
  signal
);

// To cancel: cancel();
```

### Background Sync without Error Toasts

```typescript
await apiClient.post('/api/v1/sync', data, {
  requestConfig: {
    silent: true,
    retry: {
      maxRetries: 10,
    }
  }
});
```

### Custom Timeout for Search

```typescript
const results = await apiClient.get('/api/v1/search', {
  params: { q: 'invoice' },
  requestConfig: {
    timeout: 3000, // 3 second timeout for search
  }
});
```

## React Hook Example

```typescript
function useDocumentList() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const requestRef = useRef<{ cancel: () => void }>();

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    
    const { signal, cancel } = apiClient.createCancellableRequest();
    requestRef.current = { cancel };

    try {
      const response = await apiClient.getDocuments({}, { signal });
      setDocuments(response.items);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        // Handle non-cancellation errors
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      requestRef.current?.cancel();
    };
  }, []);

  return { documents, loading, fetchDocuments };
}
```

## Configuration

### Environment Variables

No new environment variables needed. The client uses existing:
- `NEXT_PUBLIC_API_URL` - Backend API URL

### TypeScript Support

All new features are fully typed. RequestConfig interface:

```typescript
interface RequestConfig {
  timeout?: number;
  retry?: boolean | Partial<RetryConfig>;
  silent?: boolean;
  skipAuth?: boolean;
  skipCSRF?: boolean;
  signal?: AbortSignal;
}
```

## Migration Guide

### Before
```typescript
// Old way
const response = await apiClient.post('/api/v1/documents/upload', formData, {
  timeout: 300000,
});
```

### After
```typescript
// New way with better error handling and cancellation
const { signal, cancel } = apiClient.createCancellableRequest();

const response = await apiClient.uploadDocument(
  file,
  options,
  onProgress,
  signal
);
```

## Best Practices

1. **Always clean up cancellable requests** in React components
2. **Use silent mode** for background operations
3. **Configure appropriate timeouts** for different operation types
4. **Let the client handle retries** instead of implementing your own
5. **Use the RequestManager** for complex multi-request operations

## Troubleshooting

### CSRF Token Errors
- The client automatically fetches CSRF tokens
- If you see CSRF errors, check backend CSRF endpoint is working
- Tokens are cached for 55 minutes (5 minutes before 1-hour expiry)

### Timeout Errors
- Increase timeout for long operations
- Use `DEFAULT_TIMEOUTS.longRunning` for reports/analytics

### Network Errors
- Client shows user-friendly messages
- Implements automatic retry with backoff
- Check browser console for detailed errors

### Token Refresh Issues
- Tokens refresh automatically 5 minutes before expiry
- Manual refresh available via `apiClient.refreshToken()`
- Check refresh_token is properly stored