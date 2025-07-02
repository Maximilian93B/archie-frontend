'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Sparkles, FileText, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { DocumentListInbox } from '@/components/documents/list/document-list-inbox'
import { DocumentDetailPanel } from '@/components/documents/detail/document-detail-panel'
import { SearchFilters } from '@/components/search/search-filters'
import { searchAPI, type SearchType, type SearchFilters as SearchFilterType } from '@/lib/api/search'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@/hooks/use-debounce'
import { toast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [searchType, setSearchType] = useState<SearchType>('all')
  const [filters, setFilters] = useState<SearchFilterType>({})
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)
  const [detailPanelOpen, setDetailPanelOpen] = useState(false)
  const [page, setPage] = useState(1)
  
  const debouncedQuery = useDebounce(query, 500)

  // Perform search
  const { data, isLoading, error } = useQuery({
    queryKey: ['search', debouncedQuery, searchType, filters, page],
    queryFn: () => searchAPI.advancedSearch({
      query: debouncedQuery,
      type: searchType,
      filters,
      page,
      pageSize: 20,
      sortBy: 'relevance',
      sortDesc: true,
    }),
    enabled: debouncedQuery.length > 0,
  })

  // Save search to history
  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length > 2) {
      // The backend will handle saving to search history
    }
  }, [debouncedQuery])

  const handleSaveSearch = async () => {
    if (!query) return
    
    try {
      await searchAPI.saveSearch(query)
      toast({
        title: 'Search saved',
        description: 'You can access your saved searches from the search menu',
      })
    } catch {
      toast({
        title: 'Failed to save search',
        description: 'Please try again',
        variant: 'destructive',
      })
    }
  }

  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocumentId(documentId)
    setDetailPanelOpen(true)
  }

  const handleDownload = async (documentId: string) => {
    // Implement download logic
    console.log('Download document:', documentId)
  }

  const handleDelete = async (documentId: string) => {
    // Implement delete logic
    console.log('Delete document:', documentId)
  }

  const handleStar = async (documentId: string) => {
    // Implement star logic
    console.log('Star document:', documentId)
  }

  const selectedDocument = data?.data.find(d => d.id === selectedDocumentId)
  const hasActiveFilters = Object.keys(filters).length > 0

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Main Content */}
      <div className={cn(
        'flex-1 flex flex-col',
        detailPanelOpen && 'hidden lg:flex'
      )}>
        {/* Search Header */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-10"
                autoFocus
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setFiltersOpen(true)}
              className={cn(hasActiveFilters && 'border-black')}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge variant="default" size="sm" className="ml-2">
                  {Object.keys(filters).length}
                </Badge>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveSearch}
              disabled={!query}
            >
              Save Search
            </Button>
          </div>

          {/* Search Type Tabs */}
          <Tabs value={searchType} onValueChange={(value) => setSearchType(value as SearchType)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="fulltext">
                <FileText className="h-4 w-4 mr-2" />
                Full Text
              </TabsTrigger>
              <TabsTrigger value="semantic">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Search
              </TabsTrigger>
              <TabsTrigger value="exact">Exact Match</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {!query ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Search className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Start searching
              </h3>
              <p className="text-sm text-gray-500 max-w-md">
                Enter a search query above to find documents. You can search by keywords, 
                use natural language with AI search, or apply filters for more precise results.
              </p>
            </div>
          ) : isLoading ? (
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <p className="text-red-600">Failed to perform search. Please try again.</p>
            </div>
          ) : data && data.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-sm text-gray-500 max-w-md text-center">
                Try adjusting your search query or filters. 
                {searchType === 'exact' && ' For exact match, ensure your query matches exactly.'}
                {searchType === 'semantic' && ' AI search works best with natural language questions.'}
              </p>
            </div>
          ) : (
            <div className="p-6">
              {/* Results Summary */}
              <div className="mb-4">
                <h2 className="text-sm text-gray-600">
                  Found <span className="font-medium text-gray-900">{data?.total || 0}</span> results 
                  for &quot;<span className="font-medium text-gray-900">{query}</span>&quot;
                  {searchType !== 'all' && (
                    <span className="ml-1">
                      using <span className="font-medium">{searchType}</span> search
                    </span>
                  )}
                </h2>
              </div>

              {/* Document List */}
              <DocumentListInbox
                documents={data?.data || []}
                selectedDocumentId={selectedDocumentId}
                onSelect={handleDocumentSelect}
                onDelete={handleDelete}
                onDownload={handleDownload}
                onStar={handleStar}
              />

              {/* Pagination */}
              {data && data.total_pages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {page} of {data.total_pages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => p + 1)}
                    disabled={page === data.total_pages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Detail Panel */}
      {detailPanelOpen && selectedDocument && (
        <DocumentDetailPanel
          document={selectedDocument}
          onClose={() => {
            setDetailPanelOpen(false)
            setSelectedDocumentId(null)
          }}
          onDelete={handleDelete}
          onDownload={handleDownload}
        />
      )}

      {/* Search Filters Sheet */}
      <SearchFilters
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  )
}