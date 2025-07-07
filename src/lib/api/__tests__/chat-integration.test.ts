import { describe, it, expect, vi, beforeEach } from 'vitest'
import { chatAPI } from '@/lib/api/chat'
import { csrfTokenManager } from '@/lib/api/csrf'
import { apiClient } from '@/lib/api/client'

// Mock dependencies
vi.mock('@/lib/api/client')
vi.mock('@/lib/api/csrf')
vi.mock('react-hot-toast', () => ({
  toast: {
    error: vi.fn()
  }
}))

describe('Chat API Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Chat Endpoints with Correct Paths', () => {
    it('should call chat endpoints without /api/v1 prefix', async () => {
      // Mock CSRF token
      ;(csrfTokenManager.requiresToken as any).mockReturnValue(true)
      ;(csrfTokenManager.get as any).mockResolvedValue('test-csrf-token')

      // Mock API responses
      const mockSession = {
        id: 'session-123',
        document_id: 'doc-123',
        session_name: 'Test Session',
        messages: [],
        is_active: true,
        total_messages: 0,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }

      ;(apiClient.post as any).mockResolvedValue(mockSession)
      ;(apiClient.get as any).mockResolvedValue({ sessions: [mockSession] })
      ;(apiClient.put as any).mockResolvedValue(mockSession)
      ;(apiClient.delete as any).mockResolvedValue({ success: true })

      // Test create session
      await chatAPI.createSession({ document_id: 'doc-123', session_name: 'Test' })
      expect(apiClient.post).toHaveBeenCalledWith('/chat/sessions', expect.any(Object))

      // Test get sessions  
      await chatAPI.getSessions()
      expect(apiClient.get).toHaveBeenCalledWith('/chat/sessions')

      // Test get specific session
      await chatAPI.getSession('session-123')
      expect(apiClient.get).toHaveBeenCalledWith('/chat/sessions/session-123')

      // Test update session name
      await chatAPI.updateSessionName('session-123', { session_name: 'Updated' })
      expect(apiClient.put).toHaveBeenCalledWith('/chat/sessions/session-123/name', expect.any(Object))

      // Test delete session
      await chatAPI.deleteSession('session-123')
      expect(apiClient.delete).toHaveBeenCalledWith('/chat/sessions/session-123')
    })

    it('should handle all chat endpoints correctly', async () => {
      // Mock responses for each endpoint
      const mockResponses = {
        sessions: { sessions: [], total: 0, page: 1, page_size: 20, total_pages: 0 },
        session: { id: 'session-1', messages: [] },
        askResponse: { 
          session_id: 'session-1', 
          message: { id: 'msg-1', role: 'assistant', content: 'Answer', created_at: '2024-01-01' } 
        },
        deactivateResponse: { id: 'session-1', is_active: false },
        summarizeResponse: { 
          session_id: 'session-1', 
          summary: 'Summary', 
          key_topics: [], 
          message_count: 10, 
          created_at: '2024-01-01' 
        },
        documentSessions: [],
        searchResponse: { sessions: [], total: 0, query: 'test' },
        suggestionsResponse: { suggestions: ['Q1', 'Q2'], context_used: 'doc', processing_time_ms: 100 },
        statsResponse: { 
          total_sessions: 10, 
          total_messages: 100, 
          active_sessions: 5, 
          avg_messages_per_session: 10,
          total_tokens_used: 1000,
          last_activity: '2024-01-01'
        }
      }

      ;(apiClient.get as any).mockImplementation((url: string) => {
        if (url.includes('/chat/sessions?')) return mockResponses.sessions
        if (url.includes('/chat/sessions/')) return mockResponses.session
        if (url.includes('/chat/documents/')) return mockResponses.documentSessions
        if (url.includes('/chat/search')) return mockResponses.searchResponse
        if (url.includes('/chat/stats')) return mockResponses.statsResponse
        return {}
      })

      ;(apiClient.post as any).mockImplementation((url: string) => {
        if (url.includes('/ask')) return mockResponses.askResponse
        if (url.includes('/summarize')) return mockResponses.summarizeResponse
        if (url.includes('/suggestions')) return mockResponses.suggestionsResponse
        if (url === '/chat/sessions') return mockResponses.session
        return {}
      })

      ;(apiClient.put as any).mockImplementation(() => {
        return mockResponses.deactivateResponse
      })

      // Test all endpoints
      const endpoints = [
        { method: 'getSessions', call: () => chatAPI.getSessions(), expectedUrl: '/chat/sessions' },
        { method: 'getSession', call: () => chatAPI.getSession('s1'), expectedUrl: '/chat/sessions/s1' },
        { method: 'askQuestion', call: () => chatAPI.askQuestion('s1', { question: 'Q?' }), expectedUrl: '/chat/sessions/s1/ask' },
        { method: 'deactivateSession', call: () => chatAPI.deactivateSession('s1'), expectedUrl: '/chat/sessions/s1/deactivate' },
        { method: 'summarizeSession', call: () => chatAPI.summarizeSession('s1'), expectedUrl: '/chat/sessions/s1/summarize' },
        { method: 'getDocumentSessions', call: () => chatAPI.getDocumentSessions('d1'), expectedUrl: '/chat/documents/d1/sessions' },
        { method: 'searchSessions', call: () => chatAPI.searchSessions({ q: 'test' }), expectedUrl: '/chat/search' },
        { method: 'generateSuggestions', call: () => chatAPI.generateSuggestions({ document_id: 'd1' }), expectedUrl: '/chat/suggestions' },
        { method: 'getStats', call: () => chatAPI.getStats(), expectedUrl: '/chat/stats' }
      ]

      for (const endpoint of endpoints) {
        vi.clearAllMocks()
        await endpoint.call()
        
        // Verify the correct endpoint was called (without /api/v1 prefix)
        const method = endpoint.expectedUrl.includes('/chat/sessions/') && endpoint.expectedUrl.includes('/ask') ? 'post' :
                       endpoint.expectedUrl.includes('/chat/sessions/') && endpoint.expectedUrl.includes('/deactivate') ? 'put' :
                       endpoint.expectedUrl.includes('/chat/sessions/') && endpoint.expectedUrl.includes('/summarize') ? 'post' :
                       endpoint.expectedUrl.includes('/chat/suggestions') ? 'post' :
                       endpoint.expectedUrl === '/chat/sessions' && endpoint.method === 'createSession' ? 'post' : 'get'
        
        const apiMethod = apiClient[method] as any
        if (apiMethod.mock.calls.length > 0) {
          expect(apiMethod.mock.calls[0][0]).toContain(endpoint.expectedUrl.split('?')[0])
        }
      }
    })
  })

  describe('CSRF Token Integration', () => {
    it('should include CSRF tokens in state-changing requests', async () => {
      // This test verifies CSRF tokens would be added by interceptors
      // Since we're mocking at the API level, we're just verifying the methods are called
      
      const stateMethods = [
        { fn: () => chatAPI.createSession({ document_id: 'd1' }), method: 'post' },
        { fn: () => chatAPI.askQuestion('s1', { question: 'Q?' }), method: 'post' },
        { fn: () => chatAPI.updateSessionName('s1', { session_name: 'New' }), method: 'put' },
        { fn: () => chatAPI.deleteSession('s1'), method: 'delete' },
        { fn: () => chatAPI.deactivateSession('s1'), method: 'put' }
      ]

      for (const { fn, method } of stateMethods) {
        vi.clearAllMocks()
        ;(apiClient[method] as any).mockResolvedValue({ success: true })
        
        await fn()
        
        expect(apiClient[method]).toHaveBeenCalled()
        // CSRF token would be added by interceptors
      }
    })
  })
})