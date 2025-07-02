import { apiClient } from './client'
import type { ChatSession, ChatMessage } from '@/store/chat-store'

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
 * Chat API client with session-based architecture
 * Integrates with the 11 chat endpoints from the backend
 */
export const chatAPI = {
  /**
   * Create a new chat session for a document
   */
  async createSession(request: CreateSessionRequest): Promise<CreateSessionResponse> {
    const response = await apiClient.post('/chat/sessions', request)
    return response
  },

  /**
   * Get all chat sessions for the current user
   */
  async getSessions(params: {
    page?: number
    page_size?: number
    document_id?: string
  } = {}): Promise<SessionListResponse> {
    const searchParams = new URLSearchParams()
    
    if (params.page) searchParams.append('page', String(params.page))
    if (params.page_size) searchParams.append('page_size', String(params.page_size))
    if (params.document_id) searchParams.append('document_id', params.document_id)
    
    const query = searchParams.toString()
    const response = await apiClient.get(`/chat/sessions${query ? `?${query}` : ''}`)
    return response
  },

  /**
   * Get a specific chat session by ID
   */
  async getSession(sessionId: string): Promise<CreateSessionResponse> {
    const response = await apiClient.get(`/chat/sessions/${sessionId}`)
    return response
  },

  /**
   * Update session name
   */
  async updateSessionName(sessionId: string, request: UpdateSessionNameRequest): Promise<CreateSessionResponse> {
    const response = await apiClient.put(`/chat/sessions/${sessionId}/name`, request)
    return response
  },

  /**
   * Delete a chat session
   */
  async deleteSession(sessionId: string): Promise<{ success: boolean }> {
    const response = await apiClient.delete(`/chat/sessions/${sessionId}`)
    return response
  },

  /**
   * Deactivate a chat session (soft delete)
   */
  async deactivateSession(sessionId: string): Promise<CreateSessionResponse> {
    const response = await apiClient.put(`/chat/sessions/${sessionId}/deactivate`, {})
    return response
  },

  /**
   * Ask a question in a chat session
   */
  async askQuestion(sessionId: string, request: AskQuestionRequest): Promise<AskQuestionResponse> {
    const response = await apiClient.post(`/chat/sessions/${sessionId}/ask`, request)
    return response
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
    const response = await apiClient.post(`/chat/sessions/${sessionId}/summarize`, {})
    return response
  },

  /**
   * Get all chat sessions for a specific document
   */
  async getDocumentSessions(documentId: string): Promise<CreateSessionResponse[]> {
    const response = await apiClient.get(`/chat/documents/${documentId}/sessions`)
    return response.sessions || response
  },

  /**
   * Search chat sessions
   */
  async searchSessions(params: SearchSessionsParams): Promise<SearchSessionsResponse> {
    const searchParams = new URLSearchParams()
    searchParams.append('q', params.q)
    if (params.limit) searchParams.append('limit', String(params.limit))
    if (params.document_id) searchParams.append('document_id', params.document_id)
    
    const response = await apiClient.get(`/chat/search?${searchParams.toString()}`)
    return response
  },

  /**
   * Generate question suggestions based on context
   */
  async generateSuggestions(request: GenerateSuggestionsRequest): Promise<GenerateSuggestionsResponse> {
    const response = await apiClient.post('/chat/suggestions', request)
    return response
  },

  /**
   * Get chat statistics for analytics
   */
  async getStats(): Promise<ChatStatsResponse> {
    const response = await apiClient.get('/chat/stats')
    return response
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