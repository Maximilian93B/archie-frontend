import { apiClient } from './client'

/**
 * CSRF Token Management
 * 
 * Handles fetching and caching CSRF tokens for state-changing operations.
 * Required for all POST, PUT, and DELETE requests per backend specification.
 */

// Store the token in memory (not localStorage for security)
let csrfToken: string | null = null
let tokenFetchPromise: Promise<string> | null = null

/**
 * Fetch a new CSRF token from the backend
 */
async function fetchCSRFToken(): Promise<string> {
  try {
    const response = await apiClient.get('/api/v1/auth/csrf-token')
    
    if (!response || !response.csrf_token) {
      throw new Error('Invalid CSRF token response')
    }
    
    return response.csrf_token
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error)
    throw new Error('Failed to fetch CSRF token')
  }
}

/**
 * Get a valid CSRF token, fetching a new one if necessary
 */
export async function getCSRFToken(): Promise<string> {
  // If we already have a token, return it
  if (csrfToken) {
    return csrfToken
  }
  
  // If a fetch is already in progress, wait for it
  if (tokenFetchPromise) {
    try {
      csrfToken = await tokenFetchPromise
      return csrfToken
    } catch (error) {
      // If the in-progress fetch failed, try again
      tokenFetchPromise = null
    }
  }
  
  // Fetch a new token
  tokenFetchPromise = fetchCSRFToken()
  
  try {
    csrfToken = await tokenFetchPromise
    return csrfToken
  } catch (error) {
    tokenFetchPromise = null
    throw error
  }
}

/**
 * Clear the cached CSRF token
 * Call this when:
 * - User logs out
 * - Token is rejected by the server (403 CSRF error)
 * - Session expires
 */
export function clearCSRFToken(): void {
  csrfToken = null
  tokenFetchPromise = null
}

/**
 * Ensure we have a valid CSRF token before making a request
 * This is a helper that can be used in interceptors
 */
export async function ensureCSRFToken(): Promise<string> {
  try {
    return await getCSRFToken()
  } catch (error) {
    console.error('Failed to ensure CSRF token:', error)
    throw error
  }
}

/**
 * Check if a request method requires CSRF token
 */
export function requiresCSRFToken(method: string): boolean {
  const methodUpper = method.toUpperCase()
  return ['POST', 'PUT', 'DELETE', 'PATCH'].includes(methodUpper)
}

/**
 * CSRF error handler - clears token and retries once
 */
export async function handleCSRFError<T>(
  operation: () => Promise<T>,
  retryCount: number = 0
): Promise<T> {
  try {
    return await operation()
  } catch (error: any) {
    // Check if this is a CSRF token error
    if (error?.response?.status === 403 && 
        (error?.response?.data?.code === 'CSRF_TOKEN_REQUIRED' ||
         error?.response?.data?.error?.includes('CSRF'))) {
      
      // Clear the invalid token
      clearCSRFToken()
      
      // Retry once with a fresh token
      if (retryCount === 0) {
        console.log('CSRF token invalid, fetching new token and retrying...')
        await getCSRFToken() // This will fetch a fresh token
        return handleCSRFError(operation, retryCount + 1)
      }
    }
    
    throw error
  }
}

/**
 * Add CSRF token to request headers
 */
export function addCSRFHeader(headers: Record<string, string>, token: string): Record<string, string> {
  return {
    ...headers,
    'X-CSRF-Token': token
  }
}

// Export a manager object for easier use
export const csrfTokenManager = {
  get: getCSRFToken,
  clear: clearCSRFToken,
  ensure: ensureCSRFToken,
  requiresToken: requiresCSRFToken,
  handleError: handleCSRFError,
  addHeader: addCSRFHeader
}

export default csrfTokenManager