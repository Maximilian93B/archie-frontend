import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiClient } from '@/lib/api/client'
import axios from 'axios'
import type { Document, UploadOptions } from '@/types'

// Mock axios
vi.mock('axios')

describe('Document Upload API', () => {
  const mockAxiosInstance = {
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn() },
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // @ts-ignore
    axios.create.mockReturnValue(mockAxiosInstance)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('uploadDocument', () => {
    const mockFile = new File(['test content'], 'test-document.pdf', {
      type: 'application/pdf',
    })

    const mockDocument: Document = {
      id: 'doc-123',
      title: 'test-document.pdf',
      filename: 'test-document.pdf',
      file_path: '/uploads/test-document.pdf',
      content_type: 'application/pdf',
      file_size: 1024,
      document_type: 'document',
      tenant_id: 'tenant-123',
      user_id: 'user-123',
      ai_processed: false,
      embedding_status: 'pending',
      status: 'uploaded',
      
      // Backend-specific fields
      file_name: 'test-document.pdf',
      original_name: 'test-document.pdf',
      storage_path: '/uploads/test-document.pdf',
      content_hash: 'abc123hash',
      text_extraction_status: 'completed',
      text_word_count: 150,
      text_char_count: 950,
      text_extraction_time_ms: 250,
      version: 1,
      language: 'en',
      compliance_status: 'compliant',
      legal_hold: false,
      permissions: {
        read: true,
        update: true,
        delete: true,
        share: true,
      },
      
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }

    it('should upload a document with default options', async () => {
      mockAxiosInstance.post.mockResolvedValueOnce({ data: mockDocument })

      const result = await apiClient.uploadDocument(mockFile)

      // Verify the API was called correctly
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/api/v1/documents/upload',
        expect.any(FormData),
        expect.objectContaining({
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 600000, // 10 minutes
        })
      )

      // Verify FormData contents
      const formDataArg = mockAxiosInstance.post.mock.calls[0][1]
      expect(formDataArg).toBeInstanceOf(FormData)
      expect(formDataArg.get('file')).toBe(mockFile)
      expect(formDataArg.get('title')).toBe('test-document.pdf')
      expect(formDataArg.get('enable_ai')).toBe('true')
      expect(formDataArg.get('enable_ocr')).toBe('false')

      expect(result).toEqual(mockDocument)
    })

    it('should upload a document with custom options', async () => {
      mockAxiosInstance.post.mockResolvedValueOnce({ data: mockDocument })

      const options: UploadOptions = {
        title: 'Custom Title',
        enable_ai: false,
        enable_ocr: true,
        folder_id: 'folder-456',
        tags: ['invoice', 'Q1-2024'],
      }

      await apiClient.uploadDocument(mockFile, options)

      const formDataArg = mockAxiosInstance.post.mock.calls[0][1]
      expect(formDataArg.get('title')).toBe('Custom Title')
      expect(formDataArg.get('enable_ai')).toBe('false')
      expect(formDataArg.get('enable_ocr')).toBe('true')
      expect(formDataArg.get('folder_id')).toBe('folder-456')
      expect(formDataArg.get('tags')).toBe('invoice,Q1-2024')
    })

    it('should track upload progress', async () => {
      const progressCallback = vi.fn()
      let capturedProgressHandler: any

      mockAxiosInstance.post.mockImplementationOnce((url, data, config) => {
        capturedProgressHandler = config.onUploadProgress
        return Promise.resolve({ data: mockDocument })
      })

      await apiClient.uploadDocument(mockFile, {}, progressCallback)

      // Simulate progress events
      capturedProgressHandler({ loaded: 50, total: 100 })
      expect(progressCallback).toHaveBeenCalledWith(50)

      capturedProgressHandler({ loaded: 100, total: 100 })
      expect(progressCallback).toHaveBeenCalledWith(100)
    })

    it('should handle upload cancellation', async () => {
      const controller = new AbortController()
      mockAxiosInstance.post.mockRejectedValueOnce(new Error('Request aborted'))

      const uploadPromise = apiClient.uploadDocument(
        mockFile,
        {},
        undefined,
        controller.signal
      )

      controller.abort()

      await expect(uploadPromise).rejects.toThrow('Request aborted')
    })

    it('should handle network errors', async () => {
      const networkError = new Error('Network Error')
      mockAxiosInstance.post.mockRejectedValueOnce(networkError)

      await expect(apiClient.uploadDocument(mockFile)).rejects.toThrow(
        'Network Error'
      )
    })

    it('should handle server errors', async () => {
      const serverError = {
        response: {
          status: 413,
          data: { message: 'File too large' },
        },
      }
      mockAxiosInstance.post.mockRejectedValueOnce(serverError)

      await expect(apiClient.uploadDocument(mockFile)).rejects.toMatchObject(
        serverError
      )
    })

    it('should handle quota exceeded errors', async () => {
      const quotaError = {
        response: {
          status: 402,
          data: { 
            message: 'Document quota exceeded',
            code: 'QUOTA_EXCEEDED',
            details: {
              used: 100,
              limit: 100,
              feature: 'documents'
            }
          },
        },
      }
      mockAxiosInstance.post.mockRejectedValueOnce(quotaError)

      await expect(apiClient.uploadDocument(mockFile)).rejects.toMatchObject(
        quotaError
      )
    })

    it('should handle timeout errors', async () => {
      const timeoutError = {
        code: 'ECONNABORTED',
        message: 'timeout of 600000ms exceeded',
      }
      mockAxiosInstance.post.mockRejectedValueOnce(timeoutError)

      await expect(apiClient.uploadDocument(mockFile)).rejects.toMatchObject(
        timeoutError
      )
    })

    describe('file type validation', () => {
      const fileTypes = [
        { ext: 'pdf', mime: 'application/pdf' },
        { ext: 'doc', mime: 'application/msword' },
        { ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
        { ext: 'txt', mime: 'text/plain' },
        { ext: 'csv', mime: 'text/csv' },
        { ext: 'json', mime: 'application/json' },
        { ext: 'xml', mime: 'application/xml' },
        { ext: 'png', mime: 'image/png' },
        { ext: 'jpg', mime: 'image/jpeg' },
        { ext: 'tiff', mime: 'image/tiff' },
      ]

      fileTypes.forEach(({ ext, mime }) => {
        it(`should upload ${ext} files with correct mime type`, async () => {
          const file = new File(['content'], `test.${ext}`, { type: mime })
          mockAxiosInstance.post.mockResolvedValueOnce({ data: mockDocument })

          await apiClient.uploadDocument(file)

          const formDataArg = mockAxiosInstance.post.mock.calls[0][1]
          const uploadedFile = formDataArg.get('file')
          expect(uploadedFile.type).toBe(mime)
        })
      })
    })

    describe('large file handling', () => {
      it('should handle files up to 50MB', async () => {
        // Create a 50MB file mock
        const largeContent = new Array(50 * 1024 * 1024).fill('a').join('')
        const largeFile = new File([largeContent], 'large-file.pdf', {
          type: 'application/pdf',
        })
        
        mockAxiosInstance.post.mockResolvedValueOnce({ data: mockDocument })

        await apiClient.uploadDocument(largeFile)

        expect(mockAxiosInstance.post).toHaveBeenCalled()
      })
    })

    describe('processing status handling', () => {
      it('should handle documents with processing status', async () => {
        const processingDocument: Document = {
          ...mockDocument,
          status: 'processing',
          ai_processing_status: 'processing',
          embedding_status: 'processing',
        }

        mockAxiosInstance.post.mockResolvedValueOnce({ data: processingDocument })

        const result = await apiClient.uploadDocument(mockFile)

        expect(result.status).toBe('processing')
        expect(result.ai_processing_status).toBe('processing')
        expect(result.embedding_status).toBe('processing')
      })

      it('should handle AI-processed documents', async () => {
        const aiProcessedDocument: Document = {
          ...mockDocument,
          status: 'ai_processed',
          ai_processed: true,
          ai_processing_status: 'completed',
          ai_summary: 'This is a test document summary',
          ai_entities: ['Entity1', 'Entity2'],
          ai_key_points: ['Key point 1', 'Key point 2'],
          ai_confidence_score: 0.95,
        }

        mockAxiosInstance.post.mockResolvedValueOnce({ data: aiProcessedDocument })

        const result = await apiClient.uploadDocument(mockFile)

        expect(result.ai_processed).toBe(true)
        expect(result.ai_summary).toBeDefined()
        expect(result.ai_entities).toHaveLength(2)
        expect(result.ai_confidence_score).toBe(0.95)
      })
    })
  })

  describe('upload integration with other API methods', () => {
    it('should get document after upload', async () => {
      const mockDocument: Document = {
        id: 'doc-123',
        title: 'test-document.pdf',
        filename: 'test-document.pdf',
        file_path: '/uploads/test-document.pdf',
        content_type: 'application/pdf',
        file_size: 1024,
        document_type: 'document',
        tenant_id: 'tenant-123',
        user_id: 'user-123',
        ai_processed: true,
        embedding_status: 'completed',
        status: 'ai_processed',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }

      // Mock upload
      mockAxiosInstance.post.mockResolvedValueOnce({ data: mockDocument })
      
      // Mock get document
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockDocument })

      // Upload document
      const uploadResult = await apiClient.uploadDocument(
        new File(['content'], 'test.pdf', { type: 'application/pdf' })
      )

      // Get document details
      const getResult = await apiClient.getDocument(uploadResult.id)

      expect(getResult.id).toBe(uploadResult.id)
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `/api/v1/documents/${uploadResult.id}`
      )
    })

    it('should delete document after upload', async () => {
      const mockDocument: Document = {
        id: 'doc-123',
        title: 'test-document.pdf',
        filename: 'test-document.pdf',
        file_path: '/uploads/test-document.pdf',
        content_type: 'application/pdf',
        file_size: 1024,
        document_type: 'document',
        tenant_id: 'tenant-123',
        user_id: 'user-123',
        ai_processed: false,
        embedding_status: 'pending',
        status: 'uploaded',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }

      // Mock upload
      mockAxiosInstance.post.mockResolvedValueOnce({ data: mockDocument })
      
      // Mock delete
      mockAxiosInstance.delete.mockResolvedValueOnce({ data: {} })

      // Upload and delete
      const uploadResult = await apiClient.uploadDocument(
        new File(['content'], 'test.pdf', { type: 'application/pdf' })
      )
      
      await apiClient.deleteDocument(uploadResult.id)

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
        `/api/v1/documents/${uploadResult.id}`
      )
    })
  })
})