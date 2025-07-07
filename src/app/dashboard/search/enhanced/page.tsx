'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Sparkles, FileText, SlidersHorizontal, Info, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { DocumentDetailPanel } from '@/components/documents/detail/document-detail-panel'
import { SearchFilters } from '@/components/search/search-filters'
import { EnhancedSearchResultComponent } from '@/components/search/enhanced-search-result'
import { useEnhancedSearchWithDefaults, useEnhancedSearchActions } from '@/hooks/queries/search.queries'
import { useDocuments } from '@/hooks/queries/documents.queries'
import { useDebounce } from '@/hooks/use-debounce'
import { toast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { SearchType, SearchFilters as SearchFilterType } from '@/lib/api/search'

export default function EnhancedSearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [searchType, setSearchType] = useState<SearchType>('all')
  const [filters, setFilters] = useState<SearchFilterType>({})
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)
  const [detailPanelOpen, setDetailPanelOpen] = useState(false)
  
  const debouncedQuery = useDebounce(query, 500)
  const { formatQueryAnalysis, groupResultsByRelevance } = useEnhancedSearchActions()

  // Use enhanced search
  const { data, isLoading, error } = useEnhancedSearchWithDefaults(
    debouncedQuery,
    {
      semantic: searchType === 'semantic' || searchType === 'all',
      includeAI: true,
      documentTypes: filters.documentTypes,
      relevanceThreshold: 0.2,
    },
    debouncedQuery.length > 0
  )

  // Get full document details for selected document
  const { data: selectedDocumentData } = useDocuments(
    { id: selectedDocumentId },
    { enablePolling: false }
  )

  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocumentId(documentId)
    setDetailPanelOpen(true)
  }

  const handleDownload = async (documentId: string) => {
    console.log('Download document:', documentId)
    toast({
      title: 'Download started',
      description: 'Your document is being downloaded',
    })
  }

  const handleDelete = async (documentId: string) => {
    console.log('Delete document:', documentId)
    toast({
      title: 'Document deleted',
      description: 'The document has been removed',
      variant: 'destructive',
    })
  }

  const handleStar = async (documentId: string) => {
    console.log('Star document:', documentId)
  }

  const selectedDocument = selectedDocumentData?.items?.[0]
  const hasActiveFilters = Object.keys(filters).length > 0
  const queryAnalysis = data ? formatQueryAnalysis(data.queryAnalysis) : null
  const resultGroups = data ? groupResultsByRelevance(data.results) : null

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
                placeholder="Ask questions or search with natural language..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-10"
                autoFocus
              />
              {data?.semanticEnabled && (
                <Sparkles className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-600" />
              )}
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
          </div>

          {/* AI Insights Banner */}
          {data?.semanticEnabled && (
            <Alert className="mb-4">
              <Sparkles className="h-4 w-4" />
              <AlertDescription>
                AI-enhanced search is active. Results include semantic understanding and AI-generated summaries.
              </AlertDescription>
            </Alert>
          )}

          {/* Query Analysis */}
          {queryAnalysis && (
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Understanding your search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-gray-600">Intent:</span>
                  <span className="text-sm text-gray-900">{queryAnalysis.intent}</span>
                </div>
                {queryAnalysis.entities.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-600">Key concepts:</span>
                    <div className="flex flex-wrap gap-1">
                      {queryAnalysis.entities.map((entity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {entity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {queryAnalysis.themes.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-600">Themes:</span>
                    <div className="flex flex-wrap gap-1">
                      {queryAnalysis.themes.map((theme, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {queryAnalysis.refinements.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-600">Try also:</span>
                    <div className="flex flex-wrap gap-1">
                      {queryAnalysis.refinements.map((refinement, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="h-auto py-1 px-2 text-xs"
                          onClick={() => setQuery(refinement)}
                        >
                          {refinement}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {!query ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Sparkles className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                AI-Enhanced Search
              </h3>
              <p className="text-sm text-gray-500 max-w-md">
                Ask questions in natural language or search for specific terms. 
                Our AI understands context and meaning, not just keywords.
              </p>
              <div className="mt-6 space-y-2">
                <p className="text-xs text-gray-500 font-medium">Try searching for:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery('financial reports from last quarter')}
                  >
                    financial reports from last quarter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery('contracts that mention payment terms')}
                  >
                    contracts that mention payment terms
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery('documents about product launches')}
                  >
                    documents about product launches
                  </Button>
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-8 w-64" />
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <p className="text-red-600">Failed to perform search. Please try again.</p>
            </div>
          ) : data && data.results.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-sm text-gray-500 max-w-md text-center">
                Try rephrasing your search or removing some filters. 
                AI search works best with natural language questions and descriptions.
              </p>
            </div>
          ) : (
            <div className="p-6">
              {/* Results Summary */}
              <div className="mb-6">
                <h2 className="text-sm text-gray-600 mb-2">
                  Found <span className="font-medium text-gray-900">{data?.totalResults || 0}</span> results 
                  for &quot;<span className="font-medium text-gray-900">{query}</span>&quot;
                  {data?.processingTimeMs && (
                    <span className="ml-1 text-xs text-gray-500">
                      ({(data.processingTimeMs / 1000).toFixed(2)}s)
                    </span>
                  )}
                </h2>
              </div>

              {/* Results by Relevance */}
              <div className="space-y-6">
                {resultGroups?.high && resultGroups.high.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-green-100 text-green-800">
                        High Relevance
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {resultGroups.high.length} result{resultGroups.high.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {resultGroups.high.map((result) => (
                        <EnhancedSearchResultComponent
                          key={result.id}
                          result={result}
                          query={query}
                          onSelect={handleDocumentSelect}
                          onDownload={handleDownload}
                          onDelete={handleDelete}
                          onStar={handleStar}
                          isSelected={selectedDocumentId === result.id}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {resultGroups?.medium && resultGroups.medium.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Medium Relevance
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {resultGroups.medium.length} result{resultGroups.medium.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {resultGroups.medium.map((result) => (
                        <EnhancedSearchResultComponent
                          key={result.id}
                          result={result}
                          query={query}
                          onSelect={handleDocumentSelect}
                          onDownload={handleDownload}
                          onDelete={handleDelete}
                          onStar={handleStar}
                          isSelected={selectedDocumentId === result.id}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {resultGroups?.low && resultGroups.low.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-gray-100 text-gray-800">
                        Low Relevance
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {resultGroups.low.length} result{resultGroups.low.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {resultGroups.low.map((result) => (
                        <EnhancedSearchResultComponent
                          key={result.id}
                          result={result}
                          query={query}
                          onSelect={handleDocumentSelect}
                          onDownload={handleDownload}
                          onDelete={handleDelete}
                          onStar={handleStar}
                          isSelected={selectedDocumentId === result.id}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
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