import { useQuery, useQueryClient } from '@tanstack/react-query'
import { 
  enhancedDocumentsAPI, 
  type EnhancedDocumentListParams,
  type EnhancedDocumentListResponse 
} from '@/lib/api/enhanced-documents'

// Query keys for enhanced documents
export const enhancedDocumentQueryKeys = {
  all: ['enhanced-documents'] as const,
  lists: () => [...enhancedDocumentQueryKeys.all, 'list'] as const,
  list: (params: EnhancedDocumentListParams) => [...enhancedDocumentQueryKeys.lists(), params] as const,
  insights: () => [...enhancedDocumentQueryKeys.all, 'insights'] as const,
  recommendations: () => [...enhancedDocumentQueryKeys.all, 'recommendations'] as const,
  workspaceContext: () => [...enhancedDocumentQueryKeys.all, 'workspace-context'] as const,
}

/**
 * Hook to fetch enhanced documents with AI insights and workspace context
 */
export function useEnhancedDocuments(params: EnhancedDocumentListParams = {}) {
  return useQuery({
    queryKey: enhancedDocumentQueryKeys.list(params),
    queryFn: () => enhancedDocumentsAPI.getEnhancedDocuments(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    placeholderData: (previousData) => previousData, // Keep previous data while fetching
  })
}

/**
 * Hook to fetch document insights
 */
export function useDocumentInsights() {
  return useQuery({
    queryKey: enhancedDocumentQueryKeys.insights(),
    queryFn: () => enhancedDocumentsAPI.getDocumentInsights(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
}

/**
 * Hook to fetch document recommendations
 */
export function useDocumentRecommendations() {
  return useQuery({
    queryKey: enhancedDocumentQueryKeys.recommendations(),
    queryFn: () => enhancedDocumentsAPI.getDocumentRecommendations(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
}

/**
 * Hook to fetch workspace context
 */
export function useWorkspaceContext() {
  return useQuery({
    queryKey: enhancedDocumentQueryKeys.workspaceContext(),
    queryFn: () => enhancedDocumentsAPI.getWorkspaceContext(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  })
}

/**
 * Hook to prefetch enhanced documents for better UX
 */
export function usePrefetchEnhancedDocuments() {
  const queryClient = useQueryClient()

  const prefetchNextPage = (currentParams: EnhancedDocumentListParams) => {
    const nextPageParams = {
      ...currentParams,
      page: (currentParams.page || 1) + 1
    }

    queryClient.prefetchQuery({
      queryKey: enhancedDocumentQueryKeys.list(nextPageParams),
      queryFn: () => enhancedDocumentsAPI.getEnhancedDocuments(nextPageParams),
      staleTime: 5 * 60 * 1000,
    })
  }

  const prefetchFolder = (folderId: string) => {
    const folderParams = { folder_id: folderId, include_context: true }
    
    queryClient.prefetchQuery({
      queryKey: enhancedDocumentQueryKeys.list(folderParams),
      queryFn: () => enhancedDocumentsAPI.getEnhancedDocuments(folderParams),
      staleTime: 5 * 60 * 1000,
    })
  }

  return {
    prefetchNextPage,
    prefetchFolder
  }
}

/**
 * Hook for optimistic updates when documents change
 */
export function useOptimisticDocumentUpdates() {
  const queryClient = useQueryClient()

  const updateDocumentInList = (
    documentId: string, 
    updates: Partial<EnhancedDocumentListResponse['documents'][0]>
  ) => {
    // Update all cached document lists
    queryClient.setQueriesData(
      { queryKey: enhancedDocumentQueryKeys.lists() },
      (oldData: EnhancedDocumentListResponse | undefined) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          documents: oldData.documents.map(doc =>
            doc.id === documentId ? { ...doc, ...updates } : doc
          )
        }
      }
    )
  }

  const invalidateDocumentLists = () => {
    queryClient.invalidateQueries({
      queryKey: enhancedDocumentQueryKeys.lists()
    })
  }

  const invalidateInsights = () => {
    queryClient.invalidateQueries({
      queryKey: enhancedDocumentQueryKeys.insights()
    })
  }

  return {
    updateDocumentInList,
    invalidateDocumentLists,
    invalidateInsights
  }
}