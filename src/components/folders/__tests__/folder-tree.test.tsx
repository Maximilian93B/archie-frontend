import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FolderTree } from '../folder-tree'
import { useFolderStore } from '@/store/folder-store'
import type { Folder } from '@/types'

// Mock the folder store
vi.mock('@/store/folder-store')

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}))

const mockFolders: Folder[] = [
  {
    id: '1',
    tenant_id: 'tenant-1',
    name: 'Documents',
    path: '/Documents',
    level: 0,
    is_system: false,
    created_by: 'user-1',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    document_count: 5,
  },
  {
    id: '2',
    tenant_id: 'tenant-1',
    parent_id: '1',
    name: 'Projects',
    path: '/Documents/Projects',
    level: 1,
    is_system: false,
    created_by: 'user-1',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    document_count: 3,
  },
]

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

describe('FolderTree', () => {
  const mockStore = {
    folders: mockFolders,
    selectedFolderId: null,
    expandedFolders: [],
    isLoading: false,
    error: null,
    fetchFolders: vi.fn(),
    setSelectedFolder: vi.fn(),
    toggleFolderExpanded: vi.fn(),
    createFolder: vi.fn(),
    updateFolder: vi.fn(),
    deleteFolder: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useFolderStore as any).mockReturnValue(mockStore)
  })

  it('renders folder tree with folders', () => {
    render(<FolderTree />, { wrapper: createWrapper() })
    
    expect(screen.getByText('Documents')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument() // document count
  })

  it('shows loading state', () => {
    ;(useFolderStore as any).mockReturnValue({ ...mockStore, isLoading: true })
    
    render(<FolderTree />, { wrapper: createWrapper() })
    
    expect(screen.getByText('Loading folders...')).toBeInTheDocument()
  })

  it('shows empty state when no folders', () => {
    ;(useFolderStore as any).mockReturnValue({ ...mockStore, folders: [] })
    
    render(<FolderTree />, { wrapper: createWrapper() })
    
    expect(screen.getByText('No folders yet')).toBeInTheDocument()
  })

  it('handles folder selection', async () => {
    render(<FolderTree />, { wrapper: createWrapper() })
    
    const folderItem = screen.getByText('Documents').closest('div')!
    fireEvent.click(folderItem)
    
    expect(mockStore.setSelectedFolder).toHaveBeenCalledWith('1')
  })

  it('handles folder expansion toggle', async () => {
    render(<FolderTree />, { wrapper: createWrapper() })
    
    // Find the chevron icon button
    const expandButton = screen.getByRole('button', { name: /expand/i })
    fireEvent.click(expandButton)
    
    expect(mockStore.toggleFolderExpanded).toHaveBeenCalledWith('1')
  })

  it('shows context menu on right click', async () => {
    const user = userEvent.setup()
    render(<FolderTree />, { wrapper: createWrapper() })
    
    const folderItem = screen.getByText('Documents').closest('div')!
    await user.pointer({ keys: '[MouseRight]', target: folderItem })
    
    await waitFor(() => {
      expect(screen.getByText('New Subfolder')).toBeInTheDocument()
      expect(screen.getByText('Rename')).toBeInTheDocument()
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })
  })

  it('highlights selected folder', () => {
    ;(useFolderStore as any).mockReturnValue({ 
      ...mockStore, 
      selectedFolderId: '1' 
    })
    
    render(<FolderTree />, { wrapper: createWrapper() })
    
    const selectedFolder = screen.getByText('Documents').closest('div')!
    expect(selectedFolder).toHaveClass('bg-gray-100')
  })

  it('shows nested folders when parent is expanded', () => {
    ;(useFolderStore as any).mockReturnValue({ 
      ...mockStore, 
      expandedFolders: ['1'] 
    })
    
    render(<FolderTree />, { wrapper: createWrapper() })
    
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('applies correct indentation for nested folders', () => {
    ;(useFolderStore as any).mockReturnValue({ 
      ...mockStore, 
      expandedFolders: ['1'] 
    })
    
    render(<FolderTree />, { wrapper: createWrapper() })
    
    const nestedFolder = screen.getByText('Projects').closest('div')!
    // Check for padding-left style
    expect(nestedFolder).toHaveStyle({ paddingLeft: '1.5rem' })
  })
})