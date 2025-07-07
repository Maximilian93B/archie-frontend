'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Clock, Star, FileText, Loader2, Sparkles } from 'lucide-react'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useDebounce } from '@/hooks/use-debounce'
import { searchAPI, type SearchSuggestion } from '@/lib/api/search'
import { cn } from '@/lib/utils'
import { useHotkeys } from '@/hooks/use-hotkeys'

interface GlobalSearchProps {
  className?: string
}

export function GlobalSearch({ className }: GlobalSearchProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [recentSearches, setRecentSearches] = useState<SearchSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)

  // Keyboard shortcut to open search (Cmd/Ctrl + K)
  useHotkeys('cmd+k', () => setOpen(true))
  useHotkeys('ctrl+k', () => setOpen(true))

  // Load recent searches when dialog opens
  useEffect(() => {
    if (open) {
      loadRecentSearches()
    }
  }, [open])

  // Fetch suggestions when query changes
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      fetchSuggestions(debouncedQuery)
    } else {
      setSuggestions([])
    }
  }, [debouncedQuery])

  const loadRecentSearches = async () => {
    try {
      const recent = await searchAPI.getSearchHistory(5)
      setRecentSearches(recent)
    } catch (error) {
      console.error('Failed to load recent searches:', error)
    }
  }

  const fetchSuggestions = async (searchQuery: string) => {
    setIsLoading(true)
    try {
      const results = await searchAPI.getSuggestions(searchQuery)
      setSuggestions(results)
    } catch (error) {
      console.error('Failed to fetch suggestions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (searchQuery: string, useEnhanced = false) => {
    if (!searchQuery.trim()) return
    
    // Save to recent searches (handled by backend)
    setOpen(false)
    setQuery('')
    
    // Navigate to search results page
    const searchPath = useEnhanced ? '/dashboard/search/enhanced' : '/dashboard/search'
    router.push(`${searchPath}?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleSelect = (suggestion: SearchSuggestion) => {
    handleSearch(suggestion.text)
  }

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors',
          className
        )}
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-gray-600">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Search documents..."
              value={query}
              onValueChange={setQuery}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            )}
          </div>
          
          <CommandList>
            <CommandEmpty>
              {query.length < 2 
                ? "Type at least 2 characters to search..." 
                : "No results found."}
            </CommandEmpty>

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <CommandGroup heading="Recent Searches">
                {recentSearches.map((search, index) => (
                  <CommandItem
                    key={index}
                    value={search.text}
                    onSelect={() => handleSelect(search)}
                    className="flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{search.text}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <CommandGroup heading="Suggestions">
                {suggestions.map((suggestion, index) => (
                  <CommandItem
                    key={index}
                    value={suggestion.text}
                    onSelect={() => handleSelect(suggestion)}
                    className="flex items-center gap-2"
                  >
                    {suggestion.type === 'recent' && <Clock className="h-4 w-4 text-gray-400" />}
                    {suggestion.type === 'popular' && <Star className="h-4 w-4 text-gray-400" />}
                    {suggestion.type === 'ai' && <FileText className="h-4 w-4 text-gray-400" />}
                    <span>{suggestion.text}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Quick Actions */}
            <CommandGroup heading="Quick Actions">
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  router.push('/dashboard/search/enhanced')
                }}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-purple-600" />
                AI-Enhanced Search
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  router.push('/dashboard/search')
                }}
              >
                Advanced Search
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  router.push('/dashboard/search/saved')
                }}
              >
                Saved Searches
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}