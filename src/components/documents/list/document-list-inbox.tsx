'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  Star,
  StarOff,
  MoreVertical,
  Download,
  Trash2,
  FolderOpen,
  Tag,
  Share2,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { formatRelativeTime, formatBytes, cn } from '@/lib/utils'
import type { Document } from '@/types'
import { useDocumentStoreSafe, useIsDocumentSelectedSafe } from '@/hooks/use-document-store-safe'

interface DocumentListInboxProps {
  documents: Document[]
  isLoading?: boolean
  selectedDocumentId?: string
  onSelect?: (documentId: string) => void
  onDelete?: (documentId: string) => void
  onDownload?: (documentId: string) => void
  onStar?: (documentId: string) => void
}

// File type icons mapping
const getFileIcon = (contentType: string) => {
  if (contentType.includes('pdf')) return FileText
  if (contentType.includes('spreadsheet') || contentType.includes('excel')) return FileSpreadsheet
  if (contentType.includes('image')) return FileImage
  return File
}

// File type colors
const getFileTypeColor = (contentType: string) => {
  if (contentType.includes('pdf')) return 'text-red-600'
  if (contentType.includes('spreadsheet') || contentType.includes('excel')) return 'text-green-600'
  if (contentType.includes('image')) return 'text-blue-600'
  if (contentType.includes('word') || contentType.includes('document')) return 'text-blue-700'
  return 'text-gray-600'
}

export function DocumentListInbox({
  documents,
  isLoading = false,
  selectedDocumentId,
  onSelect,
  onDelete,
  onDownload,
  onStar,
}: DocumentListInboxProps) {
  const { selectedDocuments, toggleDocumentSelection, selectAllDocuments, clearSelection } = useDocumentStoreSafe()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectAllDocuments(documents.map(d => d.id))
    } else {
      clearSelection()
    }
  }

  const allSelected = documents.length > 0 && documents.every(doc => selectedDocuments.includes(doc.id))
  const someSelected = documents.some(doc => selectedDocuments.includes(doc.id))

  if (isLoading) {
    return (
      <div className="divide-y divide-gray-200">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center px-4 py-4 animate-pulse">
            <div className="w-4 h-4 bg-gray-200 rounded mr-3" />
            <div className="w-5 h-5 bg-gray-200 rounded mr-3" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded" />
              <div className="w-8 h-8 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          No documents yet
        </h3>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">
          Upload your first document to get started with AI-powered document management
        </p>
        <Button asChild>
          <Link href="/dashboard/upload">
            Upload Document
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header with select all */}
      <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <Checkbox
            checked={allSelected}
            indeterminate={!allSelected && someSelected}
            onCheckedChange={handleSelectAll}
            className="mr-3"
          />
          <span className="text-sm text-gray-600">
            {selectedDocuments.length > 0
              ? `${selectedDocuments.length} selected`
              : `${documents.length} documents`}
          </span>
        </div>
      </div>

      {/* Document list */}
      <div className="divide-y divide-gray-200">
        {documents.map((doc) => {
          const isSelected = selectedDocuments.includes(doc.id)
          const isActive = selectedDocumentId === doc.id
          const Icon = getFileIcon(doc.content_type)
          const iconColor = getFileTypeColor(doc.content_type)

          return (
            <div
              key={doc.id}
              className={cn(
                'flex items-center px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors',
                isActive && 'bg-blue-50 hover:bg-blue-50',
                isSelected && !isActive && 'bg-gray-50'
              )}
              onClick={() => onSelect?.(doc.id)}
              onMouseEnter={() => setHoveredId(doc.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Checkbox */}
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleDocumentSelection(doc.id)}
                onClick={(e) => e.stopPropagation()}
                className="mr-3"
              />

              {/* Icon */}
              <div className="mr-3 flex-shrink-0">
                <Icon className={cn('h-5 w-5', iconColor)} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {doc.title}
                  </h3>
                  {doc.ai_processed && (
                    <Badge variant="ai" size="sm">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      AI Processed
                    </Badge>
                  )}
                  {doc.starred && (
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-gray-500">
                    {formatBytes(doc.file_size)}
                  </p>
                  <span className="text-xs text-gray-300">•</span>
                  <p className="text-xs text-gray-500">
                    {formatRelativeTime(doc.created_at)}
                  </p>
                  {doc.folder_id && (
                    <>
                      <span className="text-xs text-gray-300">•</span>
                      <p className="text-xs text-gray-500 flex items-center">
                        <FolderOpen className="w-3 h-3 mr-1" />
                        {doc.folder_name || 'Folder'}
                      </p>
                    </>
                  )}
                  {doc.tags && doc.tags.length > 0 && (
                    <>
                      <span className="text-xs text-gray-300">•</span>
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-gray-400" />
                        {doc.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs text-gray-500">
                            {tag}
                          </span>
                        ))}
                        {doc.tags.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{doc.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div 
                className={cn(
                  'flex items-center gap-1 transition-opacity',
                  hoveredId === doc.id || isSelected ? 'opacity-100' : 'opacity-0'
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onStar?.(doc.id)}
                >
                  {doc.starred ? (
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onDownload?.(doc.id)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/documents/${doc.id}`}>
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDownload?.(doc.id)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FolderOpen className="mr-2 h-4 w-4" />
                      Move to Folder
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Tag className="mr-2 h-4 w-4" />
                      Add Tags
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete?.(doc.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}