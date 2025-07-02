import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FolderTree } from '../folder-tree'

// Mock the folder store with a simple implementation
vi.mock('@/store/folder-store', () => ({
  useFolderStore: () => ({
    folders: [
      {
        id: '1',
        name: 'Documents',
        path: '/Documents',
        level: 0,
        document_count: 5,
      },
      {
        id: '2',
        parent_id: '1',
        name: 'Projects',
        path: '/Documents/Projects',
        level: 1,
        document_count: 3,
      },
    ],
    selectedFolderId: null,
    expandedFolders: [],
    isLoading: false,
    error: null,
    fetchFolders: vi.fn(),
    setSelectedFolder: vi.fn(),
    toggleFolderExpanded: vi.fn(),
  }),
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

describe('FolderTree - Simple Tests', () => {
  it('renders folder names', () => {
    render(<FolderTree />, { wrapper: createWrapper() })
    
    expect(screen.getByText('Documents')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument() // document count
  })

  it('shows loading state', () => {
    vi.mocked(useFolderStore).mockReturnValueOnce({
      folders: [],
      isLoading: true,
      selectedFolderId: null,
      expandedFolders: [],
      error: null,
      fetchFolders: vi.fn(),
      setSelectedFolder: vi.fn(),
      toggleFolderExpanded: vi.fn(),
    } as any)
    
    render(<FolderTree />, { wrapper: createWrapper() })
    
    expect(screen.getByText('Loading folders...')).toBeInTheDocument()
  })
})