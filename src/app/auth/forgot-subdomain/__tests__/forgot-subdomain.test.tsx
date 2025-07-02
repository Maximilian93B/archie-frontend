import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ForgotSubdomainPage from '../page'
import { apiClient } from '@/lib/api/client'

// Mock the API client
vi.mock('@/lib/api/client', () => ({
  apiClient: {
    lookupSubdomain: vi.fn()
  }
}))

// Mock toast
const mockToast = vi.fn()
vi.mock('@/hooks/use-toast', () => ({
  toast: mockToast,
  useToast: () => ({ toast: mockToast })
}))

describe('Forgot Subdomain Page', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render the forgot subdomain form', () => {
    render(<ForgotSubdomainPage />)
    
    expect(screen.getByText(/forgot your workspace\?/i)).toBeInTheDocument()
    expect(screen.getByText(/enter your email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send workspace info/i })).toBeInTheDocument()
  })

  it('should show back to login link', () => {
    render(<ForgotSubdomainPage />)
    
    const backLink = screen.getByRole('link', { name: /back to login/i })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/auth/login')
  })

  describe('Subdomain Lookup', () => {
    it('should handle successful subdomain lookup', async () => {
      vi.mocked(apiClient.lookupSubdomain).mockResolvedValue({
        message: 'Subdomain information found',
        success: true,
        subdomains: [{
          subdomain: 'john-doe-abc123',
          tenant_name: "John Doe's Workspace",
          account_type: 'individual'
        }]
      })

      render(<ForgotSubdomainPage />)
      
      await user.type(screen.getByLabelText(/^email/i), 'john@example.com')
      await user.click(screen.getByRole('button', { name: /send workspace info/i }))
      
      await waitFor(() => {
        expect(apiClient.lookupSubdomain).toHaveBeenCalledWith('john@example.com')
      })
      
      // Should show success message
      expect(screen.getByText(/check your email/i)).toBeInTheDocument()
      expect(screen.getByText(/we've sent your workspace information/i)).toBeInTheDocument()
    })

    it('should handle email not found', async () => {
      vi.mocked(apiClient.lookupSubdomain).mockResolvedValue({
        message: 'No workspaces found',
        success: false,
        subdomains: []
      })

      render(<ForgotSubdomainPage />)
      
      await user.type(screen.getByLabelText(/^email/i), 'notfound@example.com')
      await user.click(screen.getByRole('button', { name: /send workspace info/i }))
      
      await waitFor(() => {
        expect(apiClient.lookupSubdomain).toHaveBeenCalled()
      })
      
      // Should show generic message for security
      expect(screen.getByText(/check your email/i)).toBeInTheDocument()
    })

    it('should validate email format', async () => {
      render(<ForgotSubdomainPage />)
      
      await user.type(screen.getByLabelText(/^email/i), 'invalid-email')
      await user.click(screen.getByRole('button', { name: /send workspace info/i }))
      
      // Should show validation error
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
      expect(apiClient.lookupSubdomain).not.toHaveBeenCalled()
    })

    it('should handle API errors gracefully', async () => {
      vi.mocked(apiClient.lookupSubdomain).mockRejectedValue(
        new Error('Network error')
      )

      render(<ForgotSubdomainPage />)
      
      await user.type(screen.getByLabelText(/^email/i), 'test@example.com')
      await user.click(screen.getByRole('button', { name: /send workspace info/i }))
      
      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith({
          title: 'Error',
          description: 'Failed to send workspace information. Please try again.',
          variant: 'destructive'
        })
      })
    })

    it('should disable form during submission', async () => {
      vi.mocked(apiClient.lookupSubdomain).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 100))
      )

      render(<ForgotSubdomainPage />)
      
      await user.type(screen.getByLabelText(/^email/i), 'test@example.com')
      
      const submitButton = screen.getByRole('button', { name: /send workspace info/i })
      await user.click(submitButton)
      
      // Button should be disabled during submission
      expect(submitButton).toBeDisabled()
      expect(screen.getByText(/sending/i)).toBeInTheDocument()
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })
    })
  })

  describe('Development Mode', () => {
    it('should show subdomains in development mode', async () => {
      // Mock development environment
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'

      vi.mocked(apiClient.lookupSubdomain).mockResolvedValue({
        message: 'Subdomain information found',
        success: true,
        subdomains: [
          {
            subdomain: 'john-doe-abc123',
            tenant_name: "John Doe's Workspace",
            account_type: 'individual'
          },
          {
            subdomain: 'acme-corp-xyz789',
            tenant_name: 'Acme Corporation',
            account_type: 'organization'
          }
        ]
      })

      render(<ForgotSubdomainPage />)
      
      await user.type(screen.getByLabelText(/^email/i), 'john@example.com')
      await user.click(screen.getByRole('button', { name: /send workspace info/i }))
      
      await waitFor(() => {
        // In development, should show actual subdomains
        expect(screen.getByText(/development mode/i)).toBeInTheDocument()
        expect(screen.getByText('john-doe-abc123')).toBeInTheDocument()
        expect(screen.getByText("John Doe's Workspace")).toBeInTheDocument()
        expect(screen.getByText('acme-corp-xyz789')).toBeInTheDocument()
        expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
      })

      // Restore environment
      process.env.NODE_ENV = originalEnv
    })
  })
})