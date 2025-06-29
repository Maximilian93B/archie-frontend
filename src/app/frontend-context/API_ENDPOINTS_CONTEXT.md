# 🎯 **Archivus API Endpoints Context - Definitive Frontend Guide**

> **🚨 CRITICAL**: This is the authoritative API reference for frontend development. Your backend has significantly more capabilities than the original documentation suggested.

## 📊 **Backend Capability Summary**

Your Archivus backend currently implements **85+ API endpoints** across **9 major feature areas**:

```
✅ Authentication System (8 endpoints)
✅ Document Management (15 endpoints) 
✅ AI-Powered Chat System (11 endpoints)
✅ Multi-Document Analysis (4 endpoints)
✅ Enhanced Search System (4 endpoints)
✅ Analytics & BI (9 endpoints)
✅ User Management (10 endpoints)
✅ Folder/Category/Tag Management (18 endpoints)
✅ Workflow Automation (12 endpoints)
```

---

## 🔐 **Authentication & Security**

### **Base Configuration**
```typescript
const API_BASE = process.env.NEXT_PUBLIC_ARCHIVUS_API || 'http://localhost:8080'
const API_VERSION = '/api/v1'

// Required Headers for All Requests
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`, // JWT from login
  'X-Tenant-Subdomain': tenantId // Multi-tenant isolation
}
```

### **Authentication Endpoints** ✅ **8 Endpoints**
```typescript
const authEndpoints = {
  // Core Auth Flow
  register: 'POST /api/v1/auth/register',
  login: 'POST /api/v1/auth/login',
  logout: 'POST /api/v1/auth/logout',
  refresh: 'POST /api/v1/auth/refresh',
  validate: 'GET /api/v1/auth/validate',
  
  // Password Management
  resetPassword: 'POST /api/v1/auth/reset-password',
  
  // Webhooks & Admin
  webhook: 'POST /api/v1/auth/webhook',
  adminCreateUser: 'POST /api/v1/auth/admin/create-verified-user'
}
```

### **Request/Response Examples**
```typescript
// Login Request
const loginRequest = {
  email: "user@company.com",
  password: "securePassword123"
}

// Login Response
const loginResponse = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  refresh_token: "refresh_token_here",
  user: {
    id: "uuid",
    email: "user@company.com",
    first_name: "John",
    last_name: "Doe",
    role: "user",
    tenant_id: "uuid"
  },
  expires_in: 3600
}
```

---

## 📄 **Document Management System**

### **Document Endpoints** ✅ **15 Endpoints**
```typescript
const documentEndpoints = {
  // Basic CRUD Operations
  upload: 'POST /api/v1/documents/upload',
  list: 'GET /api/v1/documents',
  get: 'GET /api/v1/documents/:id',
  update: 'PUT /api/v1/documents/:id',
  delete: 'DELETE /api/v1/documents/:id',
  
  // File Operations
  download: 'GET /api/v1/documents/:id/download',
  preview: 'GET /api/v1/documents/:id/preview',
  
  // AI-Powered Features
  aiResults: 'GET /api/v1/documents/:id/ai-results',
  summary: 'GET /api/v1/documents/:id/summary',
  jobs: 'GET /api/v1/documents/:id/jobs',
  processFinancial: 'POST /api/v1/documents/:id/process-financial',
  
  // Enhanced Document Features (AI-Powered Listing)
  enhanced: 'GET /api/v1/documents/enhanced',
  workspaceContext: 'GET /api/v1/documents/workspace-context',
  insights: 'GET /api/v1/documents/insights',
  recommendations: 'GET /api/v1/documents/recommendations',
  
  // Utility Operations
  search: 'GET /api/v1/documents/search',
  duplicates: 'GET /api/v1/documents/duplicates',
  expiring: 'GET /api/v1/documents/expiring'
}
```

### **Upload Implementation** 
```typescript
// Multi-part form upload with AI processing
const uploadDocument = async (file: File, options: UploadOptions) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', options.title || file.name);
  formData.append('enable_ai', String(options.enableAI ?? true));
  formData.append('enable_ocr', String(options.enableOCR ?? false));
  formData.append('folder_id', options.folderId || '');
  
  const response = await fetch(`${API_BASE}${API_VERSION}/documents/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-Tenant-Subdomain': tenantId
      // Don't set Content-Type for FormData
    },
    body: formData
  });
  
  return response.json();
}
```

### **Enhanced Document Listing** 🆕
```typescript
// AI-powered document listing with workspace context
const getEnhancedDocuments = async (params: {
  include_context?: boolean;
  page?: number;
  page_size?: number;
  folder_id?: string;
  document_type?: string;
  status?: string;
}) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) searchParams.append(key, String(value));
  });
  
  return fetch(`${API_BASE}${API_VERSION}/documents/enhanced?${searchParams}`, {
    headers: { ...authHeaders }
  }).then(res => res.json());
}

// Response includes AI workspace context
const enhancedResponse = {
  documents: [...], // Regular document array
  total: 150,
  page: 1,
  page_size: 20,
  total_pages: 8,
  workspace_context: {
    overview: "AI-generated workspace overview",
    recent_activity: "Summary of recent activity", 
    recommendations: [
      {
        type: "optimization",
        description: "Consider organizing documents by date",
        priority: "medium"
      }
    ],
    document_trends: { /* AI analysis */ },
    processing_time_ms: 245
  },
  ai_enhanced: true
}
```

---

## 💬 **Chat System - Session-Based Architecture**

### **Chat Endpoints** ✅ **11 Endpoints**
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

### **Chat Implementation Pattern**
```typescript
// 1. Create Chat Session
const createChatSession = async (documentId: string, sessionName?: string) => {
  return fetch(`${API_BASE}${API_VERSION}/chat/sessions`, {
    method: 'POST',
    headers: { ...authHeaders },
    body: JSON.stringify({ 
      document_id: documentId,
      session_name: sessionName 
    })
  }).then(res => res.json());
}

// 2. Ask Questions in Session
const askQuestion = async (sessionId: string, question: string) => {
  return fetch(`${API_BASE}${API_VERSION}/chat/sessions/${sessionId}/ask`, {
    method: 'POST',
    headers: { ...authHeaders },
    body: JSON.stringify({ question })
  }).then(res => res.json());
}

// Response includes Claude AI analysis
const chatResponse = {
  session_id: "uuid",
  message: {
    id: "uuid",
    role: "assistant",
    content: "Claude's response to your question...",
    claude_model: "claude-sonnet-4-20250514",
    token_count: 150,
    created_at: "2024-01-15T10:30:00Z"
  },
  claude_model_used: "claude-sonnet-4-20250514",
  token_usage: {
    input_tokens: 100,
    output_tokens: 150,
    total_tokens: 250
  }
}
```

---

## 🔍 **Enhanced Search System**

### **Search Endpoints** ✅ **4 Endpoints**
```typescript
const searchEndpoints = {
  intelligent: 'GET /api/v1/search/intelligent',
  hybrid: 'POST /api/v1/search/hybrid',
  suggestions: 'GET /api/v1/search/suggestions',
  similar: 'GET /api/v1/documents/:id/similar'
}
```

### **Intelligent Search**
```typescript
const intelligentSearch = async (query: string, limit = 20) => {
  const params = new URLSearchParams({ q: query, limit: String(limit) });
  return fetch(`${API_BASE}${API_VERSION}/search/intelligent?${params}`, {
    headers: { ...authHeaders }
  }).then(res => res.json());
}

// Response with AI-enhanced results
const intelligentSearchResponse = {
  query: "contract terms payment",
  documents: [
    {
      id: "uuid",
      title: "Service Agreement 2024",
      document_type: "contract",
      summary: "AI-generated summary...",
      categories: ["legal", "contracts"],
      relevance_score: 0.95,
      match_reason: "Contains payment terms and contract clauses",
      created_at: "2024-01-15T10:30:00Z"
    }
  ],
  total: 25,
  processing_time_ms: 156
}
```

### **Hybrid Search (Advanced)**
```typescript
const hybridSearch = async (searchRequest: {
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
  document_types?: string[];
  date_from?: string;
  date_to?: string;
  candidate_limit?: number;
  limit?: number;
}) => {
  return fetch(`${API_BASE}${API_VERSION}/search/hybrid`, {
    method: 'POST',
    headers: { ...authHeaders },
    body: JSON.stringify(searchRequest)
  }).then(res => res.json());
}

// Advanced search response
const hybridSearchResponse = {
  query: "financial report Q4",
  documents: [...],
  total: 45,
  processing_time_ms: 234,
  search_strategies: ["full_text", "ai_fields", "semantic"]
}
```

---

## 🔀 **Multi-Document Analysis**

### **Multi-Document Endpoints** ✅ **4 Endpoints**
```typescript
const multiDocEndpoints = {
  compare: 'POST /api/v1/multi-document/compare',
  ask: 'POST /api/v1/multi-document/ask',
  analyses: 'GET /api/v1/multi-document/analyses',
  relationships: 'GET /api/v1/documents/:id/relationships'
}
```

### **Document Comparison**
```typescript
const compareDocuments = async (documentIds: string[], query?: string) => {
  return fetch(`${API_BASE}${API_VERSION}/multi-document/compare`, {
    method: 'POST',
    headers: { ...authHeaders },
    body: JSON.stringify({ 
      document_ids: documentIds,
      query: query || "Compare these documents comprehensively",
      comparison_type: "full"
    })
  }).then(res => res.json());
}

// Comparison response with Claude analysis
const comparisonResponse = {
  analysis_id: "uuid",
  analysis_type: "document_comparison",
  document_ids: ["uuid1", "uuid2", "uuid3"],
  comparison_result: {
    summary: "Claude's comparative analysis...",
    key_findings: [...],
    similarities: [
      {
        aspect: "Payment Terms",
        description: "All documents specify 30-day payment terms",
        confidence: 0.95
      }
    ],
    differences: [
      {
        aspect: "Jurisdiction",
        document_id: "uuid1", 
        description: "Specifies California jurisdiction vs others"
      }
    ]
  },
  processing_time_ms: 1250,
  created_at: "2024-01-15T10:30:00Z"
}
```

### **Multi-Document Q&A**
```typescript
const askMultipleDocuments = async (documentIds: string[], question: string) => {
  return fetch(`${API_BASE}${API_VERSION}/multi-document/ask`, {
    method: 'POST',
    headers: { ...authHeaders },
    body: JSON.stringify({ 
      document_ids: documentIds,
      question: question
    })
  }).then(res => res.json());
}

// Multi-doc Q&A response
const multiDocQAResponse = {
  analysis_id: "uuid",
  analysis_type: "multi_document_qa",
  question: "What are the common payment terms across these contracts?",
  answer: "Based on analysis of the provided documents, the common payment terms are...",
  document_ids: ["uuid1", "uuid2", "uuid3"],
  sources: [
    {
      document_id: "uuid1",
      document_title: "Service Agreement A",
      relevance_score: 0.92,
      excerpt: "Payment terms excerpt..."
    }
  ],
  claude_model_used: "claude-sonnet-4-20250514",
  processing_time_ms: 1850,
  token_usage: {
    input_tokens: 2500,
    output_tokens: 350,
    total_tokens: 2850
  }
}
```

---

## 📊 **Analytics & Business Intelligence**

### **Analytics Endpoints** ✅ **9 Endpoints**
```typescript
const analyticsEndpoints = {
  // Core Analytics
  dashboard: 'GET /api/v1/analytics/dashboard',
  documents: 'GET /api/v1/analytics/documents',
  users: 'GET /api/v1/analytics/users',
  storage: 'GET /api/v1/analytics/storage',
  compliance: 'GET /api/v1/analytics/compliance',
  financial: 'GET /api/v1/analytics/financial',
  aiProcessing: 'GET /api/v1/analytics/ai-processing',
  
  // Export Capabilities
  exportCSV: 'GET /api/v1/analytics/export/csv',
  exportExcel: 'GET /api/v1/analytics/export/xlsx',
  exportPDF: 'GET /api/v1/analytics/export/pdf'
}
```

### **Dashboard Analytics**
```typescript
const getDashboardAnalytics = async (period: 'day' | 'week' | 'month' | 'quarter' | 'year' = 'month') => {
  const params = new URLSearchParams({ period });
  return fetch(`${API_BASE}${API_VERSION}/analytics/dashboard?${params}`, {
    headers: { ...authHeaders }
  }).then(res => res.json());
}

// Comprehensive dashboard response
const dashboardResponse = {
  period: "month",
  document_stats: {
    total_documents: 1250,
    documents_uploaded_this_period: 85,
    ai_processed_documents: 1100,
    processing_success_rate: 0.96,
    avg_processing_time_ms: 2340
  },
  user_activity: {
    active_users: 45,
    total_sessions: 320,
    avg_session_duration_minutes: 25
  },
  storage_usage: {
    total_storage_gb: 125.6,
    storage_growth_gb: 8.2,
    storage_by_type: {
      "pdf": 85.2,
      "docx": 25.4,
      "images": 15.0
    }
  },
  ai_processing_stats: {
    total_jobs: 850,
    successful_jobs: 816,
    avg_processing_time_ms: 2340,
    claude_api_calls: 1250,
    tokens_used: 125000
  },
  processing_time_ms: 125
}
```

---

## 👥 **User & Tenant Management**

### **User Management Endpoints** ✅ **10 Endpoints**
```typescript
const userEndpoints = {
  // Profile Management
  getProfile: 'GET /api/v1/users/profile',
  updateProfile: 'PUT /api/v1/users/profile',
  changePassword: 'POST /api/v1/users/change-password',
  
  // Admin User Management
  listUsers: 'GET /api/v1/users',
  createUser: 'POST /api/v1/users',
  updateUser: 'PUT /api/v1/users/:id',
  deleteUser: 'DELETE /api/v1/users/:id',
  updateUserRole: 'PUT /api/v1/users/:id/role',
  activateUser: 'PUT /api/v1/users/:id/activate',
  deactivateUser: 'PUT /api/v1/users/:id/deactivate'
}
```

---

## 🗂️ **Folder, Category & Tag Management**

### **Organization Endpoints** ✅ **18 Total Endpoints**

#### **Folders (6 endpoints)**
```typescript
const folderEndpoints = {
  create: 'POST /api/v1/folders',
  list: 'GET /api/v1/folders',
  get: 'GET /api/v1/folders/:id',
  update: 'PUT /api/v1/folders/:id',
  delete: 'DELETE /api/v1/folders/:id',
  getDocuments: 'GET /api/v1/folders/:id/documents'
}
```

#### **Tags (6 endpoints)**
```typescript
const tagEndpoints = {
  create: 'POST /api/v1/tags',
  list: 'GET /api/v1/tags',
  get: 'GET /api/v1/tags/:id',
  update: 'PUT /api/v1/tags/:id',
  delete: 'DELETE /api/v1/tags/:id',
  popular: 'GET /api/v1/tags/popular',
  suggestions: 'GET /api/v1/tags/suggestions'
}
```

#### **Categories (6 endpoints)**
```typescript
const categoryEndpoints = {
  create: 'POST /api/v1/categories',
  list: 'GET /api/v1/categories',
  get: 'GET /api/v1/categories/:id',
  update: 'PUT /api/v1/categories/:id', 
  delete: 'DELETE /api/v1/categories/:id',
  system: 'GET /api/v1/categories/system'
}
```

---

## ⚙️ **Workflow Automation**

### **Workflow Endpoints** ✅ **12 Endpoints**
```typescript
const workflowEndpoints = {
  // Workflow Management
  create: 'POST /api/v1/workflows',
  list: 'GET /api/v1/workflows',
  get: 'GET /api/v1/workflows/:workflow_id',
  update: 'PUT /api/v1/workflows/:workflow_id',
  delete: 'DELETE /api/v1/workflows/:workflow_id',
  
  // Workflow Execution
  trigger: 'POST /api/v1/workflows/trigger/:document_id',
  getDocumentWorkflow: 'GET /api/v1/workflows/document/:document_id',
  
  // Task Management
  getUserTasks: 'GET /api/v1/tasks',
  getPendingTasks: 'GET /api/v1/tasks/pending',
  getOverdueTasks: 'GET /api/v1/tasks/overdue',
  completeTask: 'POST /api/v1/tasks/:task_id/complete',
  delegateTask: 'POST /api/v1/tasks/:task_id/delegate',
  
  // Analytics
  getStats: 'GET /api/v1/workflows/stats'
}
```

---

## 🚦 **Rate Limiting & Error Handling**

### **Rate Limits by Endpoint Type**
```typescript
const rateLimits = {
  auth: '5 requests/minute',
  upload: '10 requests/hour',
  api: '100 requests/minute', 
  ai: '20 requests/minute (Claude)',
  public: '20 requests/minute'
}

// Rate limit headers in responses
const rateLimitHeaders = {
  'X-RateLimit-Limit': '100',
  'X-RateLimit-Remaining': '45', 
  'X-RateLimit-Reset': '1672531200',
  'X-RateLimit-Window': '60s',
  'Retry-After': '45' // On 429 errors
}
```

### **Error Response Format**
```typescript
// Standard error response
const errorResponse = {
  error: "validation_error",
  message: "Request validation failed",
  details: "Invalid document ID format",
  timestamp: "2024-01-15T10:30:00Z"
}

// Rate limit error
const rateLimitError = {
  error: "rate_limit_exceeded", 
  message: "Too many requests. Limit: 20 per 60s",
  retry_after: 45,
  timestamp: "2024-01-15T10:30:00Z"
}
```

---

## 🛡️ **Multi-Tenant Architecture**

### **Tenant Isolation**
```typescript
// All requests must include tenant context
const tenantHeaders = {
  'X-Tenant-Subdomain': 'company-name', // Required for multi-tenant isolation
  'Authorization': 'Bearer jwt-token'
}

// Tenant-specific data isolation
const tenantResponse = {
  user: {
    id: "uuid",
    tenant_id: "uuid", // All data is tenant-scoped
    role: "user"
  },
  tenant: {
    id: "uuid", 
    name: "Company Name",
    subdomain: "company-name",
    settings: { /* tenant configuration */ }
  }
}
```

---

## 🎯 **Implementation Priorities for Frontend**

### **Phase 1: Core Features (Essential)**
```typescript
const phase1APIs = [
  'Authentication flow',
  'Document upload/list/view',
  'Basic search',
  'User profile management'
]
```

### **Phase 2: AI Features (High Value)**
```typescript
const phase2APIs = [
  'Chat system with sessions',
  'AI document analysis',
  'Enhanced document listing',
  'Intelligent search'
]
```

### **Phase 3: Advanced Features (Power Users)**
```typescript
const phase3APIs = [
  'Multi-document analysis',
  'Analytics dashboard',
  'Workflow automation',
  'Advanced search with hybrid strategies'
]
```

---

## ⚡ **Quick Integration Examples**

### **Complete API Client Setup**
```typescript
// lib/api-client.ts
class ArchivusAPIClient {
  private baseURL: string;
  private token: string | null = null;
  private tenantId: string | null = null;

  constructor() {
    this.baseURL = `${process.env.NEXT_PUBLIC_ARCHIVUS_API}/api/v1`;
  }

  setAuth(token: string, tenantId: string) {
    this.token = token;
    this.tenantId = tenantId;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
        ...(this.tenantId && { 'X-Tenant-Subdomain': this.tenantId }),
        ...options.headers
      }
    });

    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      throw new Error(`Rate limited. Retry after ${retryAfter} seconds`);
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  // Documents 
  async uploadDocument(file: File, options: any = {}) {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(options).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    return this.request('/documents/upload', {
      method: 'POST',
      body: formData,
      headers: {} // Don't set Content-Type for FormData
    });
  }

  // Chat
  async createChatSession(documentId: string, sessionName?: string) {
    return this.request('/chat/sessions', {
      method: 'POST',
      body: JSON.stringify({ document_id: documentId, session_name: sessionName })
    });
  }

  async askQuestion(sessionId: string, question: string) {
    return this.request(`/chat/sessions/${sessionId}/ask`, {
      method: 'POST',
      body: JSON.stringify({ question })
    });
  }

  // Multi-document analysis
  async compareDocuments(documentIds: string[], query?: string) {
    return this.request('/multi-document/compare', {
      method: 'POST',
      body: JSON.stringify({ document_ids: documentIds, query })
    });
  }

  // Analytics
  async getDashboard(period = 'month') {
    return this.request(`/analytics/dashboard?period=${period}`);
  }
}

export const apiClient = new ArchivusAPIClient();
```

---

## ✅ **Frontend Development Checklist**

### **Essential Setup**
- [ ] Configure API client with proper authentication
- [ ] Implement multi-tenant header support
- [ ] Setup rate limiting error handling
- [ ] Configure TypeScript types from provided definitions

### **Authentication Flow**
- [ ] Implement login/logout with JWT handling
- [ ] Setup automatic token refresh
- [ ] Handle authentication errors gracefully  
- [ ] Store tenant context securely

### **Document Management**
- [ ] Implement file upload with progress tracking
- [ ] Build document listing with pagination
- [ ] Add search functionality (intelligent + hybrid)
- [ ] Display AI analysis results

### **Advanced Features**
- [ ] Build chat interface with session management
- [ ] Implement multi-document analysis UI
- [ ] Create analytics dashboard
- [ ] Add workflow management interface

---

**🎉 Your backend supports all these capabilities! Build an amazing frontend that leverages the full power of your Archivus system.** 