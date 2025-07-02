'use client'

import { useState, useMemo } from 'react'
import { useCompareDocuments, useDocumentSelection } from '@/hooks/queries/multi-document.queries'
import { multiDocumentUtils } from '@/lib/api/multi-document'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  FileText, 
  Brain, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  X,
  Plus,
  BarChart3,
  Clock,
  Zap,
  Target,
  Users,
  Link,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import type { MultiDocumentCompareResponse, MultiDocumentCompareRequest } from '@/lib/api/multi-document'
import type { EnhancedDocument } from '@/lib/api/enhanced-documents'

interface DocumentComparisonInterfaceProps {
  initialDocuments?: EnhancedDocument[]
  onDocumentSelect?: (document: EnhancedDocument) => void
  onDocumentChat?: (documents: EnhancedDocument[]) => void
  className?: string
}

export function DocumentComparisonInterface({
  initialDocuments = [],
  onDocumentSelect,
  onDocumentChat,
  className
}: DocumentComparisonInterfaceProps) {
  const [comparisonType, setComparisonType] = useState<'full' | 'summary' | 'specific'>('full')
  const [customQuery, setCustomQuery] = useState('')
  const [comparisonResult, setComparisonResult] = useState<MultiDocumentCompareResponse | null>(null)

  const {
    selectedDocuments,
    addDocument,
    removeDocument,
    clearSelection,
    canCompare,
    canAddMore,
    maxDocuments
  } = useDocumentSelection()

  const compareDocuments = useCompareDocuments()

  // Initialize with provided documents
  useState(() => {
    initialDocuments.forEach(doc => addDocument(doc.id))
  })

  const handleCompare = async () => {
    if (!canCompare) return

    const request: MultiDocumentCompareRequest = {
      document_ids: selectedDocuments,
      comparison_type: comparisonType,
      query: comparisonType === 'specific' ? customQuery : undefined
    }

    try {
      const result = await compareDocuments.mutateAsync(request)
      setComparisonResult(result)
    } catch (error) {
      console.error('Comparison failed:', error)
    }
  }

  const handleChatWithDocuments = () => {
    if (selectedDocuments.length === 0) return
    
    const documents = initialDocuments.filter(doc => 
      selectedDocuments.includes(doc.id)
    )
    onDocumentChat?.(documents)
  }

  const stats = useMemo(() => {
    if (!comparisonResult) return null
    return multiDocumentUtils.generateComparisonStats(comparisonResult)
  }, [comparisonResult])

  const keyInsights = useMemo(() => {
    if (!comparisonResult) return []
    return multiDocumentUtils.extractKeyInsights(comparisonResult)
  }, [comparisonResult])

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Multi-Document Comparison
            <Badge variant="secondary" className="ml-auto">
              {selectedDocuments.length}/{maxDocuments} selected
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Document Selection Summary */}
          {selectedDocuments.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedDocuments.map((docId) => {
                const document = initialDocuments.find(d => d.id === docId)
                return (
                  <Badge key={docId} variant="outline" className="flex items-center gap-1">
                    {document?.title || document?.file_name || 'Unknown Document'}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeDocument(docId)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )
              })}
            </div>
          )}

          {/* Comparison Controls */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button
                variant={comparisonType === 'full' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setComparisonType('full')}
              >
                Full Analysis
              </Button>
              <Button
                variant={comparisonType === 'summary' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setComparisonType('summary')}
              >
                Summary Only
              </Button>
              <Button
                variant={comparisonType === 'specific' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setComparisonType('specific')}
              >
                Custom Query
              </Button>
            </div>

            <div className="flex gap-2 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={clearSelection}
                disabled={selectedDocuments.length === 0}
              >
                Clear All
              </Button>
              <Button
                onClick={handleCompare}
                disabled={!canCompare || compareDocuments.isPending}
                className="min-w-[120px]"
              >
                {compareDocuments.isPending ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Compare
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Custom Query Input */}
          {comparisonType === 'specific' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                What specific aspect would you like to compare?
              </label>
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="e.g., pricing strategies, technical specifications, conclusions..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Action Buttons */}
          {selectedDocuments.length > 0 && (
            <div className="flex gap-2 pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handleChatWithDocuments}
              >
                <Users className="h-4 w-4 mr-2" />
                Chat with Selected
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {comparisonResult && (
        <ComparisonResults
          result={comparisonResult}
          stats={stats}
          keyInsights={keyInsights}
          onDocumentSelect={onDocumentSelect}
        />
      )}

      {/* Loading State */}
      {compareDocuments.isPending && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Analyzing Documents</h3>
              <p className="text-sm text-gray-600">
                Our AI is comparing your documents and identifying key insights...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {selectedDocuments.length === 0 && !comparisonResult && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Brain className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Start Document Comparison
              </h3>
              <p className="text-gray-600 mb-4 max-w-sm mx-auto">
                Select 2 or more documents to compare and analyze similarities, differences, and relationships.
              </p>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface ComparisonResultsProps {
  result: MultiDocumentCompareResponse
  stats: any
  keyInsights: any[]
  onDocumentSelect?: (document: EnhancedDocument) => void
}

function ComparisonResults({ 
  result, 
  stats, 
  keyInsights, 
  onDocumentSelect 
}: ComparisonResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'similarities' | 'differences' | 'relationships'>('overview')

  const similarities = multiDocumentUtils.sortSimilarities(result.comparison_result.similarities)
  const differences = multiDocumentUtils.sortDifferences(result.comparison_result.differences)
  const relationships = result.comparison_result.relationships

  return (
    <div className="space-y-6">
      {/* Overview Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Analysis Overview
            <Badge variant="outline" className="ml-2">
              {multiDocumentUtils.formatConfidence(stats.averageConfidence)} confidence
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.documentCount}</div>
              <div className="text-sm text-blue-700">Documents</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.similaritiesFound}</div>
              <div className="text-sm text-green-700">Similarities</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">{stats.differencesFound}</div>
              <div className="text-sm text-amber-700">Differences</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.relationshipsFound}</div>
              <div className="text-sm text-purple-700">Relationships</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Processed in {stats.processingTime}ms
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              {stats.tokenUsage.toLocaleString()} tokens used
            </span>
          </div>
        </CardContent>
      </Card>

      {/* AI Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {result.comparison_result.summary}
          </p>

          {/* Key Findings */}
          {result.comparison_result.key_findings.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Key Findings</h4>
              <div className="space-y-2">
                {result.comparison_result.key_findings.map((finding, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-700">{finding}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Key Insights', count: keyInsights.length },
              { id: 'similarities', label: 'Similarities', count: similarities.length },
              { id: 'differences', label: 'Differences', count: differences.length },
              { id: 'relationships', label: 'Relationships', count: relationships.length }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center gap-1"
              >
                {tab.label}
                <Badge variant="secondary" className="text-xs">
                  {tab.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {activeTab === 'overview' && (
              <KeyInsightsTab insights={keyInsights} />
            )}
            {activeTab === 'similarities' && (
              <SimilaritiesTab similarities={similarities} />
            )}
            {activeTab === 'differences' && (
              <DifferencesTab differences={differences} />
            )}
            {activeTab === 'relationships' && (
              <RelationshipsTab relationships={relationships} />
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

function KeyInsightsTab({ insights }: { insights: any[] }) {
  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-2 h-2 rounded-full mt-2 shrink-0",
              insight.type === 'similarity' ? 'bg-green-500' :
              insight.type === 'difference' ? 'bg-amber-500' : 'bg-purple-500'
            )} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-gray-900">{insight.title}</h4>
                <Badge 
                  variant={insight.importance === 'high' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {insight.importance} importance
                </Badge>
                <span className="text-xs text-gray-500">
                  {multiDocumentUtils.formatConfidence(insight.confidence)}
                </span>
              </div>
              <p className="text-sm text-gray-700">{insight.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SimilaritiesTab({ similarities }: { similarities: any[] }) {
  return (
    <div className="space-y-4">
      {similarities.map((similarity, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-gray-900">{similarity.aspect}</h4>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className={cn(
                "text-sm font-medium",
                multiDocumentUtils.getConfidenceColor(similarity.confidence)
              )}>
                {multiDocumentUtils.formatConfidence(similarity.confidence)}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-3">{similarity.description}</p>
          
          {similarity.supporting_evidence && (
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-600">Supporting Evidence:</span>
              {similarity.supporting_evidence.map((evidence: string, i: number) => (
                <div key={i} className="text-xs text-gray-600 pl-3 border-l-2 border-gray-200">
                  {evidence}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function DifferencesTab({ differences }: { differences: any[] }) {
  return (
    <div className="space-y-4">
      {differences.map((difference, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-gray-900">{difference.aspect}</h4>
            <Badge 
              variant={difference.significance === 'high' ? 'destructive' : 'secondary'}
              className="text-xs"
            >
              {difference.significance} significance
            </Badge>
          </div>
          <p className="text-sm text-gray-700 mb-2">{difference.description}</p>
          <div className="text-xs text-gray-500">
            Document: {difference.document_id}
          </div>
        </div>
      ))}
    </div>
  )
}

function RelationshipsTab({ relationships }: { relationships: any[] }) {
  return (
    <div className="space-y-4">
      {relationships.map((relationship, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-lg">
              {multiDocumentUtils.getRelationshipIcon(relationship.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900 capitalize">
                  {relationship.type}
                </span>
                <ArrowRight className="h-3 w-3 text-gray-400" />
                <span className={cn(
                  "text-sm font-medium",
                  multiDocumentUtils.getConfidenceColor(relationship.confidence)
                )}>
                  {multiDocumentUtils.formatConfidence(relationship.confidence)}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{relationship.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>From: {relationship.source_document_id}</span>
                <span>To: {relationship.target_document_id}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}