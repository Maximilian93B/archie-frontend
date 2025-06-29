import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, Document, ChatSession, SearchFilters, SearchResult } from '@/types';

interface AppState {
  // Authentication
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // UI State
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  mobileMenuOpen: boolean;
  
  // Document State
  selectedDocuments: string[];
  currentDocument: Document | null;
  
  // Chat State
  activeChatSession: string | null;
  chatSessions: ChatSession[];
  
  // Search State
  searchQuery: string;
  searchFilters: SearchFilters;
  searchResults: SearchResult[];
  recentSearches: string[];
  
  // Upload State
  uploadQueue: Array<{
    id: string;
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'error';
    error?: string;
  }>;
  
  // View Preferences
  documentViewMode: 'grid' | 'list' | 'table';
  documentsPerPage: number;
}

interface AppActions {
  // Authentication Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  clearAuth: () => void;
  
  // UI Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  
  // Document Actions
  selectDocument: (id: string) => void;
  deselectDocument: (id: string) => void;
  toggleDocumentSelection: (id: string) => void;
  selectAllDocuments: (ids: string[]) => void;
  clearSelectedDocuments: () => void;
  setCurrentDocument: (document: Document | null) => void;
  
  // Chat Actions
  setActiveChatSession: (sessionId: string | null) => void;
  addChatSession: (session: ChatSession) => void;
  updateChatSession: (session: ChatSession) => void;
  removeChatSession: (sessionId: string) => void;
  setChatSessions: (sessions: ChatSession[]) => void;
  
  // Search Actions
  setSearchQuery: (query: string) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  setSearchResults: (results: SearchResult[]) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  clearSearch: () => void;
  
  // Upload Actions
  addToUploadQueue: (file: File) => void;
  updateUploadProgress: (id: string, progress: number) => void;
  setUploadStatus: (id: string, status: string, error?: string) => void;
  removeFromUploadQueue: (id: string) => void;
  clearUploadQueue: () => void;
  
  // View Preference Actions
  setDocumentViewMode: (mode: 'grid' | 'list' | 'table') => void;
  setDocumentsPerPage: (count: number) => void;
}

type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      token: null,
      isAuthenticated: false,
      sidebarOpen: true,
      theme: 'light',
      mobileMenuOpen: false,
      selectedDocuments: [],
      currentDocument: null,
      activeChatSession: null,
      chatSessions: [],
      searchQuery: '',
      searchFilters: {},
      searchResults: [],
      recentSearches: [],
      uploadQueue: [],
      documentViewMode: 'grid',
      documentsPerPage: 20,
      
      // Authentication Actions
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      clearAuth: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false,
        selectedDocuments: [],
        currentDocument: null,
        activeChatSession: null,
        chatSessions: [],
      }),
      
      // UI Actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      
      // Document Actions
      selectDocument: (id) => set((state) => ({
        selectedDocuments: state.selectedDocuments.includes(id)
          ? state.selectedDocuments
          : [...state.selectedDocuments, id]
      })),
      
      deselectDocument: (id) => set((state) => ({
        selectedDocuments: state.selectedDocuments.filter(docId => docId !== id)
      })),
      
      toggleDocumentSelection: (id) => set((state) => ({
        selectedDocuments: state.selectedDocuments.includes(id)
          ? state.selectedDocuments.filter(docId => docId !== id)
          : [...state.selectedDocuments, id]
      })),
      
      selectAllDocuments: (ids) => set({ selectedDocuments: ids }),
      clearSelectedDocuments: () => set({ selectedDocuments: [] }),
      setCurrentDocument: (document) => set({ currentDocument: document }),
      
      // Chat Actions
      setActiveChatSession: (sessionId) => set({ activeChatSession: sessionId }),
      
      addChatSession: (session) => set((state) => ({
        chatSessions: [session, ...state.chatSessions]
      })),
      
      updateChatSession: (session) => set((state) => ({
        chatSessions: state.chatSessions.map(s => 
          s.id === session.id ? session : s
        )
      })),
      
      removeChatSession: (sessionId) => set((state) => ({
        chatSessions: state.chatSessions.filter(s => s.id !== sessionId),
        activeChatSession: state.activeChatSession === sessionId 
          ? null 
          : state.activeChatSession
      })),
      
      setChatSessions: (sessions) => set({ chatSessions: sessions }),
      
      // Search Actions
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSearchFilters: (filters) => set({ searchFilters: filters }),
      setSearchResults: (results) => set({ searchResults: results }),
      
      addRecentSearch: (query) => set((state) => {
        if (query.length < 2) return state;
        
        const filtered = state.recentSearches.filter(search => search !== query);
        return {
          recentSearches: [query, ...filtered].slice(0, 10) // Keep last 10
        };
      }),
      
      clearRecentSearches: () => set({ recentSearches: [] }),
      
      clearSearch: () => set({ 
        searchQuery: '', 
        searchFilters: {}, 
        searchResults: [] 
      }),
      
      // Upload Actions
      addToUploadQueue: (file) => set((state) => ({
        uploadQueue: [...state.uploadQueue, {
          id: `${Date.now()}-${file.name}`,
          file,
          progress: 0,
          status: 'pending',
        }]
      })),
      
      updateUploadProgress: (id, progress) => set((state) => ({
        uploadQueue: state.uploadQueue.map(item =>
          item.id === id ? { ...item, progress, status: 'uploading' } : item
        )
      })),
      
      setUploadStatus: (id, status, error) => set((state) => ({
        uploadQueue: state.uploadQueue.map(item =>
          item.id === id ? { 
            ...item, 
            status: status as any,
            error,
            progress: status === 'completed' ? 100 : item.progress
          } : item
        )
      })),
      
      removeFromUploadQueue: (id) => set((state) => ({
        uploadQueue: state.uploadQueue.filter(item => item.id !== id)
      })),
      
      clearUploadQueue: () => set({ uploadQueue: [] }),
      
      // View Preference Actions
      setDocumentViewMode: (mode) => set({ documentViewMode: mode }),
      setDocumentsPerPage: (count) => set({ documentsPerPage: count }),
    }),
    {
      name: 'archivus-app-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        documentViewMode: state.documentViewMode,
        documentsPerPage: state.documentsPerPage,
        recentSearches: state.recentSearches,
      }),
    }
  )
);

// Selectors for common state combinations
export const useAuthState = () => useAppStore((state) => ({
  user: state.user,
  token: state.token,
  isAuthenticated: state.isAuthenticated,
}));

export const useUIState = () => useAppStore((state) => ({
  sidebarOpen: state.sidebarOpen,
  theme: state.theme,
  mobileMenuOpen: state.mobileMenuOpen,
}));

export const useDocumentState = () => useAppStore((state) => ({
  selectedDocuments: state.selectedDocuments,
  currentDocument: state.currentDocument,
  documentViewMode: state.documentViewMode,
  documentsPerPage: state.documentsPerPage,
}));

export const useChatState = () => useAppStore((state) => ({
  activeChatSession: state.activeChatSession,
  chatSessions: state.chatSessions,
}));

export const useSearchState = () => useAppStore((state) => ({
  searchQuery: state.searchQuery,
  searchFilters: state.searchFilters,
  searchResults: state.searchResults,
  recentSearches: state.recentSearches,
}));

export const useUploadState = () => useAppStore((state) => ({
  uploadQueue: state.uploadQueue,
})); 