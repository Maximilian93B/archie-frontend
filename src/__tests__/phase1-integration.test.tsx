import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DocumentListInbox } from '@/components/documents/list/document-list-inbox'
import { DocumentDetailPanel } from '@/components/documents/detail/document-detail-panel'
import { folderAPI } from '@/lib/api/folders'
import { tagsAPI } from '@/lib/api/tags'
import type { Document, Folder, DocumentTagsResponse } from '@/types'

// Mock APIs
vi.mock('@/lib/api/folders')
vi.mock('@/lib/api/tags')
vi.mock('@/lib/api/client')

// Mock stores
vi.mock('@/store/folder-store')
vi.mock('@/store/tag-store')
vi.mock('@/store/document-store')

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

const mockDocument: Document = {
  id: 'doc-1',
  tenant_id: 'tenant-1',
  user_id: 'user-1',
  title: 'Q4 Financial Report.pdf',
  content_type: 'application/pdf',
  file_size: 1024000,
  file_name: 'q4-report.pdf',
  folder_id: 'folder-1',
  folder_name: 'Finance Documents',
  tags: ['finance', 'q4-2024', 'report'],
  ai_processed: true,
  ai_processed_at: '2024-01-15T10:00:00Z',
  starred: false,
  created_at: '2024-01-15T09:00:00Z',
  updated_at: '2024-01-15T10:00:00Z',
}

const mockFolders: Folder[] = [
  {
    id: 'folder-1',
    tenant_id: 'tenant-1',
    name: 'Finance Documents',
    path: '/Finance Documents',
    level: 0,
    is_system: false,
    created_by: 'user-1',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    document_count: 5,
  },
]

const mockTagsResponse: DocumentTagsResponse = {
  ai_tags: [
    {
      name: 'financial-report',
      category: 'document_type',
      confidence: 0.95,
      relevance: 0.9,
    },
    {
      name: 'quarterly',
      category: 'time_period',
      confidence: 0.88,
      relevance: 0.85,
    },
  ],
  user_tags: ['finance', 'q4-2024', 'report'],
}

describe('Phase 1 Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(folderAPI.list as any).mockResolvedValue(mockFolders)
    ;(tagsAPI.getDocumentTags as any).mockResolvedValue(mockTagsResponse)
  })

  describe('Document List with Folders and Tags', () => {
    it('displays folder name in document list', () => {
      render(
        <DocumentListInbox documents={[mockDocument]} />,
        { wrapper: createWrapper() }
      )
      
      expect(screen.getByText('Finance Documents')).toBeInTheDocument()
    })

    it('displays tag count in document list', () => {
      render(
        <DocumentListInbox documents={[mockDocument]} />,
        { wrapper: createWrapper() }
      )
      
      // Should show first 2 tags
      expect(screen.getByText('finance')).toBeInTheDocument()
      expect(screen.getByText('q4-2024')).toBeInTheDocument()
      // Should show count for remaining tags
      expect(screen.getByText('+1')).toBeInTheDocument()
    })

    it('shows AI processed badge for processed documents', () => {
      render(
        <DocumentListInbox documents={[mockDocument]} />,
        { wrapper: createWrapper() }
      )
      
      expect(screen.getByText('AI Processed')).toBeInTheDocument()
    })

    it('displays folder icon next to folder name', () => {
      render(
        <DocumentListInbox documents={[mockDocument]} />,
        { wrapper: createWrapper() }
      )
      
      const folderSection = screen.getByText('Finance Documents').parentElement
      expect(folderSection?.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Document Detail Panel Integration', () => {
    it('shows folder information in detail panel', async () => {
      render(
        <DocumentDetailPanel document={mockDocument} />,
        { wrapper: createWrapper() }
      )
      
      expect(screen.getByText('Folder')).toBeInTheDocument()
      expect(screen.getByText('Finance Documents')).toBeInTheDocument()
    })

    it('displays both AI and user tags', async () => {
      render(
        <DocumentDetailPanel document={mockDocument} />,
        { wrapper: createWrapper() }
      )
      
      await waitFor(() => {
        // AI tags
        expect(screen.getByText('financial-report')).toBeInTheDocument()
        expect(screen.getByText('95%')).toBeInTheDocument() // confidence
        
        // User tags
        expect(screen.getByText('finance')).toBeInTheDocument()
        expect(screen.getByText('q4-2024')).toBeInTheDocument()
      })
    })

    it('shows AI analysis tab for processed documents', () => {
      render(
        <DocumentDetailPanel document={mockDocument} />,
        { wrapper: createWrapper() }
      )
      
      expect(screen.getByText('AI Analysis')).toBeInTheDocument()
    })

    it('does not show AI analysis tab for unprocessed documents', () => {
      const unprocessedDoc = { ...mockDocument, ai_processed: false }
      
      render(
        <DocumentDetailPanel document={unprocessedDoc} />,
        { wrapper: createWrapper() }
      )
      
      expect(screen.queryByText('AI Analysis')).not.toBeInTheDocument()
    })
  })

  describe('Folder and Tag Interaction', () => {
    it('allows moving document to different folder from context menu', async () => {
      const user = userEvent.setup()
      
      render(
        <DocumentListInbox documents={[mockDocument]} />,
        { wrapper: createWrapper() }
      )
      
      // Open context menu
      const moreButton = screen.getAllByRole('button').find(btn => 
        btn.querySelector('svg')?.classList.contains('lucide-more-vertical')
      )
      await user.click(moreButton!)
      
      expect(screen.getByText('Move to Folder')).toBeInTheDocument()
    })

    it('allows adding tags from context menu', async () => {
      const user = userEvent.setup()
      
      render(
        <DocumentListInbox documents={[mockDocument]} />,
        { wrapper: createWrapper() }
      )
      
      // Open context menu
      const moreButton = screen.getAllByRole('button').find(btn => 
        btn.querySelector('svg')?.classList.contains('lucide-more-vertical')
      )
      await user.click(moreButton!)
      
      expect(screen.getByText('Add Tags')).toBeInTheDocument()
    })
  })

  describe('Empty States', () => {
    it('shows appropriate message when document has no folder', () => {
      const docWithoutFolder = { ...mockDocument, folder_id: undefined, folder_name: undefined }
      
      render(
        <DocumentDetailPanel document={docWithoutFolder} />,
        { wrapper: createWrapper() }
      )
      
      expect(screen.getByText('Not in any folder')).toBeInTheDocument()
    })

    it('shows empty state when document has no tags', async () => {
      ;(tagsAPI.getDocumentTags as any).mockResolvedValue({
        ai_tags: [],
        user_tags: [],
      })
      
      render(
        <DocumentDetailPanel document={mockDocument} />,
        { wrapper: createWrapper() }
      )
      
      await waitFor(() => {
        expect(screen.getByText('No tags yet')).toBeInTheDocument()
      })
    })
  })

  describe('Performance and Loading States', () => {
    it('shows loading state while fetching tags', () => {
      render(
        <DocumentDetailPanel document={mockDocument} />,
        { wrapper: createWrapper() }
      )
      
      expect(screen.getByText('Loading tags...')).toBeInTheDocument()
    })

    it('handles multiple documents with folders and tags efficiently', () => {
      const manyDocuments = Array.from({ length: 20 }, (_, i) => ({
        ...mockDocument,
        id: `doc-${i}`,
        title: `Document ${i}`,
        tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
      }))
      
      render(
        <DocumentListInbox documents={manyDocuments} />,
        { wrapper: createWrapper() }
      )
      
      // Should render all documents
      expect(screen.getAllByText(/Document \d+/)).toHaveLength(20)
      
      // Should limit displayed tags
      const tagCounts = screen.getAllByText(/\+\d+/)
      expect(tagCounts.length).toBeGreaterThan(0)
    })
  })
})