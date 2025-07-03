import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiClient } from '@/lib/api/client'
import axios from 'axios'

// Mock axios
vi.mock('axios')

interface ProcessingStatusResponse {
  document_id: string;
  document_name: string;
  status: string;
  processing_steps: {
    text_extraction: {
      status: 'pending' | 'completed' | 'failed';
      method?: string;
      char_count: number;
      word_count: number;
      quality: number;
      language?: string;
      extracted_at?: string;
      error?: string;
    };
    ocr?: {
      status: string;
      confidence?: number;
      provider?: string;
    };
    ai_analysis: {
      status: 'pending' | 'processing' | 'partial' | 'completed';
      summary_generated: boolean;
      entities_extracted: boolean;
      classification_complete: boolean;
      tags_generated: boolean;
      processed_at?: string;
      pending_jobs?: Array<{
        job_type: string;
        status: string;
        priority: number;
        queued_at: string;
      }>;
    };
  };
  supported_operations: string[];
  processing_metrics?: {
    total_processing_time_ms: number;
    text_extraction_time_ms: number;
    ai_processing_time_ms: number;
  };
}

interface BatchStatusResponse {
  statuses: {
    [document_id: string]: ProcessingStatusResponse | { error: string };
  };
}

describe('Processing Status API', () => {
  const mockAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
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

  describe('getProcessingStatus', () => {
    const mockProcessingStatus: ProcessingStatusResponse = {
      document_id: 'doc-123',
      document_name: 'test-document.pdf',
      status: 'processing',
      processing_steps: {
        text_extraction: {
          status: 'completed',
          method: 'pdfium',
          char_count: 1250,
          word_count: 200,
          quality: 0.95,
          language: 'en',
          extracted_at: '2024-01-01T10:00:00Z',
        },
        ai_analysis: {
          status: 'processing',
          summary_generated: false,
          entities_extracted: false,
          classification_complete: false,
          tags_generated: false,
          pending_jobs: [
            {
              job_type: 'summarization',
              status: 'queued',
              priority: 1,
              queued_at: '2024-01-01T10:01:00Z',
            },
          ],
        },
      },
      supported_operations: ['text_extraction', 'ai_analysis'],
      processing_metrics: {
        total_processing_time_ms: 2500,
        text_extraction_time_ms: 500,
        ai_processing_time_ms: 2000,
      },
    }

    it('should get processing status for a document', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockProcessingStatus })

      const result = await apiClient.getProcessingStatus('doc-123')

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        '/api/v1/documents/doc-123/processing-status'
      )
      expect(result).toEqual(mockProcessingStatus)
    })

    it('should handle completed processing status', async () => {
      const completedStatus: ProcessingStatusResponse = {
        ...mockProcessingStatus,
        status: 'completed',
        processing_steps: {
          text_extraction: {
            status: 'completed',
            method: 'pdfium',
            char_count: 1250,
            word_count: 200,
            quality: 0.95,
            language: 'en',
            extracted_at: '2024-01-01T10:00:00Z',
          },
          ai_analysis: {
            status: 'completed',
            summary_generated: true,
            entities_extracted: true,
            classification_complete: true,
            tags_generated: true,
            processed_at: '2024-01-01T10:05:00Z',
          },
        },
      }

      mockAxiosInstance.get.mockResolvedValueOnce({ data: completedStatus })

      const result = await apiClient.getProcessingStatus('doc-123')

      expect(result.status).toBe('completed')
      expect(result.processing_steps.ai_analysis.status).toBe('completed')
      expect(result.processing_steps.ai_analysis.summary_generated).toBe(true)
    })

    it('should handle failed processing status', async () => {
      const failedStatus: ProcessingStatusResponse = {
        ...mockProcessingStatus,
        status: 'failed',
        processing_steps: {
          text_extraction: {
            status: 'failed',
            char_count: 0,
            word_count: 0,
            quality: 0,
            error: 'Unsupported file format',
          },
          ai_analysis: {
            status: 'pending',
            summary_generated: false,
            entities_extracted: false,
            classification_complete: false,
            tags_generated: false,
          },
        },
      }

      mockAxiosInstance.get.mockResolvedValueOnce({ data: failedStatus })

      const result = await apiClient.getProcessingStatus('doc-123')

      expect(result.status).toBe('failed')
      expect(result.processing_steps.text_extraction.status).toBe('failed')
      expect(result.processing_steps.text_extraction.error).toBe('Unsupported file format')
    })

    it('should handle OCR processing for images', async () => {
      const ocrStatus: ProcessingStatusResponse = {
        ...mockProcessingStatus,
        processing_steps: {
          ...mockProcessingStatus.processing_steps,
          ocr: {
            status: 'completed',
            confidence: 0.87,
            provider: 'claude-vision',
          },
        },
      }

      mockAxiosInstance.get.mockResolvedValueOnce({ data: ocrStatus })

      const result = await apiClient.getProcessingStatus('doc-123')

      expect(result.processing_steps.ocr).toBeDefined()
      expect(result.processing_steps.ocr!.status).toBe('completed')
      expect(result.processing_steps.ocr!.confidence).toBe(0.87)
      expect(result.processing_steps.ocr!.provider).toBe('claude-vision')
    })

    it('should handle processing metrics', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockProcessingStatus })

      const result = await apiClient.getProcessingStatus('doc-123')

      expect(result.processing_metrics).toBeDefined()
      expect(result.processing_metrics!.total_processing_time_ms).toBe(2500)
      expect(result.processing_metrics!.text_extraction_time_ms).toBe(500)
      expect(result.processing_metrics!.ai_processing_time_ms).toBe(2000)
    })
  })

  describe('getBatchProcessingStatus', () => {
    it('should get status for multiple documents', async () => {
      const batchResponse: BatchStatusResponse = {
        statuses: {
          'doc-1': {
            document_id: 'doc-1',
            document_name: 'document1.pdf',
            status: 'completed',
            processing_steps: {
              text_extraction: {
                status: 'completed',
                char_count: 1000,
                word_count: 150,
                quality: 0.9,
              },
              ai_analysis: {
                status: 'completed',
                summary_generated: true,
                entities_extracted: true,
                classification_complete: true,
                tags_generated: true,
              },
            },
            supported_operations: ['text_extraction', 'ai_analysis'],
          },
          'doc-2': {
            document_id: 'doc-2',
            document_name: 'document2.jpg',
            status: 'processing',
            processing_steps: {
              text_extraction: {
                status: 'completed',
                char_count: 500,
                word_count: 75,
                quality: 0.85,
              },
              ai_analysis: {
                status: 'processing',
                summary_generated: false,
                entities_extracted: true,
                classification_complete: false,
                tags_generated: false,
              },
            },
            supported_operations: ['ocr', 'ai_analysis'],
          },
          'doc-3': {
            error: 'Document not found',
          },
        },
      }

      mockAxiosInstance.post.mockResolvedValueOnce({ data: batchResponse })

      const result = await apiClient.getBatchProcessingStatus(['doc-1', 'doc-2', 'doc-3'])

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/api/v1/documents/batch-status',
        { document_ids: ['doc-1', 'doc-2', 'doc-3'] }
      )

      expect(result.statuses['doc-1']).toBeDefined()
      expect('error' in result.statuses['doc-1']).toBe(false)
      
      expect(result.statuses['doc-2']).toBeDefined()
      expect('error' in result.statuses['doc-2']).toBe(false)
      
      expect(result.statuses['doc-3']).toBeDefined()
      expect('error' in result.statuses['doc-3']).toBe(true)
      expect((result.statuses['doc-3'] as { error: string }).error).toBe('Document not found')
    })

    it('should handle maximum batch size', async () => {
      const documentIds = Array.from({ length: 100 }, (_, i) => `doc-${i}`)
      
      mockAxiosInstance.post.mockResolvedValueOnce({ 
        data: { statuses: {} } 
      })

      await apiClient.getBatchProcessingStatus(documentIds)

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/api/v1/documents/batch-status',
        { document_ids: documentIds }
      )
    })

    it('should handle batch request errors', async () => {
      const error = {
        response: {
          status: 400,
          data: { message: 'Too many document IDs' },
        },
      }

      mockAxiosInstance.post.mockRejectedValueOnce(error)

      await expect(
        apiClient.getBatchProcessingStatus(Array.from({ length: 101 }, (_, i) => `doc-${i}`))
      ).rejects.toMatchObject(error)
    })
  })

  describe('processing status polling', () => {
    it('should poll until processing is complete', async () => {
      const processingStatus = {
        document_id: 'doc-123',
        document_name: 'test.pdf',
        status: 'processing',
        processing_steps: {
          text_extraction: { status: 'completed', char_count: 1000, word_count: 150, quality: 0.9 },
          ai_analysis: { 
            status: 'processing', 
            summary_generated: false, 
            entities_extracted: false,
            classification_complete: false,
            tags_generated: false,
          },
        },
        supported_operations: ['text_extraction', 'ai_analysis'],
      }

      const completedStatus = {
        ...processingStatus,
        status: 'completed',
        processing_steps: {
          ...processingStatus.processing_steps,
          ai_analysis: {
            status: 'completed',
            summary_generated: true,
            entities_extracted: true,
            classification_complete: true,
            tags_generated: true,
            processed_at: '2024-01-01T10:05:00Z',
          },
        },
      }

      // First call returns processing, second returns completed
      mockAxiosInstance.get
        .mockResolvedValueOnce({ data: processingStatus })
        .mockResolvedValueOnce({ data: completedStatus })

      // Simulate polling
      let status = await apiClient.getProcessingStatus('doc-123')
      expect(status.status).toBe('processing')

      // Poll again
      status = await apiClient.getProcessingStatus('doc-123')
      expect(status.status).toBe('completed')
      expect(status.processing_steps.ai_analysis.status).toBe('completed')
    })
  })

  describe('error handling', () => {
    it('should handle document not found errors', async () => {
      const error = {
        response: {
          status: 404,
          data: { error: 'document_not_found', message: 'Document not found' },
        },
      }

      mockAxiosInstance.get.mockRejectedValueOnce(error)

      await expect(apiClient.getProcessingStatus('nonexistent-doc')).rejects.toMatchObject(error)
    })

    it('should handle service unavailable errors', async () => {
      const error = {
        response: {
          status: 503,
          data: { error: 'service_unavailable', message: 'Processing service temporarily unavailable' },
        },
      }

      mockAxiosInstance.get.mockRejectedValueOnce(error)

      await expect(apiClient.getProcessingStatus('doc-123')).rejects.toMatchObject(error)
    })
  })
})