import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { toast } from 'react-hot-toast';
import type {
  Document,
  DocumentListParams,
  UploadOptions,
  AIResults,
  WorkspaceContext,
  DocumentInsights,
  PaginatedResponse,
} from '@/types';

// Query Keys
export const documentKeys = {
  all: ['documents'] as const,
  lists: () => [...documentKeys.all, 'list'] as const,
  list: (params: DocumentListParams) => [...documentKeys.lists(), params] as const,
  enhanced: (params: DocumentListParams) => [...documentKeys.all, 'enhanced', params] as const,
  details: () => [...documentKeys.all, 'detail'] as const,
  detail: (id: string) => [...documentKeys.details(), id] as const,
  aiResults: (id: string) => [...documentKeys.detail(id), 'ai-results'] as const,
  workspace: () => [...documentKeys.all, 'workspace-context'] as const,
  insights: () => [...documentKeys.all, 'insights'] as const,
};

// ================================
// 📄 Document Queries
// ================================

export function useDocuments(params: DocumentListParams = {}, options?: { enablePolling?: boolean }) {
  const queryResult = useQuery({
    queryKey: documentKeys.list(params),
    queryFn: () => apiClient.getDocuments({ ...params, include: 'tags,categories,folder' }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Check if any documents are being processed
  const hasProcessingDocuments = queryResult.data?.items?.some(
    doc => doc.ai_processing_status === 'processing' || doc.ai_processing_status === 'pending'
  );

  // Return query with polling if needed
  if (options?.enablePolling !== false && hasProcessingDocuments) {
    return useQuery({
      queryKey: documentKeys.list(params),
      queryFn: () => apiClient.getDocuments({ ...params, include: 'tags,categories,folder' }),
      staleTime: 5 * 60 * 1000,
      refetchInterval: 3000, // Poll every 3 seconds
    });
  }

  return queryResult;
}

export function useEnhancedDocuments(params: DocumentListParams = {}) {
  return useQuery({
    queryKey: documentKeys.enhanced(params),
    queryFn: () => apiClient.getEnhancedDocuments(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useDocument(id: string, options?: { enablePolling?: boolean }) {
  const queryResult = useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => apiClient.getDocument(id, 'tags,categories,folder'),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Check if document is being processed
  const isProcessing = queryResult.data?.ai_processing_status === 'processing' || 
                      queryResult.data?.ai_processing_status === 'pending';

  // Return query with polling if needed
  if (options?.enablePolling !== false && isProcessing) {
    return useQuery({
      queryKey: documentKeys.detail(id),
      queryFn: () => apiClient.getDocument(id, 'tags,categories,folder'),
      enabled: !!id,
      staleTime: 10 * 60 * 1000,
      refetchInterval: 3000, // Poll every 3 seconds
    });
  }

  return queryResult;
}

export function useDocumentAIResults(id: string) {
  return useQuery({
    queryKey: documentKeys.aiResults(id),
    queryFn: () => apiClient.getAIResults(id),
    enabled: !!id,
    staleTime: 30 * 60 * 1000, // 30 minutes - AI results don't change often
  });
}

export function useWorkspaceContext() {
  return useQuery({
    queryKey: documentKeys.workspace(),
    queryFn: () => apiClient.getWorkspaceContext(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

export function useDocumentInsights() {
  return useQuery({
    queryKey: documentKeys.insights(),
    queryFn: () => apiClient.getDocumentInsights(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
}

// ================================
// 📄 Document Mutations
// ================================

export function useDocumentUpload() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      file, 
      options, 
      onProgress 
    }: { 
      file: File; 
      options?: UploadOptions; 
      onProgress?: (progress: number) => void;
    }) => apiClient.uploadDocument(file, options, onProgress),
    onSuccess: (data) => {
      toast.success(`${data.title} uploaded successfully!`);
      
      // Invalidate and refetch document lists
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: documentKeys.workspace() });
      queryClient.invalidateQueries({ queryKey: documentKeys.insights() });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Upload failed';
      toast.error(message);
    },
  });
}

export function useDocumentDelete() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiClient.deleteDocument(id),
    onSuccess: (_, id) => {
      toast.success('Document deleted successfully!');
      
      // Remove from cache
      queryClient.removeQueries({ queryKey: documentKeys.detail(id) });
      
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: documentKeys.workspace() });
      queryClient.invalidateQueries({ queryKey: documentKeys.insights() });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Delete failed';
      toast.error(message);
    },
  });
}

export function useDocumentDownload() {
  return useMutation({
    mutationFn: ({ id, filename }: { id: string; filename: string }) => 
      apiClient.downloadDocument(id).then(blob => ({ blob, filename })),
    onSuccess: ({ blob, filename }) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Download started!');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Download failed';
      toast.error(message);
    },
  });
}

// ================================
// 📄 Bulk Operations
// ================================

export function useBulkDocumentDelete() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (ids: string[]) => {
      // Delete documents in parallel
      await Promise.all(ids.map(id => apiClient.deleteDocument(id)));
      return ids;
    },
    onSuccess: (ids) => {
      toast.success(`${ids.length} document${ids.length > 1 ? 's' : ''} deleted successfully!`);
      
      // Remove from cache
      ids.forEach(id => {
        queryClient.removeQueries({ queryKey: documentKeys.detail(id) });
      });
      
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: documentKeys.workspace() });
      queryClient.invalidateQueries({ queryKey: documentKeys.insights() });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Bulk delete failed';
      toast.error(message);
    },
  });
}

// ================================
// 📄 Prefetch Utilities
// ================================

export function usePrefetchDocument() {
  const queryClient = useQueryClient();
  
  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: documentKeys.detail(id),
      queryFn: () => apiClient.getDocument(id),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };
}

export function usePrefetchDocumentAIResults() {
  const queryClient = useQueryClient();
  
  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: documentKeys.aiResults(id),
      queryFn: () => apiClient.getAIResults(id),
      staleTime: 30 * 60 * 1000, // 30 minutes
    });
  };
} 