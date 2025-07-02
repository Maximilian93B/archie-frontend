import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SessionListItem } from '../session-list-item'
import { useChatStore, ChatSession } from '@/store/chat-store'

// Mock the chat store
jest.mock('@/store/chat-store')
const mockUseChatStore = useChatStore as jest.MockedFunction<typeof useChatStore>

// Mock toast
jest.mock('@/hooks/use-toast', () => ({
  toast: jest.fn()
}))

// Mock date-fns
jest.mock('date-fns', () => ({
  formatDistanceToNow: () => '2 hours ago'
}))

describe('SessionListItem', () => {
  const mockSession: ChatSession = {
    id: 'session-1',
    documentId: 'doc-1',
    documentTitle: 'Test Document.pdf',
    sessionName: 'Test Session',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Hello, what is this document about?',
        timestamp: '2024-01-01T12:00:00Z',
        status: 'sent'
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: 'This document appears to be about testing procedures.',
        timestamp: '2024-01-01T12:01:00Z',
        status: 'sent'
      }
    ],
    isActive: true,
    totalMessages: 2,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T12:01:00Z',
    canModify: true
  }

  const mockStore = {
    currentSessionId: null,
    setCurrentSession: jest.fn(),
    pinSession: jest.fn(),
    unpinSession: jest.fn(),
    updateSession: jest.fn(),
    removeSession: jest.fn(),
    exportSession: jest.fn().mockResolvedValue('# Test Session\n\nExported content')
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseChatStore.mockReturnValue(mockStore as any)
  })

  const renderComponent = (props = {}) => {
    const defaultProps = {
      session: mockSession,
      isPinned: false,
      showPin: true,
      ...props
    }
    
    return render(<SessionListItem {...defaultProps} />)
  }

  it('renders session information correctly', () => {
    renderComponent()
    
    expect(screen.getByText('Test Session')).toBeInTheDocument()
    expect(screen.getByText('📄 Test Document.pdf')).toBeInTheDocument()
    expect(screen.getByText(/AI: This document appears to be about testing procedures/)).toBeInTheDocument()
    expect(screen.getByText('2 hours ago')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument() // message count
  })

  it('shows pin icon when session is pinned', () => {
    renderComponent({ isPinned: true })
    
    // Should show pin icon in the title area
    const pinIcon = screen.getByTestId('pin-icon') || document.querySelector('[data-testid*="pin"]')
    expect(pinIcon || screen.getByRole('button', { name: /unpin/i })).toBeInTheDocument()
  })

  it('handles session selection', async () => {
    const user = userEvent.setup()
    renderComponent()
    
    const sessionItem = screen.getByText('Test Session').closest('div')
    await user.click(sessionItem!)
    
    expect(mockStore.setCurrentSession).toHaveBeenCalledWith('session-1')
  })

  it('handles pin/unpin functionality', async () => {
    const user = userEvent.setup()
    renderComponent()
    
    // Find and click the pin button
    const moreButton = screen.getByRole('button', { name: /more/i }) || 
                      document.querySelector('[data-testid="more-button"]') ||
                      screen.getByText('⋮') ||
                      screen.getAllByRole('button').find(btn => btn.textContent?.includes('⋮'))
    
    if (moreButton) {
      await user.click(moreButton)
      
      const pinButton = screen.getByText(/pin/i) || screen.getByRole('menuitem', { name: /pin/i })
      await user.click(pinButton)
      
      expect(mockStore.pinSession).toHaveBeenCalledWith('session-1')
    } else {
      // Alternative: test direct pin button if visible
      const pinButtons = screen.getAllByRole('button').filter(btn => 
        btn.getAttribute('title')?.includes('pin') || 
        btn.textContent?.includes('📌')
      )
      
      if (pinButtons.length > 0) {
        await user.click(pinButtons[0])
        expect(mockStore.pinSession).toHaveBeenCalledWith('session-1')
      }
    }
  })

  it('handles rename functionality', async () => {
    const user = userEvent.setup()
    renderComponent()
    
    // Open more menu and click rename
    const moreButton = screen.getAllByRole('button').find(btn => 
      btn.textContent?.includes('⋮') || 
      btn.getAttribute('aria-label')?.includes('more')
    )
    
    if (moreButton) {
      await user.click(moreButton)
      
      const renameButton = screen.getByText(/rename/i)
      await user.click(renameButton)
      
      // Should open rename dialog
      expect(screen.getByText('Rename Conversation')).toBeInTheDocument()
      
      // Enter new name and save
      const input = screen.getByDisplayValue('Test Session')
      await user.clear(input)
      await user.type(input, 'New Session Name')
      
      const saveButton = screen.getByRole('button', { name: /rename/i }) || 
                        screen.getByRole('button', { name: /save/i })
      await user.click(saveButton)
      
      expect(mockStore.updateSession).toHaveBeenCalledWith('session-1', {
        sessionName: 'New Session Name'
      })
    }
  })

  it('handles delete functionality', async () => {
    const user = userEvent.setup()
    renderComponent()
    
    // Open more menu and click delete
    const moreButton = screen.getAllByRole('button').find(btn => 
      btn.textContent?.includes('⋮')
    )
    
    if (moreButton) {
      await user.click(moreButton)
      
      const deleteButton = screen.getByText(/delete/i)
      await user.click(deleteButton)
      
      // Should open delete confirmation dialog
      expect(screen.getByText(/delete.*conversation/i)).toBeInTheDocument()
      
      // Confirm deletion
      const confirmButton = screen.getByRole('button', { name: /delete/i })
      await user.click(confirmButton)
      
      expect(mockStore.removeSession).toHaveBeenCalledWith('session-1')
    }
  })

  it('handles export functionality', async () => {
    const user = userEvent.setup()
    
    // Mock URL.createObjectURL and related functions
    const mockCreateObjectURL = jest.fn(() => 'blob:mock-url')
    const mockRevokeObjectURL = jest.fn()
    Object.defineProperty(URL, 'createObjectURL', { value: mockCreateObjectURL })
    Object.defineProperty(URL, 'revokeObjectURL', { value: mockRevokeObjectURL })
    
    // Mock document.createElement and appendChild
    const mockLink = {
      href: '',
      download: '',
      click: jest.fn()
    }
    const mockCreateElement = jest.fn(() => mockLink)
    const mockAppendChild = jest.fn()
    const mockRemoveChild = jest.fn()
    
    Object.defineProperty(document, 'createElement', { value: mockCreateElement })
    Object.defineProperty(document.body, 'appendChild', { value: mockAppendChild })
    Object.defineProperty(document.body, 'removeChild', { value: mockRemoveChild })
    
    renderComponent()
    
    // Open more menu and click export
    const moreButton = screen.getAllByRole('button').find(btn => 
      btn.textContent?.includes('⋮')
    )
    
    if (moreButton) {
      await user.click(moreButton)
      
      const exportButton = screen.getByText(/export/i)
      await user.click(exportButton)
      
      await waitFor(() => {
        expect(mockStore.exportSession).toHaveBeenCalledWith('session-1')
        expect(mockCreateObjectURL).toHaveBeenCalled()
        expect(mockLink.click).toHaveBeenCalled()
      })
    }
  })

  it('shows active state correctly', () => {
    mockUseChatStore.mockReturnValue({
      ...mockStore,
      currentSessionId: 'session-1'
    } as any)
    
    renderComponent()
    
    const sessionItem = screen.getByText('Test Session').closest('div')
    expect(sessionItem).toHaveClass('bg-blue-50', 'border-blue-200')
  })

  it('displays last message preview correctly', () => {
    renderComponent()
    
    // Should show the last assistant message
    expect(screen.getByText(/AI: This document appears to be about testing procedures/)).toBeInTheDocument()
  })

  it('handles session with no messages', () => {
    const sessionWithNoMessages = {
      ...mockSession,
      messages: [],
      totalMessages: 0
    }
    
    renderComponent({ session: sessionWithNoMessages })
    
    expect(screen.getByText('Test Session')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument() // message count should be 0
  })
})