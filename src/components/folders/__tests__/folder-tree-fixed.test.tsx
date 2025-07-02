import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FolderTree } from '../folder-tree'
import type { FolderTreeNode } from '@/types'

// Create mock data
const mockFolders: FolderTreeNode[] = [
  {
    id: '1',
    name: 'Documents',
    path: '/Documents',
    level: 0,
    is_system: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    document_count: 5,
    children: [
      {
        id: '2',
        parent_id: '1',
        name: 'Projects',
        path: '/Documents/Projects',
        level: 1,
        is_system: false,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        document_count: 3,
        children: [],
      }
    ],
  }
]

// Create a proper mock for the folder store
const createMockStore = (overrides = {}) => ({
  folders: mockFolders,
  selectedFolderId: null,
  expandedFolderIds: new Set<string>(),
  isLoading: false,
  error: null,
  loadFolders: vi.fn(),
  createFolder: vi.fn(),
  updateFolder: vi.fn(),
  deleteFolder: vi.fn(),
  selectFolder: vi.fn(),
  toggleFolderExpanded: vi.fn(),
  expandFolder: vi.fn(),
  collapseFolder: vi.fn(),
  expandAllFolders: vi.fn(),
  collapseAllFolders: vi.fn(),
  moveDocumentsToFolder: vi.fn(),
  refreshFolder: vi.fn(),
  ...overrides
})

// Mock the store module
vi.mock('@/store/folder-store', () => ({
  useFolderStore: vi.fn(() => createMockStore())
}))

// Import the mocked function for use in tests
import { useFolderStore } from '@/store/folder-store'

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

describe('FolderTree - Fixed Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset to default mock
    vi.mocked(useFolderStore).mockReturnValue(createMockStore())
  })

  it('renders folder names and document counts', () => {
    render(<FolderTree />, { wrapper: createWrapper() })
    
    expect(screen.getByText('Documents')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument() // document count
  })

  it('shows loading state', () => {
    vi.mocked(useFolderStore).mockReturnValue(
      createMockStore({ isLoading: true, folders: [] })
    )
    
    const { container } = render(<FolderTree />, { wrapper: createWrapper() })
    
    // Check for loading skeleton elements with animate-pulse class
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('shows empty state when no folders', () => {
    vi.mocked(useFolderStore).mockReturnValue(
      createMockStore({ folders: [] })
    )
    
    render(<FolderTree />, { wrapper: createWrapper() })
    
    expect(screen.getByText('No folders yet')).toBeInTheDocument()
    expect(screen.getByText('Create Folder')).toBeInTheDocument()
  })

  it('calls selectFolder when folder is clicked', () => {
    const mockSelectFolder = vi.fn()
    vi.mocked(useFolderStore).mockReturnValue(
      createMockStore({ selectFolder: mockSelectFolder })
    )
    
    render(<FolderTree />, { wrapper: createWrapper() })
    
    const folderElement = screen.getByText('Documents')
    folderElement.click()
    
    expect(mockSelectFolder).toHaveBeenCalledWith('1')
  })

  it('shows nested folders when parent is expanded', () => {
    vi.mocked(useFolderStore).mockReturnValue(
      createMockStore({ expandedFolderIds: new Set(['1']) })
    )
    
    render(<FolderTree />, { wrapper: createWrapper() })
    
    expect(screen.getByText('Documents')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('hides nested folders when parent is collapsed', () => {
    vi.mocked(useFolderStore).mockReturnValue(
      createMockStore({ expandedFolderIds: new Set() })
    )
    
    render(<FolderTree />, { wrapper: createWrapper() })
    
    expect(screen.getByText('Documents')).toBeInTheDocument()
    expect(screen.queryByText('Projects')).not.toBeInTheDocument()
  })

  it('highlights selected folder', () => {
    vi.mocked(useFolderStore).mockReturnValue(
      createMockStore({ selectedFolderId: '1' })
    )
    
    render(<FolderTree />, { wrapper: createWrapper() })
    
    const folderElement = screen.getByText('Documents').closest('div')
    expect(folderElement?.parentElement).toHaveClass('bg-gray-100')
  })

  it('calls loadFolders on mount', () => {
    const mockLoadFolders = vi.fn()
    vi.mocked(useFolderStore).mockReturnValue(
      createMockStore({ loadFolders: mockLoadFolders })
    )
    
    render(<FolderTree />, { wrapper: createWrapper() })
    
    expect(mockLoadFolders).toHaveBeenCalledTimes(1)
  })
})