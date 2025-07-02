import { Loader2, CheckCircle, XCircle, Clock, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ProcessingStatusBadgeProps {
  status?: 'pending' | 'processing' | 'completed' | 'failed'
  aiProcessed?: boolean
  className?: string
}

export function ProcessingStatusBadge({ status, aiProcessed, className }: ProcessingStatusBadgeProps) {
  // If no status provided but aiProcessed is true, show completed
  if (!status && aiProcessed) {
    return (
      <Badge className={cn("bg-green-100 text-green-800 border-green-200", className)}>
        <Sparkles className="w-3 h-3 mr-1" />
        AI Processed
      </Badge>
    )
  }

  // Show status-based badge
  switch (status) {
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
        <Badge className={cn("bg-green-100 text-green-800 border-green-200", className)}>
          <CheckCircle className="w-3 h-3 mr-1" />
          AI Ready
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