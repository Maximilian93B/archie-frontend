import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { toast } from 'react-hot-toast';
import type { HybridSearchResult, SearchResult } from '@/types';

// Query Keys
export const searchKeys = {
  all: ['search'] as const,
  intelligent: (query: string, limit?: number) => [...searchKeys.all, 'intelligent', query, limit] as const,
  hybrid: (params: any) => [...searchKeys.all, 'hybrid', params] as const,
  suggestions: (query: string) => [...searchKeys.all, 'suggestions', query] as const,
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

// Add React import for hooks
import React from 'react'; 