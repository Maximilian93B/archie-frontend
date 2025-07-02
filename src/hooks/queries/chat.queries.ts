import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { chatAPI, transformToFrontendSession, transformToFrontendMessage } from '@/lib/api/chat'
import { useChatStore } from '@/store/chat-store'
import { toast } from 'react-hot-toast'
import type { 
  CreateSessionRequest, 
  AskQuestionRequest, 
  UpdateSessionNameRequest, 
  SearchSessionsParams,
  GenerateSuggestionsRequest 
} from '@/lib/api/chat'

// Query keys for React Query
export const chatQueryKeys = {
  all: ['chat'] as const,
  sessions: () => [...chatQueryKeys.all, 'sessions'] as const,
  session: (id: string) => [...chatQueryKeys.all, 'session', id] as const,
  documentSessions: (documentId: string) => [...chatQueryKeys.all, 'document-sessions', documentId] as const,
  search: (params: SearchSessionsParams) => [...chatQueryKeys.all, 'search', params] as const,
  stats: () => [...chatQueryKeys.all, 'stats'] as const,
  suggestions: (params: GenerateSuggestionsRequest) => [...chatQueryKeys.all, 'suggestions', params] as const
}

/**
 * Hook to fetch all chat sessions
 */
export function useChatSessions(params: {
  page?: number
  page_size?: number
  document_id?: string
} = {}) {
  const { 
    addSession, 
    setIsFetchingSessions, 
    setPagination,
    regroupSessions 
  } = useChatStore()

  return useQuery({
    queryKey: [...chatQueryKeys.sessions(), params],
    queryFn: async () => {
      setIsFetchingSessions(true)
      try {
        const response = await chatAPI.getSessions(params)
        
        // Update pagination
        setPagination({
          page: response.page,
          pageSize: response.page_size,
          total: response.total,
          totalPages: response.total_pages
        })
        
        // Transform and add sessions to store
        const frontendSessions = response.sessions.map(transformToFrontendSession)
        frontendSessions.forEach(session => addSession(session))
        
        // Regroup sessions
        regroupSessions()
        
        return response
      } finally {
        setIsFetchingSessions(false)
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to fetch a specific chat session
 */
export function useChatSession(sessionId: string | null) {
  const { updateSession } = useChatStore()

  return useQuery({
    queryKey: chatQueryKeys.session(sessionId || ''),
    queryFn: async () => {
      if (!sessionId) return null
      
      const response = await chatAPI.getSession(sessionId)
      const frontendSession = transformToFrontendSession(response)
      
      // Update session in store
      updateSession(sessionId, frontendSession)
      
      return response
    },
    enabled: !!sessionId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook to create a new chat session
 */
export function useCreateChatSession() {
  const queryClient = useQueryClient()
  const { addSession, setCurrentSession } = useChatStore()

  return useMutation({
    mutationFn: async (request: CreateSessionRequest) => {
      return await chatAPI.createSession(request)
    },
    onSuccess: (response) => {
      const frontendSession = transformToFrontendSession(response)
      
      // Add to store and set as current
      addSession(frontendSession)
      setCurrentSession(frontendSession.id)
      
      // Invalidate sessions query
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.sessions() })
      
      toast.success('New chat session created')
    },
    onError: (error) => {
      console.error('Failed to create chat session:', error)
      toast.error('Failed to create chat session')
    }
  })
}

/**
 * Hook to update session name
 */
export function useUpdateSessionName() {
  const queryClient = useQueryClient()
  const { updateSession } = useChatStore()

  return useMutation({
    mutationFn: async ({ sessionId, sessionName }: { sessionId: string; sessionName: string }) => {
      return await chatAPI.updateSessionName(sessionId, { session_name: sessionName })
    },
    onSuccess: (response, { sessionId }) => {
      const frontendSession = transformToFrontendSession(response)
      
      // Update session in store
      updateSession(sessionId, { sessionName: frontendSession.sessionName })
      
      // Update cached data
      queryClient.setQueryData(chatQueryKeys.session(sessionId), response)
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.sessions() })
      
      toast.success('Session name updated')
    },
    onError: (error) => {
      console.error('Failed to update session name:', error)
      toast.error('Failed to update session name')
    }
  })
}

/**
 * Hook to delete a chat session
 */
export function useDeleteChatSession() {
  const queryClient = useQueryClient()
  const { removeSession, setCurrentSession, currentSessionId } = useChatStore()

  return useMutation({
    mutationFn: async (sessionId: string) => {
      return await chatAPI.deleteSession(sessionId)
    },
    onSuccess: (_, sessionId) => {
      // Remove from store
      removeSession(sessionId)
      
      // If this was the current session, clear it
      if (currentSessionId === sessionId) {
        setCurrentSession(null)
      }
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.sessions() })
      queryClient.removeQueries({ queryKey: chatQueryKeys.session(sessionId) })
      
      toast.success('Session deleted')
    },
    onError: (error) => {
      console.error('Failed to delete session:', error)
      toast.error('Failed to delete session')
    }
  })
}

/**
 * Hook to ask a question in a chat session
 */
export function useAskQuestion() {
  const queryClient = useQueryClient()
  const { 
    addMessage, 
    updateMessage, 
    setIsAsking, 
    canSendMessage, 
    incrementMessageCount 
  } = useChatStore()

  return useMutation({
    mutationFn: async ({ sessionId, question }: { sessionId: string; question: string }) => {
      // Check rate limit
      if (!canSendMessage()) {
        throw new Error('Rate limit exceeded. Please wait before sending another message.')
      }
      
      setIsAsking(true)
      incrementMessageCount()
      
      return await chatAPI.askQuestion(sessionId, { question })
    },
    onSuccess: (response, { sessionId, question }) => {
      // Add user message
      const userMessage = {
        id: `user-${Date.now()}`,
        role: 'user' as const,
        content: question,
        timestamp: new Date().toISOString(),
        status: 'sent' as const
      }
      addMessage(sessionId, userMessage)
      
      // Add assistant response
      const assistantMessage = transformToFrontendMessage(response.message)
      addMessage(sessionId, assistantMessage)
      
      // Update session queries
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.session(sessionId) })
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.sessions() })
      
      setIsAsking(false)
    },
    onError: (error, { sessionId }) => {
      console.error('Failed to send message:', error)
      setIsAsking(false)
      
      // Show error message
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message'
      toast.error(errorMessage)
    }
  })
}

/**
 * Hook to search chat sessions
 */
export function useSearchChatSessions() {
  const { setSearchResults, setSearchQuery } = useChatStore()

  return useMutation({
    mutationFn: async (params: SearchSessionsParams) => {
      return await chatAPI.searchSessions(params)
    },
    onSuccess: (response, params) => {
      const frontendSessions = response.sessions.map(transformToFrontendSession)
      setSearchResults(frontendSessions)
      setSearchQuery(params.q)
    },
    onError: (error) => {
      console.error('Failed to search sessions:', error)
      toast.error('Search failed')
    }
  })
}

/**
 * Hook to get chat suggestions
 */
export function useChatSuggestions(params: GenerateSuggestionsRequest) {
  return useQuery({
    queryKey: chatQueryKeys.suggestions(params),
    queryFn: async () => {
      return await chatAPI.generateSuggestions(params)
    },
    enabled: !!params.document_id || !!params.context,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook to get chat statistics
 */
export function useChatStats() {
  return useQuery({
    queryKey: chatQueryKeys.stats(),
    queryFn: async () => {
      return await chatAPI.getStats()
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  })
}

/**
 * Hook to get sessions for a specific document
 */
export function useDocumentSessions(documentId: string | null) {
  const { addSession } = useChatStore()

  return useQuery({
    queryKey: chatQueryKeys.documentSessions(documentId || ''),
    queryFn: async () => {
      if (!documentId) return []
      
      const sessions = await chatAPI.getDocumentSessions(documentId)
      
      // Transform and add to store
      const frontendSessions = sessions.map(transformToFrontendSession)
      frontendSessions.forEach(session => addSession(session))
      
      return sessions
    },
    enabled: !!documentId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook to pin/unpin sessions
 */
export function usePinSession() {
  const { pinSession, unpinSession } = useChatStore()

  return {
    pinSession: (sessionId: string) => {
      pinSession(sessionId)
      toast.success('Session pinned')
    },
    unpinSession: (sessionId: string) => {
      unpinSession(sessionId)
      toast.success('Session unpinned')
    }
  }
}