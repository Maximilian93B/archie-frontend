import { describe, it, expect, vi, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useFolderStore } from '../folder-store'
import { folderAPI } from '@/lib/api/folders'
import type { Folder } from '@/types'

// Mock the API
vi.mock('@/lib/api/folders')

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
  },
]

describe('FolderStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset store state
    const { result } = renderHook(() => useFolderStore())
    act(() => {
      result.current.folders = []
      result.current.selectedFolderId = null
      result.current.expandedFolders = []
      result.current.error = null
    })
  })

  it('fetches folders successfully', async () => {
    ;(folderAPI.list as any).mockResolvedValue(mockFolders)
    
    const { result } = renderHook(() => useFolderStore())
    
    expect(result.current.isLoading).toBe(false)
    
    await act(async () => {
      await result.current.fetchFolders()
    })
    
    expect(result.current.folders).toEqual(mockFolders)
    expect(result.current.error).toBeNull()
  })

  it('handles fetch error', async () => {
    const error = new Error('Failed to fetch')
    ;(folderAPI.list as any).mockRejectedValue(error)
    
    const { result } = renderHook(() => useFolderStore())
    
    await act(async () => {
      await result.current.fetchFolders()
    })
    
    expect(result.current.folders).toEqual([])
    expect(result.current.error).toBe('Failed to fetch folders')
  })

  it('sets selected folder', () => {
    const { result } = renderHook(() => useFolderStore())
    
    act(() => {
      result.current.setSelectedFolder('folder-1')
    })
    
    expect(result.current.selectedFolderId).toBe('folder-1')
  })

  it('toggles folder expansion', () => {
    const { result } = renderHook(() => useFolderStore())
    
    // Expand folder
    act(() => {
      result.current.toggleFolderExpanded('folder-1')
    })
    
    expect(result.current.expandedFolders).toContain('folder-1')
    
    // Collapse folder
    act(() => {
      result.current.toggleFolderExpanded('folder-1')
    })
    
    expect(result.current.expandedFolders).not.toContain('folder-1')
  })

  it('creates folder successfully', async () => {
    const newFolder: Folder = {
      id: '3',
      tenant_id: 'tenant-1',
      name: 'New Folder',
      path: '/New Folder',
      level: 0,
      is_system: false,
      created_by: 'user-1',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
    }
    
    ;(folderAPI.create as any).mockResolvedValue(newFolder)
    ;(folderAPI.list as any).mockResolvedValue([...mockFolders, newFolder])
    
    const { result } = renderHook(() => useFolderStore())
    
    // Set initial folders
    act(() => {
      result.current.folders = mockFolders
    })
    
    await act(async () => {
      await result.current.createFolder({
        name: 'New Folder',
        parent_id: undefined,
        color: '#000000',
      })
    })
    
    expect(folderAPI.create).toHaveBeenCalledWith({
      name: 'New Folder',
      parent_id: undefined,
      color: '#000000',
    })
    expect(result.current.folders).toHaveLength(3)
  })

  it('updates folder successfully', async () => {
    const updatedFolder = { ...mockFolders[0], name: 'Updated Documents' }
    ;(folderAPI.update as any).mockResolvedValue(updatedFolder)
    
    const { result } = renderHook(() => useFolderStore())
    
    // Set initial folders
    act(() => {
      result.current.folders = mockFolders
    })
    
    await act(async () => {
      await result.current.updateFolder('1', { name: 'Updated Documents' })
    })
    
    expect(folderAPI.update).toHaveBeenCalledWith('1', { name: 'Updated Documents' })
    expect(result.current.folders[0].name).toBe('Updated Documents')
  })

  it('deletes folder successfully', async () => {
    ;(folderAPI.delete as any).mockResolvedValue(undefined)
    
    const { result } = renderHook(() => useFolderStore())
    
    // Set initial folders
    act(() => {
      result.current.folders = mockFolders
    })
    
    await act(async () => {
      await result.current.deleteFolder('2')
    })
    
    expect(folderAPI.delete).toHaveBeenCalledWith('2')
    expect(result.current.folders).toHaveLength(1)
    expect(result.current.folders[0].id).toBe('1')
  })

  it('clears selected folder when deleted', async () => {
    ;(folderAPI.delete as any).mockResolvedValue(undefined)
    
    const { result } = renderHook(() => useFolderStore())
    
    // Set initial state
    act(() => {
      result.current.folders = mockFolders
      result.current.selectedFolderId = '2'
    })
    
    await act(async () => {
      await result.current.deleteFolder('2')
    })
    
    expect(result.current.selectedFolderId).toBeNull()
  })

  it('gets folder by id', () => {
    const { result } = renderHook(() => useFolderStore())
    
    act(() => {
      result.current.folders = mockFolders
    })
    
    const folder = result.current.getFolderById('2')
    expect(folder).toEqual(mockFolders[1])
    
    const notFound = result.current.getFolderById('999')
    expect(notFound).toBeUndefined()
  })

  it('gets folder children', () => {
    const { result } = renderHook(() => useFolderStore())
    
    act(() => {
      result.current.folders = mockFolders
    })
    
    const children = result.current.getFolderChildren('1')
    expect(children).toHaveLength(1)
    expect(children[0].id).toBe('2')
    
    const noChildren = result.current.getFolderChildren('2')
    expect(noChildren).toHaveLength(0)
  })

  it('gets folder path', () => {
    const { result } = renderHook(() => useFolderStore())
    
    act(() => {
      result.current.folders = mockFolders
    })
    
    const path = result.current.getFolderPath('2')
    expect(path).toEqual([mockFolders[0], mockFolders[1]])
    
    const rootPath = result.current.getFolderPath('1')
    expect(rootPath).toEqual([mockFolders[0]])
  })

  it('persists expanded folders', () => {
    const { result, rerender } = renderHook(() => useFolderStore())
    
    // Expand folders
    act(() => {
      result.current.toggleFolderExpanded('folder-1')
      result.current.toggleFolderExpanded('folder-2')
    })
    
    expect(result.current.expandedFolders).toEqual(['folder-1', 'folder-2'])
    
    // Simulate remount to test persistence
    rerender()
    
    // Expanded folders should be persisted
    expect(result.current.expandedFolders).toEqual(['folder-1', 'folder-2'])
  })
})