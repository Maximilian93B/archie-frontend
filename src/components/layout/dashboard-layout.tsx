'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'
import {
  FileText,
  Search,
  MessageSquare,
  FolderOpen,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Home,
  BarChart3,
  Clock,
  Star,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { GlobalSearch } from '@/components/search/global-search'
import { useSubscription } from '@/hooks/use-subscription'
import { CreditCard } from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'All Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Recent', href: '/dashboard/recent', icon: Clock },
  { name: 'Starred', href: '/dashboard/starred', icon: Star },
  { name: 'Chat Sessions', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
]

const bottomNavigation = [
  { name: 'Trash', href: '/dashboard/trash', icon: Trash2 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { status, checkQuota } = useSubscription()
  const [hasLimitWarning, setHasLimitWarning] = useState(false)
  
  useEffect(() => {
    // Check for approaching limits
    const checkLimits = async () => {
      const quotas = await Promise.all([
        checkQuota('documents', false),
        checkQuota('storage', false),
        checkQuota('ai_credits', false)
      ])
      
      // Check if any quota is above 80%
      const hasWarning = quotas.some(q => {
        if (!q.limit || q.limit === -1) return false
        const percentage = (q.used || 0) / q.limit * 100
        return percentage >= 80
      })
      
      setHasLimitWarning(hasWarning)
    }
    
    checkLimits()
  }, [])

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span className="text-xl font-semibold">Archivus</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Upload button */}
          <div className="px-4 py-4">
            <Button className="w-full" asChild>
              <Link href="/dashboard/upload">
                <Plus className="h-4 w-4 mr-2" />
                Upload Document
              </Link>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <Separator className="my-2" />

          {/* Subscription Status */}
          {status && (
            <div className="px-4 py-3">
              <div className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{status.plan?.nickname || 'No Plan'}</span>
                  {status.trial && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Trial</span>
                  )}
                </div>
              </div>
              <Link
                href="/dashboard/billing"
                className="flex items-center gap-2 mt-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <CreditCard className="h-4 w-4" />
                Billing & Usage
              </Link>
            </div>
          )}

          {/* Bottom navigation */}
          <nav className="px-4 pb-4 space-y-1">
            {bottomNavigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {user?.first_name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => logout()}
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop header with search */}
        <div className="hidden lg:flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
          <div className="flex-1 max-w-xl">
            <GlobalSearch />
          </div>
          <div className="flex items-center gap-4">
            {/* Usage warnings */}
            {hasLimitWarning && (
              <Link href="/dashboard/billing" className="text-sm text-amber-600 hover:text-amber-700">
                ⚠️ Approaching usage limits
              </Link>
            )}
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/dashboard" className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span className="text-xl font-semibold">Archivus</span>
          </Link>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}