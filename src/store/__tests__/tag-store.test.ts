import { describe, it, expect, vi, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useTagStore } from '../tag-store'
import { tagsAPI } from '@/lib/api/tags'

// Mock the API
vi.mock('@/lib/api/tags')

const mockTags = [
  { name: 'urgent', count: 10 },
  { name: 'important', count: 8 },
  { name: 'project-a', count: 5 },
  { name: 'review', count: 3 },
  { name: 'draft', count: 2 },
]

describe('TagStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset store state
    const { result } = renderHook(() => useTagStore())
    act(() => {
      result.current.tags = []
    })
  })

  it('fetches tags successfully', async () => {
    ;(tagsAPI.getAllTags as any).mockResolvedValue({ tags: mockTags })
    
    const { result } = renderHook(() => useTagStore())
    
    expect(result.current.isLoading).toBe(false)
    
    await act(async () => {
      await result.current.fetchTags()
    })
    
    expect(result.current.tags).toEqual(mockTags)
    expect(result.current.isLoading).toBe(false)
  })

  it('handles fetch error gracefully', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    ;(tagsAPI.getAllTags as any).mockRejectedValue(new Error('API Error'))
    
    const { result } = renderHook(() => useTagStore())
    
    await act(async () => {
      await result.current.fetchTags()
    })
    
    expect(result.current.tags).toEqual([])
    expect(result.current.isLoading).toBe(false)
    expect(consoleError).toHaveBeenCalled()
    
    consoleError.mockRestore()
  })

  it('searches tags by query', () => {
    const { result } = renderHook(() => useTagStore())
    
    // Set initial tags
    act(() => {
      result.current.tags = mockTags
    })
    
    // Search for tags containing 'pro'
    const results = result.current.searchTags('pro')
    expect(results).toHaveLength(1)
    expect(results[0].name).toBe('project-a')
    
    // Search for tags containing 'ur'
    const urgentResults = result.current.searchTags('ur')
    expect(urgentResults).toHaveLength(1)
    expect(urgentResults[0].name).toBe('urgent')
    
    // Empty query returns all tags
    const allTags = result.current.searchTags('')
    expect(allTags).toEqual(mockTags)
  })

  it('search is case insensitive', () => {
    const { result } = renderHook(() => useTagStore())
    
    act(() => {
      result.current.tags = mockTags
    })
    
    const results = result.current.searchTags('URGENT')
    expect(results).toHaveLength(1)
    expect(results[0].name).toBe('urgent')
  })

  it('gets popular tags sorted by count', () => {
    const { result } = renderHook(() => useTagStore())
    
    act(() => {
      result.current.tags = mockTags
    })
    
    const popularTags = result.current.getPopularTags(3)
    expect(popularTags).toHaveLength(3)
    expect(popularTags[0].name).toBe('urgent')
    expect(popularTags[0].count).toBe(10)
    expect(popularTags[1].name).toBe('important')
    expect(popularTags[2].name).toBe('project-a')
  })

  it('handles getPopularTags with limit greater than available tags', () => {
    const { result } = renderHook(() => useTagStore())
    
    act(() => {
      result.current.tags = mockTags
    })
    
    const popularTags = result.current.getPopularTags(10)
    expect(popularTags).toHaveLength(5) // All available tags
  })

  it('returns empty array for popular tags when no tags exist', () => {
    const { result } = renderHook(() => useTagStore())
    
    const popularTags = result.current.getPopularTags(5)
    expect(popularTags).toEqual([])
  })

  it('maintains loading state during fetch', async () => {
    let resolveFetch: (value: any) => void
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve
    })
    
    ;(tagsAPI.getAllTags as any).mockReturnValue(fetchPromise)
    
    const { result } = renderHook(() => useTagStore())
    
    // Start fetching
    let fetchPromiseResult: Promise<void>
    act(() => {
      fetchPromiseResult = result.current.fetchTags()
    })
    
    // Should be loading
    expect(result.current.isLoading).toBe(true)
    
    // Resolve the fetch
    act(() => {
      resolveFetch!({ tags: mockTags })
    })
    
    await act(async () => {
      await fetchPromiseResult!
    })
    
    // Should no longer be loading
    expect(result.current.isLoading).toBe(false)
    expect(result.current.tags).toEqual(mockTags)
  })

  it('does not persist tags (no localStorage)', () => {
    const { result } = renderHook(() => useTagStore())
    
    // Set tags
    act(() => {
      result.current.tags = mockTags
    })
    
    // Create new hook instance (simulating page reload)
    const { result: newResult } = renderHook(() => useTagStore())
    
    // Tags should be empty (not persisted)
    expect(newResult.current.tags).toEqual([])
  })
})