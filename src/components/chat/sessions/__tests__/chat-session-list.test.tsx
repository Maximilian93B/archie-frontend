import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChatSessionList } from '../chat-session-list'
import { Skeleton } from '@/components/ui/skeleton'

// Mock Skeleton component
vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ className }: any) => <div data-testid="skeleton" className={className} />
}))

// Import hooks for mocking
import * as chatQueries from '@/hooks/queries/chat.queries'

// Mock API hooks
vi.mock('@/hooks/queries/chat.queries', () => ({
  useChatSessions: vi.fn(),
  useDeleteChatSession: vi.fn(),
  useUpdateSessionName: vi.fn(),
  usePrefetchChatSession: vi.fn(),
}))

// Test data
const mockSessions = {
  data: [
    {
      id: 'session-1',
      session_name: 'Financial Analysis',
      document_id: 'doc-1',
      messages: [
        { id: '1', role: 'user', content: 'What is the revenue?' },
        { id: '2', role: 'assistant', content: 'The revenue is $1M' }
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'session-2',
      session_name: 'Contract Review',
      document_id: 'doc-2',
      messages: [
        { id: '3', role: 'user', content: 'Summarize the terms' },
        { id: '4', role: 'assistant', content: 'The main terms are...' }
      ],
      created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      updated_at: new Date(Date.now() - 86400000).toISOString()
    }
  ]
}

// Test wrapper
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('ChatSessionList', () => {
  const mockOnSessionSelect = vi.fn()
  const mockOnCreateSession = vi.fn()
  const mockPrefetch = vi.fn()
  
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(chatQueries.usePrefetchChatSession).mockReturnValue(mockPrefetch)
  })

  it('should render loading state', () => {
    vi.mocked(chatQueries.useChatSessions).mockReturnValue({
      data: null,
      isLoading: true
    } as any)
    
    render(
      <ChatSessionList
        onSessionSelect={mockOnSessionSelect}
        onCreateSession={mockOnCreateSession}
      />,
      { wrapper: createWrapper() }
    )
    
    expect(screen.getAllByTestId('skeleton')).toHaveLength(5)
  })

  it('should render empty state', () => {
    vi.mocked(chatQueries.useChatSessions).mockReturnValue({
      data: { data: [] },
      isLoading: false
    } as any)
    
    render(
      <ChatSessionList
        onSessionSelect={mockOnSessionSelect}
        onCreateSession={mockOnCreateSession}
      />,
      { wrapper: createWrapper() }
    )
    
    expect(screen.getByText('No chat sessions yet')).toBeInTheDocument()
  })

  it('should render session list', () => {
    vi.mocked(chatQueries.useChatSessions).mockReturnValue({
      data: mockSessions,
      isLoading: false
    } as any)
    
    render(
      <ChatSessionList
        onSessionSelect={mockOnSessionSelect}
        onCreateSession={mockOnCreateSession}
      />,
      { wrapper: createWrapper() }
    )
    
    expect(screen.getByText('Financial Analysis')).toBeInTheDocument()
    expect(screen.getByText('Contract Review')).toBeInTheDocument()
    expect(screen.getByText('The revenue is $1M')).toBeInTheDocument()
    // Both sessions have 2 messages
    expect(screen.getAllByText('2 messages')).toHaveLength(2)
  })

  it('should highlight current session', () => {
    vi.mocked(chatQueries.useChatSessions).mockReturnValue({
      data: mockSessions,
      isLoading: false
    } as any)
    
    render(
      <ChatSessionList
        currentSessionId="session-1"
        onSessionSelect={mockOnSessionSelect}
        onCreateSession={mockOnCreateSession}
      />,
      { wrapper: createWrapper() }
    )
    
    // Get the session container that has the bg-gray-100 class
    const currentSession = screen.getByText('Financial Analysis').closest('div[class*="rounded-lg"]')
    expect(currentSession).toHaveClass('bg-gray-100')
  })

  it('should handle session search', async () => {
    vi.mocked(chatQueries.useChatSessions).mockReturnValue({
      data: mockSessions,
      isLoading: false
    } as any)
    
    const user = userEvent.setup()
    
    render(
      <ChatSessionList
        onSessionSelect={mockOnSessionSelect}
        onCreateSession={mockOnCreateSession}
      />,
      { wrapper: createWrapper() }
    )
    
    const searchInput = screen.getByPlaceholderText('Search conversations...')
    await user.type(searchInput, 'revenue')
    
    // Should filter sessions
    expect(screen.getByText('Financial Analysis')).toBeInTheDocument()
    expect(screen.queryByText('Contract Review')).not.toBeInTheDocument()
  })

  it('should handle session click and prefetch', async () => {
    vi.mocked(chatQueries.useChatSessions).mockReturnValue({
      data: mockSessions,
      isLoading: false
    } as any)
    
    const user = userEvent.setup()
    
    render(
      <ChatSessionList
        onSessionSelect={mockOnSessionSelect}
        onCreateSession={mockOnCreateSession}
      />,
      { wrapper: createWrapper() }
    )
    
    const session = screen.getByText('Financial Analysis').closest('div[class*="rounded-lg"]')!
    
    // Hover should prefetch
    fireEvent.mouseEnter(session)
    expect(mockPrefetch).toHaveBeenCalledWith('session-1')
    
    // Click should select
    await user.click(session)
    expect(mockOnSessionSelect).toHaveBeenCalledWith('session-1')
  })

  it('should handle session rename', async () => {
    const mockMutate = vi.fn()
    
    vi.mocked(chatQueries.useChatSessions).mockReturnValue({
      data: mockSessions,
      isLoading: false
    } as any)
    
    vi.mocked(chatQueries.useUpdateSessionName).mockReturnValue({
      mutateAsync: mockMutate
    } as any)
    
    const user = userEvent.setup()
    
    render(
      <ChatSessionList
        onSessionSelect={mockOnSessionSelect}
        onCreateSession={mockOnCreateSession}
      />,
      { wrapper: createWrapper() }
    )
    
    // Hover over the session to make the dropdown button visible
    const session = screen.getByText('Financial Analysis').closest('div[class*="rounded-lg"]')!
    fireEvent.mouseEnter(session)
    
    // Find the dropdown menu button
    const dropdownButton = within(session).getByRole('button', { name: '' })
    await user.click(dropdownButton)
    
    // Click rename
    const renameButton = await screen.findByText('Rename')
    await user.click(renameButton)
    
    // Should show input
    const input = screen.getByPlaceholderText('Session name')
    await user.clear(input)
    await user.type(input, 'New Name')
    
    // Submit
    const saveButton = screen.getByText('Save')
    await user.click(saveButton)
    
    expect(mockMutate).toHaveBeenCalledWith({
      sessionId: 'session-1',
      name: 'New Name'
    })
  })

  it('should handle session delete', async () => {
    const mockMutate = vi.fn()
    
    vi.mocked(chatQueries.useChatSessions).mockReturnValue({
      data: mockSessions,
      isLoading: false
    } as any)
    
    vi.mocked(chatQueries.useDeleteChatSession).mockReturnValue({
      mutateAsync: mockMutate
    } as any)
    
    const user = userEvent.setup()
    
    render(
      <ChatSessionList
        currentSessionId="session-1"
        onSessionSelect={mockOnSessionSelect}
        onCreateSession={mockOnCreateSession}
      />,
      { wrapper: createWrapper() }
    )
    
    // Hover over the session to make the dropdown button visible
    const session = screen.getByText('Financial Analysis').closest('div[class*="rounded-lg"]')!
    fireEvent.mouseEnter(session)
    
    // Find dropdown button
    const dropdownButton = within(session).getByRole('button', { name: '' })
    await user.click(dropdownButton)
    
    // Click delete
    const deleteButton = await screen.findByText('Delete')
    await user.click(deleteButton)
    
    // Confirm dialog should appear
    expect(screen.getByText('Delete chat session?')).toBeInTheDocument()
    
    const confirmButton = screen.getByRole('button', { name: 'Delete' })
    await user.click(confirmButton)
    
    expect(mockMutate).toHaveBeenCalledWith('session-1')
    
    // Should clear selection if deleting current
    await waitFor(() => {
      expect(mockOnSessionSelect).toHaveBeenCalledWith('')
    })
  })

  it('should handle create new session', async () => {
    vi.mocked(chatQueries.useChatSessions).mockReturnValue({
      data: mockSessions,
      isLoading: false
    } as any)
    
    const user = userEvent.setup()
    
    render(
      <ChatSessionList
        onSessionSelect={mockOnSessionSelect}
        onCreateSession={mockOnCreateSession}
      />,
      { wrapper: createWrapper() }
    )
    
    const newButton = screen.getByRole('button', { name: /new/i })
    await user.click(newButton)
    
    expect(mockOnCreateSession).toHaveBeenCalled()
  })

  it('should handle empty search results', async () => {
    vi.mocked(chatQueries.useChatSessions).mockReturnValue({
      data: mockSessions,
      isLoading: false
    } as any)
    
    const user = userEvent.setup()
    
    render(
      <ChatSessionList
        onSessionSelect={mockOnSessionSelect}
        onCreateSession={mockOnCreateSession}
      />,
      { wrapper: createWrapper() }
    )
    
    const searchInput = screen.getByPlaceholderText('Search conversations...')
    await user.type(searchInput, 'nonexistent')
    
    expect(screen.getByText('No sessions found')).toBeInTheDocument()
  })
})