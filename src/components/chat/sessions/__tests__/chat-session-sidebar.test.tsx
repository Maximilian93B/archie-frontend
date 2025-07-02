import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChatSessionSidebar } from '../chat-session-sidebar'
import { useChatStore } from '@/store/chat-store'
import { vi } from 'vitest'

// Mock the chat store
vi.mock('@/store/chat-store')
const mockUseChatStore = useChatStore as ReturnType<typeof vi.fn>

// Mock the query hooks
vi.mock('@/hooks/queries/chat.queries', () => ({
  useChatSessions: () => ({ data: [], isLoading: false }),
}))

// Mock the child components
vi.mock('../session-quick-actions', () => ({
  SessionQuickActions: () => <div data-testid="session-quick-actions">Quick Actions</div>
}))

vi.mock('../session-search', () => ({
  SessionSearch: () => <div data-testid="session-search">Search</div>
}))

vi.mock('../pinned-sessions', () => ({
  PinnedSessions: () => <div data-testid="pinned-sessions">Pinned Sessions</div>
}))

vi.mock('../session-grouping', () => ({
  SessionGrouping: () => <div data-testid="session-grouping">Session Grouping</div>
}))

describe('ChatSessionSidebar', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    
    // Default mock implementation
    mockUseChatStore.mockReturnValue({
      sessionSidebarOpen: true,
      toggleSessionSidebar: vi.fn(),
      searchQuery: '',
      sessionsList: [],
      regroupSessions: vi.fn(),
      pinnedSessionIds: new Set(),
      sessionGroups: {
        byDocument: new Map(),
        byDate: {
          today: [],
          thisWeek: [],
          thisMonth: [],
          older: []
        }
      },
      expandedGroups: new Set(['pinned', 'today']),
      filteredSessions: [],
      // Add other required properties with default values
      currentSessionId: null,
      currentSession: null,
      sessions: new Map(),
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
      searchResults: [],
      isSearching: false,
      recentSessionIds: [],
      maxRecentSessions: 10,
      messagesSentInLastMinute: 0,
      lastMessageTimestamp: 0,
      setCurrentSession: vi.fn(),
      updateSession: vi.fn(),
      addSession: vi.fn(),
      removeSession: vi.fn(),
      addMessage: vi.fn(),
      updateMessage: vi.fn(),
      addOptimisticMessage: vi.fn(),
      setDraft: vi.fn(),
      clearDraft: vi.fn(),
      setSearchQuery: vi.fn(),
      setSearchResults: vi.fn(),
      setIsLoading: vi.fn(),
      setIsAsking: vi.fn(),
      setIsFetchingSessions: vi.fn(),
      setPagination: vi.fn(),
      addToRecentSessions: vi.fn(),
      clearOldSessions: vi.fn(),
      canSendMessage: vi.fn(),
      incrementMessageCount: vi.fn(),
      pinSession: vi.fn(),
      unpinSession: vi.fn(),
      setSessionSidebarOpen: vi.fn(),
      toggleGroup: vi.fn(),
      searchSessions: vi.fn(),
      exportSession: vi.fn(),
      reset: vi.fn()
    })
  })

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChatSessionSidebar />
      </QueryClientProvider>
    )
  }

  it('renders the sidebar when open', () => {
    renderComponent()
    
    expect(screen.getByText('Chats')).toBeInTheDocument()
    expect(screen.getByTestId('session-quick-actions')).toBeInTheDocument()
    expect(screen.getByTestId('session-search')).toBeInTheDocument()
  })

  it('shows empty state when no sessions', () => {
    renderComponent()
    
    expect(screen.getByText('No conversations yet')).toBeInTheDocument()
    expect(screen.getByText('Start chatting with your documents to see conversations here')).toBeInTheDocument()
  })

  it('renders pinned sessions and grouping when sessions exist', () => {
    mockUseChatStore.mockReturnValue({
      ...mockUseChatStore(),
      sessionsList: [
        {
          id: 'session-1',
          documentId: 'doc-1',
          sessionName: 'Test Session',
          messages: [],
          isActive: true,
          totalMessages: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          canModify: true
        }
      ]
    })

    renderComponent()
    
    expect(screen.getByTestId('pinned-sessions')).toBeInTheDocument()
    expect(screen.getByTestId('session-grouping')).toBeInTheDocument()
  })

  it('shows session count in header', () => {
    mockUseChatStore.mockReturnValue({
      ...mockUseChatStore(),
      sessionsList: [
        {
          id: 'session-1',
          documentId: 'doc-1',
          sessionName: 'Test Session',
          messages: [],
          isActive: true,
          totalMessages: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          canModify: true
        },
        {
          id: 'session-2',
          documentId: 'doc-2',
          sessionName: 'Another Session',
          messages: [],
          isActive: true,
          totalMessages: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          canModify: true
        }
      ]
    })

    renderComponent()
    
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})