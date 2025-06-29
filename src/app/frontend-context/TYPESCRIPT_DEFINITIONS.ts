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

export interface DocumentUpdateData {
  title?: string;
  document_type?: DocumentType;
  tags?: string[];
  folder_id?: string;
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

export interface AIProcessingJob {
  id: string;
  document_id: string;
  job_type: 'text_extraction' | 'ai_analysis' | 'embedding';
  status: ProcessingStatus;
  progress?: number;
  result?: Record<string, any>;
  error_message?: string;
  started_at: string;
  completed_at?: string;
}

export interface DuplicateGroup {
  similarity_score: number;
  documents: Document[];
}

export interface DocumentRelationship {
  document_id: string;
  related_document_id: string;
  relationship_type: 'similar' | 'referenced' | 'version' | 'related';
  confidence: number;
  metadata?: Record<string, any>;
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

export interface ChatSearchParams {
  query?: string;
  document_id?: string;
  user_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface ChatStats {
  total_sessions: number;
  total_messages: number;
  avg_session_length: number;
  most_common_topics: string[];
  usage_by_period: Record<string, number>;
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

export interface IntelligentSearchParams {
  q: string;
  limit?: number;
  document_types?: DocumentType[];
  date_from?: string;
  date_to?: string;
}

export interface HybridSearchRequest {
  query: string;
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
  filters?: {
    document_types?: DocumentType[];
    date_range?: { from: string; to: string };
    tags?: string[];
    ai_processed?: boolean;
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
// 📊 Analytics Types
// ================================

export type AnalyticsPeriod = 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface AnalyticsParams {
  period: AnalyticsPeriod;
  start_date?: string;
  end_date?: string;
}

export interface DashboardAnalytics {
  overview: {
    total_documents: number;
    documents_this_period: number;
    total_storage_mb: number;
    ai_processing_jobs: number;
    active_users: number;
  };
  documents: DocumentAnalytics;
  users: UserAnalytics;
  storage: StorageAnalytics;
  compliance: ComplianceAnalytics;
  financial: FinancialAnalytics;
  ai_processing: AIProcessingAnalytics;
}

export interface DocumentAnalytics {
  uploads_by_period: Record<string, number>;
  document_types_distribution: Record<DocumentType, number>;
  ai_processing_success_rate: number;
  avg_processing_time_ms: number;
  top_categories: Array<{ name: string; count: number }>;
  storage_usage_trend: Array<{ date: string; size_mb: number }>;
}

export interface UserAnalytics {
  active_users_by_period: Record<string, number>;
  user_activity: Array<{
    user_id: string;
    email: string;
    last_active: string;
    documents_uploaded: number;
    chat_sessions: number;
  }>;
  usage_patterns: {
    peak_hours: number[];
    most_active_days: string[];
  };
}

export interface StorageAnalytics {
  total_storage_mb: number;
  storage_by_type: Record<string, number>;
  storage_growth_trend: Array<{ date: string; size_mb: number }>;
  largest_files: Array<{
    id: string;
    title: string;
    size_mb: number;
  }>;
}

export interface ComplianceAnalytics {
  retention_policy_compliance: number;
  documents_requiring_review: number;
  upcoming_expiry_dates: Array<{
    document_id: string;
    title: string;
    expiry_date: string;
  }>;
  audit_trail_completeness: number;
}

export interface FinancialAnalytics {
  cost_per_period: Record<string, number>;
  storage_costs: number;
  ai_processing_costs: number;
  projected_costs: Record<string, number>;
  cost_per_document: number;
}

export interface AIProcessingAnalytics {
  total_jobs: number;
  success_rate: number;
  avg_processing_time_ms: number;
  jobs_by_type: Record<string, number>;
  error_distribution: Record<string, number>;
  processing_volume_trend: Array<{ date: string; count: number }>;
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

export interface DocumentComparison {
  similarities: Array<{
    aspect: string;
    description: string;
    confidence: number;
  }>;
  differences: Array<{
    aspect: string;
    document_id: string;
    description: string;
  }>;
  summary: string;
  recommendations?: string[];
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
// 🗂️ Folder & Organization Types
// ================================

export interface Folder {
  id: string;
  name: string;
  description?: string;
  parent_id?: string;
  user_id: string;
  tenant_id: string;
  document_count: number;
  created_at: string;
  updated_at: string;
}

export interface FolderTree extends Folder {
  children: FolderTree[];
  documents: Document[];
}

// ================================
// 🔔 Notification Types
// ================================

export interface Notification {
  id: string;
  user_id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  action_url?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

// ================================
// 🎯 Subscription & Usage Types
// ================================

export interface Subscription {
  id: string;
  tenant_id: string;
  plan_name: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  current_period_start: string;
  current_period_end: string;
  usage_limits: {
    documents_per_month: number;
    storage_gb: number;
    ai_requests_per_month: number;
  };
  current_usage: {
    documents_this_month: number;
    storage_used_gb: number;
    ai_requests_this_month: number;
  };
}

// ================================
// 🌐 API Response Types
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

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  services: {
    database: 'healthy' | 'unhealthy';
    redis: 'healthy' | 'unhealthy';
    claude_ai: 'healthy' | 'unhealthy';
    storage: 'healthy' | 'unhealthy';
  };
  timestamp: string;
}

// ================================
// 🎨 UI Component Types
// ================================

export interface ComponentProps<T = {}> extends T {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface ActionState extends LoadingState {
  isSuccess?: boolean;
}

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
  width?: string | number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface FormFieldProps {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
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

export interface AppActions {
  // Authentication
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  
  // UI Actions
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Document Actions
  selectDocument: (id: string) => void;
  deselectDocument: (id: string) => void;
  clearSelectedDocuments: () => void;
  setCurrentDocument: (document: Document | null) => void;
  
  // Chat Actions
  setActiveChatSession: (sessionId: string | null) => void;
  addChatSession: (session: ChatSession) => void;
  updateChatSession: (session: ChatSession) => void;
  removeChatSession: (sessionId: string) => void;
  
  // Search Actions
  setSearchQuery: (query: string) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  setSearchResults: (results: SearchResult[]) => void;
  clearSearch: () => void;
  
  // Upload Actions
  addToUploadQueue: (file: File) => void;
  updateUploadProgress: (fileId: string, progress: number) => void;
  setUploadStatus: (fileId: string, status: string, error?: string) => void;
  removeFromUploadQueue: (fileId: string) => void;
}

// ================================
// 🎯 Utility Types
// ================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

// ================================
// 🔍 Query & Mutation Types
// ================================

export interface QueryOptions<T> {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  retry?: number | boolean;
  retryDelay?: number;
  refetchOnWindowFocus?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface MutationOptions<T, V> {
  onSuccess?: (data: T, variables: V) => void;
  onError?: (error: Error, variables: V) => void;
  onSettled?: (data: T | undefined, error: Error | null, variables: V) => void;
}

// ================================
// 📊 Chart & Visualization Types
// ================================

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, any>;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  series?: string;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  title?: string;
  xAxis?: {
    label?: string;
    type?: 'category' | 'time' | 'linear';
  };
  yAxis?: {
    label?: string;
    min?: number;
    max?: number;
  };
  colors?: string[];
  legend?: boolean;
  responsive?: boolean;
}

export default {}; 