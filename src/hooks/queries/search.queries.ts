import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { searchAPI, type EnhancedSearchOptions, type EnhancedSearchResponse } from '@/lib/api/search';
import { toast } from 'react-hot-toast';
import type { HybridSearchResult, SearchResult } from '@/types';

// Query Keys
export const searchKeys = {
  all: ['search'] as const,
  intelligent: (query: string, limit?: number) => [...searchKeys.all, 'intelligent', query, limit] as const,
  hybrid: (params: any) => [...searchKeys.all, 'hybrid', params] as const,
  suggestions: (query: string) => [...searchKeys.all, 'suggestions', query] as const,
  enhanced: (options: EnhancedSearchOptions) => [...searchKeys.all, 'enhanced', options] as const,
};

// ================================
// 🔍 Search Queries
// ================================

export function useIntelligentSearch(query: string, limit = 20, enabled = true) {
  return useQuery({
    queryKey: searchKeys.intelligent(query, limit),
    queryFn: () => apiClient.intelligentSearch(query, limit),
    enabled: enabled && query.length >= 2, // Only search if query is at least 2 characters
    staleTime: 30 * 1000, // 30 seconds - search results can change frequently
    gcTime: 5 * 60 * 1000, // 5 minutes garbage collection
    retry: 1, // Only retry once for searches
  });
}

export function useSearchSuggestions(partialQuery: string, enabled = true) {
  return useQuery({
    queryKey: searchKeys.suggestions(partialQuery),
    queryFn: () => apiClient.getSearchSuggestions(partialQuery),
    enabled: enabled && partialQuery.length >= 2,
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 3 * 60 * 1000, // 3 minutes
    retry: false, // Don't retry suggestions
  });
}

export function useEnhancedSearch(
  options: EnhancedSearchOptions,
  enabled = true
) {
  return useQuery<EnhancedSearchResponse>({
    queryKey: searchKeys.enhanced(options),
    queryFn: () => searchAPI.enhancedSearch(options),
    enabled: enabled && options.query.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes - enhanced search results are more stable
    gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
    retry: 1,
  });
}

export function useEnhancedSearchWithDefaults(
  query: string,
  overrides?: Partial<EnhancedSearchOptions>,
  enabled = true
) {
  const defaultOptions: EnhancedSearchOptions = {
    query,
    semantic: true,
    includeAI: true,
    maxResults: 50,
    relevanceThreshold: 0.3,
    ...overrides,
  };
  
  return useEnhancedSearch(defaultOptions, enabled);
}

// ================================
// 🔍 Search Mutations
// ================================

export function useHybridSearch() {
  return useMutation({
    mutationFn: (searchParams: {
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
      filters?: {
        document_types?: string[];
        date_range?: { from: string; to: string };
        tags?: string[];
        ai_processed?: boolean;
      };
    }) => apiClient.hybridSearch(searchParams),
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Search failed';
      toast.error(message);
    },
  });
}

// ================================
// 🔍 Custom Search Hooks
// ================================

export function useDebounceSearch(
  query: string,
  delay = 300,
  limit = 20
) {
  const [debouncedQuery, setDebouncedQuery] = React.useState(query);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [query, delay]);
  
  return useIntelligentSearch(debouncedQuery, limit, debouncedQuery.length >= 2);
}

export function useSearchWithHistory() {
  const [searchHistory, setSearchHistory] = React.useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('archivus_search_history');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const addToHistory = React.useCallback((query: string) => {
    if (query.length < 2) return;
    
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item !== query);
      const newHistory = [query, ...filtered].slice(0, 10); // Keep last 10 searches
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('archivus_search_history', JSON.stringify(newHistory));
      }
      
      return newHistory;
    });
  }, []);
  
  const clearHistory = React.useCallback(() => {
    setSearchHistory([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('archivus_search_history');
    }
  }, []);
  
  return {
    searchHistory,
    addToHistory,
    clearHistory,
  };
}

export function useAdvancedSearch() {
  const [searchParams, setSearchParams] = React.useState({
    query: '',
    enable_full_text_search: true,
    enable_ai_field_search: true,
    enable_semantic_search: false,
    enable_metadata_search: true,
    weights: {
      full_text: 0.3,
      ai_fields: 0.4,
      semantic: 0.2,
      metadata: 0.1,
    },
    filters: {},
  });
  
  const hybridSearchMutation = useHybridSearch();
  
  const search = React.useCallback((overrides?: Partial<typeof searchParams>) => {
    const finalParams = { ...searchParams, ...overrides };
    return hybridSearchMutation.mutateAsync(finalParams);
  }, [searchParams, hybridSearchMutation]);
  
  return {
    searchParams,
    setSearchParams,
    search,
    isSearching: hybridSearchMutation.isPending,
    searchResults: hybridSearchMutation.data,
    searchError: hybridSearchMutation.error,
    reset: hybridSearchMutation.reset,
  };
}

// ================================
// 🔍 Search Result Utilities
// ================================

export function useSearchResultActions() {
  return {
    highlightText: (text: string, query: string) => {
      if (!query || query.length < 2) return text;
      
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    },
    
    getRelevanceColor: (score: number) => {
      if (score >= 0.8) return 'text-green-600 bg-green-50';
      if (score >= 0.6) return 'text-yellow-600 bg-yellow-50';
      if (score >= 0.4) return 'text-orange-600 bg-orange-50';
      return 'text-red-600 bg-red-50';
    },
    
    formatMatchReasons: (reasons: string[]) => {
      return reasons.map(reason => {
        // Clean up technical match reasons for user display
        return reason
          .replace(/_/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
      });
    },
  };
}

// ================================
// 🧠 Enhanced Search Utilities
// ================================

export function useEnhancedSearchActions() {
  const { highlightText, getRelevanceColor } = useSearchResultActions();
  
  return {
    // Format relevance score as percentage
    formatRelevanceScore: (score: number) => {
      return `${Math.round(score * 100)}%`;
    },
    
    // Get confidence level for matching sections
    getConfidenceLevel: (confidence: number): 'high' | 'medium' | 'low' => {
      if (confidence >= 0.8) return 'high';
      if (confidence >= 0.6) return 'medium';
      return 'low';
    },
    
    // Get confidence color for UI
    getConfidenceColor: (confidence: number) => {
      const level = confidence >= 0.8 ? 'high' : confidence >= 0.6 ? 'medium' : 'low';
      switch (level) {
        case 'high': return 'text-green-600';
        case 'medium': return 'text-yellow-600';
        case 'low': return 'text-orange-600';
      }
    },
    
    // Format query analysis for display
    formatQueryAnalysis: (analysis?: EnhancedSearchResponse['queryAnalysis']) => {
      if (!analysis) return null;
      
      return {
        intent: analysis.intent.charAt(0).toUpperCase() + analysis.intent.slice(1),
        entities: analysis.entities.map(e => e.charAt(0).toUpperCase() + e.slice(1)),
        themes: analysis.themes.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
        refinements: analysis.suggestedRefinements || [],
      };
    },
    
    // Get section type icon
    getSectionTypeIcon: (type: string) => {
      switch (type) {
        case 'heading': return '📄';
        case 'paragraph': return '📝';
        case 'list': return '📋';
        case 'table': return '📊';
        default: return '📄';
      }
    },
    
    // Process highlighted content for safe HTML rendering
    processHighlightedContent: (content?: string, query?: string) => {
      if (!content) return '';
      
      // First escape HTML to prevent XSS
      const escaped = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      
      // Then apply highlighting if query provided
      if (query) {
        return highlightText(escaped, query);
      }
      
      return escaped;
    },
    
    // Group results by relevance tiers
    groupResultsByRelevance: (results: EnhancedSearchResponse['results']) => {
      const high = results.filter(r => r.relevanceScore >= 0.8);
      const medium = results.filter(r => r.relevanceScore >= 0.5 && r.relevanceScore < 0.8);
      const low = results.filter(r => r.relevanceScore < 0.5);
      
      return { high, medium, low };
    },
    
    // Check if enhanced features are available
    hasAIEnhancements: (result: EnhancedSearchResponse['results'][0]) => {
      return !!(result.aiSummary || (result.matchingSections && result.matchingSections.length > 0));
    },
  };
}

// Add React import for hooks
import React from 'react'; 