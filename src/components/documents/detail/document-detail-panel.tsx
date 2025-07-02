'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  X,
  Download,
  Trash2,
  Share2,
  FolderOpen,
  Tag,
  ExternalLink,
  FileText,
  Calendar,
  HardDrive,
  Brain,
  Hash,
  MoreVertical,
  Eye,
  Copy,
  Edit,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DocumentTags } from '@/components/tags/document-tags'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDate, formatBytes, formatRelativeTime, cn } from '@/lib/utils'
import type { Document } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { toast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

interface DocumentDetailPanelProps {
  document: Document
  onClose?: () => void
  onDelete?: (documentId: string) => void
  onDownload?: (documentId: string) => void
  className?: string
}

export function DocumentDetailPanel({
  document,
  onClose,
  onDelete,
  onDownload,
  className,
}: DocumentDetailPanelProps) {
  const [activeTab, setActiveTab] = useState('details')

  // Fetch AI results if processed
  const { data: aiResults, isLoading: aiLoading } = useQuery({
    queryKey: ['ai-results', document.id],
    queryFn: () => apiClient.getAIResults(document.id),
    enabled: document.ai_processed,
  })

  const handleCopyId = () => {
    navigator.clipboard.writeText(document.id)
    toast({
      title: 'Copied',
      description: 'Document ID copied to clipboard',
    })
  }

  const handleOpenInNewTab = () => {
    window.open(`/dashboard/documents/${document.id}`, '_blank')
  }

  return (
    <div className={cn('w-full lg:w-[400px] bg-white border-l border-gray-200 flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-gray-200">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {document.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {formatRelativeTime(document.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-1 ml-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleOpenInNewTab}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onDownload?.(document.id)}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderOpen className="mr-2 h-4 w-4" />
              Move to Folder
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Tag className="mr-2 h-4 w-4" />
              Add Tags
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete?.(document.id)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          {document.ai_processed && <TabsTrigger value="ai">AI Analysis</TabsTrigger>}
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          {/* Details Tab */}
          <TabsContent value="details" className="p-4 space-y-4 m-0">
            {/* File Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">File Information</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <FileText className="h-4 w-4 text-gray-400 mr-3 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="text-sm font-medium">{document.content_type}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <HardDrive className="h-4 w-4 text-gray-400 mr-3 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Size</p>
                    <p className="text-sm font-medium">{formatBytes(document.file_size)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-4 w-4 text-gray-400 mr-3 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Uploaded</p>
                    <p className="text-sm font-medium">{formatDate(document.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Hash className="h-4 w-4 text-gray-400 mr-3 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Document ID</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-mono text-xs">{document.id.slice(0, 8)}...</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={handleCopyId}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Organization */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Organization</h3>
              <div className="space-y-2">
                {document.folder_id ? (
                  <div className="flex items-start">
                    <FolderOpen className="h-4 w-4 text-gray-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Folder</p>
                      <p className="text-sm font-medium">{document.folder_name || 'Unknown Folder'}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Not in any folder</p>
                )}
                
                <div className="flex items-start">
                  <Tag className="h-4 w-4 text-gray-400 mr-3 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">Tags</p>
                    <DocumentTags 
                      documentId={document.id} 
                      showAddButton={true}
                      maxDisplayTags={8}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Processing Status */}
            {document.ai_processed && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">AI Processing</h3>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-green-600 font-medium">Processed</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    AI analysis completed {formatRelativeTime(document.ai_processed_at || document.updated_at)}
                  </p>
                </div>
              </>
            )}
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="p-4 m-0">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600">
                Document preview will be available here
              </p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href={`/dashboard/documents/${document.id}`}>
                  Open Full View
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* AI Analysis Tab */}
          {document.ai_processed && (
            <TabsContent value="ai" className="p-4 space-y-4 m-0">
              {aiLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-20" />
                  <Skeleton className="h-16" />
                  <Skeleton className="h-24" />
                </div>
              ) : aiResults ? (
                <>
                  {/* Summary */}
                  {aiResults.summary && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Summary</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {aiResults.summary}
                      </p>
                    </div>
                  )}

                  {/* Key Points */}
                  {aiResults.key_points && aiResults.key_points.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Key Points</h3>
                        <ul className="space-y-1">
                          {aiResults.key_points.map((point, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <span className="text-gray-400 mr-2">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {/* Entities */}
                  {aiResults.entities && Object.keys(aiResults.entities).length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Entities</h3>
                        <div className="space-y-2">
                          {Object.entries(aiResults.entities).map(([type, values]) => (
                            <div key={type}>
                              <p className="text-xs text-gray-600 mb-1 capitalize">{type}</p>
                              <div className="flex flex-wrap gap-1">
                                {(values as string[]).map((value) => (
                                  <Badge key={value} variant="outline" size="sm">
                                    {value}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Suggested Tags */}
                  {aiResults.suggested_tags && aiResults.suggested_tags.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Suggested Tags</h3>
                        <div className="flex flex-wrap gap-1">
                          {aiResults.suggested_tags.map((tag) => (
                            <Badge key={tag} variant="secondary" size="sm" className="cursor-pointer hover:bg-gray-200">
                              + {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600">
                    AI analysis data not available
                  </p>
                </div>
              )}
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  )
}