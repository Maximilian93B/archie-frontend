import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import RegisterPage from '../page'
import { useAuth } from '@/contexts/auth-context'
import { apiClient } from '@/lib/api/client'

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('@/contexts/auth-context', () => ({
  useAuth: vi.fn()
}))

vi.mock('@/lib/api/client', () => ({
  apiClient: {
    register: vi.fn()
  }
}))

// Mock the registration success component
vi.mock('@/components/auth/registration-success', () => ({
  RegistrationSuccess: ({ subdomain, email, onContinue }: any) => (
    <div data-testid="registration-success">
      <p>Subdomain: {subdomain}</p>
      <p>Email: {email}</p>
      <button onClick={onContinue}>Continue</button>
    </div>
  )
}))

// Mock the registration type selector
vi.mock('@/components/auth/registration-type-selector', () => ({
  RegistrationTypeSelector: ({ onSelect }: any) => (
    <div data-testid="registration-type-selector">
      <button onClick={() => onSelect('individual')}>Personal Use</button>
      <button onClick={() => onSelect('organization')}>Team or Business</button>
    </div>
  )
}))

describe('Registration Page - Individual/Organization Support', () => {
  const mockPush = vi.fn()
  const mockRegister = vi.fn()
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
      register: mockRegister,
      login: vi.fn(),
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

  describe('Account Type Selection', () => {
    it('should render account type selector first', () => {
      render(<RegisterPage />)
      
      expect(screen.getByTestId('registration-type-selector')).toBeInTheDocument()
      expect(screen.getByText(/personal use/i)).toBeInTheDocument()
      expect(screen.getByText(/team or business/i)).toBeInTheDocument()
    })

    it('should show individual registration form when personal use is selected', async () => {
      render(<RegisterPage />)
      
      // Click personal use
      await user.click(screen.getByText(/personal use/i))
      
      // Should show individual registration form
      expect(screen.getByText(/create personal account/i)).toBeInTheDocument()
      expect(screen.queryByLabelText(/company name/i)).not.toBeInTheDocument()
    })

    it('should show organization registration form when team is selected', async () => {
      render(<RegisterPage />)
      
      // Click team or business
      await user.click(screen.getByText(/team or business/i))
      
      // Should show organization registration form
      expect(screen.getByText(/create organization account/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/company name/i)).toBeInTheDocument()
    })
  })

  describe('Individual Registration', () => {
    it('should register individual user with auto-generated subdomain', async () => {
      mockRegister.mockResolvedValue({
        user: {
          id: '123',
          email: 'john@example.com',
          first_name: 'John',
          last_name: 'Doe',
          tenant_subdomain: 'john-doe-abc123'
        }
      })

      render(<RegisterPage />)
      
      // Select individual type
      await user.click(screen.getByText(/personal use/i))
      
      // Fill form
      await user.type(screen.getByLabelText(/^email$/i), 'john@example.com')
      await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123!')
      await user.type(screen.getByLabelText(/first name/i), 'John')
      await user.type(screen.getByLabelText(/last name/i), 'Doe')
      
      // Submit
      await user.click(screen.getByRole('button', { name: /create account/i }))
      
      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith({
          email: 'john@example.com',
          password: 'SecurePass123!',
          first_name: 'John',
          last_name: 'Doe',
          registration_type: 'individual'
        })
      })
      
      // Should show success screen with subdomain
      expect(screen.getByTestId('registration-success')).toBeInTheDocument()
      expect(screen.getByText('Subdomain: john-doe-abc123')).toBeInTheDocument()
    })

    it('should show subdomain preview for individual accounts', async () => {
      render(<RegisterPage />)
      
      // Select individual type
      await user.click(screen.getByText(/personal use/i))
      
      await user.type(screen.getByLabelText(/first name/i), 'John')
      await user.type(screen.getByLabelText(/last name/i), 'Doe')
      
      // Should show preview
      expect(screen.getByText(/your archivus url will be/i)).toBeInTheDocument()
      expect(screen.getByText(/john-doe/i)).toBeInTheDocument()
    })
  })

  describe('Organization Registration', () => {
    it('should register organization with company-based subdomain', async () => {
      mockRegister.mockResolvedValue({
        user: {
          id: '456',
          email: 'admin@acme.com',
          first_name: 'Admin',
          last_name: 'User',
          tenant_subdomain: 'acme-corporation-xyz789'
        }
      })

      render(<RegisterPage />)
      
      // Select organization type
      await user.click(screen.getByText(/team or business/i))
      
      // Fill form
      await user.type(screen.getByLabelText(/company name/i), 'Acme Corporation')
      await user.type(screen.getByLabelText(/^email$/i), 'admin@acme.com')
      await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123!')
      await user.type(screen.getByLabelText(/first name/i), 'Admin')
      await user.type(screen.getByLabelText(/last name/i), 'User')
      
      // Submit
      await user.click(screen.getByRole('button', { name: /create account/i }))
      
      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith({
          email: 'admin@acme.com',
          password: 'SecurePass123!',
          first_name: 'Admin',
          last_name: 'User',
          company: 'Acme Corporation',
          registration_type: 'organization'
        })
      })
      
      // Should show success screen
      expect(screen.getByTestId('registration-success')).toBeInTheDocument()
      expect(screen.getByText('Subdomain: acme-corporation-xyz789')).toBeInTheDocument()
    })

    it('should validate company name for organizations', async () => {
      render(<RegisterPage />)
      
      // Select organization type
      await user.click(screen.getByText(/team or business/i))
      
      // Fill form without company name
      await user.type(screen.getByLabelText(/^email$/i), 'admin@acme.com')
      await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123!')
      await user.type(screen.getByLabelText(/first name/i), 'Admin')
      await user.type(screen.getByLabelText(/last name/i), 'User')
      
      // Submit
      await user.click(screen.getByRole('button', { name: /create account/i }))
      
      // Should show validation error
      expect(screen.getByText(/company name is required/i)).toBeInTheDocument()
    })

    it('should show subdomain preview for organizations', async () => {
      render(<RegisterPage />)
      
      // Select organization type
      await user.click(screen.getByText(/team or business/i))
      
      await user.type(screen.getByLabelText(/company name/i), 'Acme Corporation')
      
      // Should show preview
      expect(screen.getByText(/your archivus url will be/i)).toBeInTheDocument()
      expect(screen.getByText(/acme-corporation/i)).toBeInTheDocument()
    })
  })

  describe('OAuth Registration', () => {
    it('should handle OAuth signup for individuals', async () => {
      // Mock window.location
      const mockLocation = { href: '' }
      Object.defineProperty(window, 'location', {
        value: mockLocation,
        writable: true
      })

      render(<RegisterPage />)
      
      // Select individual type
      await user.click(screen.getByText(/personal use/i))
      
      // Click Google signup
      await user.click(screen.getByRole('button', { name: /sign up with google/i }))
      
      // Should redirect with individual type
      expect(mockLocation.href).toContain('/api/v1/auth/oauth/google?type=individual')
    })

    it('should handle OAuth signup for organizations with company name', async () => {
      const mockLocation = { href: '' }
      Object.defineProperty(window, 'location', {
        value: mockLocation,
        writable: true
      })

      render(<RegisterPage />)
      
      // Select organization type
      await user.click(screen.getByText(/team or business/i))
      
      // Enter company name
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp')
      
      // Click GitHub signup
      await user.click(screen.getByRole('button', { name: /sign up with github/i }))
      
      // Should redirect with organization type and company
      expect(mockLocation.href).toContain('/api/v1/auth/oauth/github?type=organization')
      expect(mockLocation.href).toContain('company=Test+Corp')
    })

    it('should store registration type in sessionStorage for OAuth', async () => {
      const mockSessionStorage = {
        setItem: vi.fn(),
        getItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn()
      }
      Object.defineProperty(window, 'sessionStorage', {
        value: mockSessionStorage,
        writable: true
      })

      render(<RegisterPage />)
      
      // Select organization type
      await user.click(screen.getByText(/team or business/i))
      
      await user.type(screen.getByLabelText(/company name/i), 'OAuth Corp')
      await user.click(screen.getByRole('button', { name: /sign up with google/i }))
      
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('oauth_registration_type', 'organization')
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('oauth_company_name', 'OAuth Corp')
    })
  })

  describe('Post-Registration Flow', () => {
    it('should redirect to pricing after successful registration', async () => {
      mockRegister.mockResolvedValue({
        user: {
          id: '123',
          email: 'test@example.com',
          tenant_subdomain: 'test-user-123'
        }
      })

      render(<RegisterPage />)
      
      // Select individual type
      await user.click(screen.getByText(/personal use/i))
      
      // Complete registration
      await user.type(screen.getByLabelText(/^email$/i), 'test@example.com')
      await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123!')
      await user.type(screen.getByLabelText(/first name/i), 'Test')
      await user.type(screen.getByLabelText(/last name/i), 'User')
      await user.click(screen.getByRole('button', { name: /create account/i }))
      
      // Wait for success screen
      await waitFor(() => {
        expect(screen.getByTestId('registration-success')).toBeInTheDocument()
      })
      
      // Click continue
      await user.click(screen.getByRole('button', { name: /continue/i }))
      
      expect(mockPush).toHaveBeenCalledWith('/pricing')
    })
  })

  describe('Error Handling', () => {
    it('should handle registration errors gracefully', async () => {
      mockRegister.mockRejectedValue(new Error('Email already exists'))

      render(<RegisterPage />)
      
      // Select individual type
      await user.click(screen.getByText(/personal use/i))
      
      await user.type(screen.getByLabelText(/^email$/i), 'existing@example.com')
      await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123!')
      await user.type(screen.getByLabelText(/first name/i), 'Test')
      await user.type(screen.getByLabelText(/last name/i), 'User')
      await user.click(screen.getByRole('button', { name: /create account/i }))
      
      // Error should be handled by auth context
      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalled()
      })
    })
  })
})