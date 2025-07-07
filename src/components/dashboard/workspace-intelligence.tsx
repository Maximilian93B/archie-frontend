'use client'

import { useEffect } from 'react'
import { Brain, TrendingUp, Lightbulb, FolderOpen, AlertCircle, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useWorkspaceContext } from '@/hooks/queries/documents.queries'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

interface WorkspaceIntelligenceProps {
  className?: string
}

export function WorkspaceIntelligence({ className }: WorkspaceIntelligenceProps) {
  const { data, isLoading, error, refetch } = useWorkspaceContext()

  if (error) {
    return (
      <Card className={cn('col-span-full', className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Workspace Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load workspace insights. Please try again.
            </AlertDescription>
          </Alert>
          <Button onClick={() => refetch()} variant="outline" size="sm" className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className={cn('col-span-full', className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Workspace Intelligence
          </CardTitle>
          <CardDescription>
            Analyzing your document workspace...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return null
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'secondary'
    }
  }

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'organization': return FolderOpen
      case 'workflow': return TrendingUp
      default: return Lightbulb
    }
  }

  return (
    <Card className={cn('col-span-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Workspace Intelligence
            </CardTitle>
            <CardDescription>
              AI-powered insights about your document collection
            </CardDescription>
          </div>
          <Button onClick={() => refetch()} variant="ghost" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Workspace Overview */}
        {data.overview && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-sm text-gray-600 mb-2">Workspace Overview</h3>
            <p className="text-sm text-gray-900 leading-relaxed">
              {data.overview}
            </p>
          </div>
        )}

        {/* Recent Activity */}
        {data.recent_activity && (
          <div>
            <h3 className="font-medium text-sm text-gray-600 mb-2">Recent Activity</h3>
            <p className="text-sm text-gray-700">
              {data.recent_activity}
            </p>
          </div>
        )}

        {/* Document Trends */}
        {data.document_trends && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-semibold">{data.document_trends.upload_velocity}</p>
              <p className="text-xs text-gray-600">Upload Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold">
                {Math.round(data.document_trends.processing_success_rate * 100)}%
              </p>
              <p className="text-xs text-gray-600">Processing Success</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold">{data.document_trends.storage_growth}</p>
              <p className="text-xs text-gray-600">Storage Growth</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold">
                {data.document_trends.popular_types.length > 0 
                  ? data.document_trends.popular_types[0] 
                  : 'N/A'}
              </p>
              <p className="text-xs text-gray-600">Most Common Type</p>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {data.recommendations && data.recommendations.length > 0 && (
          <div>
            <h3 className="font-medium text-sm text-gray-600 mb-3">Recommendations</h3>
            <div className="space-y-3">
              {data.recommendations.slice(0, 3).map((rec, index) => {
                const Icon = getRecommendationIcon(rec.type)
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-white hover:shadow-sm transition-shadow"
                  >
                    <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {rec.description}
                      </p>
                      <Badge 
                        variant={getPriorityColor(rec.priority)}
                        className="mt-1"
                        size="sm"
                      >
                        {rec.priority} priority
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Processing Time Indicator */}
        {data.processing_time_ms && (
          <div className="text-xs text-gray-500 text-right">
            Analysis completed in {(data.processing_time_ms / 1000).toFixed(2)}s
          </div>
        )}
      </CardContent>
    </Card>
  )
}