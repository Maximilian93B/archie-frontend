import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from '@/hooks/use-toast';
import { InterceptorManager } from './interceptors';
import { DEFAULT_TIMEOUTS, RequestConfig } from './request-config';
import { csrfTokenManager } from './csrf';
import type {
  LoginCredentials,
  LoginResponse,
  RegisterData,
  User,
  Document,
  DocumentListParams,
  UploadOptions,
  AIResults,
  ChatSession,
  CreateChatSessionRequest,
  AskQuestionRequest,
  ChatMessage,
  HybridSearchResult,
  DashboardAnalytics,
  MultiDocumentAnalysis,
  CompareDocumentsRequest,
  MultiDocumentQARequest,
  WorkspaceContext,
  DocumentInsights,
  PaginatedResponse,
} from '@/types';

class ArchivusAPIClient {
  private client: AxiosInstance;
  private token: string | null = null;
  private interceptorManager: InterceptorManager;
  private tokenExpiresAt: number | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
      timeout: DEFAULT_TIMEOUTS.default,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Enable cookies for refresh tokens
    });

    this.interceptorManager = new InterceptorManager(
      this.client,
      () => this.getStoredToken(),
      () => this.refreshToken(),
      () => this.handleUnauthorized()
    );

    this.interceptorManager.setupInterceptors();
  }

  private handleUnauthorized() {
    // Clear all auth data
    this.clearAuth();
    
    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  }

  private clearAuth() {
    this.token = null;
    this.tokenExpiresAt = null;
    
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('tenant_subdomain');
    }
    
    csrfTokenManager.clear();
  }

  private scheduleTokenRefresh() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    if (!this.tokenExpiresAt) {
      return;
    }

    // Refresh 5 minutes before expiration
    const refreshTime = this.tokenExpiresAt - 5 * 60 * 1000;
    const timeUntilRefresh = refreshTime - Date.now();

    if (timeUntilRefresh > 0) {
      this.refreshTimer = setTimeout(() => {
        this.refreshToken().catch(console.error);
      }, timeUntilRefresh);
    }
  }

  setToken(token: string, expiresIn?: number) {
    this.token = token;
    
    if (expiresIn) {
      this.tokenExpiresAt = Date.now() + expiresIn * 1000;
      this.scheduleTokenRefresh();
    }
  }

  clearToken() {
    this.clearAuth();
  }

  getStoredToken(): string | null {
    return this.token || (typeof window !== 'undefined' ? localStorage.getItem('access_token') : null);
  }

  // Generic request methods with enhanced config
  async get<T>(url: string, config?: AxiosRequestConfig & { requestConfig?: RequestConfig }): Promise<T> {
    const response = await this.client.get<T>(url, this.mergeConfig(config));
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig & { requestConfig?: RequestConfig }): Promise<T> {
    const response = await this.client.post<T>(url, data, this.mergeConfig(config));
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig & { requestConfig?: RequestConfig }): Promise<T> {
    const response = await this.client.put<T>(url, data, this.mergeConfig(config));
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig & { requestConfig?: RequestConfig }): Promise<T> {
    const response = await this.client.delete<T>(url, this.mergeConfig(config));
    return response.data;
  }

  private mergeConfig(config?: AxiosRequestConfig & { requestConfig?: RequestConfig }): AxiosRequestConfig {
    const requestConfig = config?.requestConfig;
    const timeout = requestConfig?.timeout || config?.timeout;
    
    return {
      ...config,
      timeout,
      signal: requestConfig?.signal || config?.signal,
    };
  }

  // ================================
  // 🔐 Authentication Methods
  // ================================

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Store subdomain in localStorage before login if provided
    if (credentials.subdomain) {
      localStorage.setItem('tenant_subdomain', credentials.subdomain);
    }
    
    // Login with credentials
    const response = await this.post<LoginResponse>('/api/v1/auth/login', credentials, {
      requestConfig: {
        timeout: DEFAULT_TIMEOUTS.auth,
        skipAuth: true
      }
    });
    
    // Store tokens
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.token);
      localStorage.setItem('refresh_token', response.refresh_token);
      
      // Store subdomain - prefer response subdomain over input
      const tenantSubdomain = response.user?.tenant_subdomain || credentials.subdomain;
      if (tenantSubdomain) {
        localStorage.setItem('tenant_subdomain', tenantSubdomain);
      }
    }
    
    // Set token with expiration (assuming 1 hour if not provided)
    const expiresIn = response.expires_in || 3600;
    this.setToken(response.token, expiresIn);
    
    return response;
  }

  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await this.post<LoginResponse>('/api/v1/auth/register', data, {
      requestConfig: {
        timeout: DEFAULT_TIMEOUTS.auth,
        skipAuth: true
      }
    });
    
    // Store tokens
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.token);
      localStorage.setItem('refresh_token', response.refresh_token);
      
      // Store subdomain if available
      if (response.user?.tenant_subdomain) {
        localStorage.setItem('tenant_subdomain', response.user.tenant_subdomain);
      }
    }
    
    // Set token with expiration
    const expiresIn = response.expires_in || 3600;
    this.setToken(response.token, expiresIn);
    
    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.post('/api/v1/auth/logout', null, {
        requestConfig: {
          silent: true, // Don't show error if logout fails
        }
      });
    } finally {
      this.clearAuth();
    }
  }

  async validateToken(): Promise<User> {
    return this.get<User>('/api/v1/auth/validate');
  }

  async lookupSubdomain(email: string): Promise<{ subdomains: Array<{ subdomain: string; tenant_name: string }> }> {
    return this.post('/api/v1/auth/lookup-subdomain', { email }, {
      requestConfig: {
        skipAuth: true,
      }
    });
  }

  // ================================
  // 💬 Chat Methods (Legacy - kept for compatibility)
  // ================================

  async searchChatSessions(query: string, page = 1, pageSize = 20): Promise<any> {
    return this.get(`/api/v1/chat/search?q=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}`);
  }

  async getChatSuggestions(query: string): Promise<any> {
    return this.post('/api/v1/chat/suggestions', { query });
  }

  async getChatStats(): Promise<any> {
    return this.get('/api/v1/chat/stats');
  }

  async summarizeChatSession(sessionId: string): Promise<any> {
    return this.post(`/api/v1/chat/sessions/${sessionId}/summarize`);
  }

  async deactivateChatSession(sessionId: string): Promise<any> {
    return this.put(`/api/v1/chat/sessions/${sessionId}/deactivate`);
  }

  async getDocumentChatSessions(documentId: string): Promise<any> {
    return this.get(`/api/v1/chat/documents/${documentId}/sessions`);
  }

  async refreshToken(): Promise<boolean> {
    try {
      if (typeof window === 'undefined') return false;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) return false;

      const response = await this.post<LoginResponse>('/api/v1/auth/refresh', {
        refresh_token: refreshToken,
      }, {
        requestConfig: {
          skipAuth: true,
          silent: true,
          retry: false, // Don't retry refresh requests
        }
      });

      const { token, refresh_token, expires_in } = response;
      
      // Update stored tokens
      localStorage.setItem('access_token', token);
      localStorage.setItem('refresh_token', refresh_token);
      
      // Set token with expiration
      const expiresIn = expires_in || 3600;
      this.setToken(token, expiresIn);
      
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuth();
      return false;
    }
  }


  // ================================
  // 📄 Document Methods
  // ================================

  async getDocuments(params: DocumentListParams & { include?: string } = {}): Promise<PaginatedResponse<Document>> {
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

    return this.get<PaginatedResponse<Document>>(
      `/api/v1/documents?${searchParams.toString()}`
    );
  }

  async getEnhancedDocuments(params: DocumentListParams = {}): Promise<any> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    return this.get<any>(`/api/v1/documents/enhanced?${searchParams.toString()}`);
  }

  async getDocument(id: string, include?: string): Promise<Document> {
    const url = include ? `/api/v1/documents/${id}?include=${include}` : `/api/v1/documents/${id}`;
    return this.get<Document>(url);
  }

  async uploadDocument(
    file: File, 
    options: UploadOptions = {},
    onProgress?: (progress: number) => void,
    signal?: AbortSignal
  ): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', options.title || file.name);
    formData.append('enable_ai', String(options.enable_ai ?? true));
    formData.append('enable_ocr', String(options.enable_ocr ?? false));
    
    if (options.folder_id) {
      formData.append('folder_id', options.folder_id);
    }
    
    if (options.tags) {
      formData.append('tags', options.tags.join(','));
    }

    const response = await this.client.post<Document>('/api/v1/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: DEFAULT_TIMEOUTS.upload,
      signal,
      requestConfig: {
        timeout: DEFAULT_TIMEOUTS.upload,
        signal,
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(Math.round(progress));
        }
      },
    });

    return response.data;
  }

  async deleteDocument(id: string): Promise<void> {
    await this.delete(`/api/v1/documents/${id}`);
  }

  async downloadDocument(id: string, signal?: AbortSignal): Promise<Blob> {
    const response = await this.client.get(`/api/v1/documents/${id}/download`, {
      responseType: 'blob',
      timeout: DEFAULT_TIMEOUTS.download,
      signal,
      requestConfig: {
        timeout: DEFAULT_TIMEOUTS.download,
        signal,
      },
    });
    return response.data;
  }

  async getAIResults(id: string): Promise<AIResults> {
    return this.get<AIResults>(`/api/v1/documents/${id}/ai-results`);
  }

  async getWorkspaceContext(): Promise<WorkspaceContext> {
    return this.get<WorkspaceContext>('/api/v1/documents/workspace-context');
  }

  async getDocumentInsights(): Promise<DocumentInsights> {
    return this.get<DocumentInsights>('/api/v1/documents/insights');
  }

  // ================================
  // 💬 Chat Methods
  // ================================

  async createChatSession(data: CreateChatSessionRequest): Promise<ChatSession> {
    return this.post<ChatSession>('/api/v1/chat/sessions', data);
  }

  async getChatSessions(): Promise<ChatSession[]> {
    return this.get<ChatSession[]>('/api/v1/chat/sessions');
  }

  async getChatSession(sessionId: string): Promise<ChatSession> {
    return this.get<ChatSession>(`/api/v1/chat/sessions/${sessionId}`);
  }

  async askQuestion(sessionId: string, data: AskQuestionRequest): Promise<any> {
    return this.post<any>(`/api/v1/chat/sessions/${sessionId}/ask`, data);
  }

  async updateSessionName(sessionId: string, name: string): Promise<ChatSession> {
    return this.put<ChatSession>(`/api/v1/chat/sessions/${sessionId}/name`, { name });
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.delete(`/api/v1/chat/sessions/${sessionId}`);
  }

  async pinChatSession(sessionId: string): Promise<any> {
    return this.put(`/api/v1/chat/sessions/${sessionId}/pin`);
  }

  async unpinChatSession(sessionId: string): Promise<any> {
    return this.put(`/api/v1/chat/sessions/${sessionId}/unpin`);
  }

  // ================================
  // 🔍 Search Methods
  // ================================

  async intelligentSearch(query: string, limit = 20): Promise<any> {
    const params = new URLSearchParams({ q: query, limit: limit.toString() });
    return this.get<any>(`/api/v1/search/intelligent?${params}`);
  }

  async hybridSearch(searchParams: any): Promise<HybridSearchResult> {
    return this.post<HybridSearchResult>('/api/v1/search/hybrid', searchParams);
  }

  async getSearchSuggestions(partialQuery: string): Promise<string[]> {
    const params = new URLSearchParams({ q: partialQuery });
    return this.get<string[]>(`/api/v1/search/suggestions?${params}`);
  }

  // ================================
  // 🔀 Multi-Document Methods
  // ================================

  async compareDocuments(data: CompareDocumentsRequest): Promise<MultiDocumentAnalysis> {
    return this.post<MultiDocumentAnalysis>('/api/v1/multi-document/compare', data);
  }

  async askMultipleDocuments(data: MultiDocumentQARequest): Promise<MultiDocumentAnalysis> {
    return this.post<MultiDocumentAnalysis>('/api/v1/multi-document/ask', data);
  }

  async getMultiDocumentAnalyses(): Promise<MultiDocumentAnalysis[]> {
    return this.get<MultiDocumentAnalysis[]>('/api/v1/multi-document/analyses');
  }

  // ================================
  // 📊 Analytics Methods
  // ================================

  async getDashboardAnalytics(period = 'month'): Promise<DashboardAnalytics> {
    const params = new URLSearchParams({ period });
    return this.get<DashboardAnalytics>(`/api/v1/analytics/dashboard?${params}`);
  }

  async getDocumentAnalytics(filters: any): Promise<any> {
    const params = new URLSearchParams(filters);
    return this.get<any>(`/api/v1/analytics/documents?${params}`);
  }

  async getStorageReport(): Promise<any> {
    return this.get<any>('/api/v1/analytics/storage');
  }

  // ================================
  // 💳 Subscription Methods
  // ================================

  async getSubscriptionStatus(): Promise<any> {
    return this.get('/api/v1/subscription/status');
  }

  async getSubscriptionUsage(): Promise<any> {
    return this.get('/api/v1/subscription/usage');
  }

  async getSubscriptionSummary(): Promise<any> {
    return this.get('/api/v1/subscription/summary');
  }

  async createCheckoutSession(data: any): Promise<any> {
    return this.post('/api/v1/subscription/checkout', data);
  }

  async createPortalSession(data?: any): Promise<any> {
    return this.post('/api/v1/subscription/portal', data || {});
  }

  // ================================
  // 🔧 Utility Methods
  // ================================

  async initializeFromStorage() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        this.setToken(token);
        
        // Try to validate the token and get expiration info
        try {
          await this.validateToken();
        } catch (error) {
          console.error('Token validation failed:', error);
          this.clearAuth();
        }
      }
    }
  }

  // Create a cancellable request
  createCancellableRequest() {
    const controller = new AbortController();
    return {
      signal: controller.signal,
      cancel: () => controller.abort(),
    };
  }
}

export const apiClient = new ArchivusAPIClient(); 