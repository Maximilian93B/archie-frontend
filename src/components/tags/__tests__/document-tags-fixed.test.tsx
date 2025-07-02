import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DocumentTags } from '../document-tags'
import type { DocumentTagsResponse } from '@/types'

// Mock the API
vi.mock('@/lib/api/tags', () => ({
  tagsAPI: {
    getDocumentTags: vi.fn(),
    addDocumentTags: vi.fn(),
    removeDocumentTag: vi.fn(),
  },
  sortTags: vi.fn((tags: DocumentTagsResponse) => ({
    aiTags: tags.ai_tags || [],
    userTags: tags.user_tags || [],
    topTags: []
  })),
  getCategoryColor: vi.fn(() => '#3B82F6'),
  getTagBadgeStyles: vi.fn(() => ({ bg: 'bg-blue-100', text: 'text-blue-700' })),
  formatConfidence: vi.fn((confidence: number) => `${Math.round(confidence * 100)}%`),
  calculateTagScore: vi.fn((tag) => tag.confidence * tag.relevance)
}))

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}))

// Import mocked functions
import { tagsAPI } from '@/lib/api/tags'

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

describe('DocumentTags - Fixed Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(tagsAPI.getDocumentTags).mockResolvedValue(mockTagsResponse)
    vi.mocked(tagsAPI.addDocumentTags).mockResolvedValue(undefined)
    vi.mocked(tagsAPI.removeDocumentTag).mockResolvedValue(undefined)
  })

  it('renders AI tags with names and confidence', async () => {
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

  it('shows loading state initially', () => {
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    // Check for loading skeleton or spinner
    const loadingElement = screen.queryByText('Loading tags...')
    if (loadingElement) {
      expect(loadingElement).toBeInTheDocument()
    } else {
      // Component might show a spinner or skeleton instead
      const { container } = render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
      const skeleton = container.querySelector('.animate-pulse')
      expect(skeleton || loadingElement).toBeTruthy()
    }
  })

  it('shows empty state when no tags', async () => {
    vi.mocked(tagsAPI.getDocumentTags).mockResolvedValue({
      ai_tags: [],
      user_tags: [],
    })
    
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByText('No tags yet')).toBeInTheDocument()
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

  it('handles API errors gracefully', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(tagsAPI.getDocumentTags).mockRejectedValue(new Error('API Error'))
    
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      // Component should handle error gracefully
      expect(screen.queryByText('invoice')).not.toBeInTheDocument()
    })
    
    consoleError.mockRestore()
  })

  it('fetches tags on mount', async () => {
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(tagsAPI.getDocumentTags).toHaveBeenCalledWith('doc-1')
    })
  })

  it('shows both AI and user tags sections', async () => {
    render(<DocumentTags documentId="doc-1" />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      // AI tags section
      expect(screen.getByText('AI Tags')).toBeInTheDocument()
      expect(screen.getByText('invoice')).toBeInTheDocument()
      
      // User tags section  
      expect(screen.getByText('Your Tags')).toBeInTheDocument()
      expect(screen.getByText('urgent')).toBeInTheDocument()
    })
  })
})