'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Plus, Grid3X3, List, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DocumentList } from '@/components/documents/list/document-list'
import { DocumentFilter, type DocumentFilters } from '@/components/documents/filter/document-filter'
import { BulkOperations } from '@/components/documents/bulk/bulk-operations'
import { apiClient } from '@/lib/api/client'
import { toast } from '@/hooks/use-toast'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { DocumentListParams } from '@/types'
import { useDocumentStore, useDocumentViewPreferences } from '@/store/document-store'

export default function DocumentsPage() {
  const searchParams = useSearchParams() // eslint-disable-line @typescript-eslint/no-unused-vars
  const queryClient = useQueryClient()
  const { viewMode, sortBy, sortOrder } = useDocumentViewPreferences()
  const { setViewMode } = useDocumentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState<DocumentFilters>({})

  // Build query params
  const queryParams: DocumentListParams = {
    page,
    page_size: 20,
    search: searchQuery || undefined,
    sort_by: sortBy,
    sort_desc: sortOrder === 'desc',
    document_types: filters.document_types,
    folder_id: filters.folder_id,
    ai_processed: filters.ai_processed,
    date_from: filters.date_range?.from?.toISOString(),
    date_to: filters.date_range?.to?.toISOString(),
    tags: filters.tags,
  }

  // Fetch documents
  const { data, isLoading } = useQuery({
    queryKey: ['documents', queryParams],
    queryFn: () => apiClient.getDocuments(queryParams),
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (documentId: string) => apiClient.deleteDocument(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      toast({
        title: 'Document deleted',
        description: 'The document has been permanently deleted.',
      })
    },
    onError: () => {
      toast({
        title: 'Delete failed',
        description: 'Failed to delete the document. Please try again.',
        variant: 'destructive',
      })
    },
  })

  // Download handler
  const handleDownload = async (documentId: string) => {
    try {
      const doc = data?.data.find(d => d.id === documentId)
      if (!doc) return

      const blob = await apiClient.downloadDocument(documentId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = doc.filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: 'Download started',
        description: `Downloading ${doc.filename}`,
      })
    } catch {
      toast({
        title: 'Download failed',
        description: 'Failed to download the document. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = (documentId: string) => {
    if (window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      deleteMutation.mutate(documentId)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
          <p className="text-gray-500">Manage and organize your documents</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/upload">
            <Plus className="mr-2 h-4 w-4" />
            Upload
          </Link>
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setFilterOpen(true)}
        >
          <Filter className="h-4 w-4" />
          {Object.keys(filters).length > 0 && (
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-black rounded-full" />
          )}
        </Button>
        <div className="flex items-center border rounded-md">
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
            className="rounded-r-none"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className="rounded-l-none"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Document List */}
      <DocumentList
        documents={data?.data || []}
        isLoading={isLoading}
        viewMode={viewMode}
        onDelete={handleDelete}
        onDownload={handleDownload}
      />

      {/* Pagination */}
      {data && data.total_pages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {data.total_pages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={page === data.total_pages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Filter Sheet */}
      <DocumentFilter
        open={filterOpen}
        onOpenChange={setFilterOpen}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Bulk Operations Bar */}
      <BulkOperations />
    </div>
  )
}