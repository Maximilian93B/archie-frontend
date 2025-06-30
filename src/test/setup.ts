import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { seedDatabase } from './mocks/db'
import './mocks/server'

// Cleanup after each test
afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.clearAllMocks()
})

// Seed database before each test
beforeEach(() => {
  seedDatabase()
})

// Mock Next.js router
const mockPush = vi.fn()
const mockReplace = vi.fn()
const mockPrefetch = vi.fn()
const mockBack = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: mockPrefetch,
    back: mockBack,
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: () => '/',
}))

// Export mocks for use in tests
export { mockPush, mockReplace, mockPrefetch, mockBack }

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8080'
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'

// Mock window.location with full implementation
delete (window as any).location
window.location = { 
  href: 'http://localhost:3000/',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/',
  search: '',
  hash: '',
  assign: vi.fn(),
  reload: vi.fn(),
  replace: vi.fn(),
} as any

// Set up real localStorage
const storage: Record<string, string> = {}
const localStorageMock = {
  getItem: (key: string) => storage[key] || null,
  setItem: (key: string, value: string) => { storage[key] = value },
  removeItem: (key: string) => { delete storage[key] },
  clear: () => { Object.keys(storage).forEach(key => delete storage[key]) },
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})