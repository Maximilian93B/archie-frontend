import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import type { Document } from '@/types'

export interface DocumentState {
  // Selected documents for bulk operations
  selectedDocuments: string[]
  
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
  setSortOrder: (order: 'asc' | 'desc') => void
  toggleSortOrder: () => void
  setFilters: (filters: DocumentState['filters']) => void
  clearFilters: () => void
}

export const useDocumentStore = create<DocumentState>()(
  subscribeWithSelector(
    devtools(
      persist(
        (set) => ({
        // Initial state
        selectedDocuments: [],
        currentDocument: null,
        viewMode: 'list',
        sortBy: 'created_at',
        sortOrder: 'desc',
        filters: {},
        
        // Actions
        toggleDocumentSelection: (documentId) =>
          set((state) => {
            const isSelected = state.selectedDocuments.includes(documentId)
            if (isSelected) {
              return { selectedDocuments: state.selectedDocuments.filter(id => id !== documentId) }
            } else {
              return { selectedDocuments: [...state.selectedDocuments, documentId] }
            }
          }),
          
        selectAllDocuments: (documentIds) =>
          set({ selectedDocuments: documentIds }),
          
        clearSelection: () =>
          set({ selectedDocuments: [] }),
          
        setCurrentDocument: (document) =>
          set({ currentDocument: document }),
          
        setViewMode: (mode) =>
          set({ viewMode: mode }),
          
        setSortBy: (field) =>
          set({ sortBy: field }),
          
        setSortOrder: (order) =>
          set({ sortOrder: order }),
          
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
)

// Selector hooks for common use cases
export const useSelectedDocumentCount = () =>
  useDocumentStore((state) => state.selectedDocuments.length)

export const useIsDocumentSelected = (documentId: string) =>
  useDocumentStore((state) => state.selectedDocuments.includes(documentId))

// Use shallow comparison for object selectors to ensure stable references
export const useDocumentViewPreferences = () =>
  useDocumentStore(
    (state) => ({
      viewMode: state.viewMode,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder,
    }),
    shallow
  )