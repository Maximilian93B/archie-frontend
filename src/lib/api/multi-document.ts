import { apiClient } from './client'

// Types for multi-document analysis
export interface MultiDocumentCompareRequest {
  document_ids: string[]
  query?: string
  comparison_type?: 'full' | 'summary' | 'specific'
}

export interface MultiDocumentCompareResponse {
  analysis_id: string
  analysis_type: 'document_comparison'
  document_ids: string[]
  comparison_result: {
    summary: string
    key_findings: string[]
    similarities: Array<{
      aspect: string
      description: string
      confidence: number
      supporting_evidence?: string[]
    }>
    differences: Array<{
      aspect: string
      document_id: string
      description: string
      significance: 'high' | 'medium' | 'low'
    }>
    relationships: Array<{
      type: 'contradicts' | 'supports' | 'extends' | 'references'
      description: string
      source_document_id: string
      target_document_id: string
      confidence: number
    }>
  }
  claude_model_used: string
  processing_time_ms: number
  token_usage: {
    input_tokens: number
    output_tokens: number
    total_tokens: number
  }
  created_at: string
}

export interface MultiDocumentQARequest {
  document_ids: string[]
  question: string
}

export interface MultiDocumentQAResponse {
  analysis_id: string
  analysis_type: 'multi_document_qa'
  question: string
  answer: string
  document_ids: string[]
  sources: Array<{
    document_id: string
    document_title: string
    relevance_score: number
    excerpt: string
    page_number?: number
    confidence: number
  }>
  claude_model_used: string
  processing_time_ms: number
  token_usage: {
    input_tokens: number
    output_tokens: number
    total_tokens: number
  }
  created_at: string
}

export interface MultiDocumentAnalysis {
  id: string
  analysis_type: string
  document_ids: string[]
  query?: string
  result: any
  confidence_score?: number
  processing_time_ms: number
  created_at: string
}

export interface DocumentRelationship {
  id: string
  source_document_id: string
  target_document_id: string
  relationship_type: string
  confidence_score: number
  description?: string
  detected_at: string
}

/**
 * Multi-Document Analysis API
 * Provides document comparison and cross-document Q&A capabilities
 */
export const multiDocumentAPI = {
  /**
   * Compare multiple documents using AI analysis
   */
  async compareDocuments(request: MultiDocumentCompareRequest): Promise<MultiDocumentCompareResponse> {
    const response = await apiClient.post('/multi-document/compare', request)
    return response
  },

  /**
   * Ask questions across multiple documents
   */
  async askMultipleDocuments(request: MultiDocumentQARequest): Promise<MultiDocumentQAResponse> {
    const response = await apiClient.post('/multi-document/ask', request)
    return response
  },

  /**
   * Get all multi-document analyses for the current user
   */
  async getAnalyses(): Promise<{
    analyses: MultiDocumentAnalysis[]
    total: number
  }> {
    const response = await apiClient.get('/multi-document/analyses')
    return response
  },

  /**
   * Get relationships detected between documents
   */
  async getDocumentRelationships(documentId: string): Promise<{
    relationships: DocumentRelationship[]
  }> {
    const response = await apiClient.get(`/documents/${documentId}/relationships`)
    return response
  }
}

// Utility functions for multi-document analysis
export const multiDocumentUtils = {
  /**
   * Format confidence score for display
   */
  formatConfidence(score: number): string {
    return `${Math.round(score * 100)}%`
  },

  /**
   * Get confidence level color
   */
  getConfidenceColor(score: number): string {
    if (score >= 0.8) return 'text-green-600'
    if (score >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  },

  /**
   * Get significance color for differences
   */
  getSignificanceColor(significance: 'high' | 'medium' | 'low'): string {
    switch (significance) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-blue-600'
    }
  },

  /**
   * Get relationship type icon
   */
  getRelationshipIcon(type: string): string {
    switch (type) {
      case 'contradicts': return '⚠️'
      case 'supports': return '✅'
      case 'extends': return '📈'
      case 'references': return '🔗'
      default: return '📄'
    }
  },

  /**
   * Sort similarities by confidence
   */
  sortSimilarities(similarities: MultiDocumentCompareResponse['comparison_result']['similarities']) {
    return [...similarities].sort((a, b) => b.confidence - a.confidence)
  },

  /**
   * Sort differences by significance
   */
  sortDifferences(differences: MultiDocumentCompareResponse['comparison_result']['differences']) {
    const significanceOrder = { high: 3, medium: 2, low: 1 }
    return [...differences].sort((a, b) => 
      significanceOrder[b.significance] - significanceOrder[a.significance]
    )
  },

  /**
   * Group sources by relevance
   */
  groupSourcesByRelevance(sources: MultiDocumentQAResponse['sources']) {
    const high = sources.filter(s => s.relevance_score >= 0.8)
    const medium = sources.filter(s => s.relevance_score >= 0.6 && s.relevance_score < 0.8)
    const low = sources.filter(s => s.relevance_score < 0.6)
    
    return { high, medium, low }
  },

  /**
   * Calculate average confidence for an analysis
   */
  calculateAverageConfidence(analysis: MultiDocumentCompareResponse): number {
    const similarities = analysis.comparison_result.similarities
    const relationships = analysis.comparison_result.relationships
    
    const allScores = [
      ...similarities.map(s => s.confidence),
      ...relationships.map(r => r.confidence)
    ]
    
    if (allScores.length === 0) return 0
    
    return allScores.reduce((sum, score) => sum + score, 0) / allScores.length
  },

  /**
   * Generate summary statistics for comparison
   */
  generateComparisonStats(analysis: MultiDocumentCompareResponse) {
    const result = analysis.comparison_result
    
    return {
      documentCount: analysis.document_ids.length,
      similaritiesFound: result.similarities.length,
      differencesFound: result.differences.length,
      relationshipsFound: result.relationships.length,
      keyFindings: result.key_findings.length,
      processingTime: analysis.processing_time_ms,
      averageConfidence: this.calculateAverageConfidence(analysis),
      tokenUsage: analysis.token_usage.total_tokens
    }
  },

  /**
   * Extract key insights from comparison
   */
  extractKeyInsights(analysis: MultiDocumentCompareResponse): Array<{
    type: 'similarity' | 'difference' | 'relationship'
    title: string
    description: string
    confidence: number
    importance: 'high' | 'medium' | 'low'
  }> {
    const insights = []
    const result = analysis.comparison_result

    // High-confidence similarities
    result.similarities
      .filter(s => s.confidence >= 0.8)
      .forEach(s => {
        insights.push({
          type: 'similarity' as const,
          title: `Strong similarity: ${s.aspect}`,
          description: s.description,
          confidence: s.confidence,
          importance: 'high' as const
        })
      })

    // High-significance differences
    result.differences
      .filter(d => d.significance === 'high')
      .forEach(d => {
        insights.push({
          type: 'difference' as const,
          title: `Key difference: ${d.aspect}`,
          description: d.description,
          confidence: 1.0, // Differences don't have confidence scores
          importance: 'high' as const
        })
      })

    // High-confidence relationships
    result.relationships
      .filter(r => r.confidence >= 0.8)
      .forEach(r => {
        insights.push({
          type: 'relationship' as const,
          title: `${r.type}: ${r.description}`,
          description: r.description,
          confidence: r.confidence,
          importance: 'medium' as const
        })
      })

    return insights.sort((a, b) => {
      // Sort by importance first, then confidence
      const importanceOrder = { high: 3, medium: 2, low: 1 }
      const importanceDiff = importanceOrder[b.importance] - importanceOrder[a.importance]
      if (importanceDiff !== 0) return importanceDiff
      return b.confidence - a.confidence
    })
  }
}