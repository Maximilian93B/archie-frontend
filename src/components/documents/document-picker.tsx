'use client'

import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Search, 
  Calendar,
  HardDrive,
  Check,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { formatFileSize } from '@/lib/utils/format'

interface DocumentPickerProps {
  onSelect: (documentId: string) => void
  selectedId?: string
  allowMultiple?: boolean
  selectedIds?: string[]
  onMultiSelect?: (documentIds: string[]) => void
}

export function DocumentPicker({
  onSelect,
  selectedId,
  allowMultiple = false,
  selectedIds = [],
  onMultiSelect
}: DocumentPickerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  
  // Fetch documents
  const { data, isLoading, isFetchingNextPage } = useQuery({
    queryKey: ['documents', 'picker', searchQuery, page],
    queryFn: () => apiClient.getDocuments({ 
      page, 
      page_size: 20,
      search: searchQuery,
      status: 'processed' // Only show processed documents for chat
    }),
    keepPreviousData: true
  })
  
  // Filter documents
  const filteredDocuments = useMemo(() => {
    if (!data?.data) return []
    return data.data
  }, [data])
  
  const handleSelect = (documentId: string) => {
    if (allowMultiple && onMultiSelect) {
      const newSelection = selectedIds.includes(documentId)
        ? selectedIds.filter(id => id !== documentId)
        : [...selectedIds, documentId]
      onMultiSelect(newSelection)
    } else {
      onSelect(documentId)
    }
  }
  
  const isSelected = (documentId: string) => {
    return allowMultiple ? selectedIds.includes(documentId) : selectedId === documentId
  }
  
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setPage(1) // Reset to first page on search
          }}
          placeholder="Search documents..."
          className="pl-9"
        />
      </div>
      
      {/* Document List */}
      <ScrollArea className="h-[300px]">
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchQuery ? 'No documents found' : 'No processed documents available'}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredDocuments.map((doc) => (
              <button
                key={doc.id}
                onClick={() => handleSelect(doc.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg border transition-all",
                  "hover:bg-gray-50 hover:border-gray-300",
                  isSelected(doc.id) 
                    ? "border-black bg-gray-50" 
                    : "border-gray-200"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-gray-600 shrink-0" />
                      <h4 className="font-medium text-sm truncate">
                        {doc.title || doc.file_name}
                      </h4>
                      {isSelected(doc.id) && (
                        <Check className="h-4 w-4 text-black shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(doc.created_at), { addSuffix: true })}
                      </span>
                      <span className="flex items-center gap-1">
                        <HardDrive className="h-3 w-3" />
                        {formatFileSize(doc.file_size)}
                      </span>
                      {doc.ai_processed && (
                        <Badge variant="secondary" className="text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI Ready
                        </Badge>
                      )}
                    </div>
                    
                    {doc.ai_summary && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                        {doc.ai_summary}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
      
      {/* Pagination */}
      {data && data.total > data.page_size && (
        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-gray-600">
            Showing {((page - 1) * data.page_size) + 1} - {Math.min(page * data.page_size, data.total)} of {data.total}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => p + 1)}
              disabled={page * data.page_size >= data.total}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}