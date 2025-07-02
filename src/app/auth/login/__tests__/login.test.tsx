import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import LoginPage from '../page'
import { useAuth } from '@/contexts/auth-context'

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('@/contexts/auth-context', () => ({
  useAuth: vi.fn()
}))

describe('Login Page - Subdomain Support', () => {
  const mockPush = vi.fn()
  const mockLogin = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
    
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn()
    } as any)

    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      register: vi.fn(),
      logout: vi.fn(),
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    } as any)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Subdomain Field', () => {
    it('should render subdomain input field', () => {
      render(<LoginPage />)
      
      expect(screen.getByLabelText(/subdomain/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/your-workspace/i)).toBeInTheDocument()
    })

    it('should show subdomain helper text', () => {
      render(<LoginPage />)
      
      expect(screen.getByText(/archivus.app/i)).toBeInTheDocument()
    })

    it('should include subdomain in login request', async () => {
      mockLogin.mockResolvedValue({ success: true })

      render(<LoginPage />)
      
      // Fill form
      await user.type(screen.getByLabelText(/subdomain/i), 'john-doe-abc123')
      await user.type(screen.getByLabelText(/^email$/i), 'john@example.com')
      await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123!')
      
      // Submit
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'john@example.com',
          password: 'SecurePass123!',
          subdomain: 'john-doe-abc123'
        })
      })
    })
  })

  describe('Forgot Subdomain Link', () => {
    it('should display forgot subdomain link', () => {
      render(<LoginPage />)
      
      const forgotLink = screen.getByRole('link', { name: /forgot your workspace/i })
      expect(forgotLink).toBeInTheDocument()
      expect(forgotLink).toHaveAttribute('href', '/auth/forgot-subdomain')
    })
  })

  describe('Login Flow', () => {
    it('should handle successful login with subdomain', async () => {
      mockLogin.mockResolvedValue({ success: true })

      render(<LoginPage />)
      
      await user.type(screen.getByLabelText(/subdomain/i), 'acme-corp-xyz')
      await user.type(screen.getByLabelText(/^email$/i), 'admin@acme.com')
      await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123!')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard')
      })
    })

    it('should validate subdomain is provided', async () => {
      render(<LoginPage />)
      
      // Try to submit without subdomain
      await user.type(screen.getByLabelText(/^email$/i), 'test@example.com')
      await user.type(screen.getByLabelText(/^password$/i), 'password')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      // Should show validation error
      expect(screen.getByText(/subdomain is required/i)).toBeInTheDocument()
    })

    it('should handle login errors', async () => {
      mockLogin.mockRejectedValue(new Error('Invalid subdomain'))

      render(<LoginPage />)
      
      await user.type(screen.getByLabelText(/subdomain/i), 'invalid')
      await user.type(screen.getByLabelText(/^email$/i), 'test@example.com')
      await user.type(screen.getByLabelText(/^password$/i), 'password')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      // Error should be handled by auth context
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalled()
      })
    })
  })

  describe('OAuth Login', () => {
    it('should show OAuth options', () => {
      render(<LoginPage />)
      
      expect(screen.getByRole('button', { name: /sign in with google/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign in with github/i })).toBeInTheDocument()
    })

    it('should handle OAuth login click', async () => {
      const mockLocation = { href: '' }
      Object.defineProperty(window, 'location', {
        value: mockLocation,
        writable: true
      })

      render(<LoginPage />)
      
      await user.click(screen.getByRole('button', { name: /sign in with google/i }))
      
      expect(mockLocation.href).toContain('/api/v1/auth/oauth/google')
    })
  })

  describe('Registration Link', () => {
    it('should show link to registration page', () => {
      render(<LoginPage />)
      
      const registerLink = screen.getByRole('link', { name: /sign up/i })
      expect(registerLink).toBeInTheDocument()
      expect(registerLink).toHaveAttribute('href', '/auth/register')
    })
  })
})