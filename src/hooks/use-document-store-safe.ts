'use client'

import { useEffect, useState } from 'react'
import { useDocumentStore, type DocumentState } from '@/store/document-store'

// Default state that matches the store structure
const DEFAULT_STORE_STATE: DocumentState = {
  // Selected documents for bulk operations
  selectedDocuments: [],
  
  // Current document being viewed
  currentDocument: null,
  
  // View preferences
  viewMode: 'list',
  sortBy: 'created_at',
  sortOrder: 'desc',
  
  // Filter state
  filters: {},
  
  // Actions - all no-op functions for SSR
  toggleDocumentSelection: () => {},
  selectAllDocuments: () => {},
  clearSelection: () => {},
  setCurrentDocument: () => {},
  setViewMode: () => {},
  setSortBy: () => {},
  setSortOrder: () => {},
  toggleSortOrder: () => {},
  setFilters: () => {},
  clearFilters: () => {},
}

// Default view preferences for SSR
const DEFAULT_VIEW_PREFERENCES = {
  viewMode: 'list' as const,
  sortBy: 'created_at' as const,
  sortOrder: 'desc' as const,
}

/**
 * SSR-safe hook for accessing the document store
 * This hook ensures that:
 * 1. The same hooks are called on every render (no conditional hooks)
 * 2. Stable default values are returned during SSR
 * 3. The store is properly hydrated on the client
 */
export function useDocumentStoreSafe(): DocumentState {
  // Always call the store hook - this ensures consistent hook order
  const store = useDocumentStore()
  
  // Track hydration state separately
  const [isHydrated, setIsHydrated] = useState(false)
  
  useEffect(() => {
    // Check if the store has been hydrated
    const hasHydrated = useDocumentStore.persist?.hasHydrated?.() ?? true
    setIsHydrated(hasHydrated)
    
    // If not hydrated yet, listen for hydration
    if (!hasHydrated && useDocumentStore.persist) {
      const unsubscribe = useDocumentStore.persist.onFinishHydration(() => {
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
 * SSR-safe hook for document view preferences
 * Returns stable default values during SSR
 */
export function useDocumentViewPreferencesSafe() {
  const store = useDocumentStoreSafe()
  const [preferences, setPreferences] = useState(DEFAULT_VIEW_PREFERENCES)
  
  useEffect(() => {
    // Update preferences once hydrated
    setPreferences({
      viewMode: store.viewMode,
      sortBy: store.sortBy,
      sortOrder: store.sortOrder,
    })
  }, [store.viewMode, store.sortBy, store.sortOrder])
  
  return preferences
}

/**
 * Hook to check if the store is hydrated
 * Useful for showing loading states
 */
export function useIsDocumentStoreHydrated(): boolean {
  const [isHydrated, setIsHydrated] = useState(false)
  
  useEffect(() => {
    const hasHydrated = useDocumentStore.persist?.hasHydrated?.() ?? true
    setIsHydrated(hasHydrated)
    
    if (!hasHydrated && useDocumentStore.persist) {
      const unsubscribe = useDocumentStore.persist.onFinishHydration(() => {
        setIsHydrated(true)
      })
      
      return unsubscribe
    }
  }, [])
  
  return isHydrated
}

/**
 * SSR-safe hook to check if a document is selected
 */
export function useIsDocumentSelectedSafe(documentId: string): boolean {
  const { selectedDocuments } = useDocumentStoreSafe()
  return selectedDocuments.includes(documentId)
}

/**
 * SSR-safe hook to get the count of selected documents
 */
export function useSelectedDocumentCountSafe(): number {
  const { selectedDocuments } = useDocumentStoreSafe()
  return selectedDocuments.length
}