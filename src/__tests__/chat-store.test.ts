import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useChatStore } from '@/store/chat-store'

describe('Chat Store', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useChatStore())
    act(() => {
      result.current.reset()
    })
  })

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useChatStore())
    
    expect(result.current.currentSessionId).toBeNull()
    expect(result.current.currentSession).toBeNull()
    expect(result.current.sessions.size).toBe(0)
    expect(result.current.drafts.size).toBe(0)
    expect(result.current.messagesSentInLastMinute).toBe(0)
  })

  it('should add and set current session', () => {
    const { result } = renderHook(() => useChatStore())
    
    const mockSession = {
      id: 'session-123',
      documentId: 'doc-123',
      sessionName: 'Test Session',
      messages: [],
      isActive: true,
      totalMessages: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      canModify: true
    }

    act(() => {
      result.current.addSession(mockSession)
      result.current.setCurrentSession('session-123')
    })

    expect(result.current.currentSessionId).toBe('session-123')
    expect(result.current.currentSession).toEqual(mockSession)
    expect(result.current.sessions.get('session-123')).toEqual(mockSession)
  })

  it('should add optimistic message', () => {
    const { result } = renderHook(() => useChatStore())
    
    // Setup session
    const mockSession = {
      id: 'session-123',
      documentId: 'doc-123',
      sessionName: 'Test Session',
      messages: [],
      isActive: true,
      totalMessages: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      canModify: true
    }

    act(() => {
      result.current.addSession(mockSession)
      result.current.setCurrentSession('session-123')
    })

    // Add optimistic message
    let optimisticMessage: any
    act(() => {
      optimisticMessage = result.current.addOptimisticMessage('session-123', 'Test message')
    })

    expect(optimisticMessage).toBeDefined()
    expect(optimisticMessage.content).toBe('Test message')
    expect(optimisticMessage.role).toBe('user')
    expect(optimisticMessage.status).toBe('pending')
    
    const session = result.current.sessions.get('session-123')
    expect(session?.messages).toHaveLength(1)
    expect(session?.messages[0]).toEqual(optimisticMessage)
  })

  it('should update message status', () => {
    const { result } = renderHook(() => useChatStore())
    
    // Setup session with message
    const messageId = 'msg-123'
    const mockSession = {
      id: 'session-123',
      documentId: 'doc-123',
      sessionName: 'Test Session',
      messages: [{
        id: messageId,
        role: 'user' as const,
        content: 'Test',
        timestamp: new Date().toISOString(),
        status: 'pending' as const
      }],
      isActive: true,
      totalMessages: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      canModify: true
    }

    act(() => {
      result.current.addSession(mockSession)
      result.current.updateMessage('session-123', messageId, { status: 'sent' })
    })

    const session = result.current.sessions.get('session-123')
    expect(session?.messages[0].status).toBe('sent')
  })

  it('should manage drafts', () => {
    const { result } = renderHook(() => useChatStore())
    const sessionId = 'session-123'
    const draftText = 'This is my draft message'

    act(() => {
      result.current.setDraft(sessionId, draftText)
    })

    expect(result.current.drafts.get(sessionId)).toBe(draftText)

    act(() => {
      result.current.clearDraft(sessionId)
    })

    expect(result.current.drafts.get(sessionId)).toBeUndefined()
  })

  it('should track recent sessions with LRU', () => {
    const { result } = renderHook(() => useChatStore())

    // Add sessions
    act(() => {
      for (let i = 0; i < 15; i++) {
        result.current.addToRecentSessions(`session-${i}`)
      }
    })

    // Should only keep last 10 (maxRecentSessions)
    expect(result.current.recentSessionIds).toHaveLength(10)
    expect(result.current.recentSessionIds).not.toContain('session-0')
    expect(result.current.recentSessionIds).toContain('session-14')
  })

  it('should enforce rate limiting', () => {
    const { result } = renderHook(() => useChatStore())

    // Can send initially
    expect(result.current.canSendMessage()).toBe(true)

    // Simulate sending 10 messages
    act(() => {
      for (let i = 0; i < 10; i++) {
        result.current.incrementMessageCount()
      }
    })

    // Should be rate limited after 10 messages
    expect(result.current.canSendMessage()).toBe(false)

    // Reset after a minute (simulate)
    act(() => {
      // Manually reset for test
      result.current.messagesSentInLastMinute = 0
      result.current.lastMessageTimestamp = Date.now() - 61000 // 61 seconds ago
    })

    expect(result.current.canSendMessage()).toBe(true)
  })

  it('should handle pagination', () => {
    const { result } = renderHook(() => useChatStore())

    act(() => {
      result.current.setPagination({
        page: 2,
        total: 50,
        totalPages: 5
      })
    })

    expect(result.current.pagination.page).toBe(2)
    expect(result.current.pagination.total).toBe(50)
    expect(result.current.pagination.totalPages).toBe(5)
    expect(result.current.pagination.pageSize).toBe(20) // Default unchanged
  })

  it('should manage search state', () => {
    const { result } = renderHook(() => useChatStore())
    
    const mockResults = [
      {
        id: 'session-1',
        documentId: 'doc-1',
        sessionName: 'Search Result 1',
        messages: [],
        isActive: true,
        totalMessages: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        canModify: true
      }
    ]

    act(() => {
      result.current.setSearchQuery('test query')
      result.current.setSearchResults(mockResults)
    })

    expect(result.current.searchQuery).toBe('test query')
    expect(result.current.searchResults).toEqual(mockResults)
  })

  it('should clear old sessions when limit exceeded', () => {
    const { result } = renderHook(() => useChatStore())

    // Add many sessions
    act(() => {
      for (let i = 0; i < 20; i++) {
        const session = {
          id: `session-${i}`,
          documentId: 'doc-123',
          sessionName: `Session ${i}`,
          messages: [],
          isActive: true,
          totalMessages: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          canModify: true
        }
        result.current.addSession(session)
        result.current.addToRecentSessions(`session-${i}`)
      }
    })

    // Clear old sessions
    act(() => {
      result.current.clearOldSessions()
    })

    // Should only keep recent sessions
    expect(result.current.sessions.size).toBeLessThanOrEqual(result.current.maxRecentSessions)
    
    // Recent sessions should still exist
    result.current.recentSessionIds.forEach(id => {
      expect(result.current.sessions.has(id)).toBe(true)
    })
  })

  it('should reset store completely', () => {
    const { result } = renderHook(() => useChatStore())

    // Add some data
    act(() => {
      result.current.addSession({
        id: 'session-123',
        documentId: 'doc-123',
        sessionName: 'Test',
        messages: [],
        isActive: true,
        totalMessages: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        canModify: true
      })
      result.current.setCurrentSession('session-123')
      result.current.setDraft('session-123', 'Draft text')
      result.current.setSearchQuery('search')
    })

    // Reset
    act(() => {
      result.current.reset()
    })

    // Everything should be back to initial state
    expect(result.current.currentSessionId).toBeNull()
    expect(result.current.sessions.size).toBe(0)
    expect(result.current.drafts.size).toBe(0)
    expect(result.current.searchQuery).toBe('')
  })
})