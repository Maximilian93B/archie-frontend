'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { 
  FileText, 
  Brain, 
  Sparkles, 
  Users, 
  Eye,
  X,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

interface ContextIndicatorProps {
  documents: Array<{
    id: string
    title: string
    file_name: string
    document_type?: string
    ai_processed: boolean
    created_at: string
    ai_summary?: string
  }>
  onRemoveDocument?: (documentId: string) => void
  onViewDocument?: (documentId: string) => void
  className?: string
  variant?: 'compact' | 'expanded'
}

export function ContextIndicator({
  documents,
  onRemoveDocument,
  onViewDocument,
  className,
  variant = 'compact'
}: ContextIndicatorProps) {
  const [showDetails, setShowDetails] = useState(false)

  if (documents.length === 0) {
    return null
  }

  if (variant === 'compact') {
    return (
      <TooltipProvider>
        <Popover open={showDetails} onOpenChange={setShowDetails}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 px-3 bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700",
                className
              )}
            >
              <Brain className="h-3 w-3 mr-1" />
              <span className="text-xs font-medium">
                {documents.length} document{documents.length > 1 ? 's' : ''}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <ContextDetails
              documents={documents}
              onRemoveDocument={onRemoveDocument}
              onViewDocument={onViewDocument}
            />
          </PopoverContent>
        </Popover>
      </TooltipProvider>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-2">
        <Brain className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-900">
          Context: {documents.length} document{documents.length > 1 ? 's' : ''}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {documents.map((doc) => (
          <DocumentChip
            key={doc.id}
            document={doc}
            onRemove={onRemoveDocument ? () => onRemoveDocument(doc.id) : undefined}
            onView={onViewDocument ? () => onViewDocument(doc.id) : undefined}
          />
        ))}
      </div>
    </div>
  )
}

interface ContextDetailsProps {
  documents: ContextIndicatorProps['documents']
  onRemoveDocument?: (documentId: string) => void
  onViewDocument?: (documentId: string) => void
}

function ContextDetails({ documents, onRemoveDocument, onViewDocument }: ContextDetailsProps) {
  const totalSize = documents.length
  const processedCount = documents.filter(d => d.ai_processed).length
  const types = [...new Set(documents.map(d => d.document_type).filter(Boolean))]

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Brain className="h-4 w-4 text-blue-600" />
        <h3 className="font-medium text-sm">Chat Context</h3>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <FileText className="h-3 w-3" />
          {totalSize} docs
        </div>
        <div className="flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          {processedCount} AI ready
        </div>
        {types.length > 0 && (
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {types.length} type{types.length > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Document List */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {documents.map((doc) => (
          <ContextDocumentItem
            key={doc.id}
            document={doc}
            onRemove={onRemoveDocument ? () => onRemoveDocument(doc.id) : undefined}
            onView={onViewDocument ? () => onViewDocument(doc.id) : undefined}
          />
        ))}
      </div>

      {/* Types Summary */}
      {types.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-gray-600 mb-2">Document types:</p>
          <div className="flex flex-wrap gap-1">
            {types.map((type) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface DocumentChipProps {
  document: ContextIndicatorProps['documents'][0]
  onRemove?: () => void
  onView?: () => void
}

function DocumentChip({ document, onRemove, onView }: DocumentChipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 border border-blue-200 rounded text-xs">
            <FileText className="h-3 w-3 text-blue-600" />
            <span className="max-w-[100px] truncate text-blue-700">
              {document.title || document.file_name}
            </span>
            {document.ai_processed && (
              <Sparkles className="h-3 w-3 text-blue-500" />
            )}
            <div className="flex items-center gap-1 ml-1">
              {onView && (
                <button
                  onClick={onView}
                  className="hover:bg-blue-200 p-0.5 rounded"
                >
                  <Eye className="h-2.5 w-2.5 text-blue-600" />
                </button>
              )}
              {onRemove && (
                <button
                  onClick={onRemove}
                  className="hover:bg-blue-200 p-0.5 rounded"
                >
                  <X className="h-2.5 w-2.5 text-blue-600" />
                </button>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">{document.title || document.file_name}</p>
            {document.ai_summary && (
              <p className="text-xs opacity-90">{document.ai_summary.slice(0, 100)}...</p>
            )}
            <p className="text-xs opacity-75">
              Added {formatDistanceToNow(new Date(document.created_at), { addSuffix: true })}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface ContextDocumentItemProps {
  document: ContextIndicatorProps['documents'][0]
  onRemove?: () => void
  onView?: () => void
}

function ContextDocumentItem({ document, onRemove, onView }: ContextDocumentItemProps) {
  return (
    <div className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded">
      <FileText className="h-4 w-4 text-gray-600 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium truncate">
            {document.title || document.file_name}
          </span>
          {document.ai_processed && (
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              AI
            </Badge>
          )}
        </div>
        {document.ai_summary && (
          <p className="text-xs text-gray-600 line-clamp-2">
            {document.ai_summary}
          </p>
        )}
        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
          {document.document_type && (
            <span>{document.document_type}</span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(new Date(document.created_at), { addSuffix: true })}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {onView && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onView}
            className="h-6 w-6 p-0"
          >
            <Eye className="h-3 w-3" />
          </Button>
        )}
        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  )
}