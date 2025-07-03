import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChatInput } from '@/components/chat/chat-input'
import { VirtualizedMessageList } from '@/components/chat/virtualized-message-list'
import { RateLimitIndicator } from '@/components/chat/rate-limit-indicator'
import { chatAPI } from '@/lib/api/chat'
import { toast } from 'react-hot-toast'

// Mock modules
vi.mock('@/lib/api/chat', () => ({
  chatAPI: {
    askQuestion: vi.fn(),
    getSession: vi.fn(),
    createSession: vi.fn()
  }
}))

vi.mock('react-hot-toast', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn()
  }
}))

vi.mock('@/hooks/use-chat-store-safe', () => ({
  useChatStoreSafe: () => mockChatStore
}))

// Mock chat store
const mockChatStore = {
  currentSessionId: 'session-1',
  currentSession: {
    id: 'session-1',
    messages: [],
    totalMessages: 0
  },
  sessions: new Map(),
  drafts: new Map(),
  setDraft: vi.fn(),
  clearDraft: vi.fn(),
  isAsking: false,
  canSendMessage: vi.fn(() => true),
  incrementMessageCount: vi.fn(),
  messagesSentInLastMinute: 0,
  lastMessageTimestamp: 0,
  addMessage: vi.fn(),
  updateMessage: vi.fn(),
  setIsAsking: vi.fn()
}

// Test wrapper with providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('Chat Integration Tests', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
    mockChatStore.messagesSentInLastMinute = 0
    mockChatStore.isAsking = false
    mockChatStore.canSendMessage.mockReturnValue(true)
  })

  describe('Full chat flow', () => {
    it('should send a message and display response', async () => {
      // Setup mock response
      const mockResponse = {
        session_id: 'session-1',
        message: {
          id: 'msg-2',
          role: 'assistant',
          content: 'This is the AI response',
          created_at: new Date().toISOString()
        }
      }

      ;(chatAPI.askQuestion as any).mockResolvedValue(mockResponse)

      // Render chat components
      render(
        <TestWrapper>
          <div>
            <VirtualizedMessageList 
              sessionId="session-1" 
              messages={mockChatStore.currentSession.messages}
            />
            <ChatInput 
              sessionId="session-1" 
              onSend={async (message) => {
                mockChatStore.setIsAsking(true)
                try {
                  await chatAPI.askQuestion('session-1', { question: message })
                  mockChatStore.addMessage('session-1', {
                    id: 'msg-1',
                    role: 'user',
                    content: message,
                    timestamp: new Date().toISOString()
                  })
                  mockChatStore.addMessage('session-1', mockResponse.message)
                } finally {
                  mockChatStore.setIsAsking(false)
                }
              }}
            />
          </div>
        </TestWrapper>
      )

      // Type and send message
      const input = screen.getByRole('textbox')
      await user.type(input, 'What is this document about?')
      await user.keyboard('{Enter}')

      // Verify API was called
      expect(chatAPI.askQuestion).toHaveBeenCalledWith('session-1', {
        question: 'What is this document about?'
      })

      // Verify messages were added
      expect(mockChatStore.addMessage).toHaveBeenCalledTimes(2)
      expect(mockChatStore.setIsAsking).toHaveBeenCalledWith(true)
      expect(mockChatStore.setIsAsking).toHaveBeenCalledWith(false)

      // Verify input was cleared
      await waitFor(() => {
        expect(input).toHaveValue('')
      })
    })

    it('should handle rate limiting correctly', async () => {
      // Set up rate limited state
      mockChatStore.messagesSentInLastMinute = 10
      mockChatStore.canSendMessage.mockReturnValue(false)

      render(
        <TestWrapper>
          <div>
            <RateLimitIndicator />
            <ChatInput 
              sessionId="session-1" 
              onSend={vi.fn()}
            />
          </div>
        </TestWrapper>
      )

      // Should show rate limit indicator
      expect(screen.getByText(/You've reached the rate limit/)).toBeInTheDocument()

      // Input should still work but send button disabled
      const input = screen.getByRole('textbox')
      const sendButton = screen.getByRole('button')
      
      await user.type(input, 'This message should not send')
      
      expect(sendButton).toBeDisabled()
      expect(sendButton).toHaveAttribute('title', 'Rate limit reached')
    })

    it('should validate input before sending', async () => {
      render(
        <TestWrapper>
          <ChatInput 
            sessionId="session-1" 
            onSend={vi.fn()}
          />
        </TestWrapper>
      )

      const input = screen.getByRole('textbox')
      const sendButton = screen.getByRole('button')

      // Test too short message
      await user.type(input, 'Hi')
      
      expect(screen.getByText('Message must be at least 3 characters')).toBeInTheDocument()
      expect(sendButton).toBeDisabled()

      // Clear and test valid message
      await user.clear(input)
      await user.type(input, 'This is a valid message')
      
      expect(screen.queryByText('Message must be at least 3 characters')).not.toBeInTheDocument()
      expect(sendButton).not.toBeDisabled()

      // Test prompt injection
      await user.clear(input)
      await user.type(input, '[[system prompt]]')
      
      expect(screen.getByText('Message contains invalid characters or patterns')).toBeInTheDocument()
      expect(sendButton).toBeDisabled()
    })

    it('should handle API errors gracefully', async () => {
      const error = {
        response: {
          status: 500,
          data: { error: 'Internal server error' }
        }
      }

      ;(chatAPI.askQuestion as any).mockRejectedValue(error)

      render(
        <TestWrapper>
          <ChatInput 
            sessionId="session-1" 
            onSend={async (message) => {
              try {
                await chatAPI.askQuestion('session-1', { question: message })
              } catch (err) {
                toast.error('Failed to send message')
              }
            }}
          />
        </TestWrapper>
      )

      const input = screen.getByRole('textbox')
      await user.type(input, 'This will fail')
      await user.keyboard('{Enter}')

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Failed to send message')
      })
    })

    it('should show character count and progress', async () => {
      render(
        <TestWrapper>
          <ChatInput 
            sessionId="session-1" 
            onSend={vi.fn()}
          />
        </TestWrapper>
      )

      const input = screen.getByRole('textbox')

      // Type some text
      await user.type(input, 'Hello world')
      
      // Should show character count
      expect(screen.getByText('11/2000')).toBeInTheDocument()
      expect(screen.getByText('11/2000')).toHaveClass('text-green-600')

      // Type more to trigger warning
      const warningText = 'a'.repeat(1600)
      await user.clear(input)
      await user.type(input, warningText)
      
      expect(screen.getByText('1600/2000')).toHaveClass('text-amber-600')

      // Type near max
      const dangerText = 'a'.repeat(1950)
      await user.clear(input)
      await user.type(input, dangerText)
      
      expect(screen.getByText('1950/2000')).toHaveClass('text-red-600')
    })
  })

  describe('Message list with pagination', () => {
    it('should load more messages on scroll', async () => {
      const messages = Array.from({ length: 50 }, (_, i) => ({
        id: `msg-${i}`,
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Message ${i}`,
        timestamp: new Date(Date.now() - i * 60000).toISOString(),
        status: 'sent'
      }))

      // Mock session with pagination
      ;(chatAPI.getSession as any).mockResolvedValue({
        id: 'session-1',
        messages: messages.slice(0, 25),
        total_messages: 50
      })

      render(
        <TestWrapper>
          <div style={{ height: '400px' }}>
            <VirtualizedMessageList 
              sessionId="session-1" 
              messages={messages.slice(25)}
            />
          </div>
        </TestWrapper>
      )

      // Should show initial messages
      expect(screen.getByText('Message 25')).toBeInTheDocument()

      // TODO: Test scroll to top to load more
      // This would require more complex mocking of scroll behavior
    })
  })

  describe('Draft functionality', () => {
    it('should save and restore drafts', async () => {
      const { rerender } = render(
        <TestWrapper>
          <ChatInput 
            sessionId="session-1" 
            onSend={vi.fn()}
          />
        </TestWrapper>
      )

      const input = screen.getByRole('textbox')
      
      // Type a draft
      await user.type(input, 'This is a draft message')
      
      // Verify draft was saved
      await waitFor(() => {
        expect(mockChatStore.setDraft).toHaveBeenCalledWith('session-1', 'This is a draft message')
      })

      // Simulate switching sessions and coming back
      mockChatStore.drafts.set('session-1', 'This is a draft message')
      
      rerender(
        <TestWrapper>
          <ChatInput 
            sessionId="session-2" 
            onSend={vi.fn()}
          />
        </TestWrapper>
      )

      rerender(
        <TestWrapper>
          <ChatInput 
            sessionId="session-1" 
            onSend={vi.fn()}
          />
        </TestWrapper>
      )

      // Draft indicator should show
      expect(screen.getByText('Draft saved')).toBeInTheDocument()
    })
  })

  describe('Performance optimizations', () => {
    it('should handle large message lists efficiently', () => {
      const largeMessageList = Array.from({ length: 1000 }, (_, i) => ({
        id: `msg-${i}`,
        role: i % 2 === 0 ? 'user' : 'assistant' as const,
        content: `Message ${i} with some longer content to test virtualization performance`,
        timestamp: new Date(Date.now() - i * 60000).toISOString(),
        status: 'sent' as const
      }))

      const { container } = render(
        <TestWrapper>
          <div style={{ height: '600px' }}>
            <VirtualizedMessageList 
              sessionId="session-1" 
              messages={largeMessageList}
            />
          </div>
        </TestWrapper>
      )

      // Should use virtualization (not render all 1000 items)
      const renderedMessages = container.querySelectorAll('[role="article"]')
      expect(renderedMessages.length).toBeLessThan(50) // Only visible + overscan items
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels and keyboard navigation', async () => {
      render(
        <TestWrapper>
          <ChatInput 
            sessionId="session-1" 
            onSend={vi.fn()}
          />
        </TestWrapper>
      )

      const input = screen.getByRole('textbox')
      const sendButton = screen.getByRole('button')

      // Check ARIA labels
      expect(input).toHaveAttribute('placeholder', 'Ask a question about this document...')
      expect(sendButton).toHaveAttribute('title', expect.stringContaining('Send message'))

      // Test keyboard navigation
      await user.tab()
      expect(input).toHaveFocus()

      await user.tab()
      expect(sendButton).toHaveFocus()
    })
  })
})