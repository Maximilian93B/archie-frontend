import { toast } from 'react-hot-toast'

/**
 * Chat-specific error types matching backend error types
 */
export enum ChatErrorType {
  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
  ACCESS_DENIED = 'ACCESS_DENIED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  RATE_LIMITED = 'RATE_LIMITED',
  INVALID_INPUT = 'INVALID_INPUT',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

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
 * Map backend error responses to ChatError types
 */
export function mapBackendError(error: any): ChatError {
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
      if (data?.error?.includes('session not found')) {
        return new ChatError(
          ChatErrorType.SESSION_NOT_FOUND,
          'This chat session could not be found. It may have been deleted.',
          status,
          data,
          false
        )
      }
      break

    case 403:
      return new ChatError(
        ChatErrorType.ACCESS_DENIED,
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
      if (data?.error?.includes('question is required') || data?.error?.includes('invalid input')) {
        return new ChatError(
          ChatErrorType.INVALID_INPUT,
          data.error || 'Your message is invalid. Please check and try again.',
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
    data?.error || 'An unexpected error occurred. Please try again.',
    status,
    data,
    status >= 500
  )
}

/**
 * User-friendly error messages for each error type
 */
export const errorMessages: Record<ChatErrorType, string> = {
  [ChatErrorType.SESSION_NOT_FOUND]: 'Chat session not found',
  [ChatErrorType.ACCESS_DENIED]: 'Access denied',
  [ChatErrorType.QUOTA_EXCEEDED]: 'Message quota exceeded',
  [ChatErrorType.RATE_LIMITED]: 'Too many messages',
  [ChatErrorType.INVALID_INPUT]: 'Invalid message',
  [ChatErrorType.NETWORK_ERROR]: 'Connection error',
  [ChatErrorType.SERVER_ERROR]: 'Server error',
  [ChatErrorType.UNKNOWN_ERROR]: 'Something went wrong'
}

/**
 * Retry configuration for different error types
 */
export const retryConfig: Record<ChatErrorType, { maxRetries: number; backoff: number }> = {
  [ChatErrorType.SESSION_NOT_FOUND]: { maxRetries: 0, backoff: 0 },
  [ChatErrorType.ACCESS_DENIED]: { maxRetries: 0, backoff: 0 },
  [ChatErrorType.QUOTA_EXCEEDED]: { maxRetries: 0, backoff: 0 },
  [ChatErrorType.RATE_LIMITED]: { maxRetries: 3, backoff: 60000 }, // 1 minute
  [ChatErrorType.INVALID_INPUT]: { maxRetries: 0, backoff: 0 },
  [ChatErrorType.NETWORK_ERROR]: { maxRetries: 3, backoff: 1000 },
  [ChatErrorType.SERVER_ERROR]: { maxRetries: 2, backoff: 2000 },
  [ChatErrorType.UNKNOWN_ERROR]: { maxRetries: 1, backoff: 1000 }
}

/**
 * Handle chat errors with appropriate UI feedback
 */
export function handleChatError(error: any, options?: {
  showToast?: boolean
  onRetry?: () => void
  retryCount?: number
}): ChatError {
  const chatError = error instanceof ChatError ? error : mapBackendError(error)
  const { showToast = true, onRetry, retryCount = 0 } = options || {}

  // Log error for debugging
  console.error('[Chat Error]', {
    type: chatError.type,
    message: chatError.message,
    statusCode: chatError.statusCode,
    details: chatError.details,
    retryCount
  })

  // Show toast notification
  if (showToast) {
    const toastOptions: any = {
      duration: chatError.type === ChatErrorType.RATE_LIMITED ? 10000 : 5000,
      icon: getErrorIcon(chatError.type)
    }

    // Add retry action for retryable errors
    if (chatError.retryable && onRetry && retryCount < retryConfig[chatError.type].maxRetries) {
      toastOptions.action = {
        label: 'Retry',
        onClick: onRetry
      }
    }

    toast.error(chatError.message, toastOptions)
  }

  return chatError
}

/**
 * Get appropriate icon for error type
 */
function getErrorIcon(type: ChatErrorType): string {
  switch (type) {
    case ChatErrorType.RATE_LIMITED:
      return '⏱️'
    case ChatErrorType.QUOTA_EXCEEDED:
      return '📊'
    case ChatErrorType.NETWORK_ERROR:
      return '🌐'
    case ChatErrorType.ACCESS_DENIED:
      return '🔒'
    case ChatErrorType.INVALID_INPUT:
      return '✏️'
    default:
      return '⚠️'
  }
}

/**
 * Retry helper with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  error: ChatError,
  retryCount: number = 0
): Promise<T> {
  const config = retryConfig[error.type]
  
  if (!error.retryable || retryCount >= config.maxRetries) {
    throw error
  }

  const delay = config.backoff * Math.pow(2, retryCount)
  await new Promise(resolve => setTimeout(resolve, delay))
  
  try {
    return await fn()
  } catch (err) {
    const newError = handleChatError(err, { showToast: false, retryCount: retryCount + 1 })
    return retryWithBackoff(fn, newError, retryCount + 1)
  }
}

/**
 * Input validation matching backend requirements
 */
export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateChatInput(input: string): ValidationResult {
  // Check for empty or whitespace-only
  const trimmed = input.trim()
  if (!trimmed) {
    return { valid: false, error: 'Message cannot be empty' }
  }

  // Check length (3-2000 characters as per backend)
  if (trimmed.length < 3) {
    return { valid: false, error: 'Message must be at least 3 characters' }
  }

  if (trimmed.length > 2000) {
    return { valid: false, error: 'Message cannot exceed 2000 characters' }
  }

  // Check for potential prompt injection patterns
  const injectionPatterns = [
    /\[\[.*?\]\]/,  // Double brackets
    /\{\{.*?\}\}/,  // Double braces
    /<\|.*?\|>/,    // Special delimiters
    /system:/i,     // System prompts
    /assistant:/i,  // Role switching
    /\\\\/,         // Escape sequences
  ]

  for (const pattern of injectionPatterns) {
    if (pattern.test(trimmed)) {
      return { valid: false, error: 'Message contains invalid characters or patterns' }
    }
  }

  return { valid: true }
}