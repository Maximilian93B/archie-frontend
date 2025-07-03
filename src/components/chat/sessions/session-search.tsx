'use client'

import { useState, useEffect, forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useChatStoreSafe } from '@/hooks/use-chat-store-safe'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SessionSearchProps {
  className?: string
}

export const SessionSearch = forwardRef<HTMLInputElement, SessionSearchProps>(
  function SessionSearch({ className }, ref) {
  const { searchQuery, searchSessions, isSearching, filteredSessions, sessionsList } = useChatStoreSafe()
  
  const [localQuery, setLocalQuery] = useState(searchQuery)
  
  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== searchQuery) {
        searchSessions(localQuery)
      }
    }, 300)
    
    return () => clearTimeout(timer)
  }, [localQuery, searchQuery, searchSessions])
  
  // Update local query when store query changes
  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])
  
  const handleClear = () => {
    setLocalQuery('')
    searchSessions('')
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear()
    }
  }
  
  const hasResults = filteredSessions.length > 0
  const showNoResults = searchQuery && !isSearching && !hasResults
  const showResults = searchQuery && hasResults
  
  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={ref}
          placeholder="Search conversations..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            "pl-10 pr-10 h-9 text-sm",
            isSearching && "animate-pulse"
          )}
        />
        {localQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-100"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      {/* Search Status */}
      {isSearching && (
        <div className="text-xs text-gray-500 px-1">
          Searching...
        </div>
      )}
      
      {showNoResults && (
        <div className="text-xs text-gray-500 px-1">
          No conversations found for "{searchQuery}"
        </div>
      )}
      
      {showResults && (
        <div className="text-xs text-gray-500 px-1">
          {filteredSessions.length} of {sessionsList.length} conversations
        </div>
      )}
      
      {/* Quick Filters */}
      {!searchQuery && (
        <div className="flex flex-wrap gap-1">
          <QuickFilter 
            label="Today" 
            onClick={() => setLocalQuery('today')}
          />
          <QuickFilter 
            label="This week" 
            onClick={() => setLocalQuery('this week')}
          />
          <QuickFilter 
            label="Pinned" 
            onClick={() => setLocalQuery('pinned')}
          />
        </div>
      )}
    </div>
  )
})

// Backward compatibility export
export { SessionSearch as default }

interface QuickFilterProps {
  label: string
  onClick: () => void
}

function QuickFilter({ label, onClick }: QuickFilterProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="h-6 px-2 text-xs border-gray-200 hover:bg-gray-50 hover:border-gray-300"
    >
      {label}
    </Button>
  )
}