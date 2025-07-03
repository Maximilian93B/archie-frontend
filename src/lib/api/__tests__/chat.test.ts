import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { chatAPI, checkChatRateLimit, streamChatResponse } from '@/lib/api/chat'
import { apiClient } from '@/lib/api/client'
import { ChatErrorType } from '@/lib/chat-errors'
import { toast } from 'react-hot-toast'

// Mock dependencies
vi.mock('@/lib/api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

vi.mock('react-hot-toast', () => ({
  toast: {
    error: vi.fn()
  }
}))

vi.mock('@/lib/chat-errors', async () => {
  const actual = await vi.importActual('@/lib/chat-errors')
  return {
    ...actual,
    handleChatError: vi.fn((error, options) => {
      const chatError = {
        type: ChatErrorType.UNKNOWN_ERROR,
        message: 'Test error',
        retryable: false,
        ...error
      }
      if (options?.showToast) {
        toast.error(chatError.message)
      }
      return chatError
    }),
    retryWithBackoff: vi.fn(async (fn) => fn())
  }
})

describe('Chat API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createSession', () => {
    it('should create a new chat session', async () => {
      const mockResponse = {
        id: 'session-1',
        document_id: 'doc-1',
        session_name: 'New Session',
        messages: [],
        is_active: true,
        total_messages: 0,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }

      ;(apiClient.post as any).mockResolvedValue(mockResponse)

      const result = await chatAPI.createSession({
        document_id: 'doc-1',
        session_name: 'New Session'
      })

      expect(apiClient.post).toHaveBeenCalledWith('/api/v1/chat/sessions', {
        document_id: 'doc-1',
        session_name: 'New Session'
      })
      expect(result).toEqual(mockResponse)
    })

    it('should handle errors when creating session', async () => {
      const error = new Error('Network error')
      ;(apiClient.post as any).mockRejectedValue(error)

      await expect(chatAPI.createSession({ document_id: 'doc-1' }))
        .rejects.toThrow()

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe('getSessions', () => {
    it('should get sessions with pagination', async () => {
      const mockResponse = {
        sessions: [],
        total: 10,
        page: 1,
        page_size: 20,
        total_pages: 1
      }

      ;(apiClient.get as any).mockResolvedValue(mockResponse)

      const result = await chatAPI.getSessions({
        page: 1,
        page_size: 20,
        document_id: 'doc-1'
      })

      expect(apiClient.get).toHaveBeenCalledWith(
        '/api/v1/chat/sessions?page=1&page_size=20&document_id=doc-1'
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle empty params', async () => {
      const mockResponse = { sessions: [] }
      ;(apiClient.get as any).mockResolvedValue(mockResponse)

      await chatAPI.getSessions()

      expect(apiClient.get).toHaveBeenCalledWith('/api/v1/chat/sessions')
    })
  })

  describe('getSession', () => {
    it('should get a specific session', async () => {
      const mockResponse = {
        id: 'session-1',
        messages: []
      }

      ;(apiClient.get as any).mockResolvedValue(mockResponse)

      const result = await chatAPI.getSession('session-1')

      expect(apiClient.get).toHaveBeenCalledWith('/api/v1/chat/sessions/session-1')
      expect(result).toEqual(mockResponse)
    })

    it('should get session with pagination params', async () => {
      const mockResponse = { id: 'session-1', messages: [] }
      ;(apiClient.get as any).mockResolvedValue(mockResponse)

      await chatAPI.getSession('session-1', {
        page: 2,
        limit: 50,
        offset: 50
      })

      expect(apiClient.get).toHaveBeenCalledWith(
        '/api/v1/chat/sessions/session-1?page=2&limit=50&offset=50'
      )
    })
  })

  describe('askQuestion', () => {
    it('should send a question to the chat session', async () => {
      const mockResponse = {
        session_id: 'session-1',
        message: {
          id: 'msg-1',
          role: 'assistant',
          content: 'Answer to question',
          created_at: '2024-01-01T00:00:00Z'
        }
      }

      ;(apiClient.post as any).mockResolvedValue(mockResponse)

      const result = await chatAPI.askQuestion('session-1', {
        question: 'What is this document about?'
      })

      expect(apiClient.post).toHaveBeenCalledWith(
        '/api/v1/chat/sessions/session-1/ask',
        { question: 'What is this document about?' }
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle rate limit errors', async () => {
      const error = {
        response: {
          status: 429,
          data: { error: 'Rate limit exceeded' },
          headers: { 'retry-after': '60' }
        }
      }

      ;(apiClient.post as any).mockRejectedValue(error)

      await expect(chatAPI.askQuestion('session-1', { question: 'Test' }))
        .rejects.toThrow()

      expect(toast.error).toHaveBeenCalled()
    })
  })

  describe('updateSessionName', () => {
    it('should update session name', async () => {
      const mockResponse = { id: 'session-1', session_name: 'Updated Name' }
      ;(apiClient.put as any).mockResolvedValue(mockResponse)

      const result = await chatAPI.updateSessionName('session-1', {
        session_name: 'Updated Name'
      })

      expect(apiClient.put).toHaveBeenCalledWith(
        '/api/v1/chat/sessions/session-1/name',
        { session_name: 'Updated Name' }
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('deleteSession', () => {
    it('should delete a session', async () => {
      ;(apiClient.delete as any).mockResolvedValue({ success: true })

      const result = await chatAPI.deleteSession('session-1')

      expect(apiClient.delete).toHaveBeenCalledWith('/api/v1/chat/sessions/session-1')
      expect(result).toEqual({ success: true })
    })
  })

  describe('searchSessions', () => {
    it('should search sessions', async () => {
      const mockResponse = {
        sessions: [],
        total: 5,
        query: 'test'
      }

      ;(apiClient.get as any).mockResolvedValue(mockResponse)

      const result = await chatAPI.searchSessions({
        q: 'test',
        limit: 10,
        document_id: 'doc-1'
      })

      expect(apiClient.get).toHaveBeenCalledWith(
        '/api/v1/chat/search?q=test&limit=10&document_id=doc-1'
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('generateSuggestions', () => {
    it('should generate suggestions', async () => {
      const mockResponse = {
        suggestions: ['Question 1', 'Question 2'],
        context_used: 'document',
        processing_time_ms: 100
      }

      ;(apiClient.post as any).mockResolvedValue(mockResponse)

      const result = await chatAPI.generateSuggestions({
        document_id: 'doc-1',
        context: 'test context'
      })

      expect(apiClient.post).toHaveBeenCalledWith('/api/v1/chat/suggestions', {
        document_id: 'doc-1',
        context: 'test context'
      })
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getStats', () => {
    it('should get chat statistics', async () => {
      const mockResponse = {
        total_sessions: 10,
        total_messages: 100,
        active_sessions: 5
      }

      ;(apiClient.get as any).mockResolvedValue(mockResponse)

      const result = await chatAPI.getStats()

      expect(apiClient.get).toHaveBeenCalledWith('/api/v1/chat/stats')
      expect(result).toEqual(mockResponse)
    })

    it('should not show toast for stats errors', async () => {
      const error = new Error('Stats error')
      ;(apiClient.get as any).mockRejectedValue(error)

      await expect(chatAPI.getStats()).rejects.toThrow()

      // Stats errors should not show toast (showToast: false)
      expect(toast.error).not.toHaveBeenCalled()
    })
  })
})

describe('Chat Utilities', () => {
  describe('checkChatRateLimit', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should allow messages when under limit', () => {
      const lastMessageTime = Date.now()
      const messageCount = 5

      expect(checkChatRateLimit(lastMessageTime, messageCount)).toBe(true)
    })

    it('should block messages at limit', () => {
      const lastMessageTime = Date.now()
      const messageCount = 10

      expect(checkChatRateLimit(lastMessageTime, messageCount)).toBe(false)
    })

    it('should reset after one minute', () => {
      const lastMessageTime = Date.now() - 61000 // 61 seconds ago
      const messageCount = 10

      expect(checkChatRateLimit(lastMessageTime, messageCount)).toBe(true)
    })
  })

  describe('streamChatResponse', () => {
    it('should stream response in chunks', async () => {
      const mockResponse = {
        session_id: 'session-1',
        message: {
          id: 'msg-1',
          role: 'assistant',
          content: 'This is a long response that will be streamed in chunks.',
          created_at: '2024-01-01T00:00:00Z'
        }
      }

      ;(apiClient.post as any).mockResolvedValue(mockResponse)

      const chunks: string[] = []
      
      for await (const chunk of streamChatResponse('session-1', 'Test question')) {
        chunks.push(chunk.chunk)
        if (chunk.isComplete) break
      }

      expect(chunks.join('')).toBe(mockResponse.message.content)
      expect(chunks.length).toBeGreaterThan(1)
    })

    it('should handle streaming errors', async () => {
      const error = new Error('Stream error')
      ;(apiClient.post as any).mockRejectedValue(error)

      const generator = streamChatResponse('session-1', 'Test question')
      
      await expect(generator.next()).rejects.toThrow()
    })
  })
})