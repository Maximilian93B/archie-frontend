import toast from 'react-hot-toast'
import { ChatErrorCode, ErrorResponse, isErrorResponse } from '@/types/chat'

/**
 * Chat-specific error types - extends backend error codes
 */
export enum ChatErrorType {
  // Backend error codes
  DOCUMENT_NOT_FOUND = 'DOCUMENT_NOT_FOUND',
  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  RATE_LIMITED = 'RATE_LIMITED',
  AI_SERVICE_ERROR = 'AI_SERVICE_ERROR',
  INVALID_REQUEST = 'INVALID_REQUEST',
  CSRF_TOKEN_REQUIRED = 'CSRF_TOKEN_REQUIRED',
  
  // Additional frontend error types
  NETWORK_ERROR = 'NETWORK_ERROR',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// Re-export backend error code for compatibility
export { ChatErrorCode } from '@/types/chat'

/**
 * Chat error with additional context
 */
export class ChatError extends Error {
  constructor(
    public type: ChatErrorType,
    message: string,
    public statusCode?: number,
    public details?: any,
    public retryable: boolean = false
  ) {
    super(message)
    this.name = 'ChatError'
  }
}

/**
 * Check if an error code is retryable
 */
function isRetryableError(code: ChatErrorCode | ChatErrorType): boolean {
  const retryableCodes = [
    ChatErrorCode.RATE_LIMITED,
    ChatErrorCode.AI_SERVICE_ERROR,
    ChatErrorType.NETWORK_ERROR,
    ChatErrorType.SERVER_ERROR
  ]
  return retryableCodes.includes(code as any)
}

/**
 * Map backend error responses to ChatError types
 */
export function mapBackendError(error: any): ChatError {
  // Check if it's a properly typed error response
  if (error.response?.data && isErrorResponse(error.response.data)) {
    const errorData = error.response.data as ErrorResponse
    return new ChatError(
      errorData.code as unknown as ChatErrorType,
      errorData.message,
      error.response.status,
      errorData.details,
      isRetryableError(errorData.code)
    )
  }

  // Fall back to legacy error mapping
  return mapBackendErrorLegacy(error)
}

/**
 * Legacy error mapping for non-standard error responses
 */
function mapBackendErrorLegacy(error: any): ChatError {
  // Handle network errors
  if (!error.response) {
    return new ChatError(
      ChatErrorType.NETWORK_ERROR,
      'Unable to connect to the server. Please check your internet connection.',
      undefined,
      error,
      true
    )
  }

  const { status, data } = error.response

  // Handle specific status codes
  switch (status) {
    case 404:
      if (data?.error?.includes('session not found') || data?.code === ChatErrorCode.SESSION_NOT_FOUND) {
        return new ChatError(
          ChatErrorType.SESSION_NOT_FOUND,
          'This chat session could not be found. It may have been deleted.',
          status,
          data,
          false
        )
      }
      if (data?.error?.includes('document not found') || data?.code === ChatErrorCode.DOCUMENT_NOT_FOUND) {
        return new ChatError(
          ChatErrorType.DOCUMENT_NOT_FOUND,
          'The document could not be found.',
          status,
          data,
          false
        )
      }
      break

    case 401:
      return new ChatError(
        ChatErrorType.UNAUTHORIZED,
        'Your session has expired. Please log in again.',
        status,
        data,
        false
      )

    case 403:
      if (data?.code === ChatErrorCode.CSRF_TOKEN_REQUIRED) {
        return new ChatError(
          ChatErrorType.CSRF_TOKEN_REQUIRED,
          'Security token required. Please refresh and try again.',
          status,
          data,
          true
        )
      }
      return new ChatError(
        ChatErrorType.UNAUTHORIZED,
        'You do not have permission to access this chat session.',
        status,
        data,
        false
      )

    case 429:
      const retryAfter = error.response.headers?.['retry-after']
      return new ChatError(
        ChatErrorType.RATE_LIMITED,
        `You're sending messages too quickly. Please wait ${retryAfter || '60'} seconds.`,
        status,
        { ...data, retryAfter },
        true
      )

    case 400:
      if (data?.error?.includes('question is required') || data?.code === ChatErrorCode.INVALID_REQUEST) {
        return new ChatError(
          ChatErrorType.INVALID_REQUEST,
          data.message || 'Your message is invalid. Please check and try again.',
          status,
          data,
          false
        )
      }
      if (data?.error?.includes('quota exceeded')) {
        return new ChatError(
          ChatErrorType.QUOTA_EXCEEDED,
          'You have reached your message quota. Please upgrade your plan.',
          status,
          data,
          false
        )
      }
      break

    case 500:
    case 502:
    case 503:
    case 504:
      if (data?.code === ChatErrorCode.AI_SERVICE_ERROR) {
        return new ChatError(
          ChatErrorType.AI_SERVICE_ERROR,
          'The AI service is temporarily unavailable. Please try again later.',
          status,
          data,
          true
        )
      }
      return new ChatError(
        ChatErrorType.SERVER_ERROR,
        'The server encountered an error. Please try again later.',
        status,
        data,
        true
      )
  }

  // Default error
  return new ChatError(
    ChatErrorType.UNKNOWN_ERROR,
    data?.message || 'An unexpected error occurred. Please try again.',
    status,
    data,
    status >= 500
  )
}

/**
 * Handle chat errors with appropriate user feedback
 */
export function handleChatError(
  error: any,
  options: { showToast?: boolean } = { showToast: true }
): ChatError {
  const chatError = error instanceof ChatError ? error : mapBackendError(error)

  if (options.showToast) {
    // Show user-friendly error messages
    switch (chatError.type) {
      case ChatErrorType.RATE_LIMITED:
        toast.error(chatError.message, { duration: 6000 })
        break
      
      case ChatErrorType.QUOTA_EXCEEDED:
        toast.error(chatError.message, {
          duration: 8000,
          action: {
            label: 'Upgrade',
            onClick: () => window.location.href = '/settings/billing'
          }
        } as any)
        break
      
      case ChatErrorType.SESSION_NOT_FOUND:
      case ChatErrorType.DOCUMENT_NOT_FOUND:
        toast.error(chatError.message)
        break
      
      case ChatErrorType.NETWORK_ERROR:
        toast.error('Connection lost. Please check your internet connection.')
        break
      
      default:
        toast.error(chatError.message || 'Something went wrong. Please try again.')
    }
  }

  return chatError
}

/**
 * Retry failed operations with exponential backoff
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  error: ChatError,
  maxRetries: number = 3
): Promise<T> {
  if (!error.retryable) {
    throw error
  }

  let lastError = error
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Wait with exponential backoff
      if (attempt > 0) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000)
        await new Promise(resolve => setTimeout(resolve, delay))
      }

      return await operation()
    } catch (err) {
      lastError = err instanceof ChatError ? err : mapBackendError(err)
      
      if (!lastError.retryable || attempt === maxRetries - 1) {
        throw lastError
      }
    }
  }

  throw lastError
}

/**
 * Format error messages for display
 */
export function formatErrorMessage(error: ChatError): string {
  switch (error.type) {
    case ChatErrorType.RATE_LIMITED:
      const retryAfter = error.details?.retryAfter
      return `Rate limit exceeded. Please wait ${retryAfter || '60'} seconds before trying again.`
    
    case ChatErrorType.QUOTA_EXCEEDED:
      return 'You have reached your monthly message limit. Upgrade your plan to continue.'
    
    case ChatErrorType.SESSION_NOT_FOUND:
      return 'This chat session no longer exists.'
    
    case ChatErrorType.DOCUMENT_NOT_FOUND:
      return 'The document associated with this chat could not be found.'
    
    case ChatErrorType.UNAUTHORIZED:
      return 'You do not have permission to access this resource.'
    
    case ChatErrorType.NETWORK_ERROR:
      return 'Unable to connect to the server. Please check your internet connection.'
    
    case ChatErrorType.AI_SERVICE_ERROR:
      return 'The AI service is temporarily unavailable. Please try again later.'
    
    default:
      return error.message || 'An unexpected error occurred.'
  }
}

/**
 * Check if an error is a specific type
 */
export function isErrorType(error: any, type: ChatErrorType): boolean {
  return error instanceof ChatError && error.type === type
}

/**
 * Extract retry information from error
 */
export function getRetryInfo(error: ChatError): { canRetry: boolean; delayMs?: number } {
  if (!error.retryable) {
    return { canRetry: false }
  }

  if (error.type === ChatErrorType.RATE_LIMITED && error.details?.retryAfter) {
    return {
      canRetry: true,
      delayMs: parseInt(error.details.retryAfter) * 1000
    }
  }

  return { canRetry: true, delayMs: 1000 }
}

/**
 * Validation result for chat input
 */
export interface ValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validate chat input before sending
 */
export function validateChatInput(message: string): ValidationResult {
  const trimmed = message.trim()
  
  // Check if empty
  if (!trimmed) {
    return {
      valid: false,
      error: 'Message cannot be empty'
    }
  }
  
  // Check minimum length
  const MIN_LENGTH = 3
  if (trimmed.length < MIN_LENGTH) {
    return {
      valid: false,
      error: `Message must be at least ${MIN_LENGTH} characters`
    }
  }
  
  // Check maximum length
  const MAX_LENGTH = 2000
  if (trimmed.length > MAX_LENGTH) {
    return {
      valid: false,
      error: `Message must not exceed ${MAX_LENGTH} characters`
    }
  }
  
  // Check for invalid characters or patterns
  // Allow all unicode characters except control characters
  const controlCharPattern = /[\x00-\x1F\x7F]/
  if (controlCharPattern.test(trimmed)) {
    return {
      valid: false,
      error: 'Message contains invalid characters'
    }
  }
  
  return { valid: true }
}