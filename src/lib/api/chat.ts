import { apiClient } from './client'
import { handleChatError, retryWithBackoff, ChatError, ChatErrorType } from '@/lib/chat-errors'
import type {
  ChatSession,
  ChatMessage,
  CreateSessionRequest,
  AskQuestionRequest,
  AskQuestionResponseExtended,
  UpdateSessionNameRequest,
  GetSessionsParams,
  SessionListResponse,
  SearchParams,
  SearchSessionsResponse,
  SuggestionsRequest,
  SuggestionsResponse,
  ChatStatsResponse,
  SessionSummaryResponse,
  PaginationParams,
  FrontendChatSession,
  FrontendChatMessage
} from '@/types/chat'

// Re-export types for backward compatibility
export type {
  CreateSessionRequest,
  ChatSession as CreateSessionResponse,
  AskQuestionRequest,
  AskQuestionResponseExtended as AskQuestionResponse,
  UpdateSessionNameRequest,
  SessionListResponse,
  ChatStatsResponse,
  SearchParams as SearchSessionsParams,
  SearchSessionsResponse,
  SuggestionsRequest as GenerateSuggestionsRequest,
  SuggestionsResponse as GenerateSuggestionsResponse
}

/**
 * Wrapper for chat API calls with error handling and retry logic
 */
async function withChatErrorHandling<T>(
  operation: () => Promise<T>,
  options?: {
    showToast?: boolean
    retryable?: boolean
    operationName?: string
  }
): Promise<T> {
  const { showToast = true, retryable = true, operationName = 'operation' } = options || {}
  
  try {
    return await operation()
  } catch (error) {
    const chatError = handleChatError(error, { showToast })
    
    // Log operation for debugging
    console.error(`Chat API ${operationName} failed:`, chatError)
    
    // Retry if applicable
    if (retryable && chatError.retryable) {
      return retryWithBackoff(operation, chatError)
    }
    
    throw chatError
  }
}

/**
 * Chat API client with session-based architecture
 * Integrates with the 11 chat endpoints from the backend
 */
export const chatAPI = {
  /**
   * Create a new chat session for a document
   */
  async createSession(request: CreateSessionRequest): Promise<ChatSession> {
    return withChatErrorHandling(
      () => apiClient.post('/api/v1/chat/sessions', request),
      { operationName: 'createSession' }
    )
  },

  /**
   * Get all chat sessions for the current user
   */
  async getSessions(params: GetSessionsParams = {}): Promise<SessionListResponse> {
    return withChatErrorHandling(
      () => {
        const searchParams = new URLSearchParams()
        
        if (params.page) searchParams.append('page', String(params.page))
        if (params.limit) searchParams.append('limit', String(params.limit))
        if (params.is_active !== undefined) searchParams.append('is_active', String(params.is_active))
        if (params.sort_by) searchParams.append('sort_by', params.sort_by)
        if (params.order) searchParams.append('order', params.order)
        
        const query = searchParams.toString()
        return apiClient.get(`/api/v1/chat/sessions${query ? `?${query}` : ''}`)
      },
      { operationName: 'getSessions' }
    )
  },

  /**
   * Get a specific chat session by ID with optional pagination
   */
  async getSession(sessionId: string, params?: PaginationParams): Promise<ChatSession> {
    return withChatErrorHandling(
      () => {
        const searchParams = new URLSearchParams()
        
        if (params?.page) searchParams.append('page', String(params.page))
        if (params?.limit) searchParams.append('limit', String(params.limit))
        if (params?.offset) searchParams.append('offset', String(params.offset))
        
        const query = searchParams.toString()
        return apiClient.get(`/api/v1/chat/sessions/${sessionId}${query ? `?${query}` : ''}`)
      },
      { operationName: 'getSession' }
    )
  },

  /**
   * Update session name
   */
  async updateSessionName(sessionId: string, request: UpdateSessionNameRequest): Promise<ChatSession> {
    return withChatErrorHandling(
      () => apiClient.put(`/api/v1/chat/sessions/${sessionId}/name`, { session_name: request.name }),
      { operationName: 'updateSessionName' }
    )
  },

  /**
   * Delete a chat session
   */
  async deleteSession(sessionId: string): Promise<{ success: boolean }> {
    return withChatErrorHandling(
      () => apiClient.delete(`/api/v1/chat/sessions/${sessionId}`),
      { operationName: 'deleteSession' }
    )
  },

  /**
   * Deactivate a chat session (soft delete)
   */
  async deactivateSession(sessionId: string): Promise<ChatSession> {
    return withChatErrorHandling(
      () => apiClient.put(`/api/v1/chat/sessions/${sessionId}/deactivate`, {}),
      { operationName: 'deactivateSession' }
    )
  },

  /**
   * Ask a question in a chat session
   * Special handling for rate limits and validation
   */
  async askQuestion(sessionId: string, request: AskQuestionRequest): Promise<AskQuestionResponseExtended> {
    return withChatErrorHandling(
      () => apiClient.post(`/api/v1/chat/sessions/${sessionId}/ask`, request),
      { 
        operationName: 'askQuestion',
        showToast: true,
        retryable: true  // Allow retry for network issues
      }
    )
  },

  /**
   * Generate session summary
   */
  async summarizeSession(sessionId: string): Promise<SessionSummaryResponse> {
    return withChatErrorHandling(
      () => apiClient.post(`/api/v1/chat/sessions/${sessionId}/summarize`, {}),
      { operationName: 'summarizeSession' }
    )
  },

  /**
   * Get all chat sessions for a specific document
   */
  async getDocumentSessions(documentId: string): Promise<ChatSession[]> {
    return withChatErrorHandling(
      async () => {
        const response = await apiClient.get(`/api/v1/chat/documents/${documentId}/sessions`)
        return response.sessions || response
      },
      { operationName: 'getDocumentSessions' }
    )
  },

  /**
   * Search chat sessions
   */
  async searchSessions(params: SearchParams): Promise<SearchSessionsResponse> {
    return withChatErrorHandling(
      () => {
        const searchParams = new URLSearchParams()
        searchParams.append('query', params.query)
        if (params.limit) searchParams.append('limit', String(params.limit))
        if (params.document_id) searchParams.append('document_id', params.document_id)
        
        return apiClient.get(`/api/v1/chat/search?${searchParams.toString()}`)
      },
      { operationName: 'searchSessions' }
    )
  },

  /**
   * Generate question suggestions based on context
   */
  async generateSuggestions(request: SuggestionsRequest): Promise<SuggestionsResponse> {
    return withChatErrorHandling(
      () => apiClient.post('/api/v1/chat/suggestions', request),
      { operationName: 'generateSuggestions' }
    )
  },

  /**
   * Get chat statistics for analytics
   */
  async getStats(): Promise<ChatStatsResponse> {
    return withChatErrorHandling(
      () => apiClient.get('/api/v1/chat/stats'),
      { operationName: 'getStats', showToast: false }  // Don't show toast for analytics
    )
  }
}

// Helper functions to transform backend responses to frontend types
export const transformToFrontendSession = (backendSession: ChatSession): FrontendChatSession => {
  return {
    id: backendSession.id,
    documentId: backendSession.document_id,
    documentTitle: undefined, // Will be populated separately if needed
    sessionName: backendSession.session_name || `Chat ${new Date(backendSession.created_at).toLocaleDateString()}`,
    messages: backendSession.messages || [],
    isActive: backendSession.is_active,
    totalMessages: backendSession.total_messages,
    createdAt: backendSession.created_at,
    updatedAt: backendSession.updated_at,
    canModify: true // Assume user can modify their own sessions
  }
}

export const transformToFrontendMessage = (backendMessage: AskQuestionResponseExtended['message']): FrontendChatMessage => {
  return {
    id: backendMessage.id,
    role: backendMessage.role,
    content: backendMessage.content,
    timestamp: backendMessage.created_at,
    status: 'sent'
  }
}

// Enhanced error handling with progress tracking
export interface ChatOperationProgress {
  operationId: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  progress?: number
  message?: string
}

// Progress callback type
export type ProgressCallback = (progress: ChatOperationProgress) => void

// Error handling for chat operations  
export class ChatAPIError extends Error {
  constructor(message: string, public statusCode?: number, public details?: any) {
    super(message)
    this.name = 'ChatAPIError'
  }
}

// Rate limiting helper
export const checkChatRateLimit = (lastMessageTime: number, messageCount: number): boolean => {
  const now = Date.now()
  const oneMinute = 60 * 1000
  
  // Reset if more than a minute has passed
  if (now - lastMessageTime > oneMinute) {
    return true
  }
  
  // Check if under limit (10 messages per minute)
  return messageCount < 10
}

// Helper to handle streaming responses (future enhancement)
export interface StreamingChatResponse {
  sessionId: string
  messageId: string
  chunk: string
  isComplete: boolean
}

export async function* streamChatResponse(
  sessionId: string,
  question: string,
  onProgress?: ProgressCallback
): AsyncGenerator<StreamingChatResponse> {
  // This is a placeholder for future streaming implementation
  // For now, we'll use the regular ask endpoint
  try {
    const response = await chatAPI.askQuestion(sessionId, { question })
    
    // Simulate streaming by yielding chunks
    const content = response.message.content
    const chunkSize = 50
    
    for (let i = 0; i < content.length; i += chunkSize) {
      yield {
        sessionId,
        messageId: response.message.id,
        chunk: content.slice(i, Math.min(i + chunkSize, content.length)),
        isComplete: i + chunkSize >= content.length
      }
      
      // Small delay to simulate streaming
      await new Promise(resolve => setTimeout(resolve, 50))
    }
  } catch (error) {
    throw handleChatError(error, { showToast: true })
  }
}