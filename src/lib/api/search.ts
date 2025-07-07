import { apiClient } from './client'
import type { Document, PaginatedResponse } from '@/types'

export type SearchType = 'all' | 'fulltext' | 'semantic' | 'exact'

export interface SearchFilters {
  documentTypes?: string[]
  tags?: string[]
  categories?: string[]
  folderId?: string
  aiProcessed?: boolean
  hasEmbeddings?: boolean
  minConfidence?: number
  createdAfter?: string
  createdBefore?: string
  updatedAfter?: string
  updatedBefore?: string
  minSize?: number
  maxSize?: number
  status?: string
  expiringBefore?: string
}

export interface SearchOptions {
  query: string
  type?: SearchType
  filters?: SearchFilters
  searchFields?: string[]
  page?: number
  pageSize?: number
  sortBy?: 'relevance' | 'created_at' | 'updated_at' | 'title' | 'size'
  sortDesc?: boolean
}

export interface SearchSuggestion {
  text: string
  type: 'recent' | 'popular' | 'ai'
  metadata?: any
}

export interface SemanticSearchOptions {
  query: string
  similarityThreshold?: number
  maxResults?: number
  documentIds?: string[]
}

export interface EnhancedSearchOptions {
  query: string
  semantic?: boolean
  includeAI?: boolean
  documentTypes?: string[]
  dateRange?: {
    from: string
    to: string
  }
  maxResults?: number
  relevanceThreshold?: number
}

export interface EnhancedSearchResult {
  id: string
  title: string
  relevanceScore: number
  highlightedContent?: string
  aiSummary?: string
  matchingSections?: Array<{
    type: 'paragraph' | 'heading' | 'list' | 'table'
    content: string
    confidence: number
  }>
  documentType?: string
  createdAt: string
  updatedAt: string
  fileSize: number
  tags?: string[]
}

export interface QueryAnalysis {
  intent: string
  entities: string[]
  themes: string[]
  suggestedRefinements?: string[]
}

export interface EnhancedSearchResponse {
  results: EnhancedSearchResult[]
  totalResults: number
  processingTimeMs: number
  semanticEnabled: boolean
  queryAnalysis?: QueryAnalysis
}

class SearchAPI {
  private basePath = '/api/v1/search'

  /**
   * Basic document search
   */
  async searchDocuments(options: SearchOptions): Promise<PaginatedResponse<Document>> {
    const params = new URLSearchParams()
    
    // Add query
    if (options.query) {
      params.append('q', options.query)
    }
    
    // Add search type
    if (options.type) {
      params.append('type', options.type)
    }
    
    // Add pagination
    if (options.page) {
      params.append('page', options.page.toString())
    }
    if (options.pageSize) {
      params.append('page_size', options.pageSize.toString())
    }
    
    // Add sorting
    if (options.sortBy) {
      params.append('sort_by', options.sortBy)
    }
    if (options.sortDesc !== undefined) {
      params.append('sort_desc', options.sortDesc.toString())
    }
    
    // Add filters
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v))
          } else {
            params.append(key, value.toString())
          }
        }
      })
    }
    
    return apiClient.get<PaginatedResponse<Document>>(
      `${this.basePath}/documents?${params.toString()}`
    )
  }

  /**
   * Advanced search with POST body
   */
  async advancedSearch(options: SearchOptions): Promise<PaginatedResponse<Document>> {
    return apiClient.post<PaginatedResponse<Document>>(
      `${this.basePath}/documents`,
      {
        query: options.query,
        search_type: options.type,
        filters: options.filters,
        search_fields: options.searchFields,
        page: options.page || 1,
        page_size: options.pageSize || 20,
        sort_by: options.sortBy || 'relevance',
        sort_desc: options.sortDesc ?? true,
      }
    )
  }

  /**
   * Semantic search for similar documents
   */
  async semanticSearch(options: SemanticSearchOptions): Promise<Document[]> {
    return apiClient.post<Document[]>(
      `${this.basePath}/semantic`,
      {
        query: options.query,
        similarity_threshold: options.similarityThreshold || 0.7,
        max_results: options.maxResults || 50,
        document_ids: options.documentIds,
      }
    )
  }

  /**
   * Get search suggestions
   */
  async getSuggestions(query: string): Promise<SearchSuggestion[]> {
    const params = new URLSearchParams({ q: query })
    const response = await apiClient.get<{ suggestions: string[] }>(
      `${this.basePath}/suggestions?${params.toString()}`
    )
    
    // Transform simple strings to SearchSuggestion objects
    return response.suggestions.map(text => ({
      text,
      type: 'popular' as const,
    }))
  }

  /**
   * Get search history for current user
   */
  async getSearchHistory(limit: number = 10): Promise<SearchSuggestion[]> {
    const response = await apiClient.get<{ searches: Array<{ query: string; timestamp: string }> }>(
      `${this.basePath}/history?limit=${limit}`
    )
    
    return response.searches.map(search => ({
      text: search.query,
      type: 'recent' as const,
      metadata: { timestamp: search.timestamp },
    }))
  }

  /**
   * Save a search query
   */
  async saveSearch(query: string, name?: string): Promise<void> {
    await apiClient.post(`${this.basePath}/saved`, {
      query,
      name: name || query,
    })
  }

  /**
   * Get saved searches
   */
  async getSavedSearches(): Promise<Array<{ id: string; name: string; query: string; created_at: string }>> {
    return apiClient.get(`${this.basePath}/saved`)
  }

  /**
   * Delete a saved search
   */
  async deleteSavedSearch(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/saved/${id}`)
  }

  /**
   * Multi-document analysis search
   */
  async analyzeDocuments(query: string, documentIds: string[]): Promise<{
    query: string
    analysis: string
    relevantDocuments: Array<{ id: string; relevance: number; excerpt: string }>
  }> {
    return apiClient.post('/api/v1/analysis/multi-document', {
      query,
      document_ids: documentIds,
    })
  }

  /**
   * Enhanced search with AI features
   * Provides semantic understanding, query analysis, and AI-generated summaries
   */
  async enhancedSearch(options: EnhancedSearchOptions): Promise<EnhancedSearchResponse> {
    const params = new URLSearchParams()
    
    // Required query parameter
    params.append('query', options.query)
    
    // Optional parameters
    if (options.semantic !== undefined) {
      params.append('semantic', options.semantic.toString())
    }
    if (options.includeAI !== undefined) {
      params.append('include_ai', options.includeAI.toString())
    }
    if (options.documentTypes && options.documentTypes.length > 0) {
      params.append('document_types', options.documentTypes.join(','))
    }
    if (options.dateRange) {
      params.append('date_from', options.dateRange.from)
      params.append('date_to', options.dateRange.to)
    }
    if (options.maxResults) {
      params.append('max_results', options.maxResults.toString())
    }
    if (options.relevanceThreshold !== undefined) {
      params.append('relevance_threshold', options.relevanceThreshold.toString())
    }
    
    const response = await apiClient.get<{
      results: Array<{
        id: string
        title: string
        relevance_score: number
        highlighted_content?: string
        ai_summary?: string
        matching_sections?: Array<{
          type: string
          content: string
          confidence: number
        }>
        document_type?: string
        created_at: string
        updated_at: string
        file_size: number
        tags?: string[]
      }>
      total_results: number
      processing_time_ms: number
      semantic_enabled: boolean
      query_analysis?: {
        intent: string
        entities: string[]
        themes: string[]
        suggested_refinements?: string[]
      }
    }>(`${this.basePath}/enhanced?${params.toString()}`)
    
    // Transform snake_case to camelCase
    return {
      results: response.results.map(result => ({
        id: result.id,
        title: result.title,
        relevanceScore: result.relevance_score,
        highlightedContent: result.highlighted_content,
        aiSummary: result.ai_summary,
        matchingSections: result.matching_sections?.map(section => ({
          type: section.type as 'paragraph' | 'heading' | 'list' | 'table',
          content: section.content,
          confidence: section.confidence
        })),
        documentType: result.document_type,
        createdAt: result.created_at,
        updatedAt: result.updated_at,
        fileSize: result.file_size,
        tags: result.tags
      })),
      totalResults: response.total_results,
      processingTimeMs: response.processing_time_ms,
      semanticEnabled: response.semantic_enabled,
      queryAnalysis: response.query_analysis && {
        intent: response.query_analysis.intent,
        entities: response.query_analysis.entities,
        themes: response.query_analysis.themes,
        suggestedRefinements: response.query_analysis.suggested_refinements
      }
    }
  }
}

export const searchAPI = new SearchAPI()