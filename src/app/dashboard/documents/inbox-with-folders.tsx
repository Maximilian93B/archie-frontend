'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Search, Filter, SortDesc, PanelLeftClose, PanelLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DocumentListInbox } from '@/components/documents/list/document-list-inbox'
import { DocumentDetailPanel } from '@/components/documents/detail/document-detail-panel'
import { DocumentFilter } from '@/components/documents/filter/document-filter'
import { BulkOperations } from '@/components/documents/bulk/bulk-operations'
import { FolderTree } from '@/components/folders/folder-tree'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { apiClient } from '@/lib/api/client'
import { toast } from '@/hooks/use-toast'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { DocumentListParams, DocumentFilters } from '@/types'
import { useDocumentStore } from '@/store/document-store'
import { useFolderStore } from '@/store/folder-store'
import { cn } from '@/lib/utils'

export default function DocumentsInboxWithFoldersPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { sortBy, sortOrder, setSortBy, setSortOrder, selectedDocuments } = useDocumentStore()
  const { selectedFolderId, folders } = useFolderStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState<DocumentFilters>({})
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)
  const [detailPanelOpen, setDetailPanelOpen] = useState(false)
  const [showFolderTree, setShowFolderTree] = useState(true)

  // Get current folder name
  const getCurrentFolderName = () => {
    if (!selectedFolderId) return 'All Documents'
    const findFolder = (folders: any[], id: string): any => {
      for (const folder of folders) {
        if (folder.id === id) return folder
        if (folder.children) {
          const found = findFolder(folder.children, id)
          if (found) return found
        }
      }
      return null
    }
    const folder = findFolder(folders, selectedFolderId)
    return folder?.name || 'Documents'
  }

  // Build query params with folder filter
  const queryParams: DocumentListParams = {
    page,
    page_size: 50,
    search: searchQuery || undefined,
    sort_by: sortBy,
    sort_desc: sortOrder === 'desc',
    document_types: filters.document_types,
    folder_id: selectedFolderId || undefined,
    ai_processed: filters.ai_processed,
    date_from: filters.date_range?.from?.toISOString(),
    date_to: filters.date_range?.to?.toISOString(),
    tags: filters.tags,
  }

  // Fetch documents
  const { data, isLoading, refetch } = useQuery({
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
      if (selectedDocumentId === documentId) {
        setSelectedDocumentId(null)
        setDetailPanelOpen(false)
      }
    },
    onError: () => {
      toast({
        title: 'Delete failed',
        description: 'Failed to delete the document. Please try again.',
        variant: 'destructive',
      })
    },
  })

  // Star mutation (placeholder - needs backend support)
  const starMutation = useMutation({
    mutationFn: async (documentId: string) => {
      // TODO: Implement star endpoint
      return Promise.resolve({ id: documentId, starred: true })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
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

  const handleSelect = (documentId: string) => {
    setSelectedDocumentId(documentId)
    setDetailPanelOpen(true)
    // On mobile, navigate to detail page
    if (window.innerWidth < 768) {
      router.push(`/dashboard/documents/${documentId}`)
    }
  }

  const handleStar = (documentId: string) => {
    starMutation.mutate(documentId)
  }

  const handleFolderSelect = (folderId: string | null) => {
    // When folder changes, refetch documents
    refetch()
  }

  const sortOptions = [
    { label: 'Date (Newest)', value: 'created_at', order: 'desc' },
    { label: 'Date (Oldest)', value: 'created_at', order: 'asc' },
    { label: 'Name (A-Z)', value: 'title', order: 'asc' },
    { label: 'Name (Z-A)', value: 'title', order: 'desc' },
    { label: 'Size (Largest)', value: 'file_size', order: 'desc' },
    { label: 'Size (Smallest)', value: 'file_size', order: 'asc' },
  ]

  const selectedDocument = data?.data.find(d => d.id === selectedDocumentId)

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Folder Tree Sidebar */}
      {showFolderTree && (
        <div className="w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0">
          <FolderTree onFolderSelect={handleFolderSelect} />
        </div>
      )}

      {/* Document List Column */}
      <div className={cn(
        'flex-1 flex flex-col bg-white border-r border-gray-200',
        detailPanelOpen && 'hidden lg:flex'
      )}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowFolderTree(!showFolderTree)}
              >
                {showFolderTree ? (
                  <PanelLeftClose className="h-4 w-4" />
                ) : (
                  <PanelLeft className="h-4 w-4" />
                )}
              </Button>
              <h2 className="text-xl font-semibold">{getCurrentFolderName()}</h2>
            </div>
            <Button asChild size="sm">
              <Link href="/dashboard/upload">
                <Plus className="mr-2 h-4 w-4" />
                Upload
              </Link>
            </Button>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9"
              onClick={() => setFilterOpen(true)}
            >
              <Filter className="h-4 w-4" />
              {Object.keys(filters).length > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-black rounded-full" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <SortDesc className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={`${option.value}-${option.order}`}
                    onClick={() => {
                      setSortBy(option.value as any)
                      setSortOrder(option.order as 'asc' | 'desc')
                    }}
                    className={cn(
                      sortBy === option.value && sortOrder === option.order && 'font-medium'
                    )}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Document List */}
        <div className="flex-1 overflow-y-auto">
          <DocumentListInbox
            documents={data?.data || []}
            isLoading={isLoading}
            selectedDocumentId={selectedDocumentId}
            onSelect={handleSelect}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onStar={handleStar}
          />

          {/* Load More */}
          {data && data.page < data.total_pages && (
            <div className="p-4 text-center">
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={isLoading}
              >
                Load More
              </Button>
            </div>
          )}
        </div>

        {/* Bulk Operations */}
        {selectedDocuments.length > 0 && (
          <div className="border-t border-gray-200">
            <BulkOperations />
          </div>
        )}
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

      {/* Filter Sheet */}
      <DocumentFilter
        open={filterOpen}
        onOpenChange={setFilterOpen}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  )
}