import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TagInput } from '../tag-input'
import { useTagStore } from '@/store/tag-store'

// Mock the tag store
vi.mock('@/store/tag-store')

// Mock debounce to be instant in tests
vi.mock('@/hooks/use-debounce', () => ({
  useDebounce: (value: any) => value,
}))

const mockTags = [
  { name: 'urgent', count: 10 },
  { name: 'important', count: 8 },
  { name: 'project-a', count: 5 },
  { name: 'review', count: 3 },
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

describe('TagInput', () => {
  const mockStore = {
    tags: mockTags,
    isLoading: false,
    fetchTags: vi.fn(),
    searchTags: vi.fn((query: string) => 
      mockTags.filter(tag => tag.name.includes(query))
    ),
  }

  const mockOnAdd = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useTagStore as any).mockReturnValue(mockStore)
  })

  it('renders input field with placeholder', () => {
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    expect(input).toBeInTheDocument()
  })

  it('shows suggestions after typing 2 characters', async () => {
    const user = userEvent.setup()
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    await user.type(input, 'ur')
    
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

  it('selects suggestion on click', async () => {
    const user = userEvent.setup()
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    await user.type(input, 'ur')
    
    await waitFor(() => {
      const suggestion = screen.getByText('urgent')
      fireEvent.click(suggestion)
    })
    
    expect(mockOnAdd).toHaveBeenCalledWith(['urgent'])
    expect(input).toHaveValue('')
  })

  it('navigates suggestions with arrow keys', async () => {
    const user = userEvent.setup()
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    await user.type(input, 'ur')
    
    await waitFor(() => {
      expect(screen.getByText('urgent')).toBeInTheDocument()
    })
    
    await user.keyboard('{ArrowDown}')
    // First suggestion should be highlighted
    const suggestion = screen.getByText('urgent').closest('div')
    expect(suggestion).toHaveClass('bg-gray-100')
    
    await user.keyboard('{Enter}')
    expect(mockOnAdd).toHaveBeenCalledWith(['urgent'])
  })

  it('closes suggestions on Escape', async () => {
    const user = userEvent.setup()
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    await user.type(input, 'ur')
    
    await waitFor(() => {
      expect(screen.getByText('urgent')).toBeInTheDocument()
    })
    
    await user.keyboard('{Escape}')
    
    await waitFor(() => {
      expect(screen.queryByText('urgent')).not.toBeInTheDocument()
    })
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

  it('shows tag count in suggestions', async () => {
    const user = userEvent.setup()
    render(<TagInput onAdd={mockOnAdd} />, { wrapper: createWrapper() })
    
    const input = screen.getByPlaceholderText('Add tags...')
    await user.type(input, 'ur')
    
    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument() // count for 'urgent'
    })
  })
})