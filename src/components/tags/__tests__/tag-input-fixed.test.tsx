import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TagInput } from '../tag-input'

// Create proper mock for tag store
const createMockTagStore = (overrides = {}) => ({
  tags: [
    { name: 'urgent', count: 10 },
    { name: 'important', count: 8 },
    { name: 'project-a', count: 5 },
    { name: 'review', count: 3 },
  ],
  availableTags: [
    { name: 'urgent', count: 10 },
    { name: 'important', count: 8 },
    { name: 'project-a', count: 5 },
    { name: 'review', count: 3 },
  ],
  isLoading: false,
  loadTags: vi.fn(),
  getTagSuggestions: vi.fn((query: string) => {
    const tags = [
      { name: 'urgent', count: 10 },
      { name: 'important', count: 8 },
      { name: 'project-a', count: 5 },
      { name: 'review', count: 3 },
    ]
    return tags.filter(tag => tag.name.toLowerCase().includes(query.toLowerCase()))
  }),
  ...overrides
})

// Mock the tag store
vi.mock('@/store/tag-store', () => ({
  useTagStore: vi.fn(() => createMockTagStore())
}))

// Mock debounce to be instant in tests
vi.mock('@/hooks/use-debounce', () => ({
  useDebounce: (value: any) => value,
}))

import { useTagStore } from '@/store/tag-store'

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

describe('TagInput - Fixed Tests', () => {
  const mockOnAdd = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useTagStore).mockReturnValue(createMockTagStore())
  })

  it('renders input field with placeholder', () => {
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    expect(input).toBeInTheDocument()
  })

  it('shows suggestions after typing', async () => {
    const user = userEvent.setup()
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    await user.type(input, 'ur')
    
    // The suggestions should appear
    await waitFor(() => {
      expect(screen.getByText('urgent')).toBeInTheDocument()
    })
  })

  it('filters suggestions based on input', async () => {
    const user = userEvent.setup()
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    await user.type(input, 'proj')
    
    await waitFor(() => {
      expect(screen.getByText('project-a')).toBeInTheDocument()
      expect(screen.queryByText('urgent')).not.toBeInTheDocument()
    })
  })

  it('adds tag when Enter is pressed', async () => {
    const user = userEvent.setup()
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    await user.type(input, 'new-tag{Enter}')
    
    expect(mockOnAdd).toHaveBeenCalledWith(['new-tag'])
    expect(input).toHaveValue('')
  })

  it('adds multiple tags separated by commas', async () => {
    const user = userEvent.setup()
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    await user.type(input, 'tag1, tag2, tag3{Enter}')
    
    expect(mockOnAdd).toHaveBeenCalledWith(['tag1', 'tag2', 'tag3'])
  })

  it('respects maxTags prop', async () => {
    const user = userEvent.setup()
    render(<TagInput onAdd={mockOnAdd} maxTags={2} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    await user.type(input, 'tag1, tag2, tag3{Enter}')
    
    expect(mockOnAdd).toHaveBeenCalledWith(['tag1', 'tag2'])
  })

  it('trims whitespace from tags', async () => {
    const user = userEvent.setup()
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    await user.type(input, '  tag1  ,  tag2  {Enter}')
    
    expect(mockOnAdd).toHaveBeenCalledWith(['tag1', 'tag2'])
  })

  it('filters out empty tags', async () => {
    const user = userEvent.setup()
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    await user.type(input, 'tag1,,tag2,{Enter}')
    
    expect(mockOnAdd).toHaveBeenCalledWith(['tag1', 'tag2'])
  })

  it('closes suggestions on Escape', async () => {
    const user = userEvent.setup()
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    await user.type(input, 'ur')
    
    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('urgent')).toBeInTheDocument()
    })
    
    // Press Escape
    await user.keyboard('{Escape}')
    
    // Suggestions should disappear
    await waitFor(() => {
      expect(screen.queryByText('urgent')).not.toBeInTheDocument()
    })
  })

  it('calls loadTags on mount', () => {
    const mockLoadTags = vi.fn()
    vi.mocked(useTagStore).mockReturnValue(
      createMockTagStore({ loadTags: mockLoadTags })
    )
    
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    expect(mockLoadTags).toHaveBeenCalled()
  })
})