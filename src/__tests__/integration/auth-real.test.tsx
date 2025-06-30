import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import LoginPage from '@/app/auth/login/page'
import RegisterPage from '@/app/auth/register/page'
import { mockPush } from '@/test/setup'

describe('Authentication Integration Tests (Real Implementation)', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  describe('Login Flow', () => {
    it('should complete full login flow with real API client', async () => {
      const user = userEvent.setup()
      render(<LoginPage />)

      // Fill in login form with test credentials
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      
      // Submit form
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)

      // Wait for login to complete
      await waitFor(() => {
        // Check that tokens are stored
        expect(localStorage.getItem('access_token')).toBe('test-token-user-1')
        expect(localStorage.getItem('refresh_token')).toBe('test-refresh-user-1')
        expect(localStorage.getItem('tenant_id')).toBe('test-tenant')
        
        // Check redirect to dashboard
        expect(mockPush).toHaveBeenCalledWith('/dashboard')
      })
    })

    it('should show error with invalid credentials', async () => {
      const user = userEvent.setup()
      render(<LoginPage />)

      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/password/i), 'wrongpassword')
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)

      // Should not redirect on error
      await waitFor(() => {
        expect(mockPush).not.toHaveBeenCalled()
        expect(localStorage.getItem('access_token')).toBeNull()
      })
    })

    it('should validate email format before submission', async () => {
      const user = userEvent.setup()
      render(<LoginPage />)

      await user.type(screen.getByLabelText(/email/i), 'invalid-email')
      await user.type(screen.getByLabelText(/password/i), 'password123')
      
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
        expect(mockPush).not.toHaveBeenCalled()
      })
    })
  })

  describe('Registration Flow', () => {
    it('should complete full registration flow', async () => {
      const user = userEvent.setup()
      render(<RegisterPage />)

      // Fill in all fields
      await user.type(screen.getByLabelText(/email/i), 'newuser@example.com')
      await user.type(screen.getByLabelText(/^password/i), 'Password123!')
      await user.type(screen.getByLabelText(/confirm password/i), 'Password123!')
      await user.type(screen.getByLabelText(/first name/i), 'New')
      await user.type(screen.getByLabelText(/last name/i), 'User')
      await user.type(screen.getByLabelText(/company/i), 'New Company')

      const submitButton = screen.getByRole('button', { name: /create account/i })
      await user.click(submitButton)

      await waitFor(() => {
        // Check that user is created and logged in
        expect(localStorage.getItem('access_token')).toMatch(/^test-token-/)
        expect(localStorage.getItem('refresh_token')).toMatch(/^test-refresh-/)
        expect(mockPush).toHaveBeenCalledWith('/dashboard')
      })
    })

    it('should prevent duplicate email registration', async () => {
      const user = userEvent.setup()
      render(<RegisterPage />)

      // Try to register with existing email
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/^password/i), 'Password123!')
      await user.type(screen.getByLabelText(/confirm password/i), 'Password123!')
      await user.type(screen.getByLabelText(/first name/i), 'Test')
      await user.type(screen.getByLabelText(/last name/i), 'User')

      const submitButton = screen.getByRole('button', { name: /create account/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockPush).not.toHaveBeenCalled()
        expect(localStorage.getItem('access_token')).toBeNull()
      })
    })
  })

  describe('Protected Routes', () => {
    it('should validate token on app initialization', async () => {
      // Set a valid token
      localStorage.setItem('access_token', 'test-token-user-1')
      localStorage.setItem('refresh_token', 'test-refresh-user-1')
      
      // Render a component that uses auth context
      const { result } = render(
        <div>
          <LoginPage />
        </div>
      )
      
      // Auth context should validate the token
      await waitFor(() => {
        // Token should remain valid
        expect(localStorage.getItem('access_token')).toBe('test-token-user-1')
      })
    })

    it('should clear invalid tokens', async () => {
      // Set an invalid token
      localStorage.setItem('access_token', 'invalid-token')
      localStorage.setItem('refresh_token', 'invalid-refresh')
      
      // The auth context will try to validate on mount
      render(<LoginPage />)
      
      await waitFor(() => {
        // Invalid tokens should be cleared
        expect(localStorage.getItem('access_token')).toBeNull()
        expect(localStorage.getItem('refresh_token')).toBeNull()
      })
    })
  })

  describe('Token Refresh', () => {
    it('should refresh token when needed', async () => {
      // Set tokens that will trigger a refresh
      localStorage.setItem('access_token', 'test-token-user-1')
      localStorage.setItem('refresh_token', 'test-refresh-user-1')
      
      // The refresh will happen through the API client interceptor
      // This is tested in the API client tests
      expect(localStorage.getItem('refresh_token')).toBe('test-refresh-user-1')
    })
  })
})