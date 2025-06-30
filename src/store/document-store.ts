import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Document } from '@/types'

interface DocumentState {
  // Selected documents for bulk operations
  selectedDocuments: Set<string>
  
  // Current document being viewed
  currentDocument: Document | null
  
  // View preferences
  viewMode: 'list' | 'grid'
  sortBy: 'created_at' | 'title' | 'file_size' | 'updated_at'
  sortOrder: 'asc' | 'desc'
  
  // Filter state
  filters: {
    documentType?: string[]
    aiProcessed?: boolean
    folderId?: string
    dateRange?: {
      from: Date
      to: Date
    }
  }
  
  // Actions
  toggleDocumentSelection: (documentId: string) => void
  selectAllDocuments: (documentIds: string[]) => void
  clearSelection: () => void
  setCurrentDocument: (document: Document | null) => void
  setViewMode: (mode: 'list' | 'grid') => void
  setSortBy: (field: 'created_at' | 'title' | 'file_size' | 'updated_at') => void
  toggleSortOrder: () => void
  setFilters: (filters: DocumentState['filters']) => void
  clearFilters: () => void
}

export const useDocumentStore = create<DocumentState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        selectedDocuments: new Set(),
        currentDocument: null,
        viewMode: 'list',
        sortBy: 'created_at',
        sortOrder: 'desc',
        filters: {},
        
        // Actions
        toggleDocumentSelection: (documentId) =>
          set((state) => {
            const newSelection = new Set(state.selectedDocuments)
            if (newSelection.has(documentId)) {
              newSelection.delete(documentId)
            } else {
              newSelection.add(documentId)
            }
            return { selectedDocuments: newSelection }
          }),
          
        selectAllDocuments: (documentIds) =>
          set({ selectedDocuments: new Set(documentIds) }),
          
        clearSelection: () =>
          set({ selectedDocuments: new Set() }),
          
        setCurrentDocument: (document) =>
          set({ currentDocument: document }),
          
        setViewMode: (mode) =>
          set({ viewMode: mode }),
          
        setSortBy: (field) =>
          set({ sortBy: field }),
          
        toggleSortOrder: () =>
          set((state) => ({
            sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc'
          })),
          
        setFilters: (filters) =>
          set({ filters }),
          
        clearFilters: () =>
          set({ filters: {} }),
      }),
      {
        name: 'document-preferences',
        partialize: (state) => ({
          viewMode: state.viewMode,
          sortBy: state.sortBy,
          sortOrder: state.sortOrder,
        }),
      }
    )
  )
)

// Selector hooks for common use cases
export const useSelectedDocumentCount = () =>
  useDocumentStore((state) => state.selectedDocuments.size)

export const useIsDocumentSelected = (documentId: string) =>
  useDocumentStore((state) => state.selectedDocuments.has(documentId))

export const useDocumentViewPreferences = () =>
  useDocumentStore((state) => ({
    viewMode: state.viewMode,
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
  }))