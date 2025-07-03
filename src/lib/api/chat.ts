import { apiClient } from './client'
import type { ChatSession, ChatMessage } from '@/store/chat-store'
import { handleChatError, retryWithBackoff, ChatError, ChatErrorType } from '@/lib/chat-errors'

// Types based on backend API endpoints
export interface CreateSessionRequest {
  document_id: string
  session_name?: string
}

export interface CreateSessionResponse {
  id: string
  document_id: string
  user_id: string
  session_name: string | null
  messages: any[]
  context: Record<string, any>
  is_active: boolean
  total_messages: number
  last_message_at: string | null
  created_at: string
  updated_at: string
}

export interface SessionListResponse {
  sessions: CreateSessionResponse[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

export interface AskQuestionRequest {
  question: string
}

export interface AskQuestionResponse {
  session_id: string
  message: {
    id: string
    role: 'assistant' | 'user'
    content: string
    claude_model: string
    token_count: number
    created_at: string
  }
  claude_model_used: string
  token_usage: {
    input_tokens: number
    output_tokens: number
    total_tokens: number
  }
}

export interface UpdateSessionNameRequest {
  session_name: string
}

export interface ChatStatsResponse {
  total_sessions: number
  total_messages: number
  active_sessions: number
  avg_messages_per_session: number
  total_tokens_used: number
  last_activity: string
}

export interface SearchSessionsParams {
  q: string
  limit?: number
  document_id?: string
}

export interface SearchSessionsResponse {
  sessions: CreateSessionResponse[]
  total: number
  query: string
}

export interface GenerateSuggestionsRequest {
  document_id?: string
  recent_messages?: string[]
  context?: string
}

export interface GenerateSuggestionsResponse {
  suggestions: string[]
  context_used: string
  processing_time_ms: number
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
  async createSession(request: CreateSessionRequest): Promise<CreateSessionResponse> {
    return withChatErrorHandling(
      () => apiClient.post('/api/v1/chat/sessions', request),
      { operationName: 'createSession' }
    )
  },

  /**
   * Get all chat sessions for the current user
   */
  async getSessions(params: {
    page?: number
    page_size?: number
    document_id?: string
  } = {}): Promise<SessionListResponse> {
    return withChatErrorHandling(
      () => {
        const searchParams = new URLSearchParams()
        
        if (params.page) searchParams.append('page', String(params.page))
        if (params.page_size) searchParams.append('page_size', String(params.page_size))
        if (params.document_id) searchParams.append('document_id', params.document_id)
        
        const query = searchParams.toString()
        return apiClient.get(`/api/v1/chat/sessions${query ? `?${query}` : ''}`)
      },
      { operationName: 'getSessions' }
    )
  },

  /**
   * Get a specific chat session by ID with optional pagination
   */
  async getSession(sessionId: string, params?: {
    page?: number
    limit?: number
    offset?: number
  }): Promise<CreateSessionResponse> {
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
  async updateSessionName(sessionId: string, request: UpdateSessionNameRequest): Promise<CreateSessionResponse> {
    return withChatErrorHandling(
      () => apiClient.put(`/api/v1/chat/sessions/${sessionId}/name`, request),
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
  async deactivateSession(sessionId: string): Promise<CreateSessionResponse> {
    return withChatErrorHandling(
      () => apiClient.put(`/api/v1/chat/sessions/${sessionId}/deactivate`, {}),
      { operationName: 'deactivateSession' }
    )
  },

  /**
   * Ask a question in a chat session
   * Special handling for rate limits and validation
   */
  async askQuestion(sessionId: string, request: AskQuestionRequest): Promise<AskQuestionResponse> {
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
  async summarizeSession(sessionId: string): Promise<{
    session_id: string
    summary: string
    key_topics: string[]
    message_count: number
    created_at: string
  }> {
    return withChatErrorHandling(
      () => apiClient.post(`/api/v1/chat/sessions/${sessionId}/summarize`, {}),
      { operationName: 'summarizeSession' }
    )
  },

  /**
   * Get all chat sessions for a specific document
   */
  async getDocumentSessions(documentId: string): Promise<CreateSessionResponse[]> {
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
  async searchSessions(params: SearchSessionsParams): Promise<SearchSessionsResponse> {
    return withChatErrorHandling(
      () => {
        const searchParams = new URLSearchParams()
        searchParams.append('q', params.q)
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
  async generateSuggestions(request: GenerateSuggestionsRequest): Promise<GenerateSuggestionsResponse> {
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
export const transformToFrontendSession = (backendSession: CreateSessionResponse): ChatSession => {
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

export const transformToFrontendMessage = (backendMessage: AskQuestionResponse['message']): ChatMessage => {
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