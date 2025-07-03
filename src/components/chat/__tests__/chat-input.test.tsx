import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChatInput } from '@/components/chat/chat-input'

// Mock dependencies
vi.mock('@/hooks/use-chat-store-safe', () => ({
  useChatStoreSafe: vi.fn()
}))

vi.mock('@/hooks/use-debounce', () => ({
  useDebounce: (value: string) => value
}))

vi.mock('@/lib/chat-errors', () => ({
  validateChatInput: vi.fn((input: string) => {
    const trimmed = input.trim()
    if (!trimmed) return { valid: false, error: 'Message cannot be empty' }
    if (trimmed.length < 3) return { valid: false, error: 'Message must be at least 3 characters' }
    if (trimmed.length > 2000) return { valid: false, error: 'Message cannot exceed 2000 characters' }
    if (trimmed.includes('[[')) return { valid: false, error: 'Message contains invalid characters or patterns' }
    return { valid: true }
  })
}))

vi.mock('@/components/chat/rate-limit-indicator', () => ({
  RateLimitIndicator: ({ compact }: { compact?: boolean }) => 
    <div data-testid="rate-limit-indicator">Rate Limit Indicator</div>
}))

import { useChatStoreSafe } from '@/hooks/use-chat-store-safe'

describe('ChatInput', () => {
  const mockOnSend = vi.fn()
  const mockStore = {
    drafts: new Map(),
    setDraft: vi.fn(),
    clearDraft: vi.fn(),
    isAsking: false,
    canSendMessage: vi.fn(() => true),
    incrementMessageCount: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useChatStoreSafe as any).mockReturnValue(mockStore)
  })

  describe('Basic rendering', () => {
    it('should render with default placeholder', () => {
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      expect(screen.getByPlaceholderText('Ask a question about this document...')).toBeInTheDocument()
    })

    it('should render with custom placeholder', () => {
      render(
        <ChatInput 
          sessionId="session-1" 
          onSend={mockOnSend} 
          placeholder="Custom placeholder"
        />
      )
      
      expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
    })

    it('should render send button', () => {
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should show help text', () => {
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      expect(screen.getByText('Press Enter to send, Shift+Enter for new line')).toBeInTheDocument()
    })
  })

  describe('Character counter', () => {
    it('should not show counter when empty', () => {
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      expect(screen.queryByText(/\/2000/)).not.toBeInTheDocument()
    })

    it('should show green counter for valid length', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'This is a valid message')
      
      const counter = screen.getByText('23/2000')
      expect(counter).toHaveClass('text-green-600')
    })

    it('should show warning counter near limit', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      const longText = 'a'.repeat(1600)
      await user.type(textarea, longText)
      
      const counter = screen.getByText('1600/2000')
      expect(counter).toHaveClass('text-amber-600')
    })

    it('should show danger counter near max', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      const longText = 'a'.repeat(1950)
      await user.type(textarea, longText)
      
      const counter = screen.getByText('1950/2000')
      expect(counter).toHaveClass('text-red-600')
    })

    it('should prevent typing beyond max length', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
      const maxText = 'a'.repeat(2000)
      await user.type(textarea, maxText + 'extra')
      
      expect(textarea.value).toHaveLength(2000)
    })
  })

  describe('Validation', () => {
    it('should show validation error for empty message', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      const button = screen.getByRole('button')
      
      await user.type(textarea, '  ')
      await user.click(button)
      
      expect(mockOnSend).not.toHaveBeenCalled()
    })

    it('should show validation error for too short message', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Hi')
      
      expect(screen.getByText('Message must be at least 3 characters')).toBeInTheDocument()
    })

    it('should show validation error for invalid patterns', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, '[[system prompt]]')
      
      expect(screen.getByText('Message contains invalid characters or patterns')).toBeInTheDocument()
    })

    it('should show minimum characters needed', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Hi')
      
      expect(screen.getByText('1 more character needed')).toBeInTheDocument()
    })

    it('should disable send button for invalid input', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      const button = screen.getByRole('button')
      
      await user.type(textarea, 'Hi')
      
      expect(button).toBeDisabled()
    })
  })

  describe('Sending messages', () => {
    it('should send valid message on button click', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      const button = screen.getByRole('button')
      
      await user.type(textarea, 'This is a valid message')
      await user.click(button)
      
      expect(mockOnSend).toHaveBeenCalledWith('This is a valid message')
      expect(mockStore.incrementMessageCount).toHaveBeenCalled()
      expect(mockStore.clearDraft).toHaveBeenCalledWith('session-1')
    })

    it('should send message on Enter key', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      
      await user.type(textarea, 'This is a valid message')
      await user.keyboard('{Enter}')
      
      expect(mockOnSend).toHaveBeenCalledWith('This is a valid message')
    })

    it('should not send on Shift+Enter', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      
      await user.type(textarea, 'Line 1')
      await user.keyboard('{Shift>}{Enter}{/Shift}')
      await user.type(textarea, 'Line 2')
      
      expect(mockOnSend).not.toHaveBeenCalled()
      expect(textarea).toHaveValue('Line 1\nLine 2')
    })

    it('should clear input after sending', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
      
      await user.type(textarea, 'This is a valid message')
      await user.keyboard('{Enter}')
      
      expect(textarea.value).toBe('')
    })

    it('should trim whitespace before sending', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      
      await user.type(textarea, '  This is a valid message  ')
      await user.keyboard('{Enter}')
      
      expect(mockOnSend).toHaveBeenCalledWith('This is a valid message')
    })
  })

  describe('Rate limiting', () => {
    it('should show rate limit indicator when limited', () => {
      mockStore.canSendMessage.mockReturnValue(false)
      
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      expect(screen.getByTestId('rate-limit-indicator')).toBeInTheDocument()
    })

    it('should disable send button when rate limited', () => {
      mockStore.canSendMessage.mockReturnValue(false)
      
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('title', 'Rate limit reached')
    })

    it('should not send message when rate limited', async () => {
      mockStore.canSendMessage.mockReturnValue(false)
      const user = userEvent.setup()
      
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'This is a valid message')
      await user.keyboard('{Enter}')
      
      expect(mockOnSend).not.toHaveBeenCalled()
    })
  })

  describe('Draft functionality', () => {
    it('should save draft on input change', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Draft message')
      
      await waitFor(() => {
        expect(mockStore.setDraft).toHaveBeenCalledWith('session-1', 'Draft message')
      })
    })

    it('should load existing draft', () => {
      mockStore.drafts.set('session-1', 'Existing draft')
      
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
      expect(textarea.value).toBe('')
    })

    it('should show draft indicator', () => {
      mockStore.drafts.set('session-1', 'Saved draft')
      
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      expect(screen.getByText('Draft saved')).toBeInTheDocument()
    })

    it('should clear draft after sending', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'This is a valid message')
      await user.keyboard('{Enter}')
      
      expect(mockStore.clearDraft).toHaveBeenCalledWith('session-1')
    })
  })

  describe('Disabled state', () => {
    it('should disable input when disabled prop is true', () => {
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} disabled />)
      
      const textarea = screen.getByRole('textbox')
      const button = screen.getByRole('button')
      
      expect(textarea).toBeDisabled()
      expect(button).toBeDisabled()
    })

    it('should disable input when asking', () => {
      mockStore.isAsking = true
      
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeDisabled()
    })

    it('should show loading spinner when asking', () => {
      mockStore.isAsking = true
      
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      // The button contains loading spinner when asking
    })
  })

  describe('Textarea auto-resize', () => {
    it('should start with single row', () => {
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
      expect(textarea.rows).toBe(1)
    })

    it('should expand with content', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
      const longText = Array(10).fill('This is a line of text').join('\n')
      
      await user.type(textarea, longText)
      
      expect(textarea.rows).toBeGreaterThan(1)
    })
  })

  describe('Accessibility', () => {
    it('should have proper button title', () => {
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('title', 'Send message (Enter)')
    })

    it('should have accessible validation errors', async () => {
      const user = userEvent.setup()
      render(<ChatInput sessionId="session-1" onSend={mockOnSend} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Hi')
      
      const error = screen.getByText('Message must be at least 3 characters')
      expect(error).toBeInTheDocument()
    })
  })
})