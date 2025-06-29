# 🏗️ Archivus Backend Context for Frontend Development

## 📊 **Backend Architecture Overview**

### **Core Services Structure**
```
Archivus Backend (Go/Gin)
├── Authentication Service (Supabase Auth + JWT)
├── Document Service (Upload, Management, AI Processing)
├── Enhanced Document Service (AI Workspace Context)
├── Chat Service (Session-based Q&A with Claude)
├── Multi-Document Service (Cross-document analysis)
├── Enhanced Search Service (Hybrid AI search)
├── Analytics Service (Business Intelligence)
├── Workflow Service (Automation engine)
├── User Service (Management & permissions)
├── Tenant Service (Multi-tenancy)
└── Infrastructure Services (Storage, Cache, Database)
```

### **Database Architecture**
- **Primary DB**: PostgreSQL on Supabase
- **Cache Layer**: Redis (Rate limiting, search cache)
- **Storage**: Supabase Storage + Local storage
- **Vector DB**: Integrated with PostgreSQL for AI embeddings

### **AI Integration**
- **Primary AI**: Claude 4 Sonnet by Anthropic
- **Text Extraction**: Multi-format support (PDF, DOC, OCR)
- **Processing**: Async job queue with background workers
- **Embeddings**: Document similarity and semantic search

---

## 🔗 **API Endpoint Mapping**

### **Authentication System**
```typescript
// All endpoints require JWT token except auth routes
const authEndpoints = {
  login: 'POST /api/v1/auth/login',
  logout: 'POST /api/v1/auth/logout', 
  refresh: 'POST /api/v1/auth/refresh',
  register: 'POST /api/v1/auth/register',
  resetPassword: 'POST /api/v1/auth/reset-password',
  validateToken: 'GET /api/v1/auth/validate'
}
```

### **Document Management**
```typescript
const documentEndpoints = {
  // Basic CRUD
  list: 'GET /api/v1/documents',
  upload: 'POST /api/v1/documents/upload',
  get: 'GET /api/v1/documents/:id',
  update: 'PUT /api/v1/documents/:id',
  delete: 'DELETE /api/v1/documents/:id',
  download: 'GET /api/v1/documents/:id/download',
  preview: 'GET /api/v1/documents/:id/preview',
  
  // AI Features
  aiResults: 'GET /api/v1/documents/:id/ai-results',
  summary: 'GET /api/v1/documents/:id/summary',
  jobs: 'GET /api/v1/documents/:id/jobs',
  
  // Enhanced Document Features (AI-Powered)
  enhanced: 'GET /api/v1/documents/enhanced',
  workspaceContext: 'GET /api/v1/documents/workspace-context',
  insights: 'GET /api/v1/documents/insights',
  recommendations: 'GET /api/v1/documents/recommendations',
  
  // Utility
  duplicates: 'GET /api/v1/documents/duplicates',
  expiring: 'GET /api/v1/documents/expiring'
}
```

### **Chat System (Session-Based)**
```typescript
const chatEndpoints = {
  // Session Management
  createSession: 'POST /api/v1/chat/sessions',
  getSessions: 'GET /api/v1/chat/sessions',
  getSession: 'GET /api/v1/chat/sessions/:session_id',
  updateSessionName: 'PUT /api/v1/chat/sessions/:session_id/name',
  deleteSession: 'DELETE /api/v1/chat/sessions/:session_id',
  deactivateSession: 'PUT /api/v1/chat/sessions/:session_id/deactivate',
  
  // Q&A Functionality
  askQuestion: 'POST /api/v1/chat/sessions/:session_id/ask',
  summarizeSession: 'POST /api/v1/chat/sessions/:session_id/summarize',
  
  // Discovery & Search
  getDocumentSessions: 'GET /api/v1/chat/documents/:document_id/sessions',
  searchSessions: 'GET /api/v1/chat/search',
  generateSuggestions: 'POST /api/v1/chat/suggestions',
  
  // Analytics
  getStats: 'GET /api/v1/chat/stats'
}
```

### **Multi-Document Analysis**
```typescript
const multiDocEndpoints = {
  compare: 'POST /api/v1/multi-document/compare',
  ask: 'POST /api/v1/multi-document/ask', 
  analyses: 'GET /api/v1/multi-document/analyses',
  relationships: 'GET /api/v1/documents/:id/relationships'
}
```

### **Enhanced Search**
```typescript
const searchEndpoints = {
  intelligent: 'GET /api/v1/search/intelligent',
  hybrid: 'POST /api/v1/search/hybrid',
  suggestions: 'GET /api/v1/search/suggestions',
  similar: 'GET /api/v1/documents/:id/similar'
}
```

### **Analytics & Business Intelligence**
```typescript
const analyticsEndpoints = {
  dashboard: 'GET /api/v1/analytics/dashboard',
  documents: 'GET /api/v1/analytics/documents',
  users: 'GET /api/v1/analytics/users',
  storage: 'GET /api/v1/analytics/storage',
  compliance: 'GET /api/v1/analytics/compliance',
  financial: 'GET /api/v1/analytics/financial',
  aiProcessing: 'GET /api/v1/analytics/ai-processing',
  
  // Export capabilities
  exportCSV: 'GET /api/v1/analytics/export/csv',
  exportExcel: 'GET /api/v1/analytics/export/xlsx',
  exportPDF: 'GET /api/v1/analytics/export/pdf'
}
```

---

## 🛡️ **Authentication & Security**

### **Authentication Flow**
```typescript
// 1. User logs in via Supabase Auth
const loginFlow = {
  step1: 'POST /api/v1/auth/login -> Returns JWT + Refresh Token',
  step2: 'Store JWT in localStorage/httpOnly cookie',
  step3: 'Include JWT in Authorization header: Bearer <token>',
  step4: 'Auto-refresh token when approaching expiry'
}

// 2. Social Login Support (Configured in Backend)
const socialProviders = ['google', 'github'] // Only Google and GitHub OAuth
```

### **Request Headers**
```typescript
const requiredHeaders = {
  'Authorization': 'Bearer <jwt_token>',
  'Content-Type': 'application/json',
  'X-Tenant': 'optional-tenant-context'
}
```

### **Rate Limiting**
```typescript
const rateLimits = {
  auth: '5 requests/minute',
  upload: '10 requests/hour',
  api: '100 requests/minute', 
  ai: '20 requests/minute',
  public: '20 requests/minute'
}

// Rate limit headers in responses:
// X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset
```

---

## 📊 **Data Models & Schemas**

### **Core Document Model**
```typescript
interface Document {
  id: string;
  title: string;
  filename: string;
  file_path: string;
  content_type: string;
  file_size: number;
  extracted_text?: string;
  summary?: string; // Claude-generated
  document_type: 'contract' | 'invoice' | 'report' | 'email' | 'legal' | 'financial' | 'other';
  confidence_score?: number;
  tenant_id: string;
  user_id: string;
  folder_id?: string;
  ai_processed: boolean;
  embedding_status: 'pending' | 'processing' | 'completed' | 'failed';
  tags: Tag[];
  categories: Category[];
  created_at: string;
  updated_at: string;
}
```

### **Chat Session Model**
```typescript
interface ChatSession {
  id: string;
  document_id: string;
  user_id: string;
  title: string;
  is_active: boolean;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  claude_model: string;
  token_count: number;
  created_at: string;
}
```

### **Multi-Document Analysis Model**
```typescript
interface MultiDocumentAnalysis {
  id: string;
  analysis_type: 'document_comparison' | 'multi_document_qa';
  document_ids: string[];
  user_id: string;
  tenant_id: string;
  question?: string;
  result: Record<string, any>; // Claude's analysis result
  processing_time_ms: number;
  created_at: string;
  updated_at: string;
}
```

### **Search Result Models**
```typescript
interface HybridSearchResult {
  query: string;
  documents: HybridSearchDocument[];
  total: number;
  processing_time_ms: number;
  search_strategies: string[];
}

interface HybridSearchDocument {
  id: string;
  title: string;
  document_type: string;
  summary: string;
  categories: string[];
  relevance_score: number;
  match_reasons: string[];
  created_at: string;
}
```

### **AI Workspace Context Model**
```typescript
interface WorkspaceContext {
  overview: string;
  recent_activity: string;
  recommendations: DocumentRecommendation[];
  document_trends: Record<string, any>;
  processing_time_ms: number;
}

interface DocumentRecommendation {
  type: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}
```

---

## 🚀 **API Usage Patterns**

### **Document Upload with AI Processing**
```typescript
const uploadDocument = async (file: File, options: UploadOptions) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', options.title);
  formData.append('enable_ai', 'true');
  formData.append('enable_ocr', 'false');
  
  const response = await fetch('/api/v1/documents/upload', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  
  return response.json(); // Returns document + ai_processing_job_id
};
```

### **Chat Session Management**
```typescript
// 1. Create session for document
const createChatSession = async (documentId: string, sessionName?: string) => {
  return await apiClient.post('/api/v1/chat/sessions', {
    document_id: documentId,
    session_name: sessionName
  });
};

// 2. Ask question in session
const askQuestion = async (sessionId: string, question: string) => {
  return await apiClient.post(`/api/v1/chat/sessions/${sessionId}/ask`, {
    question
  });
};

// 3. Get session with full message history
const getSession = async (sessionId: string) => {
  return await apiClient.get(`/api/v1/chat/sessions/${sessionId}`);
};
```

### **Enhanced Search Usage**
```typescript
// Intelligent search (simple)
const intelligentSearch = async (query: string, limit = 20) => {
  return await apiClient.get(`/api/v1/search/intelligent?q=${query}&limit=${limit}`);
};

// Hybrid search (advanced)
const hybridSearch = async (params: HybridSearchParams) => {
  return await apiClient.post('/api/v1/search/hybrid', {
    query: params.query,
    enable_full_text_search: true,
    enable_ai_field_search: true,
    enable_semantic_search: false,
    enable_metadata_search: true,
    weights: {
      full_text: 0.3,
      ai_fields: 0.4,
      semantic: 0.2,
      metadata: 0.1
    }
  });
};
```

### **Multi-Document Analysis**
```typescript
// Compare documents
const compareDocuments = async (documentIds: string[], query?: string) => {
  return await apiClient.post('/api/v1/multi-document/compare', {
    document_ids: documentIds,
    query
  });
};

// Ask question across documents
const askMultipleDocuments = async (documentIds: string[], question: string) => {
  return await apiClient.post('/api/v1/multi-document/ask', {
    document_ids: documentIds,
    question
  });
};
```

---

## ⚡ **Performance Considerations**

### **Caching Strategy**
```typescript
const cachingRules = {
  documents: 'Cache for 5 minutes, invalidate on upload',
  chatSessions: 'Cache for 1 minute, invalidate on new message',
  workspaceContext: 'Cache for 5 minutes, invalidate on document changes',
  analytics: 'Cache for 10 minutes, allow stale data',
  search: 'Cache for 30 seconds, short TTL due to dynamic results'
}
```

### **Pagination Patterns**
```typescript
const paginationParams = {
  page: 1,          // 1-based pagination
  page_size: 20,    // Default page size
  sort_by: 'created_at',
  sort_desc: true
}

// Response format:
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
```

### **Error Handling Patterns**
```typescript
interface APIError {
  error: string;
  message: string;
  details?: string;
  timestamp: string;
}

const errorCodes = {
  'unauthorized': 401,
  'forbidden': 403,
  'not_found': 404,
  'validation_error': 422,
  'rate_limit_exceeded': 429,
  'quota_exceeded': 402,
  'document_too_large': 413,
  'unsupported_format': 415
}
```

---

## 🔧 **Development Guidelines**

### **API Client Configuration**
```typescript
const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_ARCHIVUS_API,
  timeout: 30000, // 30 seconds for file uploads
  headers: {
    'Content-Type': 'application/json'
  }
}

// File upload configuration
const uploadConfig = {
  timeout: 300000, // 5 minutes for large files
  headers: {
    // Don't set Content-Type for FormData
  }
}
```

### **State Management Patterns**
```typescript
// Use TanStack Query for server state
const queryKeys = {
  documents: ['documents'],
  documentsList: (filters: any) => ['documents', 'list', filters],
  document: (id: string) => ['documents', id],
  chatSessions: ['chat', 'sessions'],
  chatSession: (id: string) => ['chat', 'sessions', id],
  workspaceContext: ['workspace', 'context'],
  analytics: (period: string) => ['analytics', period]
}

// Use Zustand for client state
interface AppState {
  selectedDocuments: string[];
  activeChatSession: string | null;
  searchFilters: SearchFilters;
  user: User | null;
}
```

---

## 🏗️ **Backend Service Dependencies**

### **Required Environment Variables**
```bash
# Backend expects these from frontend
NEXT_PUBLIC_ARCHIVUS_API=https://your-api.fly.dev
NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# For MFA (if implementing)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
```

### **Health Check Integration**
```typescript
const healthCheck = async () => {
  // Basic health
  const basic = await fetch('/api/v1/health');
  
  // Detailed health (includes Claude AI status)
  const detailed = await fetch('/api/v1/health/detailed');
  
  return {
    status: basic.status === 200,
    services: await detailed.json()
  };
};
```

---

## 🎯 **Integration Checklist**

### **Authentication Integration**
- [ ] Implement Supabase Auth client
- [ ] Handle JWT token management
- [ ] Add automatic token refresh
- [ ] Implement logout functionality
- [ ] Add social login buttons

### **Document Management Integration**
- [ ] File upload with progress tracking
- [ ] Document listing with pagination
- [ ] AI processing status indicators
- [ ] Document viewer/preview
- [ ] Search and filtering

### **Chat System Integration**
- [ ] Session-based chat interface
- [ ] Message history persistence
- [ ] Real-time chat updates
- [ ] Session management UI
- [ ] Chat analytics

### **Advanced Features Integration**
- [ ] Multi-document analysis UI
- [ ] Hybrid search interface
- [ ] AI workspace context display
- [ ] Analytics dashboard
- [ ] Export functionality

---

**📚 This context file ensures your frontend development aligns perfectly with the actual Archivus backend capabilities!** 