import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { DocumentList } from '@/components/documents/list/document-list'
import { DocumentUploader } from '@/components/documents/upload/document-uploader'
import { mockPush } from '@/test/setup'

describe('Document Management Integration Tests', () => {
  beforeEach(() => {
    // Set auth token for authenticated requests
    localStorage.setItem('access_token', 'test-token-user-1')
    localStorage.setItem('tenant_id', 'test-tenant')
    mockPush.mockClear()
  })

  describe('Document List', () => {
    it('should fetch and display documents', async () => {
      render(<DocumentList />)

      // Wait for documents to load
      await waitFor(() => {
        expect(screen.getByText('Test Document 1')).toBeInTheDocument()
        expect(screen.getByText('Test Document 2')).toBeInTheDocument()
      })

      // Check document details are displayed
      expect(screen.getByText('test1.pdf')).toBeInTheDocument()
      expect(screen.getByText('test2.docx')).toBeInTheDocument()
      
      // Check AI processed badge
      const aiProcessedBadges = screen.getAllByText(/ai processed/i)
      expect(aiProcessedBadges).toHaveLength(1) // Only doc1 is AI processed
    })

    it('should handle search functionality', async () => {
      const user = userEvent.setup()
      render(<DocumentList />)

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText('Test Document 1')).toBeInTheDocument()
      })

      // Search for a document
      const searchInput = screen.getByPlaceholderText(/search documents/i)
      await user.type(searchInput, 'Document 1')

      // Due to debouncing, we need to wait
      await waitFor(() => {
        expect(screen.getByText('Test Document 1')).toBeInTheDocument()
        expect(screen.queryByText('Test Document 2')).not.toBeInTheDocument()
      }, { timeout: 1500 })
    })

    it('should navigate to document details on click', async () => {
      const user = userEvent.setup()
      render(<DocumentList />)

      await waitFor(() => {
        expect(screen.getByText('Test Document 1')).toBeInTheDocument()
      })

      // Click on a document
      const doc1 = screen.getByText('Test Document 1')
      await user.click(doc1)

      expect(mockPush).toHaveBeenCalledWith('/dashboard/documents/doc-1')
    })

    it('should handle empty state', async () => {
      // Clear all documents from mock DB
      const { db } = await import('@/test/mocks/db')
      db.document.deleteMany({ where: {} })

      render(<DocumentList />)

      await waitFor(() => {
        expect(screen.getByText(/no documents found/i)).toBeInTheDocument()
      })
    })
  })

  describe('Document Upload', () => {
    it('should upload a single document', async () => {
      const user = userEvent.setup()
      render(<DocumentUploader />)

      // Create a test file
      const file = new File(['test content'], 'test-upload.pdf', { 
        type: 'application/pdf' 
      })

      // Upload the file
      const input = screen.getByLabelText(/drag & drop files here/i)
      await user.upload(input, file)

      // File should appear in queue
      await waitFor(() => {
        expect(screen.getByText('test-upload.pdf')).toBeInTheDocument()
      })

      // Click upload button
      const uploadButton = screen.getByRole('button', { name: /upload/i })
      await user.click(uploadButton)

      // Wait for upload to complete
      await waitFor(() => {
        expect(screen.getByText(/uploaded successfully/i)).toBeInTheDocument()
      })
    })

    it('should upload multiple files', async () => {
      const user = userEvent.setup()
      render(<DocumentUploader />)

      const files = [
        new File(['content1'], 'doc1.pdf', { type: 'application/pdf' }),
        new File(['content2'], 'doc2.docx', { 
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        }),
      ]

      const input = screen.getByLabelText(/drag & drop files here/i)
      await user.upload(input, files)

      await waitFor(() => {
        expect(screen.getByText('doc1.pdf')).toBeInTheDocument()
        expect(screen.getByText('doc2.docx')).toBeInTheDocument()
      })

      // Upload all files
      const uploadButton = screen.getByRole('button', { name: /upload all/i })
      await user.click(uploadButton)

      // Both should upload successfully
      await waitFor(() => {
        const successMessages = screen.getAllByText(/uploaded successfully/i)
        expect(successMessages).toHaveLength(2)
      })
    })

    it('should validate file types', async () => {
      const user = userEvent.setup()
      render(<DocumentUploader />)

      // Try to upload an invalid file type
      const invalidFile = new File(['test'], 'test.exe', { 
        type: 'application/x-msdownload' 
      })

      const dropzone = screen.getByLabelText(/drag & drop files here/i)
      
      // The file should be rejected by react-dropzone
      await user.upload(dropzone, invalidFile)

      // File should not appear in the queue
      expect(screen.queryByText('test.exe')).not.toBeInTheDocument()
    })

    it('should toggle AI processing option', async () => {
      const user = userEvent.setup()
      render(<DocumentUploader />)

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      await user.upload(screen.getByLabelText(/drag & drop files here/i), file)

      // Find and toggle the AI processing checkbox
      const aiToggle = await screen.findByLabelText(/enable ai processing/i)
      expect(aiToggle).toBeChecked() // Default is true

      await user.click(aiToggle)
      expect(aiToggle).not.toBeChecked()

      // Upload with AI disabled
      const uploadButton = screen.getByRole('button', { name: /upload/i })
      await user.click(uploadButton)

      await waitFor(() => {
        expect(screen.getByText(/uploaded successfully/i)).toBeInTheDocument()
      })
    })
  })

  describe('Document Operations', () => {
    it('should delete a document', async () => {
      const user = userEvent.setup()
      render(<DocumentList />)

      await waitFor(() => {
        expect(screen.getByText('Test Document 1')).toBeInTheDocument()
      })

      // Find and click delete button for first document
      const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
      await user.click(deleteButtons[0])

      // Confirm deletion
      const confirmButton = await screen.findByRole('button', { name: /confirm/i })
      await user.click(confirmButton)

      // Document should be removed
      await waitFor(() => {
        expect(screen.queryByText('Test Document 1')).not.toBeInTheDocument()
      })
    })

    it('should download a document', async () => {
      const user = userEvent.setup()
      render(<DocumentList />)

      await waitFor(() => {
        expect(screen.getByText('Test Document 1')).toBeInTheDocument()
      })

      // Mock the download behavior
      const mockCreateElement = document.createElement.bind(document)
      document.createElement = vi.fn((tagName) => {
        if (tagName === 'a') {
          return {
            click: vi.fn(),
            setAttribute: vi.fn(),
            style: {},
          } as any
        }
        return mockCreateElement(tagName)
      })

      // Click download button
      const downloadButtons = screen.getAllByRole('button', { name: /download/i })
      await user.click(downloadButtons[0])

      // Download should trigger
      await waitFor(() => {
        expect(document.createElement).toHaveBeenCalledWith('a')
      })

      // Restore original createElement
      document.createElement = mockCreateElement
    })
  })
})