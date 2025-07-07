/**
 * Chat Types - Aligned with Backend Specification
 * 
 * These types match the backend API specification exactly.
 * Reference: src/app/frontend-context/CHAT_API_CONTEXT.md
 */

// ============================================
// Core Chat Types
// ============================================

/**
 * Represents a chat message in a session
 */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

/**
 * Extended chat message with backend metadata
 */
export interface ChatMessageExtended extends ChatMessage {
  id: string;
  claude_model?: string;
  token_count?: number;
  created_at: string;
}

/**
 * Represents a complete chat session
 */
export interface ChatSession {
  id: string;
  document_id: string;
  user_id: string;
  session_name: string;
  messages: ChatMessage[];
  context: Record<string, any>;
  is_active: boolean;
  total_messages: number;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================
// Request Types
// ============================================

/**
 * Request to create a new chat session
 */
export interface CreateSessionRequest {
  document_id: string;
  session_name?: string; // Optional custom name
}

/**
 * Request to ask a question in a chat session
 */
export interface AskQuestionRequest {
  question: string;
  include_context?: boolean; // Include previous messages
  max_context_messages?: number; // Limit context size
}

/**
 * Request to update session name
 */
export interface UpdateSessionNameRequest {
  name: string;
}

/**
 * Request for generating question suggestions
 */
export interface SuggestionsRequest {
  document_id: string;
  context?: string;
}

/**
 * Parameters for searching sessions
 */
export interface SearchParams {
  query: string;
  document_id?: string;
  limit?: number;
}

/**
 * Parameters for getting sessions
 */
export interface GetSessionsParams {
  page?: number;
  limit?: number;
  is_active?: boolean;
  sort_by?: 'created_at' | 'last_message_at';
  order?: 'asc' | 'desc';
}

// ============================================
// Response Types
// ============================================

/**
 * Response when asking a question
 */
export interface AskQuestionResponse {
  message: ChatMessage;
  session_id: string;
  total_messages: number;
}

/**
 * Extended response with backend metadata
 */
export interface AskQuestionResponseExtended {
  session_id: string;
  message: ChatMessageExtended;
  claude_model_used: string;
  token_usage: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
}

/**
 * Response for session list
 */
export interface SessionListResponse {
  sessions: ChatSession[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

/**
 * Response for search results
 */
export interface SearchSessionsResponse {
  sessions: ChatSession[];
  total: number;
  query: string;
}

/**
 * Response for question suggestions
 */
export interface SuggestionsResponse {
  suggestions: string[];
  context_used: string;
  processing_time_ms: number;
}

/**
 * Response for chat statistics
 */
export interface ChatStatsResponse {
  total_sessions: number;
  total_messages: number;
  active_sessions: number;
  avg_messages_per_session: number;
  total_tokens_used: number;
  last_activity: string;
}

/**
 * Response for session summary
 */
export interface SessionSummaryResponse {
  session_id: string;
  summary: string;
  key_topics: string[];
  message_count: number;
  created_at: string;
}

// ============================================
// Error Types
// ============================================

/**
 * Chat-specific error codes
 */
export enum ChatErrorCode {
  DOCUMENT_NOT_FOUND = 'DOCUMENT_NOT_FOUND',
  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  RATE_LIMITED = 'RATE_LIMITED',
  AI_SERVICE_ERROR = 'AI_SERVICE_ERROR',
  INVALID_REQUEST = 'INVALID_REQUEST',
  CSRF_TOKEN_REQUIRED = 'CSRF_TOKEN_REQUIRED',
}

/**
 * Standard error response from backend
 */
export interface ErrorResponse {
  error: string;
  message: string;
  code: ChatErrorCode;
  details?: any;
}

// ============================================
// Frontend-Specific Types
// ============================================

/**
 * Frontend chat session with additional UI state
 */
export interface FrontendChatSession extends ChatSession {
  documentTitle?: string;
  canModify: boolean;
  isPinned?: boolean;
}

/**
 * Frontend chat message with UI state
 */
export interface FrontendChatMessage extends ChatMessage {
  id: string;
  status: 'pending' | 'sent' | 'failed';
  error?: string;
}

// ============================================
// Type Guards
// ============================================

export function isChatMessage(obj: any): obj is ChatMessage {
  return (
    obj &&
    typeof obj === 'object' &&
    ['user', 'assistant'].includes(obj.role) &&
    typeof obj.content === 'string' &&
    typeof obj.timestamp === 'string'
  );
}

export function isChatSession(obj: any): obj is ChatSession {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.document_id === 'string' &&
    typeof obj.user_id === 'string' &&
    typeof obj.session_name === 'string' &&
    Array.isArray(obj.messages) &&
    typeof obj.is_active === 'boolean' &&
    typeof obj.total_messages === 'number'
  );
}

export function isErrorResponse(obj: any): obj is ErrorResponse {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.error === 'string' &&
    typeof obj.message === 'string' &&
    Object.values(ChatErrorCode).includes(obj.code)
  );
}

// ============================================
// Utility Types
// ============================================

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

/**
 * Sort parameters
 */
export interface SortParams {
  sort_by?: string;
  order?: 'asc' | 'desc';
}

/**
 * Combined query parameters
 */
export type QueryParams = PaginationParams & SortParams & {
  [key: string]: any;
};

// Re-export for backward compatibility
export type {
  CreateSessionRequest as CreateChatSessionRequest,
  AskQuestionRequest as ChatQuestionRequest,
  ChatSession as BackendChatSession,
  ChatMessage as BackendChatMessage,
};