import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { apiClient } from '@/lib/api/client'

// E2E test configuration
const TEST_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://172.24.32.1:8080',
  testUser: {
    email: 'e2e-test@example.com',
    password: 'E2eTest123!',
    first_name: 'E2E',
    last_name: 'Test',
    company: 'Test Organization',
    registration_type: 'organization'
  }
}

// Test state
let authToken: string
let testSubdomain: string
let testDocumentId: string
let testSessionId: string

describe('Chat E2E Tests', () => {
  beforeAll(async () => {
    console.log('🚀 Setting up E2E test environment...')
    
    // 1. Register or login test user
    try {
      const registerRes = await apiClient.register(TEST_CONFIG.testUser)
      authToken = registerRes.token
      testSubdomain = registerRes.tenant.subdomain
      console.log('✅ Test user registered:', testSubdomain)
    } catch (error: any) {
      if (error.response?.status === 409) {
        // User exists, try login
        console.log('User exists, attempting login...')
        
        // Look up subdomain first
        const subdomains = await apiClient.lookupSubdomain(TEST_CONFIG.testUser.email)
        if (subdomains.subdomains.length > 0) {
          testSubdomain = subdomains.subdomains[0].subdomain
          
          const loginRes = await apiClient.login({
            email: TEST_CONFIG.testUser.email,
            password: TEST_CONFIG.testUser.password,
            subdomain: testSubdomain
          })
          
          authToken = loginRes.token
          console.log('✅ Logged in successfully')
        } else {
          throw new Error('No subdomain found for test user')
        }
      } else {
        throw error
      }
    }
    
    // Set auth token
    apiClient.setToken(authToken)
    if (typeof window !== 'undefined') {
      localStorage.setItem('tenant_subdomain', testSubdomain)
    }
    
    // 2. Create a test document
    console.log('Creating test document...')
    const formData = new FormData()
    const testContent = `
# E2E Test Document

This document is created for end-to-end testing of the chat feature.

## Test Content
- Created at: ${new Date().toISOString()}
- Purpose: Chat feature testing
- Contains: Sample text for AI processing

## Key Information
The Archivus platform provides intelligent document management.
This test validates the chat functionality works correctly.
    `.trim()
    
    const blob = new Blob([testContent], { type: 'text/markdown' })
    formData.append('file', blob, 'e2e-test-document.md')
    formData.append('enable_ai_processing', 'true')
    
    const uploadRes = await apiClient.uploadDocument(formData)
    testDocumentId = uploadRes.document.id
    console.log('✅ Document created:', testDocumentId)
    
    // Wait for processing (with timeout)
    let attempts = 0
    while (attempts < 30) {
      const doc = await apiClient.getDocument(testDocumentId)
      if (doc.document.status === 'processed') {
        console.log('✅ Document processed')
        break
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      attempts++
    }
  }, 60000) // 60 second timeout for setup

  afterAll(async () => {
    // Cleanup
    if (testSessionId) {
      try {
        await apiClient.deleteChatSession(testSessionId)
        console.log('✅ Cleaned up test session')
      } catch (error) {
        console.error('Failed to cleanup session:', error)
      }
    }
    
    if (testDocumentId) {
      try {
        await apiClient.deleteDocument(testDocumentId)
        console.log('✅ Cleaned up test document')
      } catch (error) {
        console.error('Failed to cleanup document:', error)
      }
    }
  })

  describe('Chat Session Management', () => {
    it('should create a new chat session', async () => {
      const response = await apiClient.createChatSession(
        testDocumentId,
        'E2E Test Chat Session'
      )
      
      expect(response.session).toBeDefined()
      expect(response.session.id).toBeTruthy()
      expect(response.session.document_id).toBe(testDocumentId)
      expect(response.session.session_name).toBe('E2E Test Chat Session')
      expect(response.session.messages).toEqual([])
      
      testSessionId = response.session.id
    })

    it('should retrieve chat session', async () => {
      const response = await apiClient.getChatSession(testSessionId)
      
      expect(response.session).toBeDefined()
      expect(response.session.id).toBe(testSessionId)
      expect(response.session.document_id).toBe(testDocumentId)
    })

    it('should list chat sessions', async () => {
      const response = await apiClient.getChatSessions({ page: 1, page_size: 10 })
      
      expect(response.data).toBeDefined()
      expect(Array.isArray(response.data)).toBe(true)
      expect(response.total).toBeGreaterThan(0)
      
      const ourSession = response.data.find(s => s.id === testSessionId)
      expect(ourSession).toBeDefined()
    })

    it('should update session name', async () => {
      const newName = 'Updated E2E Test Session'
      await apiClient.updateSessionName(testSessionId, newName)
      
      const response = await apiClient.getChatSession(testSessionId)
      expect(response.session.session_name).toBe(newName)
    })
  })

  describe('Chat Q&A Functionality', () => {
    it('should ask a question and receive AI response', async () => {
      const question = 'What is the main purpose of this document?'
      
      const startTime = Date.now()
      const response = await apiClient.askQuestion(testSessionId, question)
      const responseTime = Date.now() - startTime
      
      expect(response.answer).toBeTruthy()
      expect(response.message_id).toBeTruthy()
      expect(responseTime).toBeLessThan(10000) // Should respond within 10 seconds
      
      // Answer should be relevant to our test document
      expect(response.answer.toLowerCase()).toMatch(
        /(test|testing|e2e|end-to-end|chat feature|validation)/
      )
    })

    it('should maintain conversation context', async () => {
      // Ask follow-up question
      const followUp = 'Can you be more specific about the testing purpose?'
      const response = await apiClient.askQuestion(testSessionId, followUp)
      
      expect(response.answer).toBeTruthy()
      
      // Check session has all messages
      const session = await apiClient.getChatSession(testSessionId)
      expect(session.session.messages.length).toBeGreaterThanOrEqual(4) // 2 questions + 2 answers
    })

    it('should handle multiple rapid questions', async () => {
      const questions = [
        'What date was this created?',
        'What platform is mentioned?',
        'Is this for testing?'
      ]
      
      const responses = await Promise.all(
        questions.map(q => apiClient.askQuestion(testSessionId, q))
      )
      
      responses.forEach((response, index) => {
        expect(response.answer).toBeTruthy()
        expect(response.message_id).toBeTruthy()
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid session ID', async () => {
      await expect(
        apiClient.getChatSession('invalid-session-id')
      ).rejects.toThrow()
    })

    it('should handle invalid document ID', async () => {
      await expect(
        apiClient.createChatSession('invalid-doc-id', 'Test')
      ).rejects.toThrow()
    })

    it('should handle empty questions', async () => {
      await expect(
        apiClient.askQuestion(testSessionId, '')
      ).rejects.toThrow()
    })
  })

  describe('Performance Tests', () => {
    it('should handle session with many messages efficiently', async () => {
      // Create a new session for performance testing
      const perfSession = await apiClient.createChatSession(
        testDocumentId,
        'Performance Test Session'
      )
      const perfSessionId = perfSession.session.id
      
      try {
        // Send 20 messages
        const startTime = Date.now()
        
        for (let i = 0; i < 20; i++) {
          await apiClient.askQuestion(
            perfSessionId,
            `Performance test question ${i + 1}: Tell me about aspect ${i + 1} of the document.`
          )
        }
        
        const totalTime = Date.now() - startTime
        const avgTime = totalTime / 20
        
        console.log(`✅ Sent 20 messages in ${totalTime}ms (avg: ${avgTime.toFixed(0)}ms)`)
        expect(avgTime).toBeLessThan(5000) // Average should be under 5 seconds per message
        
        // Retrieve session with all messages
        const retrieveStart = Date.now()
        const fullSession = await apiClient.getChatSession(perfSessionId)
        const retrieveTime = Date.now() - retrieveStart
        
        expect(fullSession.session.messages.length).toBe(40) // 20 questions + 20 answers
        expect(retrieveTime).toBeLessThan(1000) // Should load quickly
        console.log(`✅ Retrieved 40 messages in ${retrieveTime}ms`)
        
      } finally {
        // Cleanup
        await apiClient.deleteChatSession(perfSessionId)
      }
    })
  })
})