# Archivus API Context for Frontend Development

## Table of Contents
1. [Authentication](#authentication)
2. [Common Response Structures](#common-response-structures)
3. [Document Management APIs](#document-management-apis)
4. [AI & Processing APIs](#ai--processing-apis)
5. [Search & Discovery APIs](#search--discovery-apis)
6. [User & Organization APIs](#user--organization-apis)
7. [Subscription & Billing APIs](#subscription--billing-apis)
8. [Error Handling](#error-handling)
9. [WebSocket Events (Planned)](#websocket-events-planned)
10. [Rate Limiting](#rate-limiting)

## Authentication

### Headers Required
```typescript
headers: {
  'Authorization': 'Bearer <jwt_token>',
  'X-Tenant-Subdomain': 'organization-name', // Optional for org context
  'Content-Type': 'application/json' // For JSON requests
}
```

### JWT Token Structure
```typescript
interface JWTPayload {
  sub: string;          // User ID
  email: string;
  tenant_id: string;    // Organization/Personal tenant ID
  role: UserRole;
  exp: number;          // Expiration timestamp
  iat: number;          // Issued at timestamp
}

type UserRole = 'admin' | 'manager' | 'user' | 'viewer';
```

## Common Response Structures

### Pagination
```typescript
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
```

### Error Response
```typescript
interface ErrorResponse {
  error: string;       // Error code (e.g., 'unauthorized', 'not_found')
  message: string;     // Human-readable message
  details?: string;    // Additional details (development mode only)
}
```

### Success Response
```typescript
interface SuccessResponse {
  message: string;
  data?: any;
}
```

## Document Management APIs

### 1. Upload Document
```typescript
// POST /api/v1/documents/upload
// Content-Type: multipart/form-data

interface UploadRequest {
  file: File;                    // Required
  title?: string;
  description?: string;
  folder_id?: string;
  document_type?: DocumentType;
  tags?: string[];
  categories?: string[];
  enable_ai?: boolean;           // Default: true
  enable_ocr?: boolean;          // Default: true
  skip_duplicate_check?: boolean;
  
  // Financial fields
  amount?: number;
  currency?: string;
  tax_amount?: number;
  vendor_name?: string;
  customer_name?: string;
  document_date?: string;        // ISO 8601
  due_date?: string;            // ISO 8601
}

interface DocumentResponse {
  id: string;
  tenant_id: string;
  folder_id?: string;
  
  // File info
  file_name: string;
  original_name: string;
  content_type: string;
  file_size: number;
  storage_path: string;
  thumbnail_path?: string;
  preview_path?: string;
  
  // Content
  extracted_text?: string;
  normalized_text?: string;
  content_hash: string;
  summary?: string;
  ai_confidence?: number;
  
  // Text extraction details
  text_extraction_status: 'pending' | 'completed' | 'failed';
  text_extraction_error?: string;
  text_extraction_method?: string;
  text_quality?: number;
  text_language?: string;
  text_word_count: number;
  text_char_count: number;
  text_extraction_time_ms: number;
  text_extracted_at?: string;
  
  // AI fields
  ai_summary?: string;
  ai_key_points?: Record<string, any>;
  ai_entities?: Record<string, any>;
  ai_categories?: string[];
  ai_confidence_score?: number;
  ai_processed_at?: string;
  
  // Metadata
  title: string;
  description?: string;
  document_type: DocumentType;
  status: DocumentStatus;
  version: number;
  language: string;
  
  // Business fields
  document_number?: string;
  reference_number?: string;
  external_id?: string;
  
  // Financial data
  amount?: number;
  currency?: string;
  tax_amount?: number;
  vendor_name?: string;
  customer_name?: string;
  
  // Dates
  document_date?: string;
  due_date?: string;
  expiry_date?: string;
  
  // Compliance
  compliance_status: ComplianceStatus;
  retention_date?: string;
  legal_hold: boolean;
  
  // Custom data
  extracted_data?: Record<string, any>;
  custom_fields?: Record<string, any>;
  
  // System fields
  created_by: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
  
  // Relationships
  permissions: DocumentPermissions;
  tags?: Tag[];
  categories?: Category[];
}

interface DocumentPermissions {
  read: boolean;
  update: boolean;
  delete: boolean;
  share: boolean;
}
```

### 2. List Documents
```typescript
// GET /api/v1/documents
// Query params: page, page_size, sort_by, sort_desc, search, folder_id, document_type, status

interface ListDocumentsParams {
  page?: number;              // Default: 1
  page_size?: number;         // Default: 20
  sort_by?: string;          // Default: 'created_at'
  sort_desc?: boolean;       // Default: true
  search?: string;
  folder_id?: string;
  document_type?: DocumentType;
  status?: DocumentStatus;
}

// Response: PaginatedResponse<DocumentResponse>
```

### 3. Get Document
```typescript
// GET /api/v1/documents/:id

// Response: DocumentResponse
```

### 4. Update Document
```typescript
// PUT /api/v1/documents/:id

interface UpdateDocumentRequest {
  title?: string;
  description?: string;
  document_type?: DocumentType;
  tags?: string[];
  categories?: string[];
  custom_fields?: Record<string, any>;
  
  // Financial fields
  amount?: number;
  vendor_name?: string;
  customer_name?: string;
}

// Response: DocumentResponse
```

### 5. Delete Document
```typescript
// DELETE /api/v1/documents/:id

// Response: 204 No Content
```

### 6. Download Document
```typescript
// GET /api/v1/documents/:id/download

// Response: Binary file stream
// Headers:
// - Content-Disposition: attachment; filename="document.pdf"
// - Content-Type: application/pdf
// - Content-Length: 12345
```

### 7. Document Processing Status
```typescript
// GET /api/v1/documents/:id/processing-status

interface ProcessingStatusResponse {
  document_id: string;
  document_name: string;
  status: string;
  
  processing_steps: {
    text_extraction: {
      status: 'pending' | 'completed' | 'failed';
      method?: string;
      char_count: number;
      word_count: number;
      quality: number;
      language?: string;
      extracted_at?: string;
      error?: string;
    };
    
    ocr?: {
      status: string;
      confidence?: number;
      provider?: string;
    };
    
    ai_analysis: {
      status: 'pending' | 'processing' | 'partial' | 'completed';
      summary_generated: boolean;
      entities_extracted: boolean;
      classification_complete: boolean;
      tags_generated: boolean;
      processed_at?: string;
      pending_jobs?: Array<{
        job_type: string;
        status: string;
        priority: number;
        queued_at: string;
      }>;
    };
  };
  
  supported_operations: string[];
  
  processing_metrics?: {
    total_processing_time_ms: number;
    text_extraction_time_ms: number;
    ai_processing_time_ms: number;
  };
}
```

### 8. Batch Processing Status
```typescript
// POST /api/v1/documents/batch-status

interface BatchStatusRequest {
  document_ids: string[];  // Max 100
}

interface BatchStatusResponse {
  statuses: {
    [document_id: string]: ProcessingStatusResponse | { error: string };
  };
}
```

## AI & Processing APIs

### 1. Get AI Results
```typescript
// GET /api/v1/documents/:id/ai-results

interface AIResultsResponse {
  document_id: string;
  summary?: string;
  entities?: Record<string, any>;
  classification?: {
    type: DocumentType;
    confidence: number;
    reasoning?: string;
  };
  tags?: string[];
  processed_at?: string;
  has_results: boolean;
}
```

### 2. Get Document Summary
```typescript
// GET /api/v1/documents/:id/summary

interface DocumentSummaryResponse {
  document_id: string;
  document_name: string;
  document_type?: string;
  summary?: string;
  key_points?: Record<string, any>;
  has_summary: boolean;
  source?: 'ai' | 'basic';
  processed_at?: string;
  confidence_score?: number;
}
```

### 3. Multi-Document Analysis
```typescript
// POST /api/v1/multi-documents/analyze

interface MultiDocumentAnalysisRequest {
  document_ids: string[];
  analysis_type: 'compare' | 'summarize' | 'extract' | 'relationships';
  options?: {
    max_results?: number;
    focus_areas?: string[];
  };
}

interface MultiDocumentAnalysisResponse {
  analysis_id: string;
  document_count: number;
  analysis_type: string;
  results: {
    summary?: string;
    comparisons?: Array<{
      doc1_id: string;
      doc2_id: string;
      similarities: string[];
      differences: string[];
      score: number;
    }>;
    relationships?: Array<{
      source_id: string;
      target_id: string;
      relationship_type: string;
      confidence: number;
    }>;
    insights?: string[];
  };
  processing_time_ms: number;
  created_at: string;
}
```

### 4. Document Chat
```typescript
// POST /api/v1/chat/sessions

interface CreateChatSessionRequest {
  document_ids: string[];
  title?: string;
}

interface ChatSessionResponse {
  id: string;
  tenant_id: string;
  user_id: string;
  title: string;
  document_ids: string[];
  created_at: string;
  updated_at: string;
}

// POST /api/v1/chat/sessions/:id/messages

interface SendMessageRequest {
  message: string;
  context?: Record<string, any>;
}

interface ChatMessageResponse {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  metadata?: {
    sources?: Array<{
      document_id: string;
      page?: number;
      relevance_score: number;
    }>;
    confidence?: number;
  };
  created_at: string;
}
```

## Search & Discovery APIs

### 1. Search Documents
```typescript
// POST /api/v1/search

interface SearchRequest {
  query: string;
  document_types?: DocumentType[];
  folder_ids?: string[];
  tag_ids?: string[];
  date_from?: string;
  date_to?: string;
  fuzzy?: boolean;
  limit?: number;        // Default: 50
  page?: number;
  page_size?: number;
}

// Response: Array<DocumentResponse>
```

### 2. Enhanced Search
```typescript
// POST /api/v1/search/enhanced

interface EnhancedSearchRequest extends SearchRequest {
  use_semantic?: boolean;
  include_content?: boolean;
  highlight?: boolean;
}

interface EnhancedSearchResponse {
  results: Array<{
    document: DocumentResponse;
    score: number;
    highlights?: string[];
    relevance_explanation?: string;
  }>;
  total_results: number;
  search_metadata: {
    query_expansion?: string[];
    semantic_used: boolean;
    processing_time_ms: number;
  };
}
```

### 3. Search Suggestions
```typescript
// GET /api/v1/search/suggestions?q=query

interface SearchSuggestionsResponse {
  suggestions: Array<{
    text: string;
    type: 'query' | 'document' | 'tag' | 'category';
    score: number;
  }>;
}
```

## User & Organization APIs

### 1. Get Current User
```typescript
// GET /api/v1/users/me

interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenant_id: string;
  avatar_url?: string;
  phone?: string;
  is_email_verified: boolean;
  is_mfa_enabled: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}
```

### 2. Update User Profile
```typescript
// PUT /api/v1/users/me

interface UpdateUserRequest {
  name?: string;
  phone?: string;
  avatar_url?: string;
}

// Response: UserResponse
```

### 3. Get Organization/Tenant Info
```typescript
// GET /api/v1/tenants/current

interface TenantResponse {
  id: string;
  name: string;
  subdomain: string;
  logo_url?: string;
  industry?: string;
  company_size?: string;
  subscription_tier: SubscriptionTier;
  is_active: boolean;
  
  usage: {
    documents_count: number;
    storage_used: number;
    ai_credits_used: number;
    users_count: number;
  };
  
  limits: {
    max_documents: number;
    max_storage: number;
    max_ai_credits: number;
    max_users: number;
  };
  
  created_at: string;
  updated_at: string;
}
```

## Subscription & Billing APIs

### 1. Get Current Subscription
```typescript
// GET /api/v1/subscriptions/current

interface SubscriptionResponse {
  id: string;
  tenant_id: string;
  stripe_customer_id: string;
  stripe_subscription_id?: string;
  tier: SubscriptionTier;
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  trial_end?: string;
  
  features: {
    max_documents: number;
    max_storage_gb: number;
    ai_credits_monthly: number;
    max_users: number;
    api_access: boolean;
    custom_workflows: boolean;
    premium_support: boolean;
  };
}

type SubscriptionTier = 'individual' | 'starter' | 'professional' | 'enterprise';
```

### 2. Create Checkout Session
```typescript
// POST /api/v1/subscriptions/checkout

interface CreateCheckoutRequest {
  tier: SubscriptionTier;
  success_url: string;
  cancel_url: string;
}

interface CheckoutSessionResponse {
  checkout_url: string;
  session_id: string;
}
```

### 3. Manage Subscription
```typescript
// POST /api/v1/subscriptions/portal

interface PortalSessionRequest {
  return_url: string;
}

interface PortalSessionResponse {
  portal_url: string;
}
```

## Error Handling

### HTTP Status Codes
```typescript
enum HttpStatus {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  PayloadTooLarge = 413,
  UnsupportedMediaType = 415,
  TooManyRequests = 429,
  InternalServerError = 500,
  ServiceUnavailable = 503
}
```

### Common Error Codes
```typescript
type ErrorCode = 
  // Authentication
  | 'unauthorized'
  | 'invalid_token'
  | 'token_expired'
  | 'mfa_required'
  
  // Validation
  | 'invalid_request'
  | 'validation_failed'
  | 'invalid_file_type'
  | 'file_too_large'
  
  // Resources
  | 'not_found'
  | 'document_not_found'
  | 'access_denied'
  | 'permission_denied'
  
  // Limits
  | 'rate_limit_exceeded'
  | 'quota_exceeded'
  | 'storage_limit_exceeded'
  
  // Processing
  | 'processing_failed'
  | 'ai_service_unavailable'
  | 'ocr_failed'
  
  // Business
  | 'subscription_required'
  | 'payment_failed'
  | 'trial_expired';
```

## WebSocket Events (Planned)

```typescript
// WebSocket endpoint: wss://api.archivus.io/ws

interface WebSocketMessage {
  event: EventType;
  data: any;
  timestamp: string;
}

type EventType = 
  | 'document.uploaded'
  | 'document.processing_started'
  | 'document.processing_completed'
  | 'document.ai_results_ready'
  | 'document.deleted'
  | 'chat.message_received'
  | 'notification.new';

// Example: Document processing completed
interface DocumentProcessingEvent {
  event: 'document.processing_completed';
  data: {
    document_id: string;
    status: 'success' | 'partial' | 'failed';
    results: {
      text_extracted: boolean;
      ai_processed: boolean;
      ocr_completed?: boolean;
    };
  };
}
```

## Rate Limiting

### Rate Limit Headers
```typescript
headers: {
  'X-RateLimit-Limit': '1000',      // Requests per window
  'X-RateLimit-Remaining': '999',   // Remaining requests
  'X-RateLimit-Reset': '1640995200' // Unix timestamp when limit resets
}
```

### Rate Limit Tiers
```typescript
interface RateLimits {
  auth: {
    window: '1m';
    limit: 30;
  };
  upload: {
    window: '5m';
    limit: 50;
  };
  api: {
    window: '1m';
    limit: 1000;
  };
  ai: {
    window: '1m';
    limit: 100;
  };
  public: {
    window: '1m';
    limit: 500;
  };
}
```

## Type Definitions

```typescript
type DocumentType = 
  | 'invoice' | 'receipt' | 'contract' | 'spreadsheet' 
  | 'presentation' | 'report' | 'tax_document' | 'payroll'
  | 'bank_statement' | 'insurance' | 'legal' | 'hr'
  | 'marketing' | 'email' | 'image' | 'general';

type DocumentStatus = 
  | 'pending' | 'processing' | 'completed' | 'error' 
  | 'archived' | 'expired' | 'under_review';

type ComplianceStatus = 
  | 'compliant' | 'non_compliant' | 'pending' | 'exempt';

interface Tag {
  id: string;
  name: string;
  color?: string;
  usage_count: number;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  parent_id?: string;
}
```

## Example API Client

```typescript
class ArchivusAPIClient {
  private baseURL = 'https://api.archivus.io/api/v1';
  private token: string;
  
  constructor(token: string) {
    this.token = token;
  }
  
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new ArchivusAPIError(error, response.status);
    }
    
    return response.json();
  }
  
  // Documents
  async uploadDocument(file: File, metadata?: Partial<UploadRequest>) {
    const formData = new FormData();
    formData.append('file', file);
    
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, String(value));
        }
      });
    }
    
    return this.request<DocumentResponse>('/documents/upload', {
      method: 'POST',
      body: formData,
      headers: {} // Let browser set Content-Type for FormData
    });
  }
  
  async getDocument(id: string) {
    return this.request<DocumentResponse>(`/documents/${id}`);
  }
  
  async listDocuments(params?: ListDocumentsParams) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<PaginatedResponse<DocumentResponse>>(
      `/documents${query ? `?${query}` : ''}`
    );
  }
  
  async getProcessingStatus(documentId: string) {
    return this.request<ProcessingStatusResponse>(
      `/documents/${documentId}/processing-status`
    );
  }
  
  async searchDocuments(request: SearchRequest) {
    return this.request<DocumentResponse[]>('/search', {
      method: 'POST',
      body: JSON.stringify(request)
    });
  }
  
  // Add more methods as needed...
}

class ArchivusAPIError extends Error {
  constructor(
    public error: ErrorResponse,
    public status: number
  ) {
    super(error.message);
    this.name = 'ArchivusAPIError';
  }
}
```

## Frontend Integration Tips

1. **Always handle rate limiting** - Implement exponential backoff
2. **Poll for processing status** - Documents process asynchronously
3. **Cache responses** - Especially for user/tenant info
4. **Handle token refresh** - Tokens expire, implement refresh flow
5. **Show upload progress** - Use XMLHttpRequest or fetch with progress
6. **Validate file types client-side** - Better UX than server rejection
7. **Implement proper error handling** - Show user-friendly messages
8. **Use TypeScript** - All interfaces provided above
9. **Handle network failures** - Implement retry logic
10. **Optimize for performance** - Use pagination, lazy loading

## Questions or Issues?

Contact the backend team or check the API documentation at `/api/v1/docs`.