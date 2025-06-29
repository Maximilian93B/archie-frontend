# 🔌 Archivus API Client Patterns & Error Handling

## 🏗️ **API Client Architecture**

### **Base API Client Setup**
```typescript
// lib/api-client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from '@/components/ui/use-toast';

class ArchivusAPIClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_ARCHIVUS_API || 'http://localhost:8080',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor for auth
    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        return this.handleError(error);
      }
    );
  }

  private async handleError(error: any) {
    if (error.response?.status === 401) {
      // Try to refresh token
      const refreshed = await this.refreshToken();
      if (refreshed) {
        // Retry original request
        return this.client.request(error.config);
      } else {
        // Redirect to login
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }
    }

    // Handle rate limiting
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      toast({
        title: 'Rate limit exceeded',
        description: `Please wait ${retryAfter} seconds before trying again.`,
        variant: 'destructive',
      });
    }

    return Promise.reject(error);
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  // Generic request methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // File upload with progress
  async uploadFile<T>(
    url: string, 
    file: File, 
    options: UploadOptions = {},
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add additional form fields
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const response = await this.client.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 300000, // 5 minutes for large files
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(Math.round(progress));
        }
      },
    });

    return response.data;
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) return false;

      const response = await this.client.post('/api/v1/auth/refresh', {
        refresh_token: refreshToken,
      });

      const { token, refresh_token } = response.data;
      this.setToken(token);
      localStorage.setItem('access_token', token);
      localStorage.setItem('refresh_token', refresh_token);
      
      return true;
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return false;
    }
  }
}

export const apiClient = new ArchivusAPIClient();
```

---

## 🔐 **Authentication Service**

```typescript
// services/auth.service.ts
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refresh_token: string;
  user: User;
}

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company?: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/api/v1/auth/login', credentials);
    
    // Store tokens
    localStorage.setItem('access_token', response.token);
    localStorage.setItem('refresh_token', response.refresh_token);
    apiClient.setToken(response.token);
    
    return response;
  }

  async register(data: RegisterData): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/api/v1/auth/register', data);
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/api/v1/auth/logout');
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      apiClient.clearToken();
    }
  }

  async resetPassword(email: string): Promise<void> {
    await apiClient.post('/api/v1/auth/reset-password', { email });
  }

  async validateToken(): Promise<User> {
    return apiClient.get<User>('/api/v1/auth/validate');
  }

  // Social login methods
  async loginWithGoogle(token: string): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/api/v1/auth/google', { token });
  }

  async loginWithApple(token: string): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/api/v1/auth/apple', { token });
  }

  async loginWithGitHub(code: string): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/api/v1/auth/github', { code });
  }

  // Token management
  getStoredToken(): string | null {
    return localStorage.getItem('access_token');
  }

  initializeFromStorage() {
    const token = this.getStoredToken();
    if (token) {
      apiClient.setToken(token);
    }
  }
}

export const authService = new AuthService();
```

---

## 📄 **Document Service**

```typescript
// services/documents.service.ts
interface DocumentListParams {
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

interface UploadOptions {
  title?: string;
  enable_ai?: boolean;
  enable_ocr?: boolean;
  folder_id?: string;
  tags?: string[];
}

interface DocumentUpdateData {
  title?: string;
  document_type?: DocumentType;
  tags?: string[];
  folder_id?: string;
}

class DocumentsService {
  // Basic CRUD operations
  async getDocuments(params: DocumentListParams = {}): Promise<PaginatedResponse<Document>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, String(v)));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    return apiClient.get<PaginatedResponse<Document>>(
      `/api/v1/documents?${searchParams.toString()}`
    );
  }

  async getDocument(id: string): Promise<Document> {
    return apiClient.get<Document>(`/api/v1/documents/${id}`);
  }

  async uploadDocument(
    file: File, 
    options: UploadOptions = {},
    onProgress?: (progress: number) => void
  ): Promise<Document> {
    return apiClient.uploadFile<Document>(
      '/api/v1/documents/upload',
      file,
      {
        title: options.title || file.name,
        enable_ai: options.enable_ai ?? true,
        enable_ocr: options.enable_ocr ?? false,
        folder_id: options.folder_id,
        tags: options.tags?.join(','),
      },
      onProgress
    );
  }

  async updateDocument(id: string, data: DocumentUpdateData): Promise<Document> {
    return apiClient.put<Document>(`/api/v1/documents/${id}`, data);
  }

  async deleteDocument(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/documents/${id}`);
  }

  async downloadDocument(id: string): Promise<Blob> {
    const response = await apiClient.get(`/api/v1/documents/${id}/download`, {
      responseType: 'blob',
    });
    return response;
  }

  async getDocumentPreview(id: string): Promise<string> {
    return apiClient.get<string>(`/api/v1/documents/${id}/preview`);
  }

  // AI-powered features
  async getAIResults(id: string): Promise<AIResults> {
    return apiClient.get<AIResults>(`/api/v1/documents/${id}/ai-results`);
  }

  async getDocumentSummary(id: string): Promise<{ summary: string }> {
    return apiClient.get<{ summary: string }>(`/api/v1/documents/${id}/summary`);
  }

  async getProcessingJobs(id: string): Promise<AIProcessingJob[]> {
    return apiClient.get<AIProcessingJob[]>(`/api/v1/documents/${id}/jobs`);
  }

  // Enhanced document features
  async getEnhancedDocuments(params: DocumentListParams = {}): Promise<EnhancedDocument[]> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    return apiClient.get<EnhancedDocument[]>(
      `/api/v1/documents/enhanced?${searchParams.toString()}`
    );
  }

  async getWorkspaceContext(): Promise<WorkspaceContext> {
    return apiClient.get<WorkspaceContext>('/api/v1/documents/workspace-context');
  }

  async getDocumentInsights(): Promise<DocumentInsights> {
    return apiClient.get<DocumentInsights>('/api/v1/documents/insights');
  }

  async getDocumentRecommendations(): Promise<DocumentRecommendation[]> {
    return apiClient.get<DocumentRecommendation[]>('/api/v1/documents/recommendations');
  }

  // Utility methods
  async findDuplicates(): Promise<DuplicateGroup[]> {
    return apiClient.get<DuplicateGroup[]>('/api/v1/documents/duplicates');
  }

  async getExpiringDocuments(): Promise<Document[]> {
    return apiClient.get<Document[]>('/api/v1/documents/expiring');
  }

  async getSimilarDocuments(id: string): Promise<Document[]> {
    return apiClient.get<Document[]>(`/api/v1/documents/${id}/similar`);
  }

  async getDocumentRelationships(id: string): Promise<DocumentRelationship[]> {
    return apiClient.get<DocumentRelationship[]>(`/api/v1/documents/${id}/relationships`);
  }
}

export const documentsService = new DocumentsService();
```

---

## 💬 **Chat Service**

```typescript
// services/chat.service.ts
interface CreateChatSessionRequest {
  document_id: string;
  session_name?: string;
}

interface AskQuestionRequest {
  question: string;
  context?: string;
}

interface ChatSearchParams {
  query?: string;
  document_id?: string;
  user_id?: string;
  date_from?: string;
  date_to?: string;
}

class ChatService {
  // Session management
  async createSession(data: CreateChatSessionRequest): Promise<ChatSession> {
    return apiClient.post<ChatSession>('/api/v1/chat/sessions', data);
  }

  async getSessions(): Promise<ChatSession[]> {
    return apiClient.get<ChatSession[]>('/api/v1/chat/sessions');
  }

  async getSession(sessionId: string): Promise<ChatSession> {
    return apiClient.get<ChatSession>(`/api/v1/chat/sessions/${sessionId}`);
  }

  async updateSessionName(sessionId: string, name: string): Promise<ChatSession> {
    return apiClient.put<ChatSession>(`/api/v1/chat/sessions/${sessionId}/name`, { name });
  }

  async deleteSession(sessionId: string): Promise<void> {
    await apiClient.delete(`/api/v1/chat/sessions/${sessionId}`);
  }

  async deactivateSession(sessionId: string): Promise<ChatSession> {
    return apiClient.put<ChatSession>(`/api/v1/chat/sessions/${sessionId}/deactivate`);
  }

  // Q&A functionality
  async askQuestion(sessionId: string, data: AskQuestionRequest): Promise<ChatMessage> {
    return apiClient.post<ChatMessage>(`/api/v1/chat/sessions/${sessionId}/ask`, data);
  }

  async summarizeSession(sessionId: string): Promise<{ summary: string }> {
    return apiClient.post<{ summary: string }>(`/api/v1/chat/sessions/${sessionId}/summarize`);
  }

  // Discovery & search
  async getDocumentSessions(documentId: string): Promise<ChatSession[]> {
    return apiClient.get<ChatSession[]>(`/api/v1/chat/documents/${documentId}/sessions`);
  }

  async searchSessions(params: ChatSearchParams): Promise<ChatSession[]> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, String(value));
      }
    });

    return apiClient.get<ChatSession[]>(`/api/v1/chat/search?${searchParams.toString()}`);
  }

  async generateSuggestions(documentId: string): Promise<string[]> {
    return apiClient.post<string[]>('/api/v1/chat/suggestions', { document_id: documentId });
  }

  // Analytics
  async getChatStats(): Promise<ChatStats> {
    return apiClient.get<ChatStats>('/api/v1/chat/stats');
  }
}

export const chatService = new ChatService();
```

---

## 🔍 **Search Service**

```typescript
// services/search.service.ts
interface IntelligentSearchParams {
  q: string;
  limit?: number;
  document_types?: DocumentType[];
  date_from?: string;
  date_to?: string;
}

interface HybridSearchRequest {
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

class SearchService {
  async intelligentSearch(params: IntelligentSearchParams): Promise<Document[]> {
    const searchParams = new URLSearchParams();
    searchParams.append('q', params.q);
    
    if (params.limit) searchParams.append('limit', String(params.limit));
    if (params.document_types) {
      params.document_types.forEach(type => searchParams.append('document_types', type));
    }
    if (params.date_from) searchParams.append('date_from', params.date_from);
    if (params.date_to) searchParams.append('date_to', params.date_to);

    return apiClient.get<Document[]>(`/api/v1/search/intelligent?${searchParams.toString()}`);
  }

  async hybridSearch(request: HybridSearchRequest): Promise<HybridSearchResult> {
    return apiClient.post<HybridSearchResult>('/api/v1/search/hybrid', request);
  }

  async getSearchSuggestions(query: string): Promise<string[]> {
    return apiClient.get<string[]>(`/api/v1/search/suggestions?q=${encodeURIComponent(query)}`);
  }

  async getSimilarDocuments(documentId: string, limit?: number): Promise<Document[]> {
    const params = limit ? `?limit=${limit}` : '';
    return apiClient.get<Document[]>(`/api/v1/documents/${documentId}/similar${params}`);
  }
}

export const searchService = new SearchService();
```

---

## 📊 **Analytics Service**

```typescript
// services/analytics.service.ts
interface AnalyticsParams {
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  start_date?: string;
  end_date?: string;
}

class AnalyticsService {
  async getDashboard(period: string): Promise<DashboardAnalytics> {
    return apiClient.get<DashboardAnalytics>(`/api/v1/analytics/dashboard?period=${period}`);
  }

  async getDocumentAnalytics(params: AnalyticsParams): Promise<DocumentAnalytics> {
    const searchParams = new URLSearchParams(params as any);
    return apiClient.get<DocumentAnalytics>(`/api/v1/analytics/documents?${searchParams}`);
  }

  async getUserAnalytics(params: AnalyticsParams): Promise<UserAnalytics> {
    const searchParams = new URLSearchParams(params as any);
    return apiClient.get<UserAnalytics>(`/api/v1/analytics/users?${searchParams}`);
  }

  async getStorageAnalytics(params: AnalyticsParams): Promise<StorageAnalytics> {
    const searchParams = new URLSearchParams(params as any);
    return apiClient.get<StorageAnalytics>(`/api/v1/analytics/storage?${searchParams}`);
  }

  async getComplianceAnalytics(params: AnalyticsParams): Promise<ComplianceAnalytics> {
    const searchParams = new URLSearchParams(params as any);
    return apiClient.get<ComplianceAnalytics>(`/api/v1/analytics/compliance?${searchParams}`);
  }

  async getFinancialAnalytics(params: AnalyticsParams): Promise<FinancialAnalytics> {
    const searchParams = new URLSearchParams(params as any);
    return apiClient.get<FinancialAnalytics>(`/api/v1/analytics/financial?${searchParams}`);
  }

  async getAIProcessingAnalytics(params: AnalyticsParams): Promise<AIProcessingAnalytics> {
    const searchParams = new URLSearchParams(params as any);
    return apiClient.get<AIProcessingAnalytics>(`/api/v1/analytics/ai-processing?${searchParams}`);
  }

  // Export methods
  async exportCSV(type: string, params: AnalyticsParams): Promise<Blob> {
    const searchParams = new URLSearchParams({ ...params, type } as any);
    return apiClient.get(`/api/v1/analytics/export/csv?${searchParams}`, {
      responseType: 'blob',
    });
  }

  async exportExcel(type: string, params: AnalyticsParams): Promise<Blob> {
    const searchParams = new URLSearchParams({ ...params, type } as any);
    return apiClient.get(`/api/v1/analytics/export/xlsx?${searchParams}`, {
      responseType: 'blob',
    });
  }

  async exportPDF(type: string, params: AnalyticsParams): Promise<Blob> {
    const searchParams = new URLSearchParams({ ...params, type } as any);
    return apiClient.get(`/api/v1/analytics/export/pdf?${searchParams}`, {
      responseType: 'blob',
    });
  }
}

export const analyticsService = new AnalyticsService();
```

---

## 🔀 **Multi-Document Service**

```typescript
// services/multi-document.service.ts
interface CompareDocumentsRequest {
  document_ids: string[];
  query?: string;
}

interface MultiDocumentQARequest {
  document_ids: string[];
  question: string;
}

class MultiDocumentService {
  async compareDocuments(request: CompareDocumentsRequest): Promise<MultiDocumentAnalysis> {
    return apiClient.post<MultiDocumentAnalysis>('/api/v1/multi-document/compare', request);
  }

  async askMultipleDocuments(request: MultiDocumentQARequest): Promise<MultiDocumentAnalysis> {
    return apiClient.post<MultiDocumentAnalysis>('/api/v1/multi-document/ask', request);
  }

  async getAnalyses(): Promise<MultiDocumentAnalysis[]> {
    return apiClient.get<MultiDocumentAnalysis[]>('/api/v1/multi-document/analyses');
  }

  async getDocumentRelationships(documentId: string): Promise<DocumentRelationship[]> {
    return apiClient.get<DocumentRelationship[]>(`/api/v1/documents/${documentId}/relationships`);
  }
}

export const multiDocumentService = new MultiDocumentService();
```

---

## ⚡ **React Query Integration**

```typescript
// hooks/queries/documents.queries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query keys factory
export const documentKeys = {
  all: ['documents'] as const,
  lists: () => [...documentKeys.all, 'list'] as const,
  list: (filters: DocumentListParams) => [...documentKeys.lists(), filters] as const,
  details: () => [...documentKeys.all, 'detail'] as const,
  detail: (id: string) => [...documentKeys.details(), id] as const,
  enhanced: () => [...documentKeys.all, 'enhanced'] as const,
  workspaceContext: () => [...documentKeys.all, 'workspace-context'] as const,
  aiResults: (id: string) => [...documentKeys.detail(id), 'ai-results'] as const,
};

// Document queries
export const useDocuments = (params: DocumentListParams = {}) => {
  return useQuery({
    queryKey: documentKeys.list(params),
    queryFn: () => documentsService.getDocuments(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDocument = (id: string) => {
  return useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => documentsService.getDocument(id),
    enabled: !!id,
  });
};

export const useEnhancedDocuments = (params: DocumentListParams = {}) => {
  return useQuery({
    queryKey: documentKeys.enhanced(),
    queryFn: () => documentsService.getEnhancedDocuments(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useWorkspaceContext = () => {
  return useQuery({
    queryKey: documentKeys.workspaceContext(),
    queryFn: () => documentsService.getWorkspaceContext(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDocumentAIResults = (id: string) => {
  return useQuery({
    queryKey: documentKeys.aiResults(id),
    queryFn: () => documentsService.getAIResults(id),
    enabled: !!id,
  });
};

// Document mutations
export const useDocumentUpload = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ file, options, onProgress }: { 
      file: File; 
      options?: UploadOptions; 
      onProgress?: (progress: number) => void 
    }) => documentsService.uploadDocument(file, options, onProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: documentKeys.enhanced() });
      queryClient.invalidateQueries({ queryKey: documentKeys.workspaceContext() });
    },
  });
};

export const useDocumentUpdate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DocumentUpdateData }) => 
      documentsService.updateDocument(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: documentKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
    },
  });
};

export const useDocumentDelete = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => documentsService.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: documentKeys.enhanced() });
    },
  });
};
```

---

## 🛡️ **Error Handling Patterns**

```typescript
// utils/error-handling.ts
interface APIErrorResponse {
  error: string;
  message: string;
  details?: string;
  timestamp: string;
}

export class APIError extends Error {
  public status: number;
  public code: string;
  public details?: string;

  constructor(status: number, response: APIErrorResponse) {
    super(response.message);
    this.name = 'APIError';
    this.status = status;
    this.code = response.error;
    this.details = response.details;
  }
}

export const handleAPIError = (error: any): APIError => {
  if (error.response) {
    const { status, data } = error.response;
    return new APIError(status, data);
  }
  
  if (error.request) {
    return new APIError(0, {
      error: 'network_error',
      message: 'Network error - please check your connection',
      timestamp: new Date().toISOString(),
    });
  }
  
  return new APIError(0, {
    error: 'unknown_error',
    message: error.message || 'An unknown error occurred',
    timestamp: new Date().toISOString(),
  });
};

// Error boundary with retry logic
export const withErrorBoundary = <T extends object>(
  Component: React.ComponentType<T>,
  errorFallback?: React.ComponentType<{ error: Error; retry: () => void }>
) => {
  return (props: T) => (
    <ErrorBoundary fallback={errorFallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

// Global error toast handler
export const showErrorToast = (error: APIError | Error) => {
  let title = 'Error';
  let description = error.message;

  if (error instanceof APIError) {
    switch (error.code) {
      case 'unauthorized':
        title = 'Authentication Error';
        description = 'Please log in again';
        break;
      case 'forbidden':
        title = 'Access Denied';
        description = 'You don\'t have permission to perform this action';
        break;
      case 'validation_error':
        title = 'Validation Error';
        break;
      case 'rate_limit_exceeded':
        title = 'Rate Limit Exceeded';
        description = 'Please wait before trying again';
        break;
      case 'quota_exceeded':
        title = 'Quota Exceeded';
        description = 'Please upgrade your plan or contact support';
        break;
      case 'document_too_large':
        title = 'File Too Large';
        description = 'Please select a smaller file';
        break;
      case 'unsupported_format':
        title = 'Unsupported Format';
        description = 'Please select a supported file format';
        break;
    }
  }

  toast({
    title,
    description,
    variant: 'destructive',
  });
};
```

---

## 🔄 **Retry & Loading Patterns**

```typescript
// hooks/useRetry.ts
export const useRetry = () => {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const retry = useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
    }
  }, [retryCount, maxRetries]);

  const reset = useCallback(() => {
    setRetryCount(0);
  }, []);

  return { retry, reset, retryCount, canRetry: retryCount < maxRetries };
};

// hooks/useLoadingState.ts
export const useLoadingState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async <T>(fn: () => Promise<T>): Promise<T | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const result = await fn();
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, execute };
};

// Exponential backoff retry logic
export const retryWithExponentialBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (i === maxRetries) {
        throw lastError;
      }

      // Don't retry on certain errors
      if (error instanceof APIError && [401, 403, 422].includes(error.status)) {
        throw error;
      }

      // Wait with exponential backoff
      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
};
```

---

**🔌 This comprehensive API client setup ensures robust, scalable communication with your Archivus backend!** 