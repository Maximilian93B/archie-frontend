import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RateLimitIndicator, useRateLimit } from '@/components/chat/rate-limit-indicator'
import { renderHook, act } from '@testing-library/react'

// Mock the chat store hook
vi.mock('@/hooks/use-chat-store-safe', () => ({
  useChatStoreSafe: vi.fn()
}))

import { useChatStoreSafe } from '@/hooks/use-chat-store-safe'

describe('RateLimitIndicator', () => {
  const mockStore = {
    messagesSentInLastMinute: 0,
    lastMessageTimestamp: 0,
    canSendMessage: vi.fn(() => true)
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    ;(useChatStoreSafe as any).mockReturnValue(mockStore)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Component rendering', () => {
    it('should not render when no messages sent and not compact', () => {
      const { container } = render(<RateLimitIndicator />)
      expect(container.firstChild).toBeNull()
    })

    it('should not render in compact mode when not near limit', () => {
      mockStore.messagesSentInLastMinute = 5
      const { container } = render(<RateLimitIndicator compact />)
      expect(container.firstChild).toBeNull()
    })

    it('should show rate limited state in compact mode', () => {
      mockStore.messagesSentInLastMinute = 10
      mockStore.lastMessageTimestamp = Date.now()
      
      render(<RateLimitIndicator compact />)
      
      expect(screen.getByText(/Rate limited/)).toBeInTheDocument()
      expect(screen.getByText(/Rate limited/)).toBeInTheDocument()
    })

    it('should show warning in compact mode when near limit', () => {
      mockStore.messagesSentInLastMinute = 8
      
      render(<RateLimitIndicator compact />)
      
      expect(screen.getByText('2 messages left')).toBeInTheDocument()
      expect(screen.getByText('2 messages left')).toBeInTheDocument()
    })

    it('should show full indicator with progress bar', () => {
      mockStore.messagesSentInLastMinute = 5
      
      render(<RateLimitIndicator />)
      
      expect(screen.getByText('Message Rate Limit')).toBeInTheDocument()
      expect(screen.getByText('5/10 remaining')).toBeInTheDocument()
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should show correct progress bar color based on usage', () => {
      // Green state
      mockStore.messagesSentInLastMinute = 3
      const { rerender } = render(<RateLimitIndicator />)
      expect(screen.getByText('7/10 remaining')).toHaveClass('text-green-600')

      // Amber state
      mockStore.messagesSentInLastMinute = 8
      rerender(<RateLimitIndicator />)
      expect(screen.getByText('2/10 remaining')).toHaveClass('text-amber-600')

      // Red state
      mockStore.messagesSentInLastMinute = 10
      rerender(<RateLimitIndicator />)
      expect(screen.getByText('0/10 remaining')).toHaveClass('text-red-600')
    })

    it('should show rate limit alert when at limit', () => {
      mockStore.messagesSentInLastMinute = 10
      mockStore.lastMessageTimestamp = Date.now()
      
      render(<RateLimitIndicator />)
      
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText(/You've reached the rate limit/)).toBeInTheDocument()
    })

    it('should show warning alert when near limit', () => {
      mockStore.messagesSentInLastMinute = 8
      
      render(<RateLimitIndicator />)
      
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText(/You're approaching the rate limit/)).toBeInTheDocument()
    })
  })

  describe('Timer functionality', () => {
    it('should update countdown timer', () => {
      const now = Date.now()
      mockStore.messagesSentInLastMinute = 10
      mockStore.lastMessageTimestamp = now - 30000 // 30 seconds ago
      
      render(<RateLimitIndicator />)
      
      // Initial state - 30 seconds remaining
      expect(screen.getByText('Resets in 30s')).toBeInTheDocument()
      
      // Advance timer by 10 seconds
      act(() => {
        vi.advanceTimersByTime(10000)
      })
      
      expect(screen.getByText('Resets in 20s')).toBeInTheDocument()
    })

    it('should format time correctly for minutes', () => {
      const now = Date.now()
      mockStore.messagesSentInLastMinute = 5
      mockStore.lastMessageTimestamp = now - 5000 // 5 seconds ago
      
      render(<RateLimitIndicator />)
      
      expect(screen.getByText('Resets in 55s')).toBeInTheDocument()
    })

    it('should reset timer when time expires', () => {
      const now = Date.now()
      mockStore.messagesSentInLastMinute = 10
      mockStore.lastMessageTimestamp = now - 59000 // 59 seconds ago
      
      render(<RateLimitIndicator />)
      
      // Advance timer past reset time
      act(() => {
        vi.advanceTimersByTime(2000)
      })
      
      expect(screen.queryByText(/Resets in/)).not.toBeInTheDocument()
    })
  })

  describe('Custom className', () => {
    it('should apply custom className', () => {
      mockStore.messagesSentInLastMinute = 5
      
      const { container } = render(
        <RateLimitIndicator className="custom-class" />
      )
      
      expect(container.firstChild).toHaveClass('custom-class')
    })
  })
})

describe('useRateLimit hook', () => {
  const mockStore = {
    messagesSentInLastMinute: 0,
    lastMessageTimestamp: 0,
    canSendMessage: vi.fn(() => true)
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    ;(useChatStoreSafe as any).mockReturnValue(mockStore)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return rate limit status', () => {
    mockStore.messagesSentInLastMinute = 5
    mockStore.canSendMessage.mockReturnValue(true)
    
    const { result } = renderHook(() => useRateLimit())
    
    expect(result.current).toEqual({
      messagesUsed: 5,
      messagesRemaining: 5,
      isRateLimited: false,
      timeUntilReset: 0,
      rateLimit: 10
    })
  })

  it('should indicate rate limited state', () => {
    mockStore.messagesSentInLastMinute = 10
    mockStore.canSendMessage.mockReturnValue(false)
    
    const { result } = renderHook(() => useRateLimit())
    
    expect(result.current.isRateLimited).toBe(true)
    expect(result.current.messagesRemaining).toBe(0)
  })

  it('should track time until reset', () => {
    const now = Date.now()
    mockStore.messagesSentInLastMinute = 8
    mockStore.lastMessageTimestamp = now - 30000 // 30 seconds ago
    
    const { result } = renderHook(() => useRateLimit())
    
    expect(result.current.timeUntilReset).toBeGreaterThan(29000)
    expect(result.current.timeUntilReset).toBeLessThan(31000)
  })

  it('should update timer on interval', () => {
    const now = Date.now()
    mockStore.messagesSentInLastMinute = 5
    mockStore.lastMessageTimestamp = now - 10000
    
    const { result } = renderHook(() => useRateLimit())
    
    const initialTime = result.current.timeUntilReset
    
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    
    expect(result.current.timeUntilReset).toBeLessThan(initialTime)
  })
})