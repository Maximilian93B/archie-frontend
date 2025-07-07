'use client'

import { useState } from 'react'
import { FileText, ChevronDown, ChevronUp, Sparkles, Star, Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { EnhancedSearchResult } from '@/lib/api/search'
import { useEnhancedSearchActions } from '@/hooks/queries/search.queries'
import { cn } from '@/lib/utils'
import { formatFileSize } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

interface EnhancedSearchResultProps {
  result: EnhancedSearchResult
  query: string
  onSelect: (id: string) => void
  onDownload: (id: string) => void
  onDelete: (id: string) => void
  onStar?: (id: string) => void
  isSelected?: boolean
}

export function EnhancedSearchResultComponent({
  result,
  query,
  onSelect,
  onDownload,
  onDelete,
  onStar,
  isSelected,
}: EnhancedSearchResultProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isStarred, setIsStarred] = useState(false)
  const {
    formatRelevanceScore,
    getConfidenceColor,
    getConfidenceLevel,
    processHighlightedContent,
    getSectionTypeIcon,
    hasAIEnhancements,
    getRelevanceColor,
  } = useEnhancedSearchActions()

  const hasAI = hasAIEnhancements(result)
  const relevancePercentage = Math.round(result.relevanceScore * 100)

  const handleStar = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsStarred(!isStarred)
    onStar?.(result.id)
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDownload(result.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(result.id)
  }

  return (
    <Card
      className={cn(
        'p-4 transition-all hover:shadow-md cursor-pointer border',
        isSelected && 'border-black shadow-md'
      )}
      onClick={() => onSelect(result.id)}
    >
      <div className="space-y-3">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <FileText className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">
                {result.title}
              </h3>
              
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(result.updatedAt), { addSuffix: true })}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  {formatFileSize(result.fileSize)}
                </span>
                {result.documentType && (
                  <>
                    <span className="text-xs text-gray-400">•</span>
                    <Badge variant="secondary" className="text-xs">
                      {result.documentType}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Actions & Relevance */}
          <div className="flex items-center gap-2">
            {/* Relevance Score */}
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className={cn('text-sm font-medium', getRelevanceColor(result.relevanceScore))}>
                  {formatRelevanceScore(result.relevanceScore)}
                </div>
                <div className="text-xs text-gray-500">relevance</div>
              </div>
              <Progress 
                value={relevancePercentage} 
                className="w-16 h-2"
                indicatorClassName={cn(
                  result.relevanceScore >= 0.8 ? 'bg-green-600' :
                  result.relevanceScore >= 0.6 ? 'bg-yellow-600' :
                  result.relevanceScore >= 0.4 ? 'bg-orange-600' :
                  'bg-red-600'
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleStar}
              >
                <Star className={cn('h-4 w-4', isStarred && 'fill-yellow-400 text-yellow-400')} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        {result.aiSummary && (
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600 line-clamp-2">
              {result.aiSummary}
            </p>
          </div>
        )}

        {/* Highlighted Content */}
        {result.highlightedContent && (
          <div className="bg-gray-50 rounded p-3">
            <p 
              className="text-sm text-gray-700 line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: processHighlightedContent(result.highlightedContent, query)
              }}
            />
          </div>
        )}

        {/* Tags */}
        {result.tags && result.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {result.tags.slice(0, 5).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {result.tags.length > 5 && (
              <span className="text-xs text-gray-500">
                +{result.tags.length - 5} more
              </span>
            )}
          </div>
        )}

        {/* Matching Sections (Collapsible) */}
        {result.matchingSections && result.matchingSections.length > 0 && (
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between p-2"
              >
                <span className="text-sm">
                  {result.matchingSections.length} matching section{result.matchingSections.length > 1 ? 's' : ''}
                </span>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              {result.matchingSections.map((section, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded p-3 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{getSectionTypeIcon(section.type)}</span>
                      <span className="text-xs font-medium text-gray-700">
                        {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn('text-xs', getConfidenceColor(section.confidence))}
                    >
                      {getConfidenceLevel(section.confidence)} confidence
                    </Badge>
                  </div>
                  <p
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: processHighlightedContent(section.content, query)
                    }}
                  />
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* AI Enhancement Indicator */}
        {hasAI && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <Sparkles className="h-3 w-3 text-purple-600" />
            <span className="text-xs text-purple-600">
              AI-enhanced result
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}