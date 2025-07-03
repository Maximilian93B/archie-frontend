'use client'

import { useEffect, useState } from 'react'
import { useChatStore, ChatState } from '@/store/chat-store'

// Default state that matches the store structure
const DEFAULT_STORE_STATE: ChatState = {
  // Current active session
  currentSessionId: null,
  currentSession: null,
  
  // All sessions (cached)
  sessions: new Map(),
  sessionsList: [],
  
  // Session Management
  pinnedSessionIds: new Set<string>(),
  sessionGroups: {
    byDocument: new Map(),
    byDate: {
      today: [],
      thisWeek: [],
      thisMonth: [],
      older: []
    }
  },
  expandedGroups: new Set<string>(['pinned', 'today']),
  sessionSidebarOpen: true,
  
  // UI State
  isLoading: false,
  isAsking: false,
  isFetchingSessions: false,
  
  // Message drafts
  drafts: new Map(),
  
  // Pagination
  pagination: {
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0
  },
  
  // Search
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  filteredSessions: [],
  
  // Performance optimization
  recentSessionIds: [],
  maxRecentSessions: 10,
  
  // Rate limiting
  messagesSentInLastMinute: 0,
  lastMessageTimestamp: 0,
  
  // Actions - all no-op functions for SSR
  setCurrentSession: () => {},
  updateSession: () => {},
  addSession: () => {},
  removeSession: () => {},
  addMessage: () => {},
  updateMessage: () => {},
  addOptimisticMessage: () => ({ 
    id: '', 
    role: 'user' as const, 
    content: '', 
    timestamp: '', 
    status: 'pending' as const 
  }),
  setDraft: () => {},
  clearDraft: () => {},
  setSearchQuery: () => {},
  setSearchResults: () => {},
  setIsLoading: () => {},
  setIsAsking: () => {},
  setIsFetchingSessions: () => {},
  setPagination: () => {},
  addToRecentSessions: () => {},
  clearOldSessions: () => {},
  canSendMessage: () => true,
  incrementMessageCount: () => {},
  pinSession: () => {},
  unpinSession: () => {},
  toggleSessionSidebar: () => {},
  setSessionSidebarOpen: () => {},
  toggleGroup: () => {},
  searchSessions: () => {},
  regroupSessions: () => {},
  exportSession: async () => '',
  reset: () => {}
}

/**
 * SSR-safe hook for accessing the chat store
 * This hook ensures that:
 * 1. The same hooks are called on every render (no conditional hooks)
 * 2. Stable default values are returned during SSR
 * 3. The store is properly hydrated on the client
 */
export function useChatStoreSafe(): ChatState {
  // Always call the store hook - this ensures consistent hook order
  const store = useChatStore()
  
  // Track hydration state separately
  const [isHydrated, setIsHydrated] = useState(false)
  
  useEffect(() => {
    // Check if the store has been hydrated
    const hasHydrated = useChatStore.persist?.hasHydrated?.() ?? true
    setIsHydrated(hasHydrated)
    
    // If not hydrated yet, listen for hydration
    if (!hasHydrated && useChatStore.persist) {
      const unsubscribe = useChatStore.persist.onFinishHydration(() => {
        setIsHydrated(true)
      })
      
      return unsubscribe
    }
  }, [])
  
  // Return the actual store if hydrated, otherwise return defaults
  // This ensures we always return a consistent shape
  return isHydrated ? store : DEFAULT_STORE_STATE
}

/**
 * Hook to check if the store is hydrated
 * Useful for showing loading states
 */
export function useIsChatStoreHydrated(): boolean {
  const [isHydrated, setIsHydrated] = useState(false)
  
  useEffect(() => {
    const hasHydrated = useChatStore.persist?.hasHydrated?.() ?? true
    setIsHydrated(hasHydrated)
    
    if (!hasHydrated && useChatStore.persist) {
      const unsubscribe = useChatStore.persist.onFinishHydration(() => {
        setIsHydrated(true)
      })
      
      return unsubscribe
    }
  }, [])
  
  return isHydrated
}