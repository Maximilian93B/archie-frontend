import { apiClient } from './client'

// Types for enhanced document listing
export interface EnhancedDocumentListParams {
  include_context?: boolean
  page?: number
  page_size?: number
  folder_id?: string
  document_type?: string
  status?: string
}

export interface DocumentWorkspaceContext {
  overview: string
  recent_activity: string
  recommendations: Array<{
    type: string
    description: string
    priority: 'low' | 'medium' | 'high'
  }>
  document_trends: {
    upload_velocity: string
    processing_success_rate: number
    popular_types: string[]
    storage_growth: string
  }
  processing_time_ms: number
}

export interface EnhancedDocument {
  id: string
  title: string
  file_name: string
  content_type: string
  file_size: number
  status: string
  document_type?: string
  ai_summary?: string
  ai_key_points?: string[]
  ai_entities?: Array<{
    type: string
    value: string
    confidence: number
  }>
  ai_categories?: string[]
  ai_confidence_score?: number
  ai_processed_at?: string
  created_at: string
  updated_at: string
  created_by: string
  folder_id?: string
  tags?: Array<{
    name: string
    category?: string
    confidence?: number
  }>
  relationships?: Array<{
    target_document_id: string
    relationship_type: string
    confidence_score: number
    description?: string
  }>
}

export interface EnhancedDocumentListResponse {
  documents: EnhancedDocument[]
  total: number
  page: number
  page_size: number
  total_pages: number
  workspace_context?: DocumentWorkspaceContext
  ai_enhanced: boolean
}

/**
 * Enhanced Documents API with AI insights and workspace context
 */
export const enhancedDocumentsAPI = {
  /**
   * Get enhanced document list with AI-generated workspace context
   */
  async getEnhancedDocuments(params: EnhancedDocumentListParams = {}): Promise<EnhancedDocumentListResponse> {
    const searchParams = new URLSearchParams()
    
    // Default to including context for enhanced experience
    searchParams.append('include_context', String(params.include_context ?? true))
    
    if (params.page) searchParams.append('page', String(params.page))
    if (params.page_size) searchParams.append('page_size', String(params.page_size))
    if (params.folder_id) searchParams.append('folder_id', params.folder_id)
    if (params.document_type) searchParams.append('document_type', params.document_type)
    if (params.status) searchParams.append('status', params.status)
    
    const response = await apiClient.get(`/documents/enhanced?${searchParams.toString()}`)
    return response
  },

  /**
   * Get document insights and recommendations
   */
  async getDocumentInsights(): Promise<{
    insights: Array<{
      type: 'trend' | 'recommendation' | 'alert'
      title: string
      description: string
      action?: string
      priority: 'low' | 'medium' | 'high'
    }>
    processing_time_ms: number
  }> {
    const response = await apiClient.get('/documents/insights')
    return response
  },

  /**
   * Get document recommendations based on user activity
   */
  async getDocumentRecommendations(): Promise<{
    recommendations: Array<{
      document_id: string
      title: string
      reason: string
      confidence: number
      type: 'similar' | 'related' | 'trending' | 'relevant'
    }>
  }> {
    const response = await apiClient.get('/documents/recommendations')
    return response
  },

  /**
   * Get workspace context summary
   */
  async getWorkspaceContext(): Promise<DocumentWorkspaceContext> {
    const response = await apiClient.get('/documents/workspace-context')
    return response
  }
}

// Utility functions for enhanced documents
export const enhancedDocumentUtils = {
  /**
   * Calculate AI confidence level description
   */
  getConfidenceLevel(score?: number): 'low' | 'medium' | 'high' | 'unknown' {
    if (!score) return 'unknown'
    if (score >= 0.8) return 'high'
    if (score >= 0.6) return 'medium'
    return 'low'
  },

  /**
   * Get confidence color for UI
   */
  getConfidenceColor(score?: number): string {
    const level = this.getConfidenceLevel(score)
    switch (level) {
      case 'high': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-red-600'
      default: return 'text-gray-400'
    }
  },

  /**
   * Format AI entities for display
   */
  formatEntities(entities?: EnhancedDocument['ai_entities']): Array<{
    text: string
    type: string
    confidence: number
  }> {
    if (!entities) return []
    
    return entities
      .filter(entity => entity.confidence > 0.5) // Only show confident entities
      .sort((a, b) => b.confidence - a.confidence) // Sort by confidence
      .slice(0, 10) // Limit to top 10
      .map(entity => ({
        text: entity.value,
        type: entity.type,
        confidence: entity.confidence
      }))
  },

  /**
   * Generate document summary for display
   */
  generateDisplaySummary(document: EnhancedDocument): string {
    if (document.ai_summary) {
      return document.ai_summary.length > 150 
        ? document.ai_summary.substring(0, 150) + '...'
        : document.ai_summary
    }
    
    // Fallback to key points
    if (document.ai_key_points && document.ai_key_points.length > 0) {
      return document.ai_key_points[0].length > 150
        ? document.ai_key_points[0].substring(0, 150) + '...'
        : document.ai_key_points[0]
    }
    
    return 'No AI summary available'
  },

  /**
   * Get processing status with user-friendly message
   */
  getProcessingStatus(document: EnhancedDocument): {
    status: 'processed' | 'processing' | 'failed' | 'pending'
    message: string
    color: string
  } {
    if (document.ai_processed_at) {
      return {
        status: 'processed',
        message: 'AI processing complete',
        color: 'text-green-600'
      }
    }
    
    switch (document.status) {
      case 'processing':
        return {
          status: 'processing',
          message: 'Processing with AI...',
          color: 'text-blue-600'
        }
      case 'failed':
        return {
          status: 'failed',
          message: 'Processing failed',
          color: 'text-red-600'
        }
      default:
        return {
          status: 'pending',
          message: 'Waiting for processing',
          color: 'text-gray-600'
        }
    }
  }
}