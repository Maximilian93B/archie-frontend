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
  tenant_subdomain?: string; // Added for multi-tenant header
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
  // Subscription info (optional - populated after fetching subscription status)
  subscription_tier?: 'starter' | 'professional' | 'enterprise';
  subscription_status?: 'active' | 'trialing' | 'past_due' | 'canceled';
  trial_ends_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  subdomain?: string; // Optional subdomain for multi-tenant login
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company?: string;
  registration_type?: 'individual' | 'organization';
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
  setAuth: (user: User, token: string) => Promise<void>;
}

// ================================
// 📄 Document Types
// ================================

export type DocumentType = 
  | 'pdf'
  | 'doc'
  | 'docx'
  | 'txt'
  | 'image'
  | 'spreadsheet'
  | 'presentation'
  | 'other';

export type ProcessingStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed';

// AI Tag Types
export interface AITag {
  name: string;
  category: TagCategory;
  confidence: number;  // 0.0 - 1.0
  relevance: number;   // 0.0 - 1.0
}

export type TagCategory =
  | "document_type"
  | "department"
  | "project"
  | "topic"
  | "compliance"
  | "priority"
  | "year"
  | "month"
  | "client"
  | "vendor";

export interface Tag {
  id: string;
  name: string;
  color?: string;
  is_ai_generated?: boolean;
  usage_count?: number;
  created_at: string;
}

export interface DocumentTagsResponse {
  tags: AITag[];           // AI-generated tags with metadata
  user_tags: string[];     // User-created tags (simple strings)
  categories: string[];    // List of categories present
  keywords?: string[];     // Optional keywords from AI analysis
  topics?: string[];       // Optional topics from AI analysis
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  created_at: string;
}

// ================================
// 📁 Folder Types
// ================================

export interface Folder {
  id: string;
  tenant_id: string;
  parent_id?: string;
  name: string;
  description?: string;
  path: string;
  level: number;
  is_system: boolean;
  color?: string;
  icon?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  // Frontend-specific fields
  children?: Folder[];
  document_count?: number;
  is_expanded?: boolean;
}

export interface CreateFolderRequest {
  name: string;
  parent_id?: string;
  description?: string;
  color?: string;
  icon?: string;
}

export interface UpdateFolderRequest {
  name?: string;
  description?: string;
  color?: string;
  icon?: string;
  parent_id?: string;
}

export interface FolderTreeNode extends Folder {
  children: FolderTreeNode[];
  document_count: number;
  is_expanded: boolean;
  is_selected?: boolean;
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
  folder_name?: string;
  ai_processed: boolean;
  ai_processed_at?: string;
  embedding_status: ProcessingStatus;
  // New AI processing fields
  ai_processing_status?: 'pending' | 'processing' | 'completed' | 'failed';
  ai_summary?: string;
  ai_entities?: string[];
  ai_key_points?: string[];
  ai_category?: string;
  ai_confidence_score?: number;
  // Relationships (optional based on API includes)
  tags?: Tag[];
  categories?: Category[];
  folder?: Folder;
  starred?: boolean;
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
  document_types?: DocumentType[];
  search?: string;
  folder_id?: string;
  tags?: string[];
  ai_processed?: boolean;
  date_from?: string;
  date_to?: string;
}

export interface DocumentFilters {
  document_types?: DocumentType[];
  ai_processed?: boolean;
  folder_id?: string;
  date_range?: {
    from: Date;
    to: Date;
  };
  tags?: string[];
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
  entities?: {
    people?: string[];
    organizations?: string[];
    locations?: string[];
    dates?: string[];
    amounts?: string[];
  };
  classification: {
    document_type: DocumentType;
    confidence: number;
  };
  summary: string;
  key_points: string[];
  suggested_tags?: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
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
  session_name: string;
  is_active: boolean;
  messages: ChatMessage[];
  document?: Document;
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