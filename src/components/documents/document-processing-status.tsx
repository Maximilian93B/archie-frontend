'use client'

import { useState, useEffect } from 'react'
import { FileText, Loader2, CheckCircle, XCircle, AlertCircle, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Document } from '@/types'

interface ProcessingStage {
  id: string
  label: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'skipped'
  message?: string
}

interface DocumentProcessingStatusProps {
  document: Document
  onComplete?: () => void
  className?: string
}

export function DocumentProcessingStatus({ 
  document, 
  onComplete,
  className 
}: DocumentProcessingStatusProps) {
  const [stages, setStages] = useState<ProcessingStage[]>([])
  const [overallProgress, setOverallProgress] = useState(0)

  useEffect(() => {
    // Determine processing stages based on document state
    const processingStages: ProcessingStage[] = [
      {
        id: 'upload',
        label: 'Upload',
        status: document.id ? 'completed' : 'processing',
      },
      {
        id: 'extraction',
        label: 'Text Extraction',
        status: getExtractionStatus(),
        message: getExtractionMessage(),
      },
      {
        id: 'ai_processing',
        label: 'AI Processing',
        status: getAIProcessingStatus(),
        message: getAIProcessingMessage(),
      },
      {
        id: 'indexing',
        label: 'Search Indexing',
        status: getIndexingStatus(),
      },
    ]

    setStages(processingStages)
    
    // Calculate overall progress
    const completed = processingStages.filter(s => s.status === 'completed').length
    const total = processingStages.filter(s => s.status !== 'skipped').length
    setOverallProgress(total > 0 ? (completed / total) * 100 : 0)

    // Check if all processing is complete
    if (completed === total && total > 0 && onComplete) {
      onComplete()
    }
  }, [document, onComplete])

  function getExtractionStatus(): ProcessingStage['status'] {
    if (document.status === 'failed') return 'failed'
    if (document.extracted_text || document.status === 'ai_processed') return 'completed'
    if (document.status === 'processing') return 'processing'
    return 'pending'
  }

  function getExtractionMessage(): string | undefined {
    if (document.document_type === 'image' && document.status === 'processing') {
      return 'Using AI vision to extract text from image...'
    }
    if (document.document_type === 'pdf' && document.status === 'processing') {
      return 'Extracting text from PDF...'
    }
    return undefined
  }

  function getAIProcessingStatus(): ProcessingStage['status'] {
    if (!document.ai_processed && !document.ai_processing_status) return 'pending'
    if (document.ai_processing_status === 'failed') return 'failed'
    if (document.ai_processed || document.ai_processing_status === 'completed') return 'completed'
    if (document.ai_processing_status === 'processing') return 'processing'
    return 'pending'
  }

  function getAIProcessingMessage(): string | undefined {
    if (document.ai_processing_status === 'processing') {
      return 'Generating summary, extracting entities, and classifying document...'
    }
    if (document.ai_confidence_score) {
      return `Confidence: ${(document.ai_confidence_score * 100).toFixed(0)}%`
    }
    return undefined
  }

  function getIndexingStatus(): ProcessingStage['status'] {
    if (document.embedding_status === 'failed') return 'failed'
    if (document.embedding_status === 'completed') return 'completed'
    if (document.embedding_status === 'processing') return 'processing'
    return 'pending'
  }

  const getStageIcon = (stage: ProcessingStage) => {
    switch (stage.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'processing':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'skipped':
        return <AlertCircle className="w-5 h-5 text-gray-400" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
    }
  }

  const isProcessing = stages.some(s => s.status === 'processing')
  const hasFailed = stages.some(s => s.status === 'failed')

  return (
    <Card className={cn('p-6', className)}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-gray-600" />
            <div>
              <h3 className="font-medium">Processing Document</h3>
              <p className="text-sm text-gray-600">{document.filename}</p>
            </div>
          </div>
          <Badge 
            variant={
              hasFailed ? 'destructive' : 
              isProcessing ? 'secondary' : 
              'success'
            }
          >
            {hasFailed ? 'Failed' : 
             isProcessing ? 'Processing' : 
             'Complete'}
          </Badge>
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Processing Stages */}
        <div className="space-y-3">
          {stages.map((stage, index) => (
            <div 
              key={stage.id} 
              className={cn(
                'flex items-start gap-3',
                index < stages.length - 1 && 'pb-3 border-b'
              )}
            >
              {getStageIcon(stage)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    'font-medium',
                    stage.status === 'completed' && 'text-green-700',
                    stage.status === 'failed' && 'text-red-700',
                    stage.status === 'processing' && 'text-blue-700',
                    stage.status === 'pending' && 'text-gray-500'
                  )}>
                    {stage.label}
                  </span>
                  {stage.id === 'ai_processing' && document.ai_processed && (
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  )}
                </div>
                {stage.message && (
                  <p className="text-sm text-gray-600 mt-1">{stage.message}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* AI Results Preview (if available) */}
        {document.ai_processed && document.ai_summary && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              AI Summary
            </h4>
            <p className="text-sm text-gray-600 line-clamp-3">
              {document.ai_summary}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}

// Inline processing indicator for document lists
export function ProcessingIndicator({ document }: { document: Document }) {
  const isProcessing = document.status === 'processing' || 
                      document.ai_processing_status === 'processing' ||
                      document.embedding_status === 'processing'
  
  if (!isProcessing && document.status !== 'failed') return null

  return (
    <div className="flex items-center gap-2">
      {isProcessing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          <span className="text-xs text-blue-600">Processing</span>
        </>
      ) : (
        <>
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span className="text-xs text-red-600">Failed</span>
        </>
      )}
    </div>
  )
}