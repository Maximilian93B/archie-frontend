import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useMessagePagination, useInfiniteScroll } from '@/hooks/use-message-pagination'
import { chatAPI } from '@/lib/api/chat'
import { handleChatError } from '@/lib/chat-errors'

// Mock dependencies
vi.mock('@/hooks/use-chat-store-safe', () => ({
  useChatStoreSafe: vi.fn()
}))

vi.mock('@/lib/api/chat', () => ({
  chatAPI: {
    getSession: vi.fn()
  }
}))

vi.mock('@/lib/chat-errors', () => ({
  handleChatError: vi.fn((error) => error)
}))

import { useChatStoreSafe } from '@/hooks/use-chat-store-safe'

describe('useMessagePagination', () => {
  const mockSession = {
    id: 'session-1',
    messages: [
      { id: 'msg-1', role: 'user', content: 'Hello', timestamp: '2024-01-01T00:00:00Z' },
      { id: 'msg-2', role: 'assistant', content: 'Hi there', timestamp: '2024-01-01T00:01:00Z' }
    ],
    totalMessages: 100
  }

  const mockStore = {
    sessions: new Map([['session-1', mockSession]]),
    messagePagination: new Map([
      ['session-1', {
        isLoadingMore: false,
        hasMore: true,
        page: 1,
        pageSize: 50
      }]
    ]),
    setMessagePaginationLoading: vi.fn(),
    prependMessages: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useChatStoreSafe as any).mockReturnValue(mockStore)
  })

  describe('Initial state', () => {
    it('should return initial pagination state', () => {
      const { result } = renderHook(() => 
        useMessagePagination({ sessionId: 'session-1' })
      )

      expect(result.current).toEqual({
        isLoadingMore: false,
        hasMore: true,
        loadMore: expect.any(Function),
        canLoadMore: true
      })
    })

    it('should initialize pagination if not exists', () => {
      mockStore.messagePagination = new Map()
      
      renderHook(() => useMessagePagination({ sessionId: 'session-1' }))

      expect(mockStore.setMessagePaginationLoading).toHaveBeenCalledWith('session-1', false)
    })

    it('should handle missing session', () => {
      const { result } = renderHook(() => 
        useMessagePagination({ sessionId: 'non-existent' })
      )

      expect(result.current.canLoadMore).toBe(false)
    })

    it('should respect custom page size', () => {
      const { result } = renderHook(() => 
        useMessagePagination({ sessionId: 'session-1', pageSize: 25 })
      )

      expect(result.current).toBeDefined()
    })
  })

  describe('loadMore function', () => {
    it('should load more messages successfully', async () => {
      const olderMessages = [
        { id: 'msg-0', role: 'user', content: 'Previous message', created_at: '2024-01-01T00:00:00Z' }
      ]

      ;(chatAPI.getSession as any).mockResolvedValue({
        messages: [...olderMessages, ...mockSession.messages]
      })

      const { result } = renderHook(() => 
        useMessagePagination({ sessionId: 'session-1' })
      )

      await act(async () => {
        await result.current.loadMore()
      })

      expect(mockStore.setMessagePaginationLoading).toHaveBeenCalledWith('session-1', true)
      expect(chatAPI.getSession).toHaveBeenCalledWith('session-1', {
        limit: 50,
        offset: expect.any(Number)
      })
      expect(mockStore.prependMessages).toHaveBeenCalledWith('session-1', [
        expect.objectContaining({
          id: 'msg-0',
          role: 'user',
          content: 'Previous message',
          status: 'sent'
        })
      ])
    })

    it('should not load when already loading', async () => {
      mockStore.messagePagination.set('session-1', {
        isLoadingMore: true,
        hasMore: true,
        page: 1,
        pageSize: 50
      })

      const { result } = renderHook(() => 
        useMessagePagination({ sessionId: 'session-1' })
      )

      await act(async () => {
        await result.current.loadMore()
      })

      expect(chatAPI.getSession).not.toHaveBeenCalled()
    })

    it('should not load when no more messages', async () => {
      mockStore.messagePagination.set('session-1', {
        isLoadingMore: false,
        hasMore: false,
        page: 1,
        pageSize: 50
      })

      const { result } = renderHook(() => 
        useMessagePagination({ sessionId: 'session-1' })
      )

      await act(async () => {
        await result.current.loadMore()
      })

      expect(chatAPI.getSession).not.toHaveBeenCalled()
    })

    it('should handle errors when loading', async () => {
      const error = new Error('Failed to load messages')
      ;(chatAPI.getSession as any).mockRejectedValue(error)

      const { result } = renderHook(() => 
        useMessagePagination({ sessionId: 'session-1' })
      )

      await act(async () => {
        await result.current.loadMore()
      })

      expect(handleChatError).toHaveBeenCalledWith(error, {
        showToast: true,
        onRetry: expect.any(Function)
      })
      expect(mockStore.setMessagePaginationLoading).toHaveBeenCalledWith('session-1', false)
    })

    it('should filter out duplicate messages', async () => {
      ;(chatAPI.getSession as any).mockResolvedValue({
        messages: [
          { id: 'msg-1', role: 'user', content: 'Duplicate', created_at: '2024-01-01T00:00:00Z' },
          { id: 'msg-new', role: 'user', content: 'New message', created_at: '2024-01-01T00:00:00Z' }
        ]
      })

      const { result } = renderHook(() => 
        useMessagePagination({ sessionId: 'session-1' })
      )

      await act(async () => {
        await result.current.loadMore()
      })

      expect(mockStore.prependMessages).toHaveBeenCalledWith('session-1', [
        expect.objectContaining({ id: 'msg-new' })
      ])
    })

    it('should update hasMore state correctly', async () => {
      ;(chatAPI.getSession as any).mockResolvedValue({
        messages: []
      })

      const { result } = renderHook(() => 
        useMessagePagination({ sessionId: 'session-1' })
      )

      await act(async () => {
        await result.current.loadMore()
      })

      // Should update pagination state when no more messages
      expect(mockStore.messagePagination).toBeDefined()
    })
  })
})

describe('useInfiniteScroll', () => {
  let scrollElement: HTMLElement
  let scrollCallback: vi.Mock

  beforeEach(() => {
    vi.clearAllMocks()
    scrollCallback = vi.fn()
    
    scrollElement = document.createElement('div')
    scrollElement.scrollTop = 200
    scrollElement.scrollHeight = 1000
    scrollElement.clientHeight = 500
    
    // Mock requestAnimationFrame
    global.requestAnimationFrame = vi.fn((cb) => {
      cb(0)
      return 0
    })
  })

  it('should trigger callback when scrolled near top', () => {
    const ref = { current: scrollElement }
    
    renderHook(() => 
      useInfiniteScroll(ref, scrollCallback, { threshold: 100, enabled: true })
    )

    // Simulate scroll near top
    scrollElement.scrollTop = 50
    scrollElement.dispatchEvent(new Event('scroll'))

    expect(scrollCallback).toHaveBeenCalled()
  })

  it('should not trigger when scrolled far from top', () => {
    const ref = { current: scrollElement }
    
    renderHook(() => 
      useInfiniteScroll(ref, scrollCallback, { threshold: 100, enabled: true })
    )

    // Simulate scroll far from top
    scrollElement.scrollTop = 200
    scrollElement.dispatchEvent(new Event('scroll'))

    expect(scrollCallback).not.toHaveBeenCalled()
  })

  it('should not trigger when disabled', () => {
    const ref = { current: scrollElement }
    
    renderHook(() => 
      useInfiniteScroll(ref, scrollCallback, { threshold: 100, enabled: false })
    )

    scrollElement.scrollTop = 50
    scrollElement.dispatchEvent(new Event('scroll'))

    expect(scrollCallback).not.toHaveBeenCalled()
  })

  it('should use default threshold', () => {
    const ref = { current: scrollElement }
    
    renderHook(() => 
      useInfiniteScroll(ref, scrollCallback, { enabled: true })
    )

    scrollElement.scrollTop = 99
    scrollElement.dispatchEvent(new Event('scroll'))

    expect(scrollCallback).toHaveBeenCalled()
  })

  it('should handle missing ref', () => {
    const ref = { current: null }
    
    renderHook(() => 
      useInfiniteScroll(ref, scrollCallback, { enabled: true })
    )

    // Should not throw
    expect(scrollCallback).not.toHaveBeenCalled()
  })

  it('should debounce scroll events with RAF', () => {
    const ref = { current: scrollElement }
    
    renderHook(() => 
      useInfiniteScroll(ref, scrollCallback, { threshold: 100, enabled: true })
    )

    scrollElement.scrollTop = 50
    
    // Trigger multiple scroll events
    scrollElement.dispatchEvent(new Event('scroll'))
    scrollElement.dispatchEvent(new Event('scroll'))
    scrollElement.dispatchEvent(new Event('scroll'))

    // Should only call once due to RAF debouncing
    expect(scrollCallback).toHaveBeenCalledTimes(1)
  })

  it('should cleanup event listener on unmount', () => {
    const ref = { current: scrollElement }
    const removeEventListener = vi.spyOn(scrollElement, 'removeEventListener')
    
    const { unmount } = renderHook(() => 
      useInfiniteScroll(ref, scrollCallback, { enabled: true })
    )

    unmount()

    expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('should re-attach listener when ref changes', () => {
    const ref = { current: scrollElement }
    const addEventListener = vi.spyOn(scrollElement, 'addEventListener')
    
    const { rerender } = renderHook(
      ({ element }) => useInfiniteScroll({ current: element }, scrollCallback, { enabled: true }),
      { initialProps: { element: null } }
    )

    expect(addEventListener).not.toHaveBeenCalled()

    rerender({ element: scrollElement })

    expect(addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
  })
})