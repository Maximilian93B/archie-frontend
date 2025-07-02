'use client'

import { useState, useMemo } from 'react'
import { useEnhancedDocuments, useDocumentInsights } from '@/hooks/queries/enhanced-documents.queries'
import { enhancedDocumentUtils } from '@/lib/api/enhanced-documents'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  FileText, 
  Sparkles, 
  Brain, 
  TrendingUp, 
  Clock, 
  Eye,
  Download,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Loader2,
  ChevronRight,
  Star,
  Tags,
  Users,
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { formatFileSize } from '@/lib/utils/format'
import type { EnhancedDocument } from '@/lib/api/enhanced-documents'

interface EnhancedDocumentListProps {
  folderId?: string
  documentType?: string
  onDocumentSelect?: (document: EnhancedDocument) => void
  onDocumentChat?: (document: EnhancedDocument) => void
  className?: string
}

export function EnhancedDocumentList({
  folderId,
  documentType,
  onDocumentSelect,
  onDocumentChat,
  className
}: EnhancedDocumentListProps) {
  const [page, setPage] = useState(1)
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  // Fetch enhanced documents with AI context
  const { 
    data, 
    isLoading, 
    error, 
    isFetching 
  } = useEnhancedDocuments({
    page,
    page_size: 20,
    folder_id: folderId,
    document_type: documentType,
    include_context: true
  })

  // Fetch insights for the workspace overview
  const { data: insights } = useDocumentInsights()

  const documents = data?.documents || []
  const workspaceContext = data?.workspace_context
  const hasNextPage = data ? page * data.page_size < data.total : false

  const handleDocumentClick = (document: EnhancedDocument) => {
    setSelectedDocument(document.id)
    onDocumentSelect?.(document)
  }

  const handleChatClick = (document: EnhancedDocument, e: React.MouseEvent) => {
    e.stopPropagation()
    onDocumentChat?.(document)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <h3 className="font-medium text-gray-900">Failed to load documents</h3>
          <p className="text-sm text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Workspace Context Overview */}
      {workspaceContext && (
        <WorkspaceContextCard context={workspaceContext} />
      )}

      {/* Document Insights */}
      {insights && insights.insights.length > 0 && (
        <DocumentInsightsCard insights={insights.insights} />
      )}

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI-Enhanced Documents
            {data && (
              <Badge variant="secondary" className="ml-auto">
                {data.total} total
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && documents.length === 0 ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <DocumentSkeleton key={i} />
              ))}
            </div>
          ) : documents.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-3">
              {documents.map((document) => (
                <EnhancedDocumentItem
                  key={document.id}
                  document={document}
                  isSelected={selectedDocument === document.id}
                  onClick={() => handleDocumentClick(document)}
                  onChatClick={(e) => handleChatClick(document, e)}
                />
              ))}
              
              {/* Load More */}
              {hasNextPage && (
                <div className="pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => p + 1)}
                    disabled={isFetching}
                    className="w-full"
                  >
                    {isFetching ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading more...
                      </>
                    ) : (
                      <>
                        Load More Documents
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

interface EnhancedDocumentItemProps {
  document: EnhancedDocument
  isSelected: boolean
  onClick: () => void
  onChatClick: (e: React.MouseEvent) => void
}

function EnhancedDocumentItem({ 
  document, 
  isSelected, 
  onClick, 
  onChatClick 
}: EnhancedDocumentItemProps) {
  const processingStatus = enhancedDocumentUtils.getProcessingStatus(document)
  const confidenceLevel = enhancedDocumentUtils.getConfidenceLevel(document.ai_confidence_score)
  const entities = enhancedDocumentUtils.formatEntities(document.ai_entities)
  const summary = enhancedDocumentUtils.generateDisplaySummary(document)

  return (
    <div
      onClick={onClick}
      className={cn(
        "group p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Document Icon & Status */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              isSelected ? "bg-blue-100" : "bg-gray-100"
            )}>
              <FileText className={cn(
                "h-5 w-5",
                isSelected ? "text-blue-600" : "text-gray-600"
              )} />
            </div>
            {/* AI Processing Status */}
            <div className="absolute -bottom-1 -right-1">
              {processingStatus.status === 'processed' && (
                <CheckCircle className="h-4 w-4 text-green-500 bg-white rounded-full" />
              )}
              {processingStatus.status === 'processing' && (
                <Loader2 className="h-4 w-4 text-blue-500 bg-white rounded-full animate-spin" />
              )}
              {processingStatus.status === 'failed' && (
                <AlertCircle className="h-4 w-4 text-red-500 bg-white rounded-full" />
              )}
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-900 truncate">
                {document.title || document.file_name}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(document.created_at), { addSuffix: true })}
                </span>
                <span>{formatFileSize(document.file_size)}</span>
                {document.document_type && (
                  <Badge variant="outline" className="text-xs">
                    {document.document_type}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* AI Confidence */}
            {document.ai_confidence_score && (
              <div className="flex items-center gap-1 shrink-0">
                <Sparkles className="h-3 w-3 text-purple-500" />
                <span className={cn(
                  "text-xs font-medium",
                  enhancedDocumentUtils.getConfidenceColor(document.ai_confidence_score)
                )}>
                  {Math.round(document.ai_confidence_score * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* AI Summary */}
          {document.ai_summary && (
            <p className="text-sm text-gray-700 line-clamp-2 mb-3">
              {summary}
            </p>
          )}

          {/* AI Key Points */}
          {document.ai_key_points && document.ai_key_points.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-3 w-3 text-amber-500" />
                <span className="text-xs font-medium text-gray-700">Key Points</span>
              </div>
              <div className="space-y-1">
                {document.ai_key_points.slice(0, 2).map((point, index) => (
                  <div key={index} className="text-xs text-gray-600 flex items-start gap-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 shrink-0" />
                    <span className="line-clamp-1">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Entities */}
          {entities.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1 mb-1">
                <Tags className="h-3 w-3 text-blue-500" />
                <span className="text-xs font-medium text-gray-700">Detected Entities</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {entities.slice(0, 4).map((entity, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {entity.text}
                  </Badge>
                ))}
                {entities.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{entities.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge 
                variant={processingStatus.status === 'processed' ? 'default' : 'secondary'}
                className="text-xs"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {processingStatus.message}
              </Badge>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={onChatClick}
                className="h-7 px-2"
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                Chat
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
              >
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WorkspaceContextCard({ context }: { context: any }) {
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Brain className="h-5 w-5" />
          Workspace Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-blue-800">{context.overview}</p>
        
        {context.recommendations.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-2">Recommendations</h4>
            <div className="space-y-2">
              {context.recommendations.slice(0, 2).map((rec: any, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800">{rec.description}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {rec.priority} priority
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function DocumentInsightsCard({ insights }: { insights: any[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-600" />
          Recent Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.slice(0, 3).map((insight, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={cn(
                "w-2 h-2 rounded-full mt-2",
                insight.priority === 'high' ? 'bg-red-500' :
                insight.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
              )} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                <p className="text-xs text-gray-600">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function DocumentSkeleton() {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-start gap-4">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
      <p className="text-gray-600 mb-4">
        Upload some documents to see AI-powered insights and analysis
      </p>
      <Button variant="outline">
        <FileText className="h-4 w-4 mr-2" />
        Upload Documents
      </Button>
    </div>
  )
}