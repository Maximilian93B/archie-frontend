import { Loader2, CheckCircle, XCircle, Clock, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ProcessingStatusBadgeProps {
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'uploaded' | 'ai_processed'
  aiProcessed?: boolean
  aiProcessingStatus?: 'pending' | 'processing' | 'completed' | 'failed'
  embeddingStatus?: 'pending' | 'processing' | 'completed' | 'failed'
  className?: string
}

export function ProcessingStatusBadge({ 
  status, 
  aiProcessed, 
  aiProcessingStatus,
  embeddingStatus,
  className 
}: ProcessingStatusBadgeProps) {
  // Determine overall status from multiple fields
  const getOverallStatus = () => {
    if (status === 'failed' || aiProcessingStatus === 'failed' || embeddingStatus === 'failed') {
      return 'failed'
    }
    if (status === 'processing' || aiProcessingStatus === 'processing' || embeddingStatus === 'processing') {
      return 'processing'
    }
    if (aiProcessed || status === 'ai_processed' || aiProcessingStatus === 'completed') {
      return 'ai_processed'
    }
    if (status === 'uploaded' || status === 'completed') {
      return 'completed'
    }
    return 'pending'
  }

  const overallStatus = getOverallStatus()

  // Show status-based badge
  switch (overallStatus) {
    case 'pending':
      return (
        <Badge className={cn("bg-gray-100 text-gray-800 border-gray-200", className)}>
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      )
    
    case 'processing':
      return (
        <Badge className={cn("bg-blue-100 text-blue-800 border-blue-200 animate-pulse", className)}>
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          Processing
        </Badge>
      )
    
    case 'completed':
      return (
        <Badge className={cn("bg-gray-100 text-gray-800 border-gray-200", className)}>
          <CheckCircle className="w-3 h-3 mr-1" />
          Uploaded
        </Badge>
      )
    
    case 'ai_processed':
      return (
        <Badge className={cn("bg-purple-100 text-purple-800 border-purple-200", className)}>
          <Sparkles className="w-3 h-3 mr-1" />
          AI Processed
        </Badge>
      )
    
    case 'failed':
      return (
        <Badge className={cn("bg-red-100 text-red-800 border-red-200", className)}>
          <XCircle className="w-3 h-3 mr-1" />
          Failed
        </Badge>
      )
    
    default:
      return null
  }
}