'use client'

import { useState, useMemo } from 'react'
import { useEnhancedDocuments } from '@/hooks/queries/enhanced-documents.queries'
import { enhancedDocumentUtils } from '@/lib/api/enhanced-documents'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  FileText, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Sparkles,
  X,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { formatFileSize } from '@/lib/utils/format'
import type { EnhancedDocument } from '@/lib/api/enhanced-documents'

interface DocumentSelectorProps {
  selectedDocuments: string[]
  onDocumentToggle: (documentId: string) => void
  onDocumentsChange: (documents: EnhancedDocument[]) => void
  maxDocuments?: number
  className?: string
}

export function DocumentSelector({
  selectedDocuments,
  onDocumentToggle,
  onDocumentsChange,
  maxDocuments = 10,
  className
}: DocumentSelectorProps) {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [documentType, setDocumentType] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  // Fetch documents with search and filters
  const { 
    data, 
    isLoading, 
    error, 
    isFetching 
  } = useEnhancedDocuments({
    page,
    page_size: 20,
    document_type: documentType || undefined,
    include_context: false // Don't need full context for selection
  })

  const documents = data?.documents || []
  const hasNextPage = data ? page * data.page_size < data.total : false

  // Filter documents by search query locally
  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) return documents

    const query = searchQuery.toLowerCase()
    return documents.filter(doc =>
      doc.title?.toLowerCase().includes(query) ||
      doc.file_name.toLowerCase().includes(query) ||
      doc.ai_summary?.toLowerCase().includes(query) ||
      doc.ai_key_points?.some(point => point.toLowerCase().includes(query))
    )
  }, [documents, searchQuery])

  // Get unique document types for filter
  const documentTypes = useMemo(() => {
    const types = new Set<string>()
    documents.forEach(doc => {
      if (doc.document_type) {
        types.add(doc.document_type)
      }
    })
    return Array.from(types).sort()
  }, [documents])

  const canSelectMore = selectedDocuments.length < maxDocuments
  const selectedDocumentObjects = documents.filter(doc => 
    selectedDocuments.includes(doc.id)
  )

  // Update parent with selected document objects whenever selection changes
  useState(() => {
    onDocumentsChange(selectedDocumentObjects)
  })

  const handleDocumentToggle = (document: EnhancedDocument) => {
    onDocumentToggle(document.id)
    
    // Update parent with new selection
    const newSelection = selectedDocuments.includes(document.id)
      ? selectedDocuments.filter(id => id !== document.id)
      : [...selectedDocuments, document.id]
    
    const newSelectedDocuments = documents.filter(doc => 
      newSelection.includes(doc.id)
    )
    onDocumentsChange(newSelectedDocuments)
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="py-8">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Failed to load documents</h3>
            <p className="text-sm text-gray-600">Please try refreshing the page</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Select Documents to Compare
          </div>
          <Badge variant="secondary">
            {selectedDocuments.length}/{maxDocuments} selected
          </Badge>
        </CardTitle>
        
        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Filters
              {showFilters ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {selectedDocuments.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  selectedDocuments.forEach(id => onDocumentToggle(id))
                  onDocumentsChange([])
                }}
              >
                Clear Selection
              </Button>
            )}
          </div>

          {/* Filter Controls */}
          {showFilters && (
            <div className="p-3 bg-gray-50 rounded-lg space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Document Type
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  {documentTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[500px]">
          {isLoading && documents.length === 0 ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <DocumentSkeleton key={i} />
              ))}
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-600">
                {searchQuery ? 'No documents match your search' : 'No documents found'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocuments.map((document) => (
                <DocumentSelectorItem
                  key={document.id}
                  document={document}
                  isSelected={selectedDocuments.includes(document.id)}
                  onToggle={() => handleDocumentToggle(document)}
                  disabled={!canSelectMore && !selectedDocuments.includes(document.id)}
                />
              ))}
              
              {/* Load More */}
              {hasNextPage && (
                <div className="pt-3 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => p + 1)}
                    disabled={isFetching}
                    className="w-full"
                  >
                    {isFetching ? 'Loading...' : 'Load More Documents'}
                  </Button>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

interface DocumentSelectorItemProps {
  document: EnhancedDocument
  isSelected: boolean
  onToggle: () => void
  disabled?: boolean
}

function DocumentSelectorItem({ 
  document, 
  isSelected, 
  onToggle, 
  disabled 
}: DocumentSelectorItemProps) {
  const processingStatus = enhancedDocumentUtils.getProcessingStatus(document)
  const summary = enhancedDocumentUtils.generateDisplaySummary(document)

  return (
    <div
      className={cn(
        "p-3 border rounded-lg transition-all cursor-pointer",
        isSelected 
          ? "border-blue-500 bg-blue-50" 
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={disabled ? undefined : onToggle}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="mt-1">
          <Checkbox
            checked={isSelected}
            disabled={disabled}
            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
        </div>

        {/* Document Icon & Status */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className={cn(
              "w-8 h-8 rounded-md flex items-center justify-center",
              isSelected ? "bg-blue-100" : "bg-gray-100"
            )}>
              <FileText className={cn(
                "h-4 w-4",
                isSelected ? "text-blue-600" : "text-gray-600"
              )} />
            </div>
            {/* AI Processing Status */}
            <div className="absolute -bottom-1 -right-1">
              {processingStatus.status === 'processed' && (
                <CheckCircle className="h-3 w-3 text-green-500 bg-white rounded-full" />
              )}
              {processingStatus.status === 'processing' && (
                <Clock className="h-3 w-3 text-blue-500 bg-white rounded-full" />
              )}
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-medium text-gray-900 text-sm truncate">
              {document.title || document.file_name}
            </h3>
            {document.ai_confidence_score && (
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <Sparkles className="h-3 w-3 text-purple-500" />
                <span className="text-xs text-gray-500">
                  {Math.round(document.ai_confidence_score * 100)}%
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
            <span>{formatFileSize(document.file_size)}</span>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(document.created_at), { addSuffix: true })}</span>
            {document.document_type && (
              <>
                <span>•</span>
                <Badge variant="outline" className="text-xs py-0">
                  {document.document_type}
                </Badge>
              </>
            )}
          </div>

          {/* AI Summary */}
          {document.ai_summary && (
            <p className="text-xs text-gray-600 line-clamp-2">
              {summary}
            </p>
          )}

          {/* Processing Status */}
          <div className="mt-2">
            <Badge 
              variant={processingStatus.status === 'processed' ? 'default' : 'secondary'}
              className="text-xs"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              {processingStatus.message}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

function DocumentSkeleton() {
  return (
    <div className="p-3 border rounded-lg">
      <div className="flex items-start gap-3">
        <Skeleton className="w-4 h-4 mt-1" />
        <Skeleton className="w-8 h-8 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}