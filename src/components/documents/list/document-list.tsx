'use client'

import Link from 'next/link'
import {
  FileText,
  Download,
  Trash2,
  MoreVertical,
  Eye,
  Sparkles,
  Calendar,
  HardDrive,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { ProcessingStatusBadge } from '@/components/documents/processing-status-badge'
import { formatDate, formatBytes, getDocumentTypeColor } from '@/lib/utils'
import type { Document } from '@/types'
import { cn } from '@/lib/utils'
import { useDocumentStoreSafe, useIsDocumentSelectedSafe } from '@/hooks/use-document-store-safe'

interface DocumentListProps {
  documents: Document[]
  isLoading?: boolean
  viewMode?: 'list' | 'grid'
  onDelete?: (documentId: string) => void
  onDownload?: (documentId: string) => void
}

export function DocumentList({
  documents,
  isLoading = false,
  viewMode = 'list',
  onDelete,
  onDownload,
}: DocumentListProps) {
  const { toggleDocumentSelection } = useDocumentStoreSafe()

  const handleDelete = async (documentId: string) => {
    if (onDelete) {
      onDelete(documentId)
    }
  }

  const handleDownload = async (documentId: string) => {
    if (onDownload) {
      onDownload(documentId)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No documents found
          </h3>
          <p className="text-sm text-gray-500 text-center max-w-sm">
            Upload your first document to get started with AI-powered document management.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/dashboard/upload">
              Upload Document
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {documents.map((doc) => (
          <DocumentGridItem
            key={doc.id}
            document={doc}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <DocumentListItem
          key={doc.id}
          document={doc}
          onDelete={handleDelete}
          onDownload={handleDownload}
        />
      ))}
    </div>
  )
}

// Individual document item components
function DocumentListItem({
  document,
  onDelete,
  onDownload,
}: {
  document: Document
  onDelete: (id: string) => void
  onDownload: (id: string) => void
}) {
  const isSelected = useIsDocumentSelectedSafe(document.id)
  const { toggleDocumentSelection } = useDocumentStoreSafe()

  return (
    <Card
      className={cn(
        'group hover:shadow-sm transition-shadow',
        isSelected && 'ring-2 ring-black'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div
            className="flex items-center space-x-4 flex-1 cursor-pointer"
            onClick={() => toggleDocumentSelection(document.id)}
          >
            <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <FileText className="h-6 w-6 text-gray-600" />
            </div>

            <div className="flex-1 min-w-0">
              <Link
                href={`/dashboard/documents/${document.id}`}
                className="hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-medium text-sm mb-1 truncate">
                  {document.title}
                </h3>
              </Link>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className={cn('px-2 py-0.5 rounded-full text-xs', getDocumentTypeColor(document.document_type))}>
                  {document.document_type}
                </span>
                <span className="flex items-center">
                  <HardDrive className="h-3 w-3 mr-1" />
                  {formatBytes(document.file_size)}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(document.created_at)}
                </span>
                <ProcessingStatusBadge 
                  status={document.status} 
                  aiProcessed={document.ai_processed}
                  aiProcessingStatus={document.ai_processing_status}
                  embeddingStatus={document.embedding_status}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDownload(document.id)}
            >
              <Download className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/documents/${document.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDownload(document.id)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(document.id)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DocumentGridItem({
  document,
  onDelete,
  onDownload,
}: {
  document: Document
  onDelete: (id: string) => void
  onDownload: (id: string) => void
}) {
  const isSelected = useIsDocumentSelectedSafe(document.id)

  return (
    <Card
      className={cn(
        'group hover:shadow-md transition-shadow cursor-pointer',
        isSelected && 'ring-2 ring-black'
      )}
    >
      <Link href={`/dashboard/documents/${document.id}`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-gray-600" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.preventDefault()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/documents/${document.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDownload(document.id)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(document.id)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <h3 className="font-medium text-sm mb-1 line-clamp-2">
            {document.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span className={cn('px-2 py-0.5 rounded-full text-xs', getDocumentTypeColor(document.document_type))}>
              {document.document_type}
            </span>
            <ProcessingStatusBadge 
              status={document.ai_processing_status} 
              aiProcessed={document.ai_processed}
              className="h-5"
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center">
              <HardDrive className="h-3 w-3 mr-1" />
              {formatBytes(document.file_size)}
            </span>
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(document.created_at)}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}