import React, { useEffect, useState } from 'react'
import { useChatStoreSafe } from '@/hooks/use-chat-store-safe'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RateLimitIndicatorProps {
  className?: string
  compact?: boolean
}

const RATE_LIMIT = 10 // 10 messages per minute as per backend
const RESET_TIME = 60000 // 1 minute in milliseconds

export function RateLimitIndicator({ className, compact = false }: RateLimitIndicatorProps) {
  const { messagesSentInLastMinute, lastMessageTimestamp } = useChatStoreSafe()
  const [timeUntilReset, setTimeUntilReset] = useState(0)
  
  // Calculate remaining messages
  const remainingMessages = Math.max(0, RATE_LIMIT - messagesSentInLastMinute)
  const percentageUsed = (messagesSentInLastMinute / RATE_LIMIT) * 100
  const isRateLimited = remainingMessages === 0
  const isNearLimit = remainingMessages <= 3 && remainingMessages > 0
  
  // Update countdown timer
  useEffect(() => {
    if (messagesSentInLastMinute === 0) {
      setTimeUntilReset(0)
      return
    }
    
    const updateTimer = () => {
      const now = Date.now()
      const timeSinceLastMessage = now - lastMessageTimestamp
      const remaining = Math.max(0, RESET_TIME - timeSinceLastMessage)
      setTimeUntilReset(remaining)
      
      if (remaining === 0) {
        // Timer has expired, messages should reset
        setTimeUntilReset(0)
      }
    }
    
    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    
    return () => clearInterval(interval)
  }, [messagesSentInLastMinute, lastMessageTimestamp])
  
  // Format time remaining
  const formatTime = (ms: number): string => {
    const seconds = Math.ceil(ms / 1000)
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }
    return `${seconds}s`
  }
  
  // Don't show if no messages sent
  if (messagesSentInLastMinute === 0 && !compact) {
    return null
  }
  
  // Compact mode - just show a small indicator
  if (compact) {
    if (isRateLimited) {
      return (
        <div className={cn('flex items-center gap-2 text-sm', className)}>
          <AlertCircle className="h-4 w-4 text-red-500" />
          <span className="text-red-600 font-medium">
            Rate limited ({formatTime(timeUntilReset)})
          </span>
        </div>
      )
    }
    
    if (isNearLimit) {
      return (
        <div className={cn('flex items-center gap-2 text-sm', className)}>
          <Clock className="h-4 w-4 text-amber-500" />
          <span className="text-amber-600">
            {remainingMessages} {remainingMessages === 1 ? 'message' : 'messages'} left
          </span>
        </div>
      )
    }
    
    return null
  }
  
  // Full mode - show detailed indicator
  return (
    <div className={cn('space-y-2', className)}>
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Message Rate Limit</span>
          <span className={cn('font-medium', {
            'text-green-600': remainingMessages > 5,
            'text-amber-600': isNearLimit,
            'text-red-600': isRateLimited
          })}>
            {remainingMessages}/{RATE_LIMIT} remaining
          </span>
        </div>
        
        <Progress 
          value={percentageUsed} 
          className={cn('h-2', {
            '[&>div]:bg-green-500': remainingMessages > 5,
            '[&>div]:bg-amber-500': isNearLimit,
            '[&>div]:bg-red-500': isRateLimited
          })}
        />
        
        {timeUntilReset > 0 && (
          <p className="text-xs text-gray-500">
            Resets in {formatTime(timeUntilReset)}
          </p>
        )}
      </div>
      
      {/* Alert when rate limited */}
      {isRateLimited && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            You've reached the rate limit. Please wait {formatTime(timeUntilReset)} before sending more messages.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Warning when near limit */}
      {isNearLimit && (
        <Alert className="py-2 border-amber-200 bg-amber-50">
          <Clock className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-sm text-amber-800">
            You're approaching the rate limit. {remainingMessages} {remainingMessages === 1 ? 'message' : 'messages'} remaining.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

/**
 * Hook to get rate limit status
 */
export function useRateLimit() {
  const { messagesSentInLastMinute, lastMessageTimestamp, canSendMessage } = useChatStoreSafe()
  const [timeUntilReset, setTimeUntilReset] = useState(0)
  
  useEffect(() => {
    if (messagesSentInLastMinute === 0) {
      setTimeUntilReset(0)
      return
    }
    
    const updateTimer = () => {
      const now = Date.now()
      const timeSinceLastMessage = now - lastMessageTimestamp
      const remaining = Math.max(0, RESET_TIME - timeSinceLastMessage)
      setTimeUntilReset(remaining)
    }
    
    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    
    return () => clearInterval(interval)
  }, [messagesSentInLastMinute, lastMessageTimestamp])
  
  return {
    messagesUsed: messagesSentInLastMinute,
    messagesRemaining: Math.max(0, RATE_LIMIT - messagesSentInLastMinute),
    isRateLimited: !canSendMessage(),
    timeUntilReset,
    rateLimit: RATE_LIMIT
  }
}