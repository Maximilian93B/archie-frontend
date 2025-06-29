import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
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
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    }

    // Handle rate limiting
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'] || '60';
      toast.error(`Rate limit exceeded. Please wait ${retryAfter} seconds.`);
    }

    // Handle other errors
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
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
  private async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  private async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  private async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  private async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // ================================
  // 🔐 Authentication Methods
  // ================================

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await this.post<LoginResponse>('/api/v1/auth/login', credentials);
    
    // Store tokens
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.token);
      localStorage.setItem('refresh_token', response.refresh_token);
    }
    this.setToken(response.token);
    
    return response;
  }

  async register(data: RegisterData): Promise<LoginResponse> {
    return this.post<LoginResponse>('/api/v1/auth/register', data);
  }

  async logout(): Promise<void> {
    try {
      await this.post('/api/v1/auth/logout');
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
      this.clearToken();
    }
  }

  async validateToken(): Promise<User> {
    return this.get<User>('/api/v1/auth/validate');
  }

  private async refreshToken(): Promise<boolean> {
    try {
      if (typeof window === 'undefined') return false;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) return false;

      const response = await this.post<LoginResponse>('/api/v1/auth/refresh', {
        refresh_token: refreshToken,
      });

      const { token, refresh_token } = response;
      this.setToken(token);
      localStorage.setItem('access_token', token);
      localStorage.setItem('refresh_token', refresh_token);
      
      return true;
    } catch (error) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
      return false;
    }
  }

  // ================================
  // 📄 Document Methods
  // ================================

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

  async getDocument(id: string): Promise<Document> {
    return this.get<Document>(`/api/v1/documents/${id}`);
  }

  async uploadDocument(
    file: File, 
    options: UploadOptions = {},
    onProgress?: (progress: number) => void
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
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
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

  async deleteDocument(id: string): Promise<void> {
    await this.delete(`/api/v1/documents/${id}`);
  }

  async downloadDocument(id: string): Promise<Blob> {
    const response = await this.client.get(`/api/v1/documents/${id}/download`, {
      responseType: 'blob',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
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
  // 🔧 Utility Methods
  // ================================

  initializeFromStorage() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        this.setToken(token);
      }
    }
  }

  getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }
}

export const apiClient = new ArchivusAPIClient(); 