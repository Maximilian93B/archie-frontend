// 🏷️ Archivus TypeScript Definitions
// Complete type definitions for Archivus frontend development

// ================================
// 🔐 Authentication Types
// ================================

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company?: string;
  role: 'admin' | 'user' | 'viewer';
  tenant_id: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company?: string;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  user: User;
  expires_in: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<User>;
  refreshToken: () => Promise<boolean>;
}

// ================================
// 📄 Document Types
// ================================

export type DocumentType = 
  | 'contract'
  | 'invoice' 
  | 'report'
  | 'email'
  | 'legal'
  | 'financial'
  | 'other';

export type ProcessingStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed';

export interface Tag {
  id: string;
  name: string;
  color?: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  created_at: string;
}

export interface Document {
  id: string;
  title: string;
  filename: string;
  file_path: string;
  content_type: string;
  file_size: number;
  extracted_text?: string;
  summary?: string;
  document_type: DocumentType;
  confidence_score?: number;
  tenant_id: string;
  user_id: string;
  folder_id?: string;
  ai_processed: boolean;
  embedding_status: ProcessingStatus;
  tags: Tag[];
  categories: Category[];
  created_at: string;
  updated_at: string;
}

export interface EnhancedDocument extends Document {
  ai_insights?: {
    key_points: string[];
    entities: string[];
    sentiment: 'positive' | 'negative' | 'neutral';
    urgency: 'high' | 'medium' | 'low';
  };
  processing_metadata?: {
    processing_time_ms: number;
    model_version: string;
    confidence_scores: Record<string, number>;
  };
  relationships?: {
    similar_documents: string[];
    referenced_documents: string[];
  };
}

export interface DocumentListParams {
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_desc?: boolean;
  document_type?: DocumentType;
  search?: string;
  folder_id?: string;
  tags?: string[];
  ai_processed?: boolean;
  date_from?: string;
  date_to?: string;
}

export interface UploadOptions {
  title?: string;
  enable_ai?: boolean;
  enable_ocr?: boolean;
  folder_id?: string;
  tags?: string[];
}

export interface AIResults {
  document_id: string;
  extracted_entities: Record<string, any>;
  classification: {
    document_type: DocumentType;
    confidence: number;
  };
  summary: string;
  key_points: string[];
  processing_metadata: {
    processing_time_ms: number;
    model_used: string;
    token_count: number;
  };
  created_at: string;
}

// ================================
// 💬 Chat System Types
// ================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  claude_model: string;
  token_count: number;
  created_at: string;
}

export interface ChatSession {
  id: string;
  document_id: string;
  user_id: string;
  title: string;
  is_active: boolean;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export interface CreateChatSessionRequest {
  document_id: string;
  session_name?: string;
}

export interface AskQuestionRequest {
  question: string;
  context?: string;
}

// ================================
// 🔍 Search Types
// ================================

export interface SearchFilters {
  documentTypes?: DocumentType[];
  dateRange?: {
    from: string;
    to: string;
  };
  tags?: string[];
  aiProcessed?: boolean;
  hybridOptions?: HybridSearchOptions;
}

export interface HybridSearchOptions {
  enable_full_text_search?: boolean;
  enable_ai_field_search?: boolean;
  enable_semantic_search?: boolean;
  enable_metadata_search?: boolean;
  weights?: {
    full_text?: number;
    ai_fields?: number;
    semantic?: number;
    metadata?: number;
  };
}

export interface HybridSearchDocument {
  id: string;
  title: string;
  document_type: string;
  summary: string;
  categories: string[];
  relevance_score: number;
  match_reasons: string[];
  created_at: string;
}

export interface HybridSearchResult {
  query: string;
  documents: HybridSearchDocument[];
  total: number;
  processing_time_ms: number;
  search_strategies: string[];
}

export interface SearchResult {
  document: Document;
  relevance_score: number;
  match_highlights?: string[];
  match_reasons?: string[];
}

// ================================
// 🔀 Multi-Document Analysis Types
// ================================

export interface MultiDocumentAnalysis {
  id: string;
  analysis_type: 'document_comparison' | 'multi_document_qa';
  document_ids: string[];
  user_id: string;
  tenant_id: string;
  question?: string;
  result: Record<string, any>;
  processing_time_ms: number;
  created_at: string;
  updated_at: string;
}

export interface CompareDocumentsRequest {
  document_ids: string[];
  query?: string;
}

export interface MultiDocumentQARequest {
  document_ids: string[];
  question: string;
}

// ================================
// 📊 Analytics Types
// ================================

export type AnalyticsPeriod = 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface DashboardAnalytics {
  period: AnalyticsPeriod;
  document_stats: {
    total_documents: number;
    documents_uploaded_this_period: number;
    ai_processed_documents: number;
    processing_success_rate: number;
    avg_processing_time_ms: number;
  };
  user_activity: {
    active_users: number;
    total_sessions: number;
    avg_session_duration_minutes: number;
  };
  storage_usage: {
    total_storage_gb: number;
    storage_growth_gb: number;
    storage_by_type: Record<string, number>;
  };
  ai_processing_stats: {
    total_jobs: number;
    successful_jobs: number;
    avg_processing_time_ms: number;
    claude_api_calls: number;
    tokens_used: number;
  };
  processing_time_ms: number;
}

// ================================
// 🏗️ Workspace & Context Types
// ================================

export interface WorkspaceContext {
  overview: string;
  recent_activity: string;
  recommendations: DocumentRecommendation[];
  document_trends: Record<string, any>;
  processing_time_ms: number;
}

export interface DocumentRecommendation {
  type: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action_url?: string;
  metadata?: Record<string, any>;
}

export interface DocumentInsights {
  total_documents: number;
  recent_uploads: number;
  processing_status: {
    pending: number;
    processing: number;
    completed: number;
    failed: number;
  };
  popular_categories: Array<{ name: string; count: number }>;
  ai_insights: {
    common_entities: string[];
    sentiment_distribution: Record<string, number>;
    urgency_distribution: Record<string, number>;
  };
}

// ================================
// 🛠️ Utility Types
// ================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface APIError {
  error: string;
  message: string;
  details?: string;
  timestamp: string;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface ActionState extends LoadingState {
  isSuccess?: boolean;
}

// ================================
// 🎨 Component Types
// ================================

export type ComponentProps<T = {}> = T & {
  className?: string;
  children?: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// ================================
// 🔧 State Management Types
// ================================

export interface AppState {
  // Authentication
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // UI State
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  
  // Document State
  selectedDocuments: string[];
  currentDocument: Document | null;
  
  // Chat State
  activeChatSession: string | null;
  chatSessions: ChatSession[];
  
  // Search State
  searchQuery: string;
  searchFilters: SearchFilters;
  searchResults: SearchResult[];
  
  // Upload State
  uploadQueue: Array<{
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'error';
    error?: string;
  }>;
} 