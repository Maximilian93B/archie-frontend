import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  ChatErrorType,
  ChatErrorCode,
  ChatError,
  mapBackendError,
  handleChatError,
  retryWithBackoff,
  formatErrorMessage,
  isErrorType,
  getRetryInfo
} from '@/lib/chat-errors'
import toast from 'react-hot-toast'

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
    success: vi.fn()
  }
}))

describe('Chat Error Handling', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('ChatError class', () => {
    it('should create a chat error with all properties', () => {
      const error = new ChatError(
        ChatErrorType.RATE_LIMITED,
        'Rate limit exceeded',
        429,
        { retryAfter: 60 },
        true
      )

      expect(error.type).toBe(ChatErrorType.RATE_LIMITED)
      expect(error.message).toBe('Rate limit exceeded')
      expect(error.statusCode).toBe(429)
      expect(error.details).toEqual({ retryAfter: 60 })
      expect(error.retryable).toBe(true)
      expect(error.name).toBe('ChatError')
    })
  })

  describe('mapBackendError', () => {
    it('should map network errors', () => {
      const error = { message: 'Network error' }
      const chatError = mapBackendError(error)

      expect(chatError.type).toBe(ChatErrorType.NETWORK_ERROR)
      expect(chatError.retryable).toBe(true)
      expect(chatError.statusCode).toBeUndefined()
    })

    it('should map 404 session not found errors', () => {
      const error = {
        response: {
          status: 404,
          data: { error: 'session not found' }
        }
      }
      const chatError = mapBackendError(error)

      expect(chatError.type).toBe(ChatErrorType.SESSION_NOT_FOUND)
      expect(chatError.retryable).toBe(false)
      expect(chatError.statusCode).toBe(404)
    })

    it('should map 403 access denied errors', () => {
      const error = {
        response: {
          status: 403,
          data: { error: 'Access denied' }
        }
      }
      const chatError = mapBackendError(error)

      expect(chatError.type).toBe(ChatErrorType.UNAUTHORIZED)
      expect(chatError.retryable).toBe(false)
      expect(chatError.statusCode).toBe(403)
    })

    it('should map 429 rate limit errors with retry-after header', () => {
      const error = {
        response: {
          status: 429,
          data: { error: 'Too many requests' },
          headers: { 'retry-after': '30' }
        }
      }
      const chatError = mapBackendError(error)

      expect(chatError.type).toBe(ChatErrorType.RATE_LIMITED)
      expect(chatError.retryable).toBe(true)
      expect(chatError.details.retryAfter).toBe('30')
    })

    it('should map 400 validation errors', () => {
      const error = {
        response: {
          status: 400,
          data: { error: 'question is required' }
        }
      }
      const chatError = mapBackendError(error)

      expect(chatError.type).toBe(ChatErrorType.INVALID_REQUEST)
      expect(chatError.retryable).toBe(false)
    })

    it('should map 400 quota exceeded errors', () => {
      const error = {
        response: {
          status: 400,
          data: { error: 'quota exceeded for your plan' }
        }
      }
      const chatError = mapBackendError(error)

      expect(chatError.type).toBe(ChatErrorType.QUOTA_EXCEEDED)
      expect(chatError.retryable).toBe(false)
    })

    it('should map 5xx server errors as retryable', () => {
      const error = {
        response: {
          status: 500,
          data: { error: 'Internal server error' }
        }
      }
      const chatError = mapBackendError(error)

      expect(chatError.type).toBe(ChatErrorType.SERVER_ERROR)
      expect(chatError.retryable).toBe(true)
    })

    it('should map unknown errors', () => {
      const error = {
        response: {
          status: 418,
          data: { error: "I'm a teapot", message: "I'm a teapot" }
        }
      }
      const chatError = mapBackendError(error)

      expect(chatError.type).toBe(ChatErrorType.UNKNOWN_ERROR)
      expect(chatError.message).toBe("I'm a teapot")
    })
  })

  describe('handleChatError', () => {
    it('should handle errors and show toast by default', () => {
      const error = new Error('Test error')
      const chatError = handleChatError(error)

      expect(toast.error).toHaveBeenCalled()
      expect(chatError).toBeInstanceOf(ChatError)
    })

    it('should not show toast when disabled', () => {
      const error = new Error('Test error')
      handleChatError(error, { showToast: false })

      expect(toast.error).not.toHaveBeenCalled()
    })

    it('should handle rate limited errors with special toast', () => {
      const error = {
        response: {
          status: 429,
          data: { error: 'Rate limited' },
          headers: { 'retry-after': '60' }
        }
      }

      const chatError = handleChatError(error)

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining('60 seconds'),
        expect.objectContaining({ duration: 6000 })
      )
      expect(chatError.type).toBe(ChatErrorType.RATE_LIMITED)
    })

    it('should handle quota exceeded errors with upgrade action', () => {
      const error = {
        response: {
          status: 400,
          data: { error: 'quota exceeded' }
        }
      }

      handleChatError(error)

      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining('quota'),
        expect.any(Object)
      )
    })
  })

  describe('formatErrorMessage', () => {
    it('should format rate limit errors', () => {
      const error = new ChatError(
        ChatErrorType.RATE_LIMITED,
        'Rate limited',
        429,
        { retryAfter: '30' },
        true
      )
      
      const message = formatErrorMessage(error)
      expect(message).toContain('30 seconds')
    })

    it('should format quota exceeded errors', () => {
      const error = new ChatError(
        ChatErrorType.QUOTA_EXCEEDED,
        'Quota exceeded',
        400,
        {},
        false
      )
      
      const message = formatErrorMessage(error)
      expect(message).toContain('monthly message limit')
    })

    it('should format network errors', () => {
      const error = new ChatError(
        ChatErrorType.NETWORK_ERROR,
        'Network error',
        undefined,
        {},
        true
      )
      
      const message = formatErrorMessage(error)
      expect(message).toContain('internet connection')
    })
  })

  describe('isErrorType', () => {
    it('should correctly identify error types', () => {
      const error = new ChatError(
        ChatErrorType.RATE_LIMITED,
        'Rate limited',
        429
      )
      
      expect(isErrorType(error, ChatErrorType.RATE_LIMITED)).toBe(true)
      expect(isErrorType(error, ChatErrorType.NETWORK_ERROR)).toBe(false)
    })

    it('should return false for non-ChatError objects', () => {
      const error = new Error('Regular error')
      expect(isErrorType(error, ChatErrorType.RATE_LIMITED)).toBe(false)
    })
  })

  describe('getRetryInfo', () => {
    it('should return retry info for rate limited errors', () => {
      const error = new ChatError(
        ChatErrorType.RATE_LIMITED,
        'Rate limited',
        429,
        { retryAfter: '30' },
        true
      )
      
      const info = getRetryInfo(error)
      expect(info.canRetry).toBe(true)
      expect(info.delayMs).toBe(30000)
    })

    it('should return default delay for retryable errors', () => {
      const error = new ChatError(
        ChatErrorType.SERVER_ERROR,
        'Server error',
        500,
        {},
        true
      )
      
      const info = getRetryInfo(error)
      expect(info.canRetry).toBe(true)
      expect(info.delayMs).toBe(1000)
    })

    it('should return no retry for non-retryable errors', () => {
      const error = new ChatError(
        ChatErrorType.UNAUTHORIZED,
        'Unauthorized',
        401,
        {},
        false
      )
      
      const info = getRetryInfo(error)
      expect(info.canRetry).toBe(false)
    })
  })

  describe('retryWithBackoff', () => {
    it('should not retry non-retryable errors', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('Failed'))
      const error = new ChatError(
        ChatErrorType.UNAUTHORIZED,
        'Access denied',
        403,
        {},
        false
      )

      await expect(retryWithBackoff(fn, error)).rejects.toThrow(error)
      expect(fn).not.toHaveBeenCalled()
    })

    it('should stop retrying after max attempts', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('Always fails'))
      const error = new ChatError(
        ChatErrorType.SERVER_ERROR,
        'Server error',
        500,
        {},
        true
      )

      await expect(retryWithBackoff(fn, error, 2)).rejects.toThrow()
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })
})