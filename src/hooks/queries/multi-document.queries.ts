import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  multiDocumentAPI, 
  type MultiDocumentCompareRequest,
  type MultiDocumentQARequest,
  type MultiDocumentCompareResponse,
  type MultiDocumentQAResponse 
} from '@/lib/api/multi-document'
import { toast } from 'react-hot-toast'

// Query keys for multi-document analysis
export const multiDocumentQueryKeys = {
  all: ['multi-document'] as const,
  analyses: () => [...multiDocumentQueryKeys.all, 'analyses'] as const,
  relationships: (documentId: string) => [...multiDocumentQueryKeys.all, 'relationships', documentId] as const,
  comparison: (documentIds: string[]) => [...multiDocumentQueryKeys.all, 'comparison', documentIds.sort()] as const,
}

/**
 * Hook to fetch all multi-document analyses
 */
export function useMultiDocumentAnalyses() {
  return useQuery({
    queryKey: multiDocumentQueryKeys.analyses(),
    queryFn: () => multiDocumentAPI.getAnalyses(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
}

/**
 * Hook to fetch document relationships
 */
export function useDocumentRelationships(documentId: string | null) {
  return useQuery({
    queryKey: multiDocumentQueryKeys.relationships(documentId || ''),
    queryFn: () => multiDocumentAPI.getDocumentRelationships(documentId!),
    enabled: !!documentId,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })
}

/**
 * Hook to compare multiple documents
 */
export function useCompareDocuments() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: MultiDocumentCompareRequest) => {
      if (request.document_ids.length < 2) {
        throw new Error('At least 2 documents are required for comparison')
      }
      if (request.document_ids.length > 10) {
        throw new Error('Maximum 10 documents can be compared at once')
      }
      
      return await multiDocumentAPI.compareDocuments(request)
    },
    onSuccess: (data, variables) => {
      // Cache the comparison result
      queryClient.setQueryData(
        multiDocumentQueryKeys.comparison(variables.document_ids),
        data
      )
      
      // Invalidate analyses list
      queryClient.invalidateQueries({
        queryKey: multiDocumentQueryKeys.analyses()
      })
      
      toast.success('Document comparison completed')
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || 'Comparison failed'
      toast.error(`Comparison failed: ${message}`)
    }
  })
}

/**
 * Hook to ask questions across multiple documents
 */
export function useMultiDocumentQA() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: MultiDocumentQARequest) => {
      if (request.document_ids.length === 0) {
        throw new Error('At least 1 document is required for Q&A')
      }
      if (request.document_ids.length > 20) {
        throw new Error('Maximum 20 documents can be queried at once')
      }
      if (!request.question.trim()) {
        throw new Error('Question cannot be empty')
      }
      
      return await multiDocumentAPI.askMultipleDocuments(request)
    },
    onSuccess: (data) => {
      // Invalidate analyses list
      queryClient.invalidateQueries({
        queryKey: multiDocumentQueryKeys.analyses()
      })
      
      toast.success('Question answered successfully')
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || 'Q&A failed'
      toast.error(`Q&A failed: ${message}`)
    }
  })
}

/**
 * Hook to get cached comparison result
 */
export function useCachedComparison(documentIds: string[]) {
  return useQuery({
    queryKey: multiDocumentQueryKeys.comparison(documentIds),
    queryFn: () => {
      // This will only return cached data, won't make API calls
      return null
    },
    enabled: false, // Never auto-fetch
    staleTime: Infinity, // Never consider stale
  })
}

/**
 * Hook for managing comparison state and history
 */
export function useComparisonHistory() {
  const queryClient = useQueryClient()

  const clearComparison = (documentIds: string[]) => {
    queryClient.removeQueries({
      queryKey: multiDocumentQueryKeys.comparison(documentIds)
    })
  }

  const clearAllComparisons = () => {
    queryClient.removeQueries({
      queryKey: [...multiDocumentQueryKeys.all, 'comparison']
    })
  }

  const getComparisonFromCache = (documentIds: string[]): MultiDocumentCompareResponse | undefined => {
    return queryClient.getQueryData(multiDocumentQueryKeys.comparison(documentIds))
  }

  return {
    clearComparison,
    clearAllComparisons,
    getComparisonFromCache
  }
}

/**
 * Hook for optimistic updates and cache management
 */
export function useMultiDocumentOptimistic() {
  const queryClient = useQueryClient()

  const invalidateAnalyses = () => {
    queryClient.invalidateQueries({
      queryKey: multiDocumentQueryKeys.analyses()
    })
  }

  const invalidateRelationships = (documentId: string) => {
    queryClient.invalidateQueries({
      queryKey: multiDocumentQueryKeys.relationships(documentId)
    })
  }

  const prefetchRelationships = (documentIds: string[]) => {
    documentIds.forEach(documentId => {
      queryClient.prefetchQuery({
        queryKey: multiDocumentQueryKeys.relationships(documentId),
        queryFn: () => multiDocumentAPI.getDocumentRelationships(documentId),
        staleTime: 15 * 60 * 1000,
      })
    })
  }

  return {
    invalidateAnalyses,
    invalidateRelationships,
    prefetchRelationships
  }
}

/**
 * Hook to manage document selection for comparison
 */
export function useDocumentSelection() {
  const [selectedDocuments, setSelectedDocuments] = React.useState<string[]>([])
  const [maxDocuments] = React.useState(10)

  const addDocument = (documentId: string) => {
    setSelectedDocuments(prev => {
      if (prev.includes(documentId)) return prev
      if (prev.length >= maxDocuments) {
        toast.error(`Maximum ${maxDocuments} documents can be selected`)
        return prev
      }
      return [...prev, documentId]
    })
  }

  const removeDocument = (documentId: string) => {
    setSelectedDocuments(prev => prev.filter(id => id !== documentId))
  }

  const clearSelection = () => {
    setSelectedDocuments([])
  }

  const canCompare = selectedDocuments.length >= 2
  const canAddMore = selectedDocuments.length < maxDocuments

  return {
    selectedDocuments,
    addDocument,
    removeDocument,
    clearSelection,
    canCompare,
    canAddMore,
    maxDocuments
  }
}