import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useChatStore } from '@/store/chat-store'
import { ChatInterface } from '@/components/chat/chat-interface'
import { MessageBubble } from '@/components/chat/message-bubble'
import { ChatInput } from '@/components/chat/chat-input'
import { VirtualizedMessageList } from '@/components/chat/virtualized-message-list'
import { apiClient } from '@/lib/api/client'

// Mock API client
vi.mock('@/lib/api/client', () => ({
  apiClient: {
    createChatSession: vi.fn(),
    getChatSession: vi.fn(),
    askQuestion: vi.fn(),
    getChatSessions: vi.fn(),
    deleteChatSession: vi.fn(),
    updateSessionName: vi.fn(),
  }
}))

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
  useToast: () => ({
    toast: vi.fn(),
  }),
}))

describe('Chat Store', () => {
  beforeEach(() => {
    // Reset store
    const store = useChatStore.getState()
    store.reset()
  })

  it('should initialize with empty state', () => {
    const store = useChatStore.getState()
    expect(store.currentSessionId).toBeNull()
    expect(store.currentSession).toBeNull()
    expect(store.sessions.size).toBe(0)
    expect(store.drafts.size).toBe(0)
  })

  it('should create a new session', async () => {
    const mockSession = {
      id: 'session-123',
      document_id: 'doc-123',
      session_name: 'Test Session',
      messages: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    vi.mocked(apiClient.createChatSession).mockResolvedValueOnce({ session: mockSession })

    const store = useChatStore.getState()
    await act(async () => {
      await store.createSession('doc-123', 'Test Session')
    })

    expect(store.currentSessionId).toBe('session-123')
    expect(store.currentSession).toEqual(mockSession)
    expect(store.sessions.get('session-123')).toEqual(mockSession)
  })

  it('should send a message with optimistic update', async () => {
    const store = useChatStore.getState()
    
    // Set up a current session
    const mockSession = {
      id: 'session-123',
      document_id: 'doc-123',
      session_name: 'Test Session',
      messages: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    act(() => {
      store.setCurrentSession(mockSession)
    })

    // Mock the API response
    vi.mocked(apiClient.askQuestion).mockResolvedValueOnce({
      answer: 'This is the AI response',
      message_id: 'msg-456',
      sources: []
    })

    // Send a message
    await act(async () => {
      await store.sendMessage('What is this document about?')
    })

    // Check optimistic update (user message added immediately)
    const messages = store.currentSession?.messages || []
    expect(messages).toHaveLength(2) // User message + AI response
    expect(messages[0].content).toBe('What is this document about?')
    expect(messages[0].role).toBe('user')
    expect(messages[1].content).toBe('This is the AI response')
    expect(messages[1].role).toBe('assistant')
  })

  it('should enforce rate limiting', async () => {
    const store = useChatStore.getState()
    
    // Set up session
    const mockSession = {
      id: 'session-123',
      document_id: 'doc-123',
      session_name: 'Test Session',
      messages: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    act(() => {
      store.setCurrentSession(mockSession)
    })

    // Send 10 messages (the limit)
    for (let i = 0; i < 10; i++) {
      act(() => {
        store.messagesSentInLastMinute++
      })
    }

    // 11th message should be rate limited
    expect(store.canSendMessage()).toBe(false)
    expect(store.isRateLimited).toBe(true)
  })

  it('should save and restore drafts', () => {
    const store = useChatStore.getState()
    const sessionId = 'session-123'
    const draftText = 'This is my draft message'

    // Save draft
    act(() => {
      store.saveDraft(sessionId, draftText)
    })

    expect(store.getDraft(sessionId)).toBe(draftText)

    // Clear draft
    act(() => {
      store.clearDraft(sessionId)
    })

    expect(store.getDraft(sessionId)).toBe('')
  })

  it('should maintain LRU cache of 10 sessions', () => {
    const store = useChatStore.getState()

    // Add 15 sessions
    act(() => {
      for (let i = 0; i < 15; i++) {
        const session = {
          id: `session-${i}`,
          document_id: 'doc-123',
          session_name: `Session ${i}`,
          messages: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        store.sessions.set(session.id, session)
      }
    })

    // Should only keep last 10
    expect(store.sessions.size).toBe(10)
    expect(store.sessions.has('session-0')).toBe(false)
    expect(store.sessions.has('session-14')).toBe(true)
  })
})

describe('Chat Components', () => {
  describe('MessageBubble', () => {
    it('should render user message correctly', () => {
      const message = {
        id: 'msg-1',
        role: 'user' as const,
        content: 'Hello, AI!',
        created_at: new Date().toISOString()
      }

      render(<MessageBubble message={message} />)
      
      expect(screen.getByText('Hello, AI!')).toBeInTheDocument()
      expect(screen.getByText('You')).toBeInTheDocument()
    })

    it('should render assistant message with markdown', () => {
      const message = {
        id: 'msg-2',
        role: 'assistant' as const,
        content: '# Hello\n\nThis is **bold** text with `code`.',
        created_at: new Date().toISOString()
      }

      render(<MessageBubble message={message} />)
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello')
      expect(screen.getByText('bold')).toHaveClass('font-bold')
      expect(screen.getByText('code')).toHaveClass('font-mono')
    })

    it('should show copy button for assistant messages', async () => {
      const message = {
        id: 'msg-2',
        role: 'assistant' as const,
        content: 'Copy this text',
        created_at: new Date().toISOString()
      }

      render(<MessageBubble message={message} />)
      
      const copyButton = screen.getByLabelText('Copy message')
      expect(copyButton).toBeInTheDocument()
      
      // Mock clipboard API
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn(),
        },
      })
      
      await userEvent.click(copyButton)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Copy this text')
    })
  })

  describe('ChatInput', () => {
    it('should handle text input and send on Enter', async () => {
      const onSend = vi.fn()
      render(<ChatInput onSend={onSend} disabled={false} />)
      
      const input = screen.getByPlaceholderText(/Ask a question/i)
      
      await userEvent.type(input, 'Test message')
      await userEvent.keyboard('{Enter}')
      
      expect(onSend).toHaveBeenCalledWith('Test message')
      expect(input).toHaveValue('') // Should clear after send
    })

    it('should support multiline with Shift+Enter', async () => {
      const onSend = vi.fn()
      render(<ChatInput onSend={onSend} disabled={false} />)
      
      const input = screen.getByPlaceholderText(/Ask a question/i)
      
      await userEvent.type(input, 'Line 1')
      await userEvent.keyboard('{Shift>}{Enter}{/Shift}')
      await userEvent.type(input, 'Line 2')
      
      expect(input).toHaveValue('Line 1\nLine 2')
      expect(onSend).not.toHaveBeenCalled()
    })

    it('should show character count when approaching limit', async () => {
      render(<ChatInput onSend={vi.fn()} disabled={false} />)
      
      const input = screen.getByPlaceholderText(/Ask a question/i)
      const longText = 'a'.repeat(3950) // Close to 4000 limit
      
      await userEvent.type(input, longText)
      
      expect(screen.getByText(/3950 \/ 4000/)).toBeInTheDocument()
    })

    it('should save draft on change', async () => {
      const store = useChatStore.getState()
      const sessionId = 'session-123'
      
      store.setCurrentSessionId(sessionId)
      
      render(<ChatInput onSend={vi.fn()} disabled={false} />)
      
      const input = screen.getByPlaceholderText(/Ask a question/i)
      await userEvent.type(input, 'Draft message')
      
      // Wait for debounce
      await waitFor(() => {
        expect(store.getDraft(sessionId)).toBe('Draft message')
      }, { timeout: 600 })
    })
  })

  describe('VirtualizedMessageList', () => {
    it('should render empty state when no messages', () => {
      render(<VirtualizedMessageList messages={[]} isLoading={false} />)
      
      expect(screen.getByText(/Start a conversation/i)).toBeInTheDocument()
    })

    it('should render loading state', () => {
      render(<VirtualizedMessageList messages={[]} isLoading={true} />)
      
      expect(screen.getByText(/AI is thinking/i)).toBeInTheDocument()
    })

    it('should render messages with virtualization', () => {
      const messages = Array.from({ length: 100 }, (_, i) => ({
        id: `msg-${i}`,
        role: i % 2 === 0 ? 'user' : 'assistant' as const,
        content: `Message ${i}`,
        created_at: new Date().toISOString()
      }))

      const { container } = render(
        <div style={{ height: '600px' }}>
          <VirtualizedMessageList messages={messages} isLoading={false} />
        </div>
      )
      
      // Virtual list should not render all 100 messages at once
      const renderedMessages = container.querySelectorAll('[data-message]')
      expect(renderedMessages.length).toBeLessThan(100)
    })
  })
})

describe('Chat Integration Tests', () => {
  it('should complete full chat flow', async () => {
    const documentId = 'doc-123'
    const sessionId = 'session-123'
    
    // Mock API responses
    vi.mocked(apiClient.createChatSession).mockResolvedValueOnce({
      session: {
        id: sessionId,
        document_id: documentId,
        session_name: 'Test Chat',
        messages: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    })

    vi.mocked(apiClient.askQuestion).mockResolvedValueOnce({
      answer: 'This document is about testing.',
      message_id: 'msg-456',
      sources: []
    })

    // Initialize store
    const store = useChatStore.getState()
    
    // Create session
    await act(async () => {
      await store.createSession(documentId, 'Test Chat')
    })
    
    expect(store.currentSessionId).toBe(sessionId)
    
    // Send message
    await act(async () => {
      await store.sendMessage('What is this document about?')
    })
    
    // Verify messages
    const messages = store.currentSession?.messages || []
    expect(messages).toHaveLength(2)
    expect(messages[0].content).toBe('What is this document about?')
    expect(messages[1].content).toBe('This document is about testing.')
  })

  it('should handle errors gracefully', async () => {
    const store = useChatStore.getState()
    
    // Mock API error
    vi.mocked(apiClient.createChatSession).mockRejectedValueOnce(
      new Error('Network error')
    )
    
    // Attempt to create session
    await act(async () => {
      await store.createSession('doc-123', 'Test')
    })
    
    // Should set error state
    expect(store.error).toBe('Network error')
    expect(store.currentSession).toBeNull()
  })
})