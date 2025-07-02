// 🏷️ Tags API Client
// API integration for tag management and auto-tagging

import { apiClient } from './client';
import { 
  Tag,
  AITag,
  DocumentTagsResponse,
  PaginatedResponse
} from '@/types';

// ================================
// 🏷️ Tag API Functions
// ================================

export const tagsAPI = {
  /**
   * Get all tags in the system
   */
  async list(): Promise<Tag[]> {
    const response = await apiClient.get('/tags');
    return response.data;
  },

  /**
   * Create a new tag
   */
  async create(name: string, color?: string): Promise<Tag> {
    const response = await apiClient.post('/tags', { name, color });
    return response.data;
  },

  /**
   * Update a tag
   */
  async update(tagId: string, data: { name?: string; color?: string }): Promise<Tag> {
    const response = await apiClient.put(`/tags/${tagId}`, data);
    return response.data;
  },

  /**
   * Delete a tag
   */
  async delete(tagId: string): Promise<void> {
    await apiClient.delete(`/tags/${tagId}`);
  },

  /**
   * Get tags for a specific document (including AI tags)
   */
  async getDocumentTags(documentId: string): Promise<DocumentTagsResponse> {
    const response = await apiClient.get(`/documents/${documentId}/tags`);
    return response.data;
  },

  /**
   * Add user tags to a document
   */
  async addDocumentTags(documentId: string, tags: string[]): Promise<void> {
    await apiClient.post(`/documents/${documentId}/tags`, { tags });
  },

  /**
   * Remove a tag from a document
   */
  async removeDocumentTag(documentId: string, tagName: string): Promise<void> {
    await apiClient.delete(`/documents/${documentId}/tags/${encodeURIComponent(tagName)}`);
  },

  /**
   * Search documents by tags
   */
  async searchByTags(
    tags: string[],
    matchMode: 'any' | 'all' = 'any',
    params?: {
      page?: number;
      page_size?: number;
    }
  ): Promise<PaginatedResponse<any>> {
    const response = await apiClient.get('/documents', {
      params: {
        tags: tags.join(','),
        tag_match: matchMode,
        ...params
      }
    });
    return response.data;
  },

  /**
   * Get popular tags with usage counts
   */
  async getPopularTags(limit: number = 20): Promise<Array<Tag & { count: number }>> {
    const response = await apiClient.get('/tags/popular', {
      params: { limit }
    });
    return response.data;
  },

  /**
   * Get tag suggestions based on partial input
   */
  async getSuggestions(query: string): Promise<string[]> {
    const response = await apiClient.get('/tags/suggestions', {
      params: { q: query }
    });
    return response.data;
  }
};

// ================================
// 🛠️ Helper Functions
// ================================

/**
 * Calculate tag score for display priority
 */
export function calculateTagScore(tag: AITag): number {
  return tag.confidence * tag.relevance;
}

/**
 * Sort tags by score (AI tags) or alphabetically (user tags)
 */
export function sortTags(tags: DocumentTagsResponse): {
  aiTags: AITag[];
  userTags: string[];
  topTags: Array<{ name: string; type: 'ai' | 'user'; score?: number }>;
} {
  // Sort AI tags by score
  const aiTags = [...(tags.ai_tags || [])].sort((a, b) => {
    const scoreA = calculateTagScore(a);
    const scoreB = calculateTagScore(b);
    return scoreB - scoreA;
  });

  // User tags are already strings
  const userTags = [...(tags.user_tags || [])].sort();

  // Combine for top tags display
  const topTags: Array<{ name: string; type: 'ai' | 'user'; score?: number }> = [
    ...aiTags.slice(0, 5).map(tag => ({
      name: tag.name,
      type: 'ai' as const,
      score: calculateTagScore(tag)
    })),
    ...userTags.slice(0, 3).map(tag => ({
      name: tag,
      type: 'user' as const,
      score: 0.9 // Fixed high score for user tags
    }))
  ].sort((a, b) => (b.score || 0) - (a.score || 0));

  return { aiTags, userTags, topTags };
}

/**
 * Get category color for consistent display
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    document_type: '#3B82F6',  // Blue
    department: '#10B981',     // Green
    project: '#8B5CF6',        // Purple
    topic: '#F59E0B',          // Amber
    compliance: '#EF4444',     // Red
    priority: '#EC4899',       // Pink
    year: '#6366F1',           // Indigo
    client: '#14B8A6',         // Teal
    vendor: '#84CC16',         // Lime
    default: '#6B7280'         // Gray
  };

  return colors[category] || colors.default;
}

/**
 * Format confidence percentage
 */
export function formatConfidence(confidence: number): string {
  return `${Math.round(confidence * 100)}%`;
}