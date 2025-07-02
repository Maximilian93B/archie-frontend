import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DocumentTags } from '../document-tags'
import { tagsAPI } from '@/lib/api/tags'
import type { DocumentTagsResponse } from '@/types'

// Mock the API
vi.mock('@/lib/api/tags')

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}))

const mockTagsResponse: DocumentTagsResponse = {
  ai_tags: [
    {
      name: 'invoice',
      category: 'document_type',
      confidence: 0.95,
      relevance: 0.9,
    },
    {
      name: 'finance',
      category: 'department',
      confidence: 0.85,
      relevance: 0.8,
    },
  ],
  user_tags: ['urgent', 'q4-2024'],
}

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

describe('DocumentTags', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(tagsAPI.getDocumentTags as any).mockResolvedValue(mockTagsResponse)
    ;(tagsAPI.addDocumentTags as any).mockResolvedValue(undefined)
    ;(tagsAPI.removeDocumentTag as any).mockResolvedValue(undefined)
  })

  it('renders AI tags with confidence scores', async () => {
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByText('invoice')).toBeInTheDocument()
      expect(screen.getByText('95%')).toBeInTheDocument()
      expect(screen.getByText('finance')).toBeInTheDocument()
      expect(screen.getByText('85%')).toBeInTheDocument()
    })
  })

  it('renders user tags', async () => {
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByText('urgent')).toBeInTheDocument()
      expect(screen.getByText('q4-2024')).toBeInTheDocument()
    })
  })

  it('shows AI tag indicators', async () => {
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      // Should show robot icons for AI tags
      const robotIcons = screen.getAllByTestId('ai-tag-icon')
      expect(robotIcons).toHaveLength(2)
    })
  })

  it('applies correct colors based on tag category', async () => {
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      const invoiceTag = screen.getByText('invoice').closest('div')
      expect(invoiceTag).toHaveClass('bg-blue-100', 'text-blue-700')
      
      const financeTag = screen.getByText('finance').closest('div')
      expect(financeTag).toHaveClass('bg-green-100', 'text-green-700')
    })
  })

  it('shows add button when enabled', async () => {
    render(
      <DocumentTags documentId="doc-1" showAddButton={true} />, 
      { wrapper: createWrapper() }
    )
    
    await waitFor(() => {
      expect(screen.getByText('Add Tags')).toBeInTheDocument()
    })
  })

  it('does not show add button by default', async () => {
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.queryByText('Add Tags')).not.toBeInTheDocument()
    })
  })

  it('allows removing user tags', async () => {
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      const urgentTag = screen.getByText('urgent').closest('div')
      const removeButton = urgentTag?.querySelector('button')
      expect(removeButton).toBeInTheDocument()
      
      fireEvent.click(removeButton!)
    })
    
    expect(tagsAPI.removeDocumentTag).toHaveBeenCalledWith('doc-1', 'urgent')
  })

  it('does not allow removing AI tags', async () => {
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      const aiTag = screen.getByText('invoice').closest('div')
      const removeButton = aiTag?.querySelector('button')
      expect(removeButton).not.toBeInTheDocument()
    })
  })

  it('limits displayed tags based on maxDisplayTags', async () => {
    const manyTagsResponse: DocumentTagsResponse = {
      ai_tags: [],
      user_tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
    }
    ;(tagsAPI.getDocumentTags as any).mockResolvedValue(manyTagsResponse)
    
    render(
      <DocumentTags documentId="doc-1" maxDisplayTags={3} />, 
      { wrapper: createWrapper() }
    )
    
    await waitFor(() => {
      expect(screen.getByText('tag1')).toBeInTheDocument()
      expect(screen.getByText('tag2')).toBeInTheDocument()
      expect(screen.getByText('tag3')).toBeInTheDocument()
      expect(screen.getByText('+2')).toBeInTheDocument()
      expect(screen.queryByText('tag4')).not.toBeInTheDocument()
    })
  })

  it('shows loading state', () => {
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    expect(screen.getByText('Loading tags...')).toBeInTheDocument()
  })

  it('shows empty state when no tags', async () => {
    ;(tagsAPI.getDocumentTags as any).mockResolvedValue({
      ai_tags: [],
      user_tags: [],
    })
    
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByText('No tags yet')).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    ;(tagsAPI.getDocumentTags as any).mockRejectedValue(new Error('API Error'))
    
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load tags')).toBeInTheDocument()
    })
  })

  it('shows confidence tooltip on hover', async () => {
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      const confidenceBadge = screen.getByText('95%')
      fireEvent.mouseEnter(confidenceBadge)
    })
    
    // Tooltip should appear
    await waitFor(() => {
      expect(screen.getByText('AI Confidence')).toBeInTheDocument()
    })
  })
})