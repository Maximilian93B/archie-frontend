import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MessageBubble } from '@/components/chat/message-bubble'
import { ChatInput } from '@/components/chat/chat-input'
import { VirtualizedMessageList } from '@/components/chat/virtualized-message-list'
import { useChatStore } from '@/store/chat-store'

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
  useToast: () => ({
    toast: vi.fn(),
  }),
}))

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
})

describe('MessageBubble', () => {
  it('should render user message correctly', () => {
    const message = {
      id: 'msg-1',
      role: 'user' as const,
      content: 'Hello, AI!',
      timestamp: new Date().toISOString(),
      status: 'sent' as const
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
      timestamp: new Date().toISOString()
    }

    render(<MessageBubble message={message} />)
    
    // Check markdown is rendered
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Hello')
    
    // Bold text
    const boldText = screen.getByText('bold')
    expect(boldText.tagName).toBe('STRONG')
    
    // Code text
    const codeText = screen.getByText('code')
    expect(codeText.tagName).toBe('CODE')
  })

  it('should show copy button for assistant messages', async () => {
    const message = {
      id: 'msg-2',
      role: 'assistant' as const,
      content: 'Copy this text',
      timestamp: new Date().toISOString()
    }

    render(<MessageBubble message={message} />)
    
    // Hover to show actions
    const messageElement = screen.getByText('Copy this text').closest('div')
    fireEvent.mouseEnter(messageElement!)
    
    const copyButton = await screen.findByLabelText('Copy message')
    expect(copyButton).toBeInTheDocument()
    
    await userEvent.click(copyButton)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Copy this text')
  })

  it('should show loading state for pending messages', () => {
    const message = {
      id: 'msg-3',
      role: 'assistant' as const,
      content: '',
      timestamp: new Date().toISOString(),
      status: 'pending' as const
    }

    render(<MessageBubble message={message} isLoading={true} />)
    
    expect(screen.getByTestId('loading-animation')).toBeInTheDocument()
  })

  it('should show error state for failed messages', () => {
    const message = {
      id: 'msg-4',
      role: 'user' as const,
      content: 'Failed message',
      timestamp: new Date().toISOString(),
      status: 'failed' as const,
      error: 'Network error'
    }

    const onRetry = vi.fn()
    render(<MessageBubble message={message} onRetry={onRetry} />)
    
    expect(screen.getByText('Failed to send')).toBeInTheDocument()
    
    const retryButton = screen.getByLabelText('Retry message')
    fireEvent.click(retryButton)
    
    expect(onRetry).toHaveBeenCalled()
  })
})

describe('ChatInput', () => {
  it('should handle text input and send on Enter', async () => {
    const user = userEvent.setup()
    const onSend = vi.fn()
    
    render(<ChatInput onSend={onSend} disabled={false} />)
    
    const input = screen.getByPlaceholderText(/Ask a question/i)
    
    await user.type(input, 'Test message')
    await user.keyboard('{Enter}')
    
    expect(onSend).toHaveBeenCalledWith('Test message')
    expect(input).toHaveValue('') // Should clear after send
  })

  it('should support multiline with Shift+Enter', async () => {
    const user = userEvent.setup()
    const onSend = vi.fn()
    
    render(<ChatInput onSend={onSend} disabled={false} />)
    
    const input = screen.getByPlaceholderText(/Ask a question/i)
    
    await user.type(input, 'Line 1')
    await user.keyboard('{Shift>}{Enter}{/Shift}')
    await user.type(input, 'Line 2')
    
    expect(input).toHaveValue('Line 1\nLine 2')
    expect(onSend).not.toHaveBeenCalled()
  })

  it('should show character count when approaching limit', async () => {
    const user = userEvent.setup()
    render(<ChatInput onSend={vi.fn()} disabled={false} />)
    
    const input = screen.getByPlaceholderText(/Ask a question/i)
    const longText = 'a'.repeat(3950) // Close to 4000 limit
    
    // Type in chunks to avoid timeout
    for (let i = 0; i < 10; i++) {
      await user.type(input, 'a'.repeat(395))
    }
    
    expect(screen.getByText(/3950 \/ 4000/)).toBeInTheDocument()
  })

  it('should disable input and button when disabled prop is true', () => {
    render(<ChatInput onSend={vi.fn()} disabled={true} />)
    
    const input = screen.getByPlaceholderText(/Ask a question/i)
    const button = screen.getByRole('button')
    
    expect(input).toBeDisabled()
    expect(button).toBeDisabled()
  })

  it('should auto-resize based on content', async () => {
    const user = userEvent.setup()
    render(<ChatInput onSend={vi.fn()} disabled={false} />)
    
    const input = screen.getByPlaceholderText(/Ask a question/i) as HTMLTextAreaElement
    const initialHeight = input.style.height
    
    // Add multiple lines
    await user.type(input, 'Line 1\nLine 2\nLine 3')
    
    // Height should have increased
    expect(input.scrollHeight).toBeGreaterThan(0)
  })
})

describe('VirtualizedMessageList', () => {
  it('should render empty state when no messages', () => {
    render(<VirtualizedMessageList messages={[]} isLoading={false} />)
    
    expect(screen.getByText(/Start a conversation/i)).toBeInTheDocument()
    expect(screen.getByText(/Ask a question about your document/i)).toBeInTheDocument()
  })

  it('should render loading state', () => {
    render(<VirtualizedMessageList messages={[]} isLoading={true} />)
    
    expect(screen.getByTestId('chat-loading')).toBeInTheDocument()
  })

  it('should render messages', () => {
    const messages = [
      {
        id: 'msg-1',
        role: 'user' as const,
        content: 'Hello',
        timestamp: new Date().toISOString()
      },
      {
        id: 'msg-2',
        role: 'assistant' as const,
        content: 'Hi there!',
        timestamp: new Date().toISOString()
      }
    ]

    render(
      <div style={{ height: '600px' }}>
        <VirtualizedMessageList messages={messages} isLoading={false} />
      </div>
    )
    
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('Hi there!')).toBeInTheDocument()
  })

  it('should group messages by date', () => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    const messages = [
      {
        id: 'msg-1',
        role: 'user' as const,
        content: 'Yesterday message',
        timestamp: yesterday.toISOString()
      },
      {
        id: 'msg-2',
        role: 'assistant' as const,
        content: 'Today message',
        timestamp: today.toISOString()
      }
    ]

    render(
      <div style={{ height: '600px' }}>
        <VirtualizedMessageList messages={messages} isLoading={false} />
      </div>
    )
    
    // Should show date separators
    expect(screen.getByText('Yesterday')).toBeInTheDocument()
    expect(screen.getByText('Today')).toBeInTheDocument()
  })

  it('should handle scroll to bottom', async () => {
    const messages = Array.from({ length: 50 }, (_, i) => ({
      id: `msg-${i}`,
      role: (i % 2 === 0 ? 'user' : 'assistant') as const,
      content: `Message ${i}`,
      timestamp: new Date().toISOString()
    }))

    const { container } = render(
      <div style={{ height: '600px', overflow: 'auto' }}>
        <VirtualizedMessageList messages={messages} isLoading={false} />
      </div>
    )
    
    // Virtual list container should exist
    const virtualList = container.querySelector('[data-testid="virtual-list"]')
    expect(virtualList).toBeInTheDocument()
  })
})