import { describe, it, expect, vi, beforeEach } from 'vitest'
import { InterceptorManager } from '@/lib/api/interceptors'
import { csrfTokenManager } from '@/lib/api/csrf'
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

// Mock the CSRF module
vi.mock('@/lib/api/csrf', () => ({
  csrfTokenManager: {
    requiresToken: vi.fn(),
    get: vi.fn(),
    clear: vi.fn()
  }
}))

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn()
}))

describe('Interceptor CSRF Integration', () => {
  let mockAxiosInstance: AxiosInstance
  let interceptorManager: InterceptorManager
  let requestInterceptor: any
  let responseInterceptor: any

  beforeEach(() => {
    vi.clearAllMocks()

    // Create a mock axios instance
    mockAxiosInstance = {
      interceptors: {
        request: {
          use: vi.fn((onFulfilled) => {
            requestInterceptor = onFulfilled
            return 0
          })
        },
        response: {
          use: vi.fn((onFulfilled, onRejected) => {
            responseInterceptor = { onFulfilled, onRejected }
            return 0
          })
        }
      },
      request: vi.fn()
    } as any

    interceptorManager = new InterceptorManager(
      mockAxiosInstance,
      () => 'test-jwt-token',
      async () => true,
      () => {}
    )

    interceptorManager.setupInterceptors()
  })

  describe('Request Interceptor - CSRF Token', () => {
    it('should add CSRF token for POST requests', async () => {
      const mockConfig: InternalAxiosRequestConfig = {
        method: 'post',
        url: '/chat/sessions',
        headers: {} as any
      } as InternalAxiosRequestConfig

      ;(csrfTokenManager.requiresToken as any).mockReturnValue(true)
      ;(csrfTokenManager.get as any).mockResolvedValue('test-csrf-token')

      const result = await requestInterceptor(mockConfig)

      expect(csrfTokenManager.requiresToken).toHaveBeenCalledWith('post')
      expect(csrfTokenManager.get).toHaveBeenCalled()
      expect(result.headers['X-CSRF-Token']).toBe('test-csrf-token')
    })

    it('should add CSRF token for PUT requests', async () => {
      const mockConfig: InternalAxiosRequestConfig = {
        method: 'put',
        url: '/chat/sessions/123/name',
        headers: {} as any
      } as InternalAxiosRequestConfig

      ;(csrfTokenManager.requiresToken as any).mockReturnValue(true)
      ;(csrfTokenManager.get as any).mockResolvedValue('test-csrf-token')

      const result = await requestInterceptor(mockConfig)

      expect(result.headers['X-CSRF-Token']).toBe('test-csrf-token')
    })

    it('should add CSRF token for DELETE requests', async () => {
      const mockConfig: InternalAxiosRequestConfig = {
        method: 'delete',
        url: '/chat/sessions/123',
        headers: {} as any
      } as InternalAxiosRequestConfig

      ;(csrfTokenManager.requiresToken as any).mockReturnValue(true)
      ;(csrfTokenManager.get as any).mockResolvedValue('test-csrf-token')

      const result = await requestInterceptor(mockConfig)

      expect(result.headers['X-CSRF-Token']).toBe('test-csrf-token')
    })

    it('should not add CSRF token for GET requests', async () => {
      const mockConfig: InternalAxiosRequestConfig = {
        method: 'get',
        url: '/chat/sessions',
        headers: {} as any
      } as InternalAxiosRequestConfig

      ;(csrfTokenManager.requiresToken as any).mockReturnValue(false)

      const result = await requestInterceptor(mockConfig)

      expect(csrfTokenManager.requiresToken).toHaveBeenCalledWith('get')
      expect(csrfTokenManager.get).not.toHaveBeenCalled()
      expect(result.headers['X-CSRF-Token']).toBeUndefined()
    })

    it('should continue without CSRF token if fetching fails', async () => {
      const mockConfig: InternalAxiosRequestConfig = {
        method: 'post',
        url: '/chat/sessions',
        headers: {} as any
      } as InternalAxiosRequestConfig

      ;(csrfTokenManager.requiresToken as any).mockReturnValue(true)
      ;(csrfTokenManager.get as any).mockRejectedValue(new Error('Failed to get token'))

      const result = await requestInterceptor(mockConfig)

      expect(result.headers['X-CSRF-Token']).toBeUndefined()
      // Should still return the config to allow request to proceed
      expect(result).toBe(mockConfig)
    })

    it('should add both JWT and CSRF tokens', async () => {
      const mockConfig: InternalAxiosRequestConfig = {
        method: 'post',
        url: '/chat/sessions',
        headers: {} as any,
        requestConfig: { skipAuth: false }
      } as InternalAxiosRequestConfig

      ;(csrfTokenManager.requiresToken as any).mockReturnValue(true)
      ;(csrfTokenManager.get as any).mockResolvedValue('test-csrf-token')

      const result = await requestInterceptor(mockConfig)

      expect(result.headers.Authorization).toBe('Bearer test-jwt-token')
      expect(result.headers['X-CSRF-Token']).toBe('test-csrf-token')
    })
  })

  describe('Response Interceptor - CSRF Error Handling', () => {
    it('should retry request with new CSRF token on 403 CSRF error', async () => {
      const originalRequest = {
        method: 'post',
        url: '/chat/sessions',
        headers: { 'X-CSRF-Token': 'old-token' }
      }

      const csrfError = {
        response: {
          status: 403,
          data: { code: 'CSRF_TOKEN_REQUIRED' }
        },
        config: originalRequest
      }

      ;(csrfTokenManager.get as any).mockResolvedValue('new-csrf-token')
      ;(mockAxiosInstance.request as any).mockResolvedValue({ data: 'success' })

      const result = await responseInterceptor.onRejected(csrfError)

      expect(csrfTokenManager.clear).toHaveBeenCalled()
      expect(csrfTokenManager.get).toHaveBeenCalled()
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        ...originalRequest,
        headers: { 
          'X-CSRF-Token': 'new-csrf-token' 
        },
        _csrfRetry: true
      })
      expect(result).toEqual({ data: 'success' })
    })

    it('should not retry CSRF error more than once', async () => {
      const originalRequest = {
        method: 'post',
        url: '/chat/sessions',
        headers: { 'X-CSRF-Token': 'old-token' },
        _csrfRetry: true // Already retried once
      }

      const csrfError = {
        response: {
          status: 403,
          data: { error: 'CSRF token invalid' }
        },
        config: originalRequest
      }

      await expect(responseInterceptor.onRejected(csrfError)).rejects.toMatchObject(csrfError)
      expect(mockAxiosInstance.request).not.toHaveBeenCalled()
    })

    it('should handle CSRF token refresh failure', async () => {
      const originalRequest = {
        method: 'post',
        url: '/chat/sessions',
        headers: {}
      }

      const csrfError = {
        response: {
          status: 403,
          data: { code: 'CSRF_TOKEN_REQUIRED' }
        },
        config: originalRequest
      }

      ;(csrfTokenManager.get as any).mockRejectedValue(new Error('Network error'))

      // Should continue to error handling after CSRF refresh fails
      await expect(responseInterceptor.onRejected(csrfError)).rejects.toMatchObject(csrfError)
    })

    it('should not handle non-CSRF 403 errors', async () => {
      const originalRequest = {
        method: 'post',
        url: '/chat/sessions',
        headers: {}
      }

      const nonCsrfError = {
        response: {
          status: 403,
          data: { error: 'Access denied' }
        },
        config: originalRequest
      }

      await expect(responseInterceptor.onRejected(nonCsrfError)).rejects.toMatchObject(nonCsrfError)
      expect(csrfTokenManager.clear).not.toHaveBeenCalled()
      expect(mockAxiosInstance.request).not.toHaveBeenCalled()
    })

    it('should handle both CSRF and auth token refresh', async () => {
      // First, test CSRF error
      const csrfRequest = {
        method: 'post',
        url: '/chat/sessions',
        headers: {}
      }

      const csrfError = {
        response: {
          status: 403,
          data: { code: 'CSRF_TOKEN_REQUIRED' }
        },
        config: csrfRequest
      }

      ;(csrfTokenManager.get as any).mockResolvedValue('new-csrf-token')
      ;(mockAxiosInstance.request as any).mockResolvedValue({ data: 'success' })

      await responseInterceptor.onRejected(csrfError)

      // Then test 401 auth error
      const authRequest = {
        method: 'get',
        url: '/documents',
        headers: {}
      }

      const authError = {
        response: {
          status: 401,
          data: { error: 'Token expired' }
        },
        config: authRequest
      }

      ;(mockAxiosInstance.request as any).mockResolvedValue({ data: 'auth-success' })

      const result = await responseInterceptor.onRejected(authError)

      expect(result).toEqual({ data: 'auth-success' })
    })
  })
})