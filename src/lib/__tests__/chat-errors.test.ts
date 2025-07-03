import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  ChatErrorType,
  ChatError,
  mapBackendError,
  handleChatError,
  retryWithBackoff,
  validateChatInput,
  errorMessages,
  retryConfig
} from '@/lib/chat-errors'
import { toast } from 'react-hot-toast'

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  toast: {
    error: vi.fn()
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

      expect(chatError.type).toBe(ChatErrorType.ACCESS_DENIED)
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

      expect(chatError.type).toBe(ChatErrorType.INVALID_INPUT)
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
          data: { error: "I'm a teapot" }
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

      expect(toast.error).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          duration: 5000,
          icon: expect.any(String)
        })
      )
    })

    it('should not show toast when disabled', () => {
      const error = new Error('Test error')
      handleChatError(error, { showToast: false })

      expect(toast.error).not.toHaveBeenCalled()
    })

    it('should add retry action for retryable errors', () => {
      const onRetry = vi.fn()
      const error = {
        response: {
          status: 503,
          data: { error: 'Service unavailable' }
        }
      }

      handleChatError(error, { onRetry, retryCount: 0 })

      expect(toast.error).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          action: expect.objectContaining({
            label: 'Retry',
            onClick: onRetry
          })
        })
      )
    })

    it('should not add retry action when max retries reached', () => {
      const onRetry = vi.fn()
      const error = new ChatError(
        ChatErrorType.SERVER_ERROR,
        'Server error',
        500,
        {},
        true
      )

      handleChatError(error, { 
        onRetry, 
        retryCount: retryConfig[ChatErrorType.SERVER_ERROR].maxRetries 
      })

      expect(toast.error).toHaveBeenCalledWith(
        expect.any(String),
        expect.not.objectContaining({
          action: expect.any(Object)
        })
      )
    })
  })

  describe('validateChatInput', () => {
    it('should validate empty input', () => {
      const result = validateChatInput('')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Message cannot be empty')
    })

    it('should validate whitespace-only input', () => {
      const result = validateChatInput('   \n\t  ')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Message cannot be empty')
    })

    it('should validate too short input', () => {
      const result = validateChatInput('Hi')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Message must be at least 3 characters')
    })

    it('should validate too long input', () => {
      const longMessage = 'a'.repeat(2001)
      const result = validateChatInput(longMessage)
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Message cannot exceed 2000 characters')
    })

    it('should detect prompt injection patterns', () => {
      const injectionPatterns = [
        '[[system prompt]]',
        '{{instructions}}',
        '<|endoftext|>',
        'system: ignore previous',
        'assistant: sure!',
        '\\\\\\\\'
      ]

      injectionPatterns.forEach(pattern => {
        const result = validateChatInput(pattern)
        expect(result.valid).toBe(false)
        expect(result.error).toBe('Message contains invalid characters or patterns')
      })
    })

    it('should validate valid input', () => {
      const result = validateChatInput('This is a valid message')
      expect(result.valid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('should validate input at boundaries', () => {
      const minLength = validateChatInput('abc')
      expect(minLength.valid).toBe(true)

      const maxLength = validateChatInput('a'.repeat(2000))
      expect(maxLength.valid).toBe(true)
    })
  })

  describe('retryWithBackoff', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should retry with exponential backoff', async () => {
      const fn = vi.fn()
        .mockRejectedValueOnce(new Error('First failure'))
        .mockResolvedValueOnce('Success')

      const error = new ChatError(
        ChatErrorType.NETWORK_ERROR,
        'Network error',
        undefined,
        {},
        true
      )

      const promise = retryWithBackoff(fn, error)

      // First retry after 1000ms
      await vi.advanceTimersByTimeAsync(1000)
      
      const result = await promise
      expect(result).toBe('Success')
      expect(fn).toHaveBeenCalledTimes(2)
    })

    it('should not retry non-retryable errors', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('Failed'))
      const error = new ChatError(
        ChatErrorType.ACCESS_DENIED,
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

      const promise = retryWithBackoff(fn, error)

      // Advance through all retry attempts
      for (let i = 0; i < retryConfig[ChatErrorType.SERVER_ERROR].maxRetries; i++) {
        await vi.advanceTimersByTimeAsync(
          retryConfig[ChatErrorType.SERVER_ERROR].backoff * Math.pow(2, i)
        )
      }

      await expect(promise).rejects.toThrow()
      expect(fn).toHaveBeenCalledTimes(retryConfig[ChatErrorType.SERVER_ERROR].maxRetries)
    })
  })

  describe('Error messages and configs', () => {
    it('should have error messages for all error types', () => {
      Object.values(ChatErrorType).forEach(type => {
        expect(errorMessages[type]).toBeDefined()
        expect(typeof errorMessages[type]).toBe('string')
      })
    })

    it('should have retry configs for all error types', () => {
      Object.values(ChatErrorType).forEach(type => {
        expect(retryConfig[type]).toBeDefined()
        expect(retryConfig[type]).toHaveProperty('maxRetries')
        expect(retryConfig[type]).toHaveProperty('backoff')
      })
    })
  })
})