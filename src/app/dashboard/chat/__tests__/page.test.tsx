import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ChatPage from '../page'
import { useRouter, useSearchParams } from 'next/navigation'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}))

// Import API client for mocking
import { apiClient } from '@/lib/api/client'
import { useChatStore } from '@/store/chat-store'

// Mock API client
vi.mock('@/lib/api/client', () => ({
  apiClient: {
    getChatSessions: vi.fn(),
    getChatSession: vi.fn(),
    createChatSession: vi.fn(),
    askQuestion: vi.fn(),
    deleteChatSession: vi.fn(),
    updateSessionName: vi.fn(),
    getDocuments: vi.fn(),
  }
}))

// Mock chat store
vi.mock('@/store/chat-store', () => ({
  useChatStore: vi.fn()
}))

// Mock components
vi.mock('@/components/chat/sessions/chat-session-list', () => ({
  ChatSessionList: ({ onSessionSelect, onCreateSession }: any) => (
    <div data-testid="session-list">
      <button onClick={() => onSessionSelect('session-1')}>Select Session 1</button>
      <button onClick={onCreateSession}>Create Session</button>
    </div>
  )
}))

vi.mock('@/components/chat/virtualized-message-list', () => ({
  VirtualizedMessageList: ({ messages = [], isLoading }: any) => (
    <div data-testid="message-list">
      {isLoading && <div>Loading messages...</div>}
      {messages.map((msg: any) => (
        <div key={msg.id}>{msg.content}</div>
      ))}
    </div>
  )
}))

vi.mock('@/components/chat/chat-input', () => ({
  ChatInput: ({ onSend, disabled, value, onChange, placeholder }: any) => (
    <div data-testid="chat-input">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        data-testid="message-input"
      />
      <button onClick={() => onSend(value)} disabled={disabled}>Send</button>
    </div>
  )
}))

vi.mock('@/components/documents/document-picker', () => ({
  DocumentPicker: ({ onSelect }: any) => (
    <div data-testid="document-picker">
      <button onClick={() => onSelect('doc-1')}>Select Document 1</button>
    </div>
  )
}))

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

describe('ChatPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useRouter).mockReturnValue({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
    } as any)
    vi.mocked(useSearchParams).mockReturnValue({
      get: vi.fn().mockReturnValue(null),
    } as any)
    
    // Default mock for chat store
    vi.mocked(useChatStore).mockReturnValue({
      drafts: new Map(),
      setDraft: vi.fn(),
      clearDraft: vi.fn(),
      canSendMessage: vi.fn().mockReturnValue(true),
      incrementMessageCount: vi.fn(),
      messagesSentInLastMinute: 0,
      isRateLimited: false,
    } as any)
  })

  it('should render empty state when no sessions exist', () => {
    vi.mocked(apiClient).getChatSessions.mockResolvedValue({ data: [] })
    
    render(<ChatPage />, { wrapper: createWrapper() })
    
    expect(screen.getByText('Start a New Chat')).toBeInTheDocument()
    expect(screen.getByText('Select a document to begin asking questions')).toBeInTheDocument()
  })

  it('should load and display existing sessions', async () => {
    const mockSessions = {
      data: [
        {
          id: 'session-1',
          session_name: 'Test Session',
          document_id: 'doc-1',
          messages: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
    }
    
    vi.mocked(apiClient).getChatSessions.mockResolvedValue(mockSessions)
    vi.mocked(apiClient).getChatSession.mockResolvedValue({
      session: mockSessions.data[0]
    })
    
    render(<ChatPage />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByTestId('session-list')).toBeInTheDocument()
    })
  })

  it('should create new session with document picker', async () => {
    const user = userEvent.setup()
    
    vi.mocked(apiClient).getChatSessions.mockResolvedValue({ data: [] })
    vi.mocked(apiClient).createChatSession.mockResolvedValue({
      session: {
        id: 'new-session',
        session_name: 'New Chat',
        document_id: 'doc-1',
        messages: []
      }
    })
    
    render(<ChatPage />, { wrapper: createWrapper() })
    
    // Click choose document
    const chooseDocButton = screen.getByText('Choose Document')
    await user.click(chooseDocButton)
    
    // Document picker should open
    expect(screen.getByTestId('document-picker')).toBeInTheDocument()
    
    // Select a document
    const selectDocButton = screen.getByText('Select Document 1')
    await user.click(selectDocButton)
    
    await waitFor(() => {
      expect(apiClient.createChatSession).toHaveBeenCalledWith({
        document_id: 'doc-1',
        session_name: expect.any(String)
      })
    })
  })

  it('should send messages and handle responses', async () => {
    const user = userEvent.setup()
    
    const mockSession = {
      id: 'session-1',
      session_name: 'Test Session',
      document_id: 'doc-1',
      messages: [
        { id: '1', role: 'user', content: 'Hello', timestamp: new Date().toISOString() },
        { id: '2', role: 'assistant', content: 'Hi there!', timestamp: new Date().toISOString() }
      ]
    }
    
    vi.mocked(apiClient).getChatSessions.mockResolvedValue({ data: [mockSession] })
    vi.mocked(apiClient).getChatSession.mockResolvedValue({ session: mockSession })
    vi.mocked(apiClient).askQuestion.mockResolvedValue({
      answer: 'This is the response',
      message_id: 'msg-3'
    })
    
    render(<ChatPage />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByTestId('message-list')).toBeInTheDocument()
    })
    
    // Type and send message
    const input = screen.getByTestId('message-input')
    await user.type(input, 'Test question')
    
    const sendButton = screen.getByText('Send')
    await user.click(sendButton)
    
    await waitFor(() => {
      expect(apiClient.askQuestion).toHaveBeenCalledWith({
        sessionId: 'session-1',
        question: 'Test question'
      })
    })
  })

  it('should handle session rename', async () => {
    const user = userEvent.setup()
    
    const mockSession = {
      id: 'session-1',
      session_name: 'Old Name',
      document_id: 'doc-1',
      messages: []
    }
    
    vi.mocked(apiClient).getChatSessions.mockResolvedValue({ data: [mockSession] })
    vi.mocked(apiClient).getChatSession.mockResolvedValue({ session: mockSession })
    vi.mocked(apiClient).updateSessionName.mockResolvedValue({
      session: { ...mockSession, session_name: 'New Name' }
    })
    
    render(<ChatPage />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByText('Old Name')).toBeInTheDocument()
    })
    
    // Click edit button
    const editButton = screen.getByRole('button', { name: /edit/i })
    await user.click(editButton)
    
    // Should show input
    const nameInput = screen.getByPlaceholderText('Session name')
    await user.clear(nameInput)
    await user.type(nameInput, 'New Name')
    
    const saveButton = screen.getByText('Save')
    await user.click(saveButton)
    
    await waitFor(() => {
      expect(apiClient.updateSessionName).toHaveBeenCalledWith({
        sessionId: 'session-1',
        name: 'New Name'
      })
    })
  })

  it('should handle session deletion', async () => {
    const user = userEvent.setup()
    
    const mockSession = {
      id: 'session-1',
      session_name: 'Test Session',
      document_id: 'doc-1',
      messages: []
    }
    
    vi.mocked(apiClient).getChatSessions.mockResolvedValue({ data: [mockSession] })
    vi.mocked(apiClient).getChatSession.mockResolvedValue({ session: mockSession })
    vi.mocked(apiClient).deleteChatSession.mockResolvedValue({})
    
    // Mock window.confirm
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    
    render(<ChatPage />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByText('Test Session')).toBeInTheDocument()
    })
    
    // Click delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    await user.click(deleteButton)
    
    await waitFor(() => {
      expect(apiClient.deleteChatSession).toHaveBeenCalledWith('session-1')
    })
  })

  it('should handle rate limiting', async () => {
    // Mock rate limited state
    vi.mocked(useChatStore).mockReturnValue({
      canSendMessage: vi.fn().mockReturnValue(false),
      isRateLimited: true,
      messagesSentInLastMinute: 10,
      drafts: new Map(),
      setDraft: vi.fn(),
      clearDraft: vi.fn(),
      incrementMessageCount: vi.fn()
    } as any)
    
    const mockSession = {
      id: 'session-1',
      session_name: 'Test Session',
      document_id: 'doc-1',
      messages: []
    }
    
    vi.mocked(apiClient).getChatSessions.mockResolvedValue({ data: [mockSession] })
    vi.mocked(apiClient).getChatSession.mockResolvedValue({ session: mockSession })
    
    render(<ChatPage />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Rate limited/)).toBeInTheDocument()
    })
  })

  it('should handle document ID from URL params', async () => {
    
    vi.mocked(useSearchParams).mockReturnValue({
      get: vi.fn().mockReturnValue('doc-123'),
    } as any)
    
    const mockSession = {
      id: 'session-1',
      session_name: 'Test Session',
      document_id: 'doc-123',
      messages: []
    }
    
    vi.mocked(apiClient).getChatSessions.mockResolvedValue({ data: [mockSession] })
    vi.mocked(apiClient).getChatSession.mockResolvedValue({ session: mockSession })
    
    render(<ChatPage />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(apiClient.getChatSession).toHaveBeenCalledWith('session-1')
    })
  })
})