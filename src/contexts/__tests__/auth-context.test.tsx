import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../auth-context'
import { apiClient } from '@/lib/api/client'
import React from 'react'

// Mock the API client
vi.mock('@/lib/api/client', () => ({
  apiClient: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    validateToken: vi.fn(),
    lookupSubdomain: vi.fn(),
    setToken: vi.fn(),
    removeToken: vi.fn()
  }
}))

// Mock subscription store
vi.mock('@/store/subscription-store', () => ({
  useSubscriptionStore: () => ({
    fetchStatus: vi.fn(),
    clearSubscription: vi.fn()
  })
}))

// Mock useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn()
  })
}))

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(() => {}),
  useToast: vi.fn(() => ({ toast: vi.fn() }))
}))

describe('Auth Context - Subdomain Support', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  )

  describe('Individual Registration', () => {
    it('should handle individual registration with auto-generated subdomain', async () => {
      const mockUser = {
        id: '123',
        email: 'john@example.com',
        first_name: 'John',
        last_name: 'Doe',
        tenant_subdomain: 'john-doe-abc123',
        role: 'admin'
      }

      vi.mocked(apiClient.register).mockResolvedValue({
        user: mockUser,
        access_token: 'test-token',
        refresh_token: 'refresh-token'
      })

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.register({
          email: 'john@example.com',
          password: 'SecurePass123!',
          first_name: 'John',
          last_name: 'Doe',
          registration_type: 'individual'
        })
      })

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser)
        expect(result.current.isAuthenticated).toBe(true)
      })

      // Check localStorage
      expect(localStorage.getItem('tenant_subdomain')).toBe('john-doe-abc123')
      expect(localStorage.getItem('access_token')).toBe('test-token')
    })
  })

  describe('Organization Registration', () => {
    it('should handle organization registration with company-based subdomain', async () => {
      const mockUser = {
        id: '456',
        email: 'admin@acme.com',
        first_name: 'Admin',
        last_name: 'User',
        tenant_subdomain: 'acme-corporation-xyz789',
        role: 'admin'
      }

      vi.mocked(apiClient.register).mockResolvedValue({
        user: mockUser,
        access_token: 'test-token',
        refresh_token: 'refresh-token'
      })

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.register({
          email: 'admin@acme.com',
          password: 'SecurePass123!',
          first_name: 'Admin',
          last_name: 'User',
          company: 'Acme Corporation',
          registration_type: 'organization'
        })
      })

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser)
        expect(result.current.isAuthenticated).toBe(true)
      })

      expect(localStorage.getItem('tenant_subdomain')).toBe('acme-corporation-xyz789')
    })
  })

  describe('Login with Subdomain', () => {
    it('should include subdomain in login request', async () => {
      const mockUser = {
        id: '123',
        email: 'john@example.com',
        tenant_subdomain: 'john-doe-abc123'
      }

      vi.mocked(apiClient.login).mockResolvedValue({
        user: mockUser,
        access_token: 'test-token',
        refresh_token: 'refresh-token'
      })

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.login({
          email: 'john@example.com',
          password: 'SecurePass123!',
          subdomain: 'john-doe-abc123'
        })
      })

      expect(apiClient.login).toHaveBeenCalledWith({
        email: 'john@example.com',
        password: 'SecurePass123!',
        subdomain: 'john-doe-abc123'
      })

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser)
        expect(localStorage.getItem('tenant_subdomain')).toBe('john-doe-abc123')
      })
    })

    it('should handle login without subdomain (for backward compatibility)', async () => {
      const mockUser = {
        id: '123',
        email: 'john@example.com'
      }

      vi.mocked(apiClient.login).mockResolvedValue({
        user: mockUser,
        access_token: 'test-token',
        refresh_token: 'refresh-token'
      })

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.login({
          email: 'john@example.com',
          password: 'SecurePass123!'
        })
      })

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser)
      })
    })
  })

  describe('Subdomain Persistence', () => {
    it('should persist subdomain across sessions', async () => {
      // Set initial subdomain
      localStorage.setItem('tenant_subdomain', 'test-subdomain-123')
      localStorage.setItem('access_token', 'valid-token')
      localStorage.setItem('user', JSON.stringify({
        id: '123',
        email: 'test@example.com',
        tenant_subdomain: 'test-subdomain-123'
      }))

      vi.mocked(apiClient.validateToken).mockResolvedValue(true)

      const { result } = renderHook(() => useAuth(), { wrapper })

      await waitFor(() => {
        expect(result.current.user?.tenant_subdomain).toBe('test-subdomain-123')
        expect(result.current.isAuthenticated).toBe(true)
      })
    })

    it('should clear subdomain on logout', async () => {
      // Setup authenticated state
      localStorage.setItem('tenant_subdomain', 'test-subdomain')
      localStorage.setItem('access_token', 'test-token')
      localStorage.setItem('user', JSON.stringify({ id: '123' }))

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.logout()
      })

      expect(localStorage.getItem('tenant_subdomain')).toBeNull()
      expect(localStorage.getItem('access_token')).toBeNull()
      expect(localStorage.getItem('user')).toBeNull()
    })
  })

  describe('Error Handling', () => {
    it('should handle registration errors', async () => {
      vi.mocked(apiClient.register).mockRejectedValue(
        new Error('Email already exists')
      )

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        try {
          await result.current.register({
            email: 'existing@example.com',
            password: 'SecurePass123!',
            first_name: 'Test',
            last_name: 'User',
            registration_type: 'individual'
          })
        } catch (error) {
          // Expected error
        }
      })

      expect(result.current.error).toBe('Email already exists')
      expect(result.current.isAuthenticated).toBe(false)
    })

    it('should handle login errors with subdomain', async () => {
      vi.mocked(apiClient.login).mockRejectedValue(
        new Error('Invalid subdomain')
      )

      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        try {
          await result.current.login({
            email: 'test@example.com',
            password: 'wrong-password',
            subdomain: 'invalid-subdomain'
          })
        } catch (error) {
          // Expected error
        }
      })

      expect(result.current.error).toBe('Invalid subdomain')
      expect(result.current.isAuthenticated).toBe(false)
    })
  })
})