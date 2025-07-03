import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { subscribeWithSelector } from 'zustand/middleware'
import { useEffect, useState } from 'react'

// Stable empty arrays for SSR
const EMPTY_SESSIONS: ChatSession[] = []
const EMPTY_STRING_ARRAY: string[] = []

// Types
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  status?: 'pending' | 'sent' | 'failed'
  error?: string
}

export interface ChatSession {
  id: string
  documentId: string
  documentTitle?: string
  sessionName: string
  messages: ChatMessage[]
  isActive: boolean
  totalMessages: number
  createdAt: string
  updatedAt: string
  canModify: boolean
  // Pagination support
  hasMoreMessages?: boolean
  oldestLoadedMessageId?: string
  newestLoadedMessageId?: string
}

export interface ChatState {
  // Current active session
  currentSessionId: string | null
  currentSession: ChatSession | null
  
  // All sessions (cached)
  sessions: Map<string, ChatSession>
  sessionsList: ChatSession[]
  
  // Session Management (NEW)
  pinnedSessionIds: Set<string>
  sessionGroups: {
    byDocument: Map<string, string[]>  // docId -> sessionIds
    byDate: {
      today: string[]
      thisWeek: string[]
      thisMonth: string[]
      older: string[]
    }
  }
  expandedGroups: Set<string>
  sessionSidebarOpen: boolean
  
  // UI State
  isLoading: boolean
  isAsking: boolean
  isFetchingSessions: boolean
  
  // Message drafts (persisted)
  drafts: Map<string, string>
  
  // Pagination
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
  
  // Message pagination state
  messagePagination: Map<string, {
    isLoadingMore: boolean
    hasMore: boolean
    page: number
    pageSize: number
  }>
  
  // Search
  searchQuery: string
  searchResults: ChatSession[]
  isSearching: boolean
  filteredSessions: string[]
  
  // Performance optimization
  recentSessionIds: string[] // LRU cache of session IDs
  maxRecentSessions: number
  
  // Rate limiting
  messagesSentInLastMinute: number
  lastMessageTimestamp: number
  
  // Actions
  setCurrentSession: (sessionId: string | null) => void
  updateSession: (sessionId: string, updates: Partial<ChatSession>) => void
  addSession: (session: ChatSession) => void
  removeSession: (sessionId: string) => void
  
  // Message actions
  addMessage: (sessionId: string, message: ChatMessage) => void
  updateMessage: (sessionId: string, messageId: string, updates: Partial<ChatMessage>) => void
  addOptimisticMessage: (sessionId: string, content: string) => ChatMessage
  prependMessages: (sessionId: string, messages: ChatMessage[]) => void
  loadMoreMessages: (sessionId: string) => void
  setMessagePaginationLoading: (sessionId: string, loading: boolean) => void
  
  // Draft actions
  setDraft: (sessionId: string, content: string) => void
  clearDraft: (sessionId: string) => void
  
  // Search actions
  setSearchQuery: (query: string) => void
  setSearchResults: (results: ChatSession[]) => void
  
  // UI actions
  setIsLoading: (loading: boolean) => void
  setIsAsking: (asking: boolean) => void
  setIsFetchingSessions: (fetching: boolean) => void
  
  // Pagination actions
  setPagination: (pagination: Partial<ChatState['pagination']>) => void
  
  // Performance actions
  addToRecentSessions: (sessionId: string) => void
  clearOldSessions: () => void
  
  // Rate limiting
  canSendMessage: () => boolean
  incrementMessageCount: () => void
  
  // Session Management Actions (NEW)
  pinSession: (sessionId: string) => void
  unpinSession: (sessionId: string) => void
  toggleSessionSidebar: () => void
  setSessionSidebarOpen: (open: boolean) => void
  toggleGroup: (groupId: string) => void
  searchSessions: (query: string) => void
  regroupSessions: () => void
  exportSession: (sessionId: string) => Promise<string>
  
  // Utility
  reset: () => void
}

const initialState = {
  currentSessionId: null,
  currentSession: null,
  sessions: new Map(),
  sessionsList: EMPTY_SESSIONS,
  
  // Session Management (NEW)
  pinnedSessionIds: new Set<string>(),
  sessionGroups: {
    byDocument: new Map(),
    byDate: {
      today: EMPTY_STRING_ARRAY,
      thisWeek: EMPTY_STRING_ARRAY,
      thisMonth: EMPTY_STRING_ARRAY,
      older: EMPTY_STRING_ARRAY
    }
  },
  expandedGroups: new Set<string>(['pinned', 'today']), // Default expanded groups
  sessionSidebarOpen: true,
  
  isLoading: false,
  isAsking: false,
  isFetchingSessions: false,
  drafts: new Map(),
  pagination: {
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0
  },
  messagePagination: new Map(),
  searchQuery: '',
  searchResults: EMPTY_SESSIONS,
  isSearching: false,
  filteredSessions: EMPTY_STRING_ARRAY,
  recentSessionIds: EMPTY_STRING_ARRAY,
  maxRecentSessions: 10,
  messagesSentInLastMinute: 0,
  lastMessageTimestamp: 0
}

export const useChatStore = create<ChatState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Session management
        setCurrentSession: (sessionId) => {
          if (!sessionId) {
            set({ currentSessionId: null, currentSession: null })
            return
          }
          
          const session = get().sessions.get(sessionId)
          if (session) {
            set({ currentSessionId: sessionId, currentSession: session })
            get().addToRecentSessions(sessionId)
          }
        },
        
        updateSession: (sessionId, updates) => {
          set((state) => {
            const session = state.sessions.get(sessionId)
            if (!session) return state
            
            const updatedSession = { ...session, ...updates, updatedAt: new Date().toISOString() }
            const newSessions = new Map(state.sessions)
            newSessions.set(sessionId, updatedSession)
            
            return {
              sessions: newSessions,
              currentSession: state.currentSessionId === sessionId ? updatedSession : state.currentSession,
              sessionsList: state.sessionsList.map(s => s.id === sessionId ? updatedSession : s)
            }
          })
        },
        
        addSession: (session) => {
          set((state) => {
            const newSessions = new Map(state.sessions)
            newSessions.set(session.id, session)
            
            return {
              sessions: newSessions,
              sessionsList: [...state.sessionsList, session]
            }
          })
          get().addToRecentSessions(session.id)
        },
        
        removeSession: (sessionId) => {
          set((state) => {
            const newSessions = new Map(state.sessions)
            newSessions.delete(sessionId)
            
            return {
              sessions: newSessions,
              sessionsList: state.sessionsList.filter(s => s.id !== sessionId),
              currentSessionId: state.currentSessionId === sessionId ? null : state.currentSessionId,
              currentSession: state.currentSessionId === sessionId ? null : state.currentSession
            }
          })
        },
        
        // Message management
        addMessage: (sessionId, message) => {
          set((state) => {
            const session = state.sessions.get(sessionId)
            if (!session) return state
            
            const updatedSession = {
              ...session,
              messages: [...session.messages, message],
              totalMessages: session.totalMessages + 1,
              updatedAt: new Date().toISOString()
            }
            
            const newSessions = new Map(state.sessions)
            newSessions.set(sessionId, updatedSession)
            
            return {
              sessions: newSessions,
              currentSession: state.currentSessionId === sessionId ? updatedSession : state.currentSession,
              sessionsList: state.sessionsList.map(s => s.id === sessionId ? updatedSession : s)
            }
          })
        },
        
        updateMessage: (sessionId, messageId, updates) => {
          set((state) => {
            const session = state.sessions.get(sessionId)
            if (!session) return state
            
            const updatedSession = {
              ...session,
              messages: session.messages.map(m => 
                m.id === messageId ? { ...m, ...updates } : m
              )
            }
            
            const newSessions = new Map(state.sessions)
            newSessions.set(sessionId, updatedSession)
            
            return {
              sessions: newSessions,
              currentSession: state.currentSessionId === sessionId ? updatedSession : state.currentSession
            }
          })
        },
        
        addOptimisticMessage: (sessionId, content) => {
          const optimisticMessage: ChatMessage = {
            id: `temp-${Date.now()}`,
            role: 'user',
            content,
            timestamp: new Date().toISOString(),
            status: 'pending'
          }
          
          get().addMessage(sessionId, optimisticMessage)
          get().clearDraft(sessionId)
          return optimisticMessage
        },
        
        prependMessages: (sessionId, messages) => {
          set((state) => {
            const session = state.sessions.get(sessionId)
            if (!session) return state
            
            // Prepend messages (older messages go at the beginning)
            const updatedSession = {
              ...session,
              messages: [...messages, ...session.messages],
              oldestLoadedMessageId: messages[0]?.id || session.oldestLoadedMessageId
            }
            
            const newSessions = new Map(state.sessions)
            newSessions.set(sessionId, updatedSession)
            
            return {
              sessions: newSessions,
              currentSession: state.currentSessionId === sessionId ? updatedSession : state.currentSession,
              sessionsList: state.sessionsList.map(s => s.id === sessionId ? updatedSession : s)
            }
          })
        },
        
        loadMoreMessages: (sessionId) => {
          const state = get()
          const pagination = state.messagePagination.get(sessionId) || {
            isLoadingMore: false,
            hasMore: true,
            page: 1,
            pageSize: 50
          }
          
          // Don't load if already loading or no more messages
          if (pagination.isLoadingMore || !pagination.hasMore) return
          
          // Set loading state
          set((state) => {
            const newPagination = new Map(state.messagePagination)
            newPagination.set(sessionId, {
              ...pagination,
              isLoadingMore: true
            })
            return { messagePagination: newPagination }
          })
        },
        
        setMessagePaginationLoading: (sessionId, loading) => {
          set((state) => {
            const pagination = state.messagePagination.get(sessionId) || {
              isLoadingMore: false,
              hasMore: true,
              page: 1,
              pageSize: 50
            }
            
            const newPagination = new Map(state.messagePagination)
            newPagination.set(sessionId, {
              ...pagination,
              isLoadingMore: loading
            })
            
            return { messagePagination: newPagination }
          })
        },
        
        // Draft management
        setDraft: (sessionId, content) => {
          set((state) => {
            const newDrafts = new Map(state.drafts)
            if (content.trim()) {
              newDrafts.set(sessionId, content)
            } else {
              newDrafts.delete(sessionId)
            }
            return { drafts: newDrafts }
          })
        },
        
        clearDraft: (sessionId) => {
          set((state) => {
            const newDrafts = new Map(state.drafts)
            newDrafts.delete(sessionId)
            return { drafts: newDrafts }
          })
        },
        
        // Search
        setSearchQuery: (query) => set({ searchQuery: query }),
        setSearchResults: (results) => set({ searchResults: results, isSearching: false }),
        
        // UI State
        setIsLoading: (loading) => set({ isLoading: loading }),
        setIsAsking: (asking) => set({ isAsking: asking }),
        setIsFetchingSessions: (fetching) => set({ isFetchingSessions: fetching }),
        
        // Pagination
        setPagination: (pagination) => set((state) => ({
          pagination: { ...state.pagination, ...pagination }
        })),
        
        // Performance optimization
        addToRecentSessions: (sessionId) => {
          set((state) => {
            const newRecentIds = [sessionId, ...state.recentSessionIds.filter(id => id !== sessionId)]
              .slice(0, state.maxRecentSessions)
            return { recentSessionIds: newRecentIds }
          })
        },
        
        clearOldSessions: () => {
          set((state) => {
            const recentIds = new Set(state.recentSessionIds)
            const currentId = state.currentSessionId
            
            const newSessions = new Map()
            state.sessions.forEach((session, id) => {
              if (recentIds.has(id) || id === currentId) {
                newSessions.set(id, session)
              }
            })
            
            return { sessions: newSessions }
          })
        },
        
        // Rate limiting
        canSendMessage: () => {
          const now = Date.now()
          const state = get()
          
          // Reset counter if more than a minute has passed
          if (now - state.lastMessageTimestamp > 60000) {
            set({ messagesSentInLastMinute: 0, lastMessageTimestamp: now })
            return true
          }
          
          // Check rate limit (10 messages per minute)
          return state.messagesSentInLastMinute < 10
        },
        
        incrementMessageCount: () => {
          set((state) => ({
            messagesSentInLastMinute: state.messagesSentInLastMinute + 1,
            lastMessageTimestamp: Date.now()
          }))
        },
        
        // Session Management Actions (NEW)
        pinSession: (sessionId) => {
          set((state) => {
            const newPinnedIds = new Set(state.pinnedSessionIds)
            newPinnedIds.add(sessionId)
            return { pinnedSessionIds: newPinnedIds }
          })
          get().regroupSessions()
        },
        
        unpinSession: (sessionId) => {
          set((state) => {
            const newPinnedIds = new Set(state.pinnedSessionIds)
            newPinnedIds.delete(sessionId)
            return { pinnedSessionIds: newPinnedIds }
          })
          get().regroupSessions()
        },
        
        toggleSessionSidebar: () => {
          set((state) => ({ sessionSidebarOpen: !state.sessionSidebarOpen }))
        },
        
        setSessionSidebarOpen: (open) => {
          set({ sessionSidebarOpen: open })
        },
        
        toggleGroup: (groupId) => {
          set((state) => {
            const newExpandedGroups = new Set(state.expandedGroups)
            if (newExpandedGroups.has(groupId)) {
              newExpandedGroups.delete(groupId)
            } else {
              newExpandedGroups.add(groupId)
            }
            return { expandedGroups: newExpandedGroups }
          })
        },
        
        searchSessions: (query) => {
          set({ searchQuery: query, isSearching: true })
          
          const state = get()
          const filtered = state.sessionsList.filter(session => {
            const searchableText = [
              session.sessionName,
              session.documentTitle || '',
              session.messages[0]?.content || ''
            ].join(' ').toLowerCase()
            
            return searchableText.includes(query.toLowerCase())
          })
          
          set({ 
            filteredSessions: filtered.map(s => s.id),
            isSearching: false 
          })
        },
        
        regroupSessions: () => {
          const state = get()
          const now = new Date()
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          const thisWeek = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000))
          const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
          
          const byDocument = new Map<string, string[]>()
          const byDate = {
            today: [] as string[],
            thisWeek: [] as string[],
            thisMonth: [] as string[],
            older: [] as string[]
          }
          
          state.sessionsList.forEach(session => {
            const sessionDate = new Date(session.createdAt)
            
            // Group by document
            if (session.documentId) {
              const docSessions = byDocument.get(session.documentId) || []
              docSessions.push(session.id)
              byDocument.set(session.documentId, docSessions)
            }
            
            // Group by date
            if (sessionDate >= today) {
              byDate.today.push(session.id)
            } else if (sessionDate >= thisWeek) {
              byDate.thisWeek.push(session.id)
            } else if (sessionDate >= thisMonth) {
              byDate.thisMonth.push(session.id)
            } else {
              byDate.older.push(session.id)
            }
          })
          
          set({
            sessionGroups: {
              byDocument,
              byDate
            }
          })
        },
        
        exportSession: async (sessionId) => {
          const state = get()
          const session = state.sessions.get(sessionId)
          if (!session) return ''
          
          const markdown = [
            `# ${session.sessionName}`,
            `**Document**: ${session.documentTitle || 'N/A'}`,
            `**Created**: ${new Date(session.createdAt).toLocaleDateString()}`,
            `**Messages**: ${session.totalMessages}`,
            '',
            '---',
            '',
            ...session.messages.map(message => [
              `## ${message.role === 'user' ? 'You' : 'Assistant'}`,
              `*${new Date(message.timestamp).toLocaleString()}*`,
              '',
              message.content,
              ''
            ].join('\n'))
          ].join('\n')
          
          return markdown
        },
        
        reset: () => set({ 
          ...initialState, 
          sessions: new Map(), 
          drafts: new Map(),
          messagePagination: new Map(),
          pinnedSessionIds: new Set<string>(),
          expandedGroups: new Set<string>(['pinned', 'today'])
        })
      }),
      {
        name: 'archivus-chat-store',
        storage: createJSONStorage(() => localStorage),
        skipHydration: true, // Important for SSR
        partialize: (state) => ({
          // Only persist drafts, recent session IDs, and UI preferences
          drafts: Array.from(state.drafts.entries()),
          recentSessionIds: state.recentSessionIds,
          pinnedSessionIds: Array.from(state.pinnedSessionIds),
          expandedGroups: Array.from(state.expandedGroups),
          sessionSidebarOpen: state.sessionSidebarOpen
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            // Convert arrays back to Maps/Sets
            if (state.drafts) {
              state.drafts = new Map(state.drafts as any)
            }
            if (state.pinnedSessionIds) {
              state.pinnedSessionIds = new Set(state.pinnedSessionIds as any)
            }
            if (state.expandedGroups) {
              state.expandedGroups = new Set(state.expandedGroups as any)
            }
          }
        }
      }
    )
  )
)

// Selectors
export const selectCurrentSession = (state: ChatState) => state.currentSession
export const selectSessionById = (id: string) => (state: ChatState) => state.sessions.get(id)
export const selectDraftForSession = (id: string) => (state: ChatState) => state.drafts.get(id)
export const selectIsRateLimited = (state: ChatState) => !state.canSendMessage()
export const selectMessagePagination = (sessionId: string) => (state: ChatState) => 
  state.messagePagination.get(sessionId) || { isLoadingMore: false, hasMore: true, page: 1, pageSize: 50 }

// Simple selectors for SSR compatibility
export const selectRecentSessions = (state: ChatState) => state.sessionsList
export const selectPinnedSessions = (state: ChatState) => state.sessionsList.filter(s => state.pinnedSessionIds.has(s.id))

export const selectSessionsByDocument = (docId: string) => (state: ChatState) => {
  const sessionIds = state.sessionGroups.byDocument.get(docId) || []
  return state.sessionsList.filter(s => sessionIds.includes(s.id))
}

export const selectSessionsByDateGroup = (group: 'today' | 'thisWeek' | 'thisMonth' | 'older') => (state: ChatState) => {
  const sessionIds = state.sessionGroups.byDate[group] || []
  return state.sessionsList.filter(s => sessionIds.includes(s.id))
}

export const selectFilteredSessions = (state: ChatState) => {
  if (!state.searchQuery) return state.sessionsList
  return state.sessionsList.filter(s => state.filteredSessions.includes(s.id))
}

export const selectIsGroupExpanded = (groupId: string) => (state: ChatState) => 
  state.expandedGroups.has(groupId)

export const selectSessionSidebarOpen = (state: ChatState) => state.sessionSidebarOpen

// Hydration hook for SSR
export const useChatStoreHydration = () => {
  const [hydrated, setHydrated] = useState(false)
  
  useEffect(() => {
    const unsubscribe = useChatStore.persist.onHydrate(() => setHydrated(false))
    const unsubscribeFinish = useChatStore.persist.onFinishHydration(() => setHydrated(true))
    
    setHydrated(useChatStore.persist.hasHydrated())
    
    return () => {
      unsubscribe()
      unsubscribeFinish()
    }
  }, [])
  
  return hydrated
}