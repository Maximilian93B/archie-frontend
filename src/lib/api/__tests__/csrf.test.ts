import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { 
  getCSRFToken, 
  clearCSRFToken, 
  ensureCSRFToken, 
  requiresCSRFToken,
  handleCSRFError,
  addCSRFHeader,
  csrfTokenManager 
} from '@/lib/api/csrf'
import { apiClient } from '@/lib/api/client'

// Mock the API client
vi.mock('@/lib/api/client', () => ({
  apiClient: {
    get: vi.fn()
  }
}))

describe('CSRF Token Management', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    clearCSRFToken() // Clear any cached token before each test
  })

  describe('getCSRFToken', () => {
    it('should fetch a new CSRF token when none is cached', async () => {
      const mockToken = 'test-csrf-token-123'
      ;(apiClient.get as any).mockResolvedValue({ csrf_token: mockToken })

      const token = await getCSRFToken()

      expect(apiClient.get).toHaveBeenCalledWith('/auth/csrf-token')
      expect(token).toBe(mockToken)
    })

    it('should return cached token on subsequent calls', async () => {
      const mockToken = 'test-csrf-token-123'
      ;(apiClient.get as any).mockResolvedValue({ csrf_token: mockToken })

      // First call - should fetch
      const token1 = await getCSRFToken()
      // Second call - should use cache
      const token2 = await getCSRFToken()

      expect(apiClient.get).toHaveBeenCalledTimes(1)
      expect(token1).toBe(mockToken)
      expect(token2).toBe(mockToken)
    })

    it('should handle concurrent token requests', async () => {
      const mockToken = 'test-csrf-token-123'
      let resolvePromise: (value: any) => void
      const promise = new Promise(resolve => {
        resolvePromise = resolve
      })
      
      ;(apiClient.get as any).mockReturnValue(promise)

      // Start multiple concurrent requests
      const promise1 = getCSRFToken()
      const promise2 = getCSRFToken()
      const promise3 = getCSRFToken()

      // Resolve the API call
      resolvePromise!({ csrf_token: mockToken })

      const [token1, token2, token3] = await Promise.all([promise1, promise2, promise3])

      // Should only call API once despite concurrent requests
      expect(apiClient.get).toHaveBeenCalledTimes(1)
      expect(token1).toBe(mockToken)
      expect(token2).toBe(mockToken)
      expect(token3).toBe(mockToken)
    })

    it('should throw error when API returns invalid response', async () => {
      ;(apiClient.get as any).mockResolvedValue({ invalid: 'response' })

      await expect(getCSRFToken()).rejects.toThrow('Failed to fetch CSRF token')
    })

    it('should throw error when API call fails', async () => {
      const error = new Error('Network error')
      ;(apiClient.get as any).mockRejectedValue(error)

      await expect(getCSRFToken()).rejects.toThrow('Failed to fetch CSRF token')
    })

    it('should retry after failed concurrent request', async () => {
      const mockToken = 'test-csrf-token-123'
      
      // First call will fail
      ;(apiClient.get as any).mockRejectedValueOnce(new Error('Network error'))
      
      // Start first request that will fail
      const promise1 = getCSRFToken().catch(() => {})
      
      // Wait for it to fail
      await promise1
      
      // Second call should succeed
      ;(apiClient.get as any).mockResolvedValueOnce({ csrf_token: mockToken })
      
      const token = await getCSRFToken()
      
      expect(apiClient.get).toHaveBeenCalledTimes(2)
      expect(token).toBe(mockToken)
    })
  })

  describe('clearCSRFToken', () => {
    it('should clear cached token', async () => {
      const mockToken = 'test-csrf-token-123'
      ;(apiClient.get as any).mockResolvedValue({ csrf_token: mockToken })

      // Get and cache a token
      await getCSRFToken()
      
      // Clear the token
      clearCSRFToken()

      // Next call should fetch a new token
      await getCSRFToken()

      expect(apiClient.get).toHaveBeenCalledTimes(2)
    })
  })

  describe('ensureCSRFToken', () => {
    it('should return a token successfully', async () => {
      const mockToken = 'test-csrf-token-123'
      ;(apiClient.get as any).mockResolvedValue({ csrf_token: mockToken })

      const token = await ensureCSRFToken()

      expect(token).toBe(mockToken)
    })

    it('should handle errors gracefully', async () => {
      const error = new Error('Network error')
      ;(apiClient.get as any).mockRejectedValue(error)

      await expect(ensureCSRFToken()).rejects.toThrow()
    })
  })

  describe('requiresCSRFToken', () => {
    it('should return true for POST requests', () => {
      expect(requiresCSRFToken('POST')).toBe(true)
      expect(requiresCSRFToken('post')).toBe(true)
    })

    it('should return true for PUT requests', () => {
      expect(requiresCSRFToken('PUT')).toBe(true)
      expect(requiresCSRFToken('put')).toBe(true)
    })

    it('should return true for DELETE requests', () => {
      expect(requiresCSRFToken('DELETE')).toBe(true)
      expect(requiresCSRFToken('delete')).toBe(true)
    })

    it('should return true for PATCH requests', () => {
      expect(requiresCSRFToken('PATCH')).toBe(true)
      expect(requiresCSRFToken('patch')).toBe(true)
    })

    it('should return false for GET requests', () => {
      expect(requiresCSRFToken('GET')).toBe(false)
      expect(requiresCSRFToken('get')).toBe(false)
    })

    it('should return false for HEAD requests', () => {
      expect(requiresCSRFToken('HEAD')).toBe(false)
      expect(requiresCSRFToken('head')).toBe(false)
    })

    it('should return false for OPTIONS requests', () => {
      expect(requiresCSRFToken('OPTIONS')).toBe(false)
      expect(requiresCSRFToken('options')).toBe(false)
    })
  })

  describe('handleCSRFError', () => {
    it('should not retry non-CSRF errors', async () => {
      const operation = vi.fn().mockRejectedValue(new Error('Generic error'))

      await expect(handleCSRFError(operation)).rejects.toThrow('Generic error')
      expect(operation).toHaveBeenCalledTimes(1)
    })

    it('should retry CSRF token errors once', async () => {
      const mockToken = 'new-csrf-token'
      ;(apiClient.get as any).mockResolvedValue({ csrf_token: mockToken })

      const csrfError = {
        response: {
          status: 403,
          data: { code: 'CSRF_TOKEN_REQUIRED' }
        }
      }

      const operation = vi.fn()
        .mockRejectedValueOnce(csrfError)
        .mockResolvedValueOnce({ success: true })

      const result = await handleCSRFError(operation)

      expect(operation).toHaveBeenCalledTimes(2)
      expect(apiClient.get).toHaveBeenCalledWith('/auth/csrf-token')
      expect(result).toEqual({ success: true })
    })

    it('should not retry more than once', async () => {
      const csrfError = {
        response: {
          status: 403,
          data: { error: 'Invalid CSRF token' }
        }
      }

      const operation = vi.fn().mockRejectedValue(csrfError)

      await expect(handleCSRFError(operation)).rejects.toMatchObject(csrfError)
      expect(operation).toHaveBeenCalledTimes(2) // Original + 1 retry
    })

    it('should handle 403 errors that are not CSRF-related', async () => {
      const nonCsrfError = {
        response: {
          status: 403,
          data: { error: 'Access denied' }
        }
      }

      const operation = vi.fn().mockRejectedValue(nonCsrfError)

      await expect(handleCSRFError(operation)).rejects.toMatchObject(nonCsrfError)
      expect(operation).toHaveBeenCalledTimes(1) // No retry
    })
  })

  describe('addCSRFHeader', () => {
    it('should add CSRF token to headers', () => {
      const headers = { 'Content-Type': 'application/json' }
      const token = 'test-csrf-token'

      const result = addCSRFHeader(headers, token)

      expect(result).toEqual({
        'Content-Type': 'application/json',
        'X-CSRF-Token': 'test-csrf-token'
      })
    })

    it('should preserve existing headers', () => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token',
        'X-Custom-Header': 'value'
      }
      const token = 'test-csrf-token'

      const result = addCSRFHeader(headers, token)

      expect(result).toEqual({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token',
        'X-Custom-Header': 'value',
        'X-CSRF-Token': 'test-csrf-token'
      })
    })

    it('should override existing CSRF token', () => {
      const headers = { 'X-CSRF-Token': 'old-token' }
      const token = 'new-token'

      const result = addCSRFHeader(headers, token)

      expect(result).toEqual({
        'X-CSRF-Token': 'new-token'
      })
    })
  })

  describe('csrfTokenManager', () => {
    it('should expose all methods', () => {
      expect(csrfTokenManager.get).toBe(getCSRFToken)
      expect(csrfTokenManager.clear).toBe(clearCSRFToken)
      expect(csrfTokenManager.ensure).toBe(ensureCSRFToken)
      expect(csrfTokenManager.requiresToken).toBe(requiresCSRFToken)
      expect(csrfTokenManager.handleError).toBe(handleCSRFError)
      expect(csrfTokenManager.addHeader).toBe(addCSRFHeader)
    })
  })
})