import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useDocumentUpload } from '@/hooks/queries/documents.queries'
import { apiClient } from '@/lib/api/client'
import { toast } from 'react-hot-toast'
import type { Document, UploadOptions } from '@/types'
import type { PropsWithChildren } from 'react'

// Mock dependencies
vi.mock('@/lib/api/client')
vi.mock('react-hot-toast')

describe('useDocumentUpload hook', () => {
  let queryClient: QueryClient

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

  const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    vi.clearAllMocks()
  })

  it('should upload document successfully', async () => {
    const mockFile = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })
    
    vi.mocked(apiClient.uploadDocument).mockResolvedValueOnce(mockDocument)
    vi.mocked(toast.success).mockImplementation(() => 'toast-id')

    const { result } = renderHook(() => useDocumentUpload(), { wrapper })

    await result.current.mutateAsync({
      file: mockFile,
      options: { enable_ai: true },
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(apiClient.uploadDocument).toHaveBeenCalledWith(
      mockFile,
      { enable_ai: true },
      undefined
    )
    expect(toast.success).toHaveBeenCalledWith(
      'test-document.pdf uploaded successfully!'
    )
  })

  it('should track upload progress', async () => {
    const mockFile = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })
    const progressCallback = vi.fn()

    vi.mocked(apiClient.uploadDocument).mockResolvedValueOnce(mockDocument)

    const { result } = renderHook(() => useDocumentUpload(), { wrapper })

    await result.current.mutateAsync({
      file: mockFile,
      options: {},
      onProgress: progressCallback,
    })

    expect(apiClient.uploadDocument).toHaveBeenCalledWith(
      mockFile,
      {},
      progressCallback
    )
  })

  it('should handle upload errors', async () => {
    const mockFile = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })
    const error = {
      response: {
        data: { message: 'File size exceeds limit' },
      },
    }

    vi.mocked(apiClient.uploadDocument).mockRejectedValueOnce(error)
    vi.mocked(toast.error).mockImplementation(() => 'toast-id')

    const { result } = renderHook(() => useDocumentUpload(), { wrapper })

    await expect(
      result.current.mutateAsync({ file: mockFile })
    ).rejects.toEqual(error)

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(toast.error).toHaveBeenCalledWith('File size exceeds limit')
  })

  it('should handle network errors', async () => {
    const mockFile = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })
    const error = new Error('Network error')

    vi.mocked(apiClient.uploadDocument).mockRejectedValueOnce(error)
    vi.mocked(toast.error).mockImplementation(() => 'toast-id')

    const { result } = renderHook(() => useDocumentUpload(), { wrapper })

    await expect(
      result.current.mutateAsync({ file: mockFile })
    ).rejects.toEqual(error)

    expect(toast.error).toHaveBeenCalledWith('Upload failed')
  })

  it('should invalidate queries on success', async () => {
    const mockFile = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })

    vi.mocked(apiClient.uploadDocument).mockResolvedValueOnce(mockDocument)
    
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useDocumentUpload(), { wrapper })

    await result.current.mutateAsync({ file: mockFile })

    await waitFor(() => {
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ['documents'],
      })
    })

    expect(invalidateQueriesSpy).toHaveBeenCalledTimes(3) // lists, workspace, insights
  })

  it('should handle multiple file uploads', async () => {
    const files = [
      new File(['content1'], 'doc1.pdf', { type: 'application/pdf' }),
      new File(['content2'], 'doc2.pdf', { type: 'application/pdf' }),
    ]

    vi.mocked(apiClient.uploadDocument)
      .mockResolvedValueOnce({ ...mockDocument, id: 'doc-1', title: 'doc1.pdf' })
      .mockResolvedValueOnce({ ...mockDocument, id: 'doc-2', title: 'doc2.pdf' })

    const { result } = renderHook(() => useDocumentUpload(), { wrapper })

    // Upload files sequentially
    for (const file of files) {
      await result.current.mutateAsync({ file })
    }

    expect(apiClient.uploadDocument).toHaveBeenCalledTimes(2)
    expect(toast.success).toHaveBeenCalledTimes(2)
  })

  it('should support upload options', async () => {
    const mockFile = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })
    
    const options: UploadOptions = {
      title: 'Custom Title',
      enable_ai: true,
      enable_ocr: true,
      folder_id: 'folder-123',
      tags: ['important', 'Q1-2024'],
    }

    vi.mocked(apiClient.uploadDocument).mockResolvedValueOnce(mockDocument)

    const { result } = renderHook(() => useDocumentUpload(), { wrapper })

    await result.current.mutateAsync({ file: mockFile, options })

    expect(apiClient.uploadDocument).toHaveBeenCalledWith(
      mockFile,
      options,
      undefined
    )
  })

  it('should handle quota exceeded errors specially', async () => {
    const mockFile = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })
    
    const quotaError = {
      response: {
        status: 402,
        data: { 
          message: 'Document quota exceeded. Please upgrade your plan.',
          code: 'QUOTA_EXCEEDED'
        },
      },
    }

    vi.mocked(apiClient.uploadDocument).mockRejectedValueOnce(quotaError)
    vi.mocked(toast.error).mockImplementation(() => 'toast-id')

    const { result } = renderHook(() => useDocumentUpload(), { wrapper })

    await expect(
      result.current.mutateAsync({ file: mockFile })
    ).rejects.toEqual(quotaError)

    expect(toast.error).toHaveBeenCalledWith(
      'Document quota exceeded. Please upgrade your plan.'
    )
  })

  it('should handle processing status updates', async () => {
    const mockFile = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })
    
    const processingDocument: Document = {
      ...mockDocument,
      status: 'processing',
      ai_processing_status: 'processing',
    }

    vi.mocked(apiClient.uploadDocument).mockResolvedValueOnce(processingDocument)

    const { result } = renderHook(() => useDocumentUpload(), { wrapper })

    const uploadResult = await result.current.mutateAsync({ file: mockFile })

    expect(uploadResult.status).toBe('processing')
    expect(uploadResult.ai_processing_status).toBe('processing')
  })
})