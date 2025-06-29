# 🧩 Archivus UI Components Implementation Guide

## 📋 Overview

This guide provides ready-to-implement React component examples following the Archivus design system. All components use Tailwind CSS and follow Apple-like design principles.

## 🎨 Base Components

### **1. Button Component**

```tsx
// src/components/ui/button.tsx
import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-black text-white hover:bg-gray-800 focus-visible:ring-black',
        secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-400',
        ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400',
        danger: 'text-red-600 hover:bg-red-50 focus-visible:ring-red-500',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-9 px-4 text-sm rounded-md',
        lg: 'h-10 px-6 text-base rounded-md',
        icon: 'h-9 w-9 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
```

### **2. Document List Item**

```tsx
// src/components/documents/document-item.tsx
import { FileText, Star, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'

interface DocumentItemProps {
  document: {
    id: string
    title: string
    type: string
    size: number
    ai_processed: boolean
    created_at: string
  }
  selected?: boolean
  onClick?: () => void
}

export function DocumentItem({ document, selected, onClick }: DocumentItemProps) {
  return (
    <div
      className={cn(
        'flex items-center px-4 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-200 transition-colors',
        selected && 'bg-blue-50 hover:bg-blue-50'
      )}
      onClick={onClick}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => e.stopPropagation()}
        className="mr-3 h-4 w-4 rounded border-gray-300"
      />
      
      {/* Icon */}
      <div className="mr-3 flex-shrink-0">
        <FileText className="h-5 w-5 text-gray-400" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {document.title}
          </h3>
          {document.ai_processed && (
            <Badge variant="ai" size="sm">
              AI Processed
            </Badge>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5">
          {formatFileSize(document.size)} • {formatDistanceToNow(new Date(document.created_at), { addSuffix: true })}
        </p>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-1 ml-4">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Star className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
```

### **3. Sidebar Navigation**

```tsx
// src/components/layout/sidebar.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Inbox, 
  MessageSquare, 
  Search, 
  BarChart3,
  FolderOpen,
  Settings
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Inbox', href: '/documents', icon: Inbox, count: 4 },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
]

export function Sidebar() {
  const router = useRouter()
  const [activeItem, setActiveItem] = useState('Dashboard')
  
  return (
    <div className="w-60 h-full bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg">Archivus</span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => {
                  setActiveItem(item.name)
                  router.push(item.href)
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  activeItem === item.name
                    ? 'bg-gray-200 text-black'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1 text-left">{item.name}</span>
                {item.count && (
                  <span className="bg-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* User Menu */}
      <div className="p-3 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  )
}
```

### **4. Search Bar**

```tsx
// src/components/ui/search-bar.tsx
import { Search, X } from 'lucide-react'
import { useState, useRef } from 'react'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function SearchBar({ 
  placeholder = "Search...", 
  onSearch,
  className 
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleClear = () => {
    setQuery('')
    inputRef.current?.focus()
    onSearch?.('')
  }
  
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          onSearch?.(e.target.value)
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          'w-full h-9 pl-9 pr-9 text-sm rounded-lg transition-all',
          'placeholder:text-gray-400',
          isFocused 
            ? 'bg-white border border-black' 
            : 'bg-gray-100 border border-transparent'
        )}
      />
      
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        </button>
      )}
      
      {/* Keyboard shortcut hint */}
      {!isFocused && !query && (
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-sans">
          ⌘K
        </kbd>
      )}
    </div>
  )
}
```

### **5. Empty State**

```tsx
// src/components/ui/empty-state.tsx
import { LucideIcon } from 'lucide-react'
import { Button } from './button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-gray-500 mb-6 max-w-sm">
          {description}
        </p>
      )}
      
      {action && (
        <Button onClick={action.onClick} size="sm">
          {action.label}
        </Button>
      )}
    </div>
  )
}
```

### **6. Card Component**

```tsx
// src/components/ui/card.tsx
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'active'
}

export function Card({ 
  className, 
  variant = 'default', 
  children, 
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border p-6',
        {
          'border-gray-200': variant === 'default',
          'border-gray-300 hover:border-gray-400 cursor-pointer transition-colors': variant === 'hover',
          'border-black': variant === 'active',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Card subcomponents
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-lg font-semibold', className)} {...props} />
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-gray-600', className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />
}
```

### **7. Badge Component**

```tsx
// src/components/ui/badge.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-700',
        ai: 'bg-purple-100 text-purple-700',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-amber-100 text-amber-700',
        error: 'bg-red-100 text-red-700',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs rounded',
        md: 'px-2.5 py-1 text-xs rounded-md',
        lg: 'px-3 py-1 text-sm rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}
```

### **8. Loading States**

```tsx
// src/components/ui/skeleton.tsx
import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
      {...props}
    />
  )
}

// Document list skeleton
export function DocumentListSkeleton() {
  return (
    <div className="space-y-0 divide-y divide-gray-200">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center px-4 py-4">
          <Skeleton className="h-4 w-4 mr-3" />
          <Skeleton className="h-5 w-5 mr-3" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <div className="flex gap-1">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      ))}
    </div>
  )
}
```

## 🎨 Utility Functions

```tsx
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}
```

## 🎯 Usage Examples

### **Dashboard Page**
```tsx
// src/app/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search as SearchIcon } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Good morning</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your documents today.</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">4</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Chat Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">2</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>AI Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">3</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card variant="hover" className="flex items-center gap-4 p-5">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium">Upload Document</h3>
              <p className="text-sm text-gray-600">Add new files to your library</p>
            </div>
          </Card>
          
          <Card variant="hover" className="flex items-center gap-4 p-5">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <SearchIcon className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium">Search Documents</h3>
              <p className="text-sm text-gray-600">Find what you're looking for</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
```

---

**These components provide a solid foundation for building the Archivus interface with a clean, Apple-like design aesthetic.**