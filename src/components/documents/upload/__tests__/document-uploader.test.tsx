import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DocumentUploader } from '@/components/documents/upload/document-uploader'
import { useDocumentUpload } from '@/hooks/queries/documents.queries'
import { useSubscription } from '@/hooks/use-subscription'
import { toast } from 'react-hot-toast'

// Mock dependencies
vi.mock('@/hooks/queries/documents.queries')
vi.mock('@/hooks/use-subscription')
vi.mock('react-hot-toast')
vi.mock('react-dropzone', () => ({
  useDropzone: vi.fn((options) => ({
    getRootProps: () => ({
      onClick: vi.fn(),
      onDrop: options.onDrop,
      'data-testid': 'dropzone',
    }),
    getInputProps: () => ({
      type: 'file',
      'data-testid': 'file-input',
    }),
    isDragActive: false,
  })),
}))

describe('DocumentUploader', () => {
  const mockUploadDocument = vi.fn()
  const mockCheckQuota = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    
    vi.mocked(useDocumentUpload).mockReturnValue({
      mutateAsync: mockUploadDocument,
      isLoading: false,
      // @ts-ignore - partial mock
    })

    vi.mocked(useSubscription).mockReturnValue({
      checkQuota: mockCheckQuota,
      // @ts-ignore - partial mock
    })

    mockCheckQuota.mockResolvedValue(true)
  })

  it('should render upload dropzone', () => {
    render(<DocumentUploader />)
    
    expect(screen.getByText('Drag & drop files here')).toBeInTheDocument()
    expect(screen.getByText(/Supported:/)).toBeInTheDocument()
  })

  it('should handle file drop', async () => {
    const { container } = render(<DocumentUploader />)
    
    const file = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })

    const dropzone = container.querySelector('[data-testid="dropzone"]')
    const dropEvent = {
      dataTransfer: {
        files: [file],
      },
    }

    // Simulate file drop
    fireEvent.drop(dropzone!, dropEvent)

    await waitFor(() => {
      expect(screen.getByText('test.pdf')).toBeInTheDocument()
      expect(screen.getByText('Upload 1 files')).toBeInTheDocument()
    })
  })

  it('should check quota before accepting files', async () => {
    mockCheckQuota.mockResolvedValueOnce(false)
    
    const { container } = render(<DocumentUploader />)
    
    const file = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })

    const dropzone = container.querySelector('[data-testid="dropzone"]')
    fireEvent.drop(dropzone!, {
      dataTransfer: { files: [file] },
    })

    await waitFor(() => {
      expect(mockCheckQuota).toHaveBeenCalledWith('documents', { showError: true })
      expect(screen.queryByText('test.pdf')).not.toBeInTheDocument()
    })
  })

  it('should show file information', async () => {
    const { container } = render(<DocumentUploader />)
    
    const file = new File(['a'.repeat(1024 * 1024)], 'large-file.pdf', {
      type: 'application/pdf',
    })

    const dropzone = container.querySelector('[data-testid="dropzone"]')
    fireEvent.drop(dropzone!, {
      dataTransfer: { files: [file] },
    })

    await waitFor(() => {
      expect(screen.getByText('large-file.pdf')).toBeInTheDocument()
      expect(screen.getByText('1.00 MB')).toBeInTheDocument()
    })
  })

  it('should upload files when upload button is clicked', async () => {
    mockUploadDocument.mockResolvedValueOnce({})
    vi.mocked(toast.success).mockImplementation(() => 'toast-id')
    
    const { container } = render(<DocumentUploader />)
    
    const file = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })

    // Add file
    const dropzone = container.querySelector('[data-testid="dropzone"]')
    fireEvent.drop(dropzone!, {
      dataTransfer: { files: [file] },
    })

    // Click upload button
    await waitFor(() => {
      const uploadButton = screen.getByText('Upload 1 files')
      fireEvent.click(uploadButton)
    })

    await waitFor(() => {
      expect(mockUploadDocument).toHaveBeenCalledWith(
        expect.any(FormData),
        expect.objectContaining({
          onUploadProgress: expect.any(Function),
        })
      )
      expect(toast.success).toHaveBeenCalledWith('test.pdf uploaded successfully')
    })
  })

  it('should handle upload errors', async () => {
    mockUploadDocument.mockRejectedValueOnce(new Error('Upload failed'))
    vi.mocked(toast.error).mockImplementation(() => 'toast-id')
    
    const { container } = render(<DocumentUploader />)
    
    const file = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })

    // Add file and upload
    const dropzone = container.querySelector('[data-testid="dropzone"]')
    fireEvent.drop(dropzone!, {
      dataTransfer: { files: [file] },
    })

    await waitFor(() => {
      const uploadButton = screen.getByText('Upload 1 files')
      fireEvent.click(uploadButton)
    })

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to upload test.pdf')
      expect(screen.getByText('Upload failed')).toBeInTheDocument()
    })
  })

  it('should show upload progress', async () => {
    let progressCallback: ((event: any) => void) | undefined

    mockUploadDocument.mockImplementationOnce((formData, options) => {
      progressCallback = options.onUploadProgress
      return new Promise((resolve) => {
        setTimeout(() => resolve({}), 100)
      })
    })

    const { container } = render(<DocumentUploader />)
    
    const file = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })

    // Add file and start upload
    const dropzone = container.querySelector('[data-testid="dropzone"]')
    fireEvent.drop(dropzone!, {
      dataTransfer: { files: [file] },
    })

    await waitFor(() => {
      const uploadButton = screen.getByText('Upload 1 files')
      fireEvent.click(uploadButton)
    })

    // Simulate progress
    await waitFor(() => {
      if (progressCallback) {
        progressCallback({ loaded: 50, total: 100 })
      }
    })

    // Check for progress bar
    const progressBar = container.querySelector('[role="progressbar"]')
    expect(progressBar).toBeInTheDocument()
  })

  it('should allow removing pending files', async () => {
    const { container } = render(<DocumentUploader />)
    
    const file = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })

    // Add file
    const dropzone = container.querySelector('[data-testid="dropzone"]')
    fireEvent.drop(dropzone!, {
      dataTransfer: { files: [file] },
    })

    await waitFor(() => {
      expect(screen.getByText('test.pdf')).toBeInTheDocument()
    })

    // Remove file
    const removeButton = screen.getByRole('button', { name: '' })
    fireEvent.click(removeButton)

    expect(screen.queryByText('test.pdf')).not.toBeInTheDocument()
  })

  it('should clear completed uploads', async () => {
    mockUploadDocument.mockResolvedValueOnce({})
    
    const { container } = render(<DocumentUploader />)
    
    const file = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    })

    // Add and upload file
    const dropzone = container.querySelector('[data-testid="dropzone"]')
    fireEvent.drop(dropzone!, {
      dataTransfer: { files: [file] },
    })

    await waitFor(() => {
      const uploadButton = screen.getByText('Upload 1 files')
      fireEvent.click(uploadButton)
    })

    // Wait for upload to complete
    await waitFor(() => {
      expect(screen.getByText('Clear completed')).toBeInTheDocument()
    })

    // Clear completed
    fireEvent.click(screen.getByText('Clear completed'))
    
    expect(screen.queryByText('test.pdf')).not.toBeInTheDocument()
  })

  it('should handle multiple file uploads', async () => {
    mockUploadDocument.mockResolvedValue({})
    
    const { container } = render(<DocumentUploader />)
    
    const files = [
      new File(['content1'], 'doc1.pdf', { type: 'application/pdf' }),
      new File(['content2'], 'doc2.pdf', { type: 'application/pdf' }),
      new File(['content3'], 'doc3.pdf', { type: 'application/pdf' }),
    ]

    // Add multiple files
    const dropzone = container.querySelector('[data-testid="dropzone"]')
    fireEvent.drop(dropzone!, {
      dataTransfer: { files },
    })

    await waitFor(() => {
      expect(screen.getByText('Files (3)')).toBeInTheDocument()
      expect(screen.getByText('Upload 3 files')).toBeInTheDocument()
    })

    // Upload all
    fireEvent.click(screen.getByText('Upload 3 files'))

    await waitFor(() => {
      expect(mockUploadDocument).toHaveBeenCalledTimes(3)
    })
  })

  it('should show file type validation', () => {
    render(<DocumentUploader />)
    
    const supportedFormats = screen.getByText(/Supported:/)
    expect(supportedFormats).toHaveTextContent('Documents')
    expect(supportedFormats).toHaveTextContent('Images')
    expect(supportedFormats).toHaveTextContent('Sheets')
  })
})