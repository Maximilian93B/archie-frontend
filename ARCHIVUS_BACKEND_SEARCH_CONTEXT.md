# 🔍 Archivus Backend Search Capabilities

## Overview

The Archivus backend provides sophisticated search capabilities powered by PostgreSQL and AI, implemented through the DocumentRepository. This document outlines the search features available for frontend integration.

## Search Types Supported

### 1. **Full-Text Search**
- PostgreSQL full-text search with relevance ranking
- Support for multiple languages
- Fuzzy matching for typo tolerance
- Search across document titles, content, and extracted text

### 2. **Semantic Search**
- AI-powered semantic understanding
- Vector embeddings for similarity search
- Natural language query processing
- Cross-document relevance matching

### 3. **Exact Search**
- Precise phrase matching
- Case-sensitive/insensitive options
- Regular expression support
- Field-specific searches

### 4. **Fuzzy Search**
- Typo-tolerant searching
- Phonetic matching
- Similarity threshold configuration
- Automatic suggestion generation

## Search Integration Points

### Document Repository Search Methods

```go
// Advanced search with multiple strategies
documents, total, err := repos.DocumentRepo.List(ctx, tenantID, repositories.DocumentFilters{
    Search: "contract terms",      // Natural language search
    SearchType: "semantic",        // Options: "fulltext", "semantic", "exact", "fuzzy"
    Page: 1,
    PageSize: 20,
    SortBy: "relevance",          // AI-powered relevance sorting
    SortDesc: true,
})
```

### Search Filters Available

```go
type DocumentFilters struct {
    // Search parameters
    Search          string        // Search query
    SearchType      string        // Search strategy
    SearchFields    []string      // Specific fields to search
    
    // Content filters
    DocumentTypes   []string      // Filter by document type
    Tags           []string      // Filter by tags
    Categories     []string      // Filter by categories
    FolderID       *uuid.UUID    // Filter by folder
    
    // AI filters
    AIProcessed    *bool         // Only AI-processed documents
    HasEmbeddings  *bool         // Only documents with embeddings
    MinConfidence  *float64      // Minimum AI confidence score
    
    // Date filters
    CreatedAfter   *time.Time    // Date range filtering
    CreatedBefore  *time.Time
    UpdatedAfter   *time.Time
    UpdatedBefore  *time.Time
    
    // Size filters
    MinSize        *int64        // File size filtering
    MaxSize        *int64
    
    // Status filters
    Status         *string       // Document status
    ExpiringBefore *time.Time    // Expiration filtering
    
    // Pagination
    Page           int
    PageSize       int
    SortBy         string        // Options: relevance, created_at, updated_at, title, size
    SortDesc       bool
}
```

## AI-Enhanced Search Features

### 1. **Natural Language Processing**
- Query understanding and expansion
- Synonym detection and matching
- Intent recognition
- Context-aware searching

### 2. **Multi-Document Analysis**
The `MultiDocumentAnalysisRepository` enables:
- Cross-document queries
- Comparative analysis
- Trend identification
- Pattern recognition

### 3. **Smart Suggestions**
- Auto-complete based on document content
- Related document recommendations
- Popular search terms
- Query refinement suggestions

## Search API Endpoints

### Basic Search
```
GET /api/v1/search/documents?q=contract&type=fulltext
```

### Advanced Search
```
POST /api/v1/search/documents
{
  "query": "payment terms in vendor contracts",
  "filters": {
    "document_types": ["contract"],
    "created_after": "2024-01-01",
    "ai_processed": true
  },
  "search_type": "semantic",
  "page": 1,
  "page_size": 20
}
```

### Semantic Search
```
POST /api/v1/search/semantic
{
  "query": "Find all documents discussing liability limitations",
  "similarity_threshold": 0.7,
  "max_results": 50
}
```

### Search Suggestions
```
GET /api/v1/search/suggestions?q=inv
```
Returns:
```json
{
  "suggestions": [
    "invoice",
    "inventory",
    "investment",
    "invitation"
  ]
}
```

## Frontend Implementation Considerations

### 1. **Search UI Components Needed**
- Global search bar with type-ahead
- Advanced search modal with filters
- Search results list with highlighting
- Search history/saved searches
- Filter chips for active filters

### 2. **Search Experience Features**
- Debounced search input (300ms)
- Loading states during search
- Empty state for no results
- Search result previews
- Relevance score indicators

### 3. **Performance Optimizations**
- Cache frequent searches
- Implement search result pagination
- Use React Query for search state
- Prefetch common searches
- Implement virtual scrolling for large results

### 4. **Search Types UI**
```typescript
type SearchType = 'all' | 'fulltext' | 'semantic' | 'exact';

interface SearchOptions {
  type: SearchType;
  includeContent: boolean;
  aiOnly: boolean;
  dateRange?: DateRange;
  documentTypes?: string[];
  folders?: string[];
  tags?: string[];
}
```

## Backend Search Implementation Details

### Database Indexes
The backend uses these indexes for performance:
- GIN index on document content for full-text search
- Vector index for embeddings (semantic search)
- B-tree indexes on common filter fields
- Composite indexes for complex queries

### Search Ranking
Documents are ranked by:
1. Text relevance score (TF-IDF)
2. Semantic similarity (cosine distance)
3. Recency bias (optional)
4. User interaction history
5. Document importance metrics

### Security Considerations
- All searches respect tenant isolation
- User permissions applied to results
- Sensitive content filtering
- Search audit logging

## Example Search Implementations

### 1. Simple Keyword Search
```typescript
const results = await apiClient.searchDocuments({
  query: "invoice",
  type: "fulltext",
  page: 1,
  pageSize: 20
});
```

### 2. Advanced Semantic Search
```typescript
const results = await apiClient.searchDocuments({
  query: "Find all contracts with termination clauses",
  type: "semantic",
  filters: {
    documentTypes: ["contract"],
    aiProcessed: true,
    minConfidence: 0.8
  }
});
```

### 3. Multi-Criteria Search
```typescript
const results = await apiClient.searchDocuments({
  query: "payment",
  type: "all", // Uses all search strategies
  filters: {
    tags: ["urgent", "pending"],
    createdAfter: "2024-01-01",
    maxSize: 10 * 1024 * 1024 // 10MB
  },
  sortBy: "relevance",
  sortDesc: true
});
```

## Chat-Based Search

The `ChatSessionRepository` enables conversational search:
- Ask questions about documents
- Get AI-powered answers with citations
- Maintain search context across queries
- Natural language document discovery

Example:
```
User: "Show me all invoices from last month over $10,000"
AI: "I found 3 invoices matching your criteria..." [with document links]
```

## Best Practices for Frontend

1. **Progressive Enhancement**
   - Start with simple text search
   - Add filters gradually
   - Enable AI features for supported plans

2. **User Experience**
   - Show search progress
   - Highlight matching terms
   - Provide clear filter indicators
   - Save recent searches

3. **Performance**
   - Implement search debouncing
   - Cache search results
   - Use pagination effectively
   - Lazy load search suggestions

4. **Accessibility**
   - Keyboard navigation for results
   - Screen reader announcements
   - Clear focus indicators
   - Descriptive labels

---

This comprehensive search system enables users to find documents quickly and accurately using various search strategies, from simple keyword matching to sophisticated AI-powered semantic search.